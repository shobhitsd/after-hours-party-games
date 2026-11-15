import assert from 'node:assert/strict';
import http from 'node:http';
import {handleRequest,rooms as liveRooms,broadcast} from '../server.js';
import {tick} from '../engine.js';
import { mkdir, writeFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const base='http://127.0.0.1:3101';
const server=http.createServer(handleRequest);await new Promise(resolve=>server.listen({port:3101,host:'127.0.0.1',backlog:2048},resolve));
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));const timings=[],watchers=[];let requests=0;
let activeRequests=0;const pendingRequests=[];
async function call(path,data,auth,expected=200){
 if(activeRequests>=32)await new Promise(resolve=>pendingRequests.push(resolve));else activeRequests++;
 try{return await send(path,data,auth,expected);}finally{const next=pendingRequests.shift();if(next)next();else activeRequests--;}
}
async function send(path,data,auth,expected){
 const started=performance.now();const response=await fetch(base+'/api/'+path,{method:data!==undefined?'POST':'GET',headers:{...(data!==undefined?{'Content-Type':'application/json'}:{}),...(auth?{Authorization:'Bearer '+auth.token,'X-Room-Code':auth.code}:{})},...(data!==undefined?{body:JSON.stringify(data)}:{})});
 const body=await response.json();timings.push(performance.now()-started);requests++;assert.equal(response.status,expected,`${path}: ${JSON.stringify(body)}`);return body;
}
async function watch(auth){
 const controller=new AbortController();const response=await fetch(base+'/api/events',{headers:{Authorization:'Bearer '+auth.token,'X-Room-Code':auth.code},signal:controller.signal});assert.equal(response.status,200);
 const watcher={controller,last:null,events:0,ended:false,error:null};watchers.push(watcher);
 watcher.done=(async()=>{try{const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='';while(true){const {done,value}=await reader.read();if(done){watcher.ended=true;break;}buffer+=decoder.decode(value,{stream:true});let end;while((end=buffer.indexOf('\n\n'))>=0){const event=buffer.slice(0,end);buffer=buffer.slice(end+2);if(event.startsWith('data: ')){const state=JSON.parse(event.slice(6));assert.equal(state.me,auth.state.me);assert.ok(state.players.every(p=>!('token' in p)));assert.ok(!event.includes(auth.token));if(watcher.last)assert.ok(state.revision>=watcher.last.revision);watcher.last=state;watcher.events++;}}}}catch(error){if(error.name!=='AbortError')watcher.error=error;}})();return watcher;
}
function payload(state,action,value){return {game:state.game,round:state.round,stage:state.stage,phaseId:state.phaseId,action,value};}
function expire(auth){const room=liveRooms.get(auth.code);tick(room,room.deadline+1);broadcast(room);}
try{
 const started=performance.now();
 const rooms=[];for(let roomIndex=0;roomIndex<20;roomIndex++){
  const host=await call('create',{name:`Host ${roomIndex}`,game:'packed',options:{packedRounds:5}});
  const guests=await Promise.all(Array.from({length:9},(_,i)=>call('join',{code:host.code,name:`Friend ${i}`})));
  const people=[host,...guests];await Promise.all(people.map(watch));rooms.push({host,people});
 }
 const duplicate=await watch(rooms[0].host);
 await Promise.all(rooms.map(async room=>{
  room.state=(await call('start',{game:'packed'},room.host)).state;
  const spectator=await call('join',{code:room.host.code,name:'Watcher'});assert.ok(spectator.state.spectator);room.spectator=spectator;await watch(spectator);
 }));
 let duplicates=0;
 for(let round=1;round<=5;round++){
  await Promise.all(rooms.map(async room=>{
   room.state=(await call('state',undefined,room.host)).state;assert.equal(room.state.stage,'rank');const ranking=room.state.board.map((_,i)=>i);
   await Promise.all(room.people.map(async auth=>{
    const old={...payload(room.state,'submit',ranking),requestId:`rank-${round}-initial`};
    await Promise.all([call('action',old,auth),call('action',old,auth)]);duplicates++;
    await call('action',{...payload(room.state,'submit',[...ranking].reverse()),requestId:`rank-${round}-updated`},auth);
    // A delayed retry of the earlier request must not undo the later save.
    const retry=(await call('action',old,auth)).state;assert.deepEqual(retry.ownAnswer,[...ranking].reverse());duplicates++;
   }));
   expire(room.host);room.state=(await call('state',undefined,room.host)).state;assert.equal(room.state.stage,'pick');
   await call('action',payload(room.state,'submit',0),room.spectator,400);
   await Promise.all(room.people.map(async(auth,i)=>{
    await call('action',payload(room.state,'submit',i%6),auth);
    const packet={...payload(room.state,'submit',(i+1)%6),requestId:`pick-${round}-updated`};
    await Promise.all([call('action',packet,auth),call('action',packet,auth)]);duplicates++;
   }));
   const hidden=(await call('state',undefined,room.spectator)).state;assert.ok(hidden.tiers.every(t=>!('capacity' in t)));assert.equal(hidden.ownAnswer,undefined);assert.equal(hidden.proof,undefined);
   expire(room.host);room.state=(await call('state',undefined,room.host)).state;assert.equal(room.state.stage,'reveal');
   const calculated=Object.fromEntries(room.state.players.map(p=>[p.id,0]));
   for(const r of room.state.result.packed.rooms){const entrants=room.people.filter((_,i)=>(i+1)%6===r.id).map(a=>a.state.me);assert.deepEqual([...r.players].sort(),entrants.sort());const each=entrants.length<=r.capacity&&entrants.length?Math.trunc(r.pool/entrants.length):0;assert.equal(r.each,each);for(const id of entrants)calculated[id]=each;}
   assert.deepEqual(room.state.result.points,calculated);
   room.state=(await call('action',payload(room.state,'next'),room.host)).state;
  }));
 }
 for(const room of rooms)assert.equal(room.state.status,'finished');
 await wait(100);assert.ok(watchers.every(w=>!w.ended&&!w.error&&w.events>10));assert.equal(duplicate.last.status,'finished');
 await call('create',null,undefined,400);await call('create',[],undefined,400);await call('create',{name:'Bad',practice:true,game:'__proto__'},undefined,400);
 const first=rooms[0],old={...first.state};const restart=(await call('start',{game:'packed'},first.host)).state;assert.ok(restart.phaseId>old.phaseId);await call('action',payload(old,'next'),first.host,400);
 const sorted=timings.sort((a,b)=>a-b);const report={date:new Date().toISOString(),rooms:20,players:200,spectators:20,eventStreams:watchers.length,maxConcurrentHttpRequests:32,rounds:100,requests,idempotentRetries:duplicates,elapsedSeconds:+((performance.now()-started)/1000).toFixed(2),latencyMs:{median:+sorted[Math.floor(sorted.length*.5)].toFixed(2),p95:+sorted[Math.floor(sorted.length*.95)].toFixed(2),max:+sorted.at(-1).toFixed(2)},streamEvents:watchers.reduce((n,w)=>n+w.events,0),result:'passed',scope:'Local real HTTP/SSE load with controlled phase deadlines; not a production internet capacity benchmark.'};
 await mkdir(new URL('../test-results/',import.meta.url),{recursive:true});await writeFile(new URL('../test-results/load-report.json',import.meta.url),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}catch(error){console.error({requests,streams:watchers.length,listening:server.listening,error});process.exitCode=1;}
finally{for(const watcher of watchers)watcher.controller.abort();await Promise.allSettled(watchers.map(w=>w.done));server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
