import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {fork} from 'node:child_process';
import {once} from 'node:events';
import {fileURLToPath} from 'node:url';

test('Two server instances share joins and question changes, reject stale actions, preserve privacy and fail closed on outage',async()=>{
 const values=new Map();let outage=false;
 const redis=http.createServer(async(req,res)=>{
  if(outage){res.writeHead(503);return res.end('{}');}
  let raw='';for await(const chunk of req)raw+=chunk;const [cmd,...a]=JSON.parse(raw);let result;
  if(cmd==='GET')result=values.get(a[0])??null;
  if(cmd==='SET'){result=values.has(a[0])?null:'OK';if(result)values.set(a[0],a[1]);}
  if(cmd==='EVAL'){if(a[0].includes("'INCR'")){result=Number(values.get(a[2])||0)+1;values.set(a[2],result);}else{result=values.get(a[2])===a[3]?1:0;if(result)values.set(a[2],a[4]);}}
  res.setHeader('Content-Type','application/json');res.end(JSON.stringify({result}));
 });await new Promise(resolve=>redis.listen(0,'127.0.0.1',resolve));
 const workers=[];
 const worker=async()=>{const child=fork(fileURLToPath(new URL('fixtures/shared-worker.mjs',import.meta.url)),{env:{...process.env,UPSTASH_REDIS_REST_URL:'http://127.0.0.1:'+redis.address().port,UPSTASH_REDIS_REST_TOKEN:'test-only',SUPABASE_URL:'',SUPABASE_SECRET_KEY:'',SUPABASE_SERVICE_ROLE_KEY:''},stdio:['ignore','ignore','pipe','ipc']});workers.push(child);const [{port}]=await once(child,'message');return 'http://127.0.0.1:'+port;};
 const call=async(base,path,body,session,status=200)=>{const r=await fetch(base+'/api/'+path,{method:body===undefined?'GET':'POST',headers:{...(body===undefined?{}:{'Content-Type':'application/json'}),...(session?{Authorization:'Bearer '+session.token,'X-Room-Code':session.code}:{})},body:body===undefined?undefined:JSON.stringify(body)});const data=await r.json();assert.equal(r.status,status,JSON.stringify(data));return data;};
 try{
  const a=await worker(),b=await worker(),host=await call(a,'create',{name:'Host',game:'packed'});
  const others=await Promise.all(Array.from({length:5},(_,i)=>call(i%2?a:b,'join',{name:'Player '+i,code:host.code})));
  let s=(await call(b,'start',{game:'packed'},host)).state;assert.equal(s.players.length,6);
  const payload=(action,value)=>({game:s.game,round:s.round,stage:s.stage,phaseId:s.phaseId,action,value});
  await Promise.all([host,...others].map((p,i)=>call(i%2?a:b,'action',payload('submit',[0,1,2,3,4]),p)));
  s=(await call(a,'state',undefined,host)).state;assert.equal(s.submitted.length,6);const old=payload('submit',[4,3,2,1,0]);
  await call(b,'action',payload('changeQuestion'),others[0],400);
  const races=await Promise.all([a,b].map(base=>fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+host.token,'X-Room-Code':host.code},body:JSON.stringify(payload('changeQuestion'))})));assert.deepEqual(races.map(r=>r.status).sort(),[200,400]);
  s=(await call(b,'state',undefined,host)).state;assert.equal(s.questionChangesLeft,2);assert.equal(s.submitted.length,0);await call(a,'action',old,others[0],400);
  const c=await worker(),fresh=(await call(c,'state',undefined,others[1])).state;assert.equal(fresh.question,s.question);assert.equal(fresh.questionChangesLeft,2);assert.equal(fresh.proof,undefined);assert.equal(fresh.players.some(p=>p.token),false);
  assert.equal((await call(a,'events',undefined,host)).transport,'poll');
  outage=true;await call(b,'action',payload('changeQuestion'),host,503);outage=false;assert.equal((await call(c,'state',undefined,host)).state.questionChangesLeft,2);
  await call(a,'user/subscription',{userId:'forged-id'},undefined,401);
 }finally{for(const child of workers){child.kill();}redis.closeAllConnections();await new Promise(resolve=>redis.close(resolve));}
});
