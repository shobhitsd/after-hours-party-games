import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const root=new URL('../',import.meta.url),base='http://127.0.0.1:3101';
const child=spawn(process.execPath,['server.js'],{cwd:root,env:{...process.env,PORT:'3101'},windowsHide:true,stdio:['ignore','pipe','pipe']});
let serverOutput='';child.stdout.on('data',data=>serverOutput+=data);child.stderr.on('data',data=>serverOutput+=data);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));const timings=[],watchers=[];let requests=0;
async function call(path,data,auth,expected=200){
 const started=performance.now();const response=await fetch(base+'/api/'+path,{method:data!==undefined?'POST':'GET',headers:{...(data!==undefined?{'Content-Type':'application/json'}:{}),...(auth?{Authorization:'Bearer '+auth.token,'X-Room-Code':auth.code}:{})},...(data!==undefined?{body:JSON.stringify(data)}:{})});
 const body=await response.json();timings.push(performance.now()-started);requests++;assert.equal(response.status,expected,`${path}: ${JSON.stringify(body)}`);return body;
}
async function watch(auth){
 const controller=new AbortController();const response=await fetch(base+'/api/events',{headers:{Authorization:'Bearer '+auth.token,'X-Room-Code':auth.code},signal:controller.signal});assert.equal(response.status,200);
 const watcher={controller,last:null,events:0,ended:false,error:null};watchers.push(watcher);
 watcher.done=(async()=>{try{const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='';while(true){const {done,value}=await reader.read();if(done){watcher.ended=true;break;}buffer+=decoder.decode(value,{stream:true});let end;while((end=buffer.indexOf('\n\n'))>=0){const event=buffer.slice(0,end);buffer=buffer.slice(end+2);if(event.startsWith('data: ')){const state=JSON.parse(event.slice(6));assert.equal(state.me,auth.state.me);assert.ok(state.players.every(p=>!('token' in p)));assert.ok(!event.includes(auth.token));if(watcher.last)assert.ok(state.revision>=watcher.last.revision);watcher.last=state;watcher.events++;}}}}catch(error){if(error.name!=='AbortError')watcher.error=error;}})();return watcher;
}
function payload(state,action,value){return {game:state.game,round:state.round,stage:state.stage,phaseId:state.phaseId,action,value};}
try{
 let ready=false;for(let i=0;i<50;i++){if(child.exitCode!==null)throw new Error(serverOutput);try{const r=await fetch(base+'/api/health');if(r.ok){ready=true;break;}}catch{}await wait(100);}assert.ok(ready,'Test server did not start.');
 const started=performance.now();
 const rooms=await Promise.all(Array.from({length:24},async(_,roomIndex)=>{
  const host=await call('create',{name:`Host ${roomIndex}`});const guests=await Promise.all(Array.from({length:7},(_,i)=>call('join',{code:host.code,name:`Friend ${i}`})));const people=[host,...guests];
  await Promise.all(people.map(watch));return {host,people};
 }));
 // A second tab with the same token must not kick the first stream off.
 const duplicate=await watch(rooms[0].host);
 await Promise.all(rooms.map(async room=>{room.state=(await call('start',{game:'seat'},room.host)).state;}));
 for(let round=1;round<=6;round++){
  await Promise.all(rooms.map(async room=>{
   room.state=(await call('action',payload(room.state,'skipTalk'),room.host)).state;
   const stage=room.state;
   await Promise.all(room.people.map(async auth=>{
    const answers=await Promise.all([200,400].map(async()=>{const response=await fetch(base+'/api/action',{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+auth.token,'X-Room-Code':auth.code},body:JSON.stringify(payload(stage,'submit',3))});requests++;await response.json();return response.status;}));
    assert.deepEqual(answers.sort(),[200,400],'Concurrent duplicate submissions must score only once.');
   }));
   room.state=(await call('state',undefined,room.host)).state;assert.equal(room.state.stage,'reveal');assert.ok(room.state.players.every(p=>p.score===(round===6?7:round)));
   const states=await Promise.all(room.people.map(auth=>call('state',undefined,auth)));for(const {state}of states){assert.equal(state.code,room.host.code);assert.equal(state.phaseId,room.state.phaseId);assert.ok(state.players.every(p=>p.score===(round===6?7:round)));}
   room.state=(await call('action',payload(room.state,'next'),room.host)).state;
  }));
 }
 for(const room of rooms)assert.equal(room.state.status,'finished');
 await wait(100);assert.ok(watchers.every(w=>!w.ended&&!w.error&&w.events>10));assert.equal(duplicate.last.status,'finished');
 // Invalid data and a stale request from before a rematch must fail without corruption.
 await call('create',null,undefined,400);await call('create',[],undefined,400);await call('create',{name:'Bad',practice:true,game:'__proto__'},undefined,400);
 const first=rooms[0],old={...first.state};const restart=(await call('start',{game:'seat'},first.host)).state;assert.ok(restart.phaseId>old.phaseId);await call('action',payload(old,'next'),first.host,400);
 const sorted=timings.sort((a,b)=>a-b);const report={date:new Date().toISOString(),rooms:24,players:192,eventStreams:watchers.length,rounds:144,requests,duplicateSubmissionsRejected:1152,elapsedSeconds:+((performance.now()-started)/1000).toFixed(2),latencyMs:{median:+sorted[Math.floor(sorted.length*.5)].toFixed(2),p95:+sorted[Math.floor(sorted.length*.95)].toFixed(2),max:+sorted.at(-1).toFixed(2)},streamEvents:watchers.reduce((n,w)=>n+w.events,0),result:'passed'};
 await mkdir(new URL('../test-results/',import.meta.url),{recursive:true});await writeFile(new URL('../test-results/load-report.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){console.error(error);console.error(serverOutput);process.exitCode=1;}
finally{for(const watcher of watchers)watcher.controller.abort();await Promise.allSettled(watchers.map(w=>w.done));child.kill();}
