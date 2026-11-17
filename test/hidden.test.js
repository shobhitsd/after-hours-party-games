import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {mkdtemp,readFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {PGlite} from '@electric-sql/pglite';
import {puzzles,prompts,validateLibrary} from '../lib/hidden-content.js';
import {newRun,applyMove,publicRun,emptyPlayer,mergeGuest,expire,oneTypo} from '../lib/hidden-engine.js';
import {createHiddenStore} from '../lib/hidden-store.js';
import {createHiddenService} from '../lib/hidden-service.js';
const now=Date.UTC(2026,10,17,12);
const move=(r,action,extra={})=>applyMove(r,{runId:r.id,revision:r.revision,requestId:randomUUID(),action,...extra},now);
const answer=(r,prompt,value)=>move(r,'answer',{prompt,value});
const next=r=>move(r,'next');
const fixture=async()=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'hd-test-'));const file=path.join(dir,'players.json'),store=createHiddenStore({env:{},file});
 let time=now;const service=createHiddenService({store,database:{verifyUser:async t=>{if(t==='invalid')throw Object.assign(new Error('Invalid account'),{status:401});return {id:t};}},now:()=>time,choose:()=>0});
 const client=(token,cookie='a'.repeat(64))=>({req:{headers:{cookie:'hd_guest='+cookie,...(token?{'x-account-token':token}:{})}},res:{setHeader(){}}});
 const call=(c,route,body={})=>service('/api/hidden/'+route,c.req,c.res,{mode:'practice',...(route==='start'?{requestId:randomUUID()}:{}),...body});
 return {store,call,client,file,setTime:v=>time=v};
};

test('starter library: 30 unique puzzles, 406 reviewed entries, lengths, coverage and ten categories',()=>{
 assert.deepEqual(validateLibrary(),[]);assert.equal(puzzles.length,30);assert.equal(prompts.reduce((n,p)=>n+p.answers.length,0),406);
 for(const p of puzzles){assert.equal(p.rounds.length,5);assert.equal(p.rounds.flat().length,10);}
});
test('worked example: all occurrences, one miss, four rounds, exactly 295 points',()=>{
 const r=newRun(puzzles[0],'practice',now);
 for(const [i,[prompt,value,letter]]of [['fruit','Papaya','P'],['country','Chile','E'],['bird','Hornbill','H'],['vegetable','Cucumber','C']].entries()){
  if(i)next(r);answer(r,prompt,value);move(r,'probe',{value:letter});
 }
 assert.equal(publicRun(r).mask,'__CH_ P_CCH_');assert.equal(r.air,5);assert.equal(r.rarity,45);
 move(r,'solve',{value:'  the Machu Picchu  '});assert.equal(r.bonus,250);assert.equal(publicRun(r).score,295);assert.equal(r.status,'solved');
 assert.throws(()=>next(r),/ended/);
});
test('private view never exposes hidden answer, future prompts, dictionary, aliases or scoring authority',()=>{
 const r=newRun(puzzles[0],'practice',now);const v=publicRun(r),json=JSON.stringify(v);
 assert(!json.includes('MACHUPICCHU'));assert(!json.includes('Machu Picchu'));assert(!json.includes('Papaya'));assert(!json.includes('explanation'));assert(!json.includes('canonical'));assert(!json.includes('hd-1-001'));assert.equal(v.prompts.length,2);assert(!('puzzle' in v));
 answer(r,'fruit','Papaya');assert(!JSON.stringify(publicRun(r)).includes('canonical'));
});
test('no zero-round solves, forged prompt/letter, duplicate answer, stale move or double credit',()=>{
 const r=newRun(puzzles[0],'practice',now);assert.throws(()=>move(r,'solve',{value:r.puzzle.answer}),/not available/);
 assert.throws(()=>answer(r,'country','Chile'),/current prompts/);assert.throws(()=>answer(r,'fruit','randomgibberish'),/dictionary/);assert.equal(r.rarity,0);
 const action={runId:r.id,revision:r.revision,requestId:randomUUID(),action:'answer',prompt:'fruit',value:'Papaya'};
 applyMove(r,action,now);applyMove(r,action,now);assert.equal(r.rarity,10);assert.equal(r.revision,1);
 assert.throws(()=>applyMove(r,{...action,value:'Apple'},now),/already used/);
 assert.throws(()=>applyMove(r,{...action,requestId:randomUUID()},now),/Another tab/);
 assert.throws(()=>move(r,'probe',{value:'Z'}),/unused letter/);assert.throws(()=>move(r,'probe',{value:'PA'}),/unused letter/);
 move(r,'probe',{value:'P'});assert.throws(()=>move(r,'probe',{value:'P'}),/not available/);
 next(r);r.puzzle.rounds[1][0]=prompts[0];assert.throws(()=>answer(r,'fruit','papaya'),/already used/);
});
test('aliases, accents, one unambiguous typo, exact short words and ambiguity rejection',()=>{
 const r=newRun(puzzles[0],'practice',now);answer(r,'fruit','Pápaya');assert.equal(r.history[0].answer,'Papaya');
 const typo=newRun(puzzles[0],'practice',now);answer(typo,'fruit','Pappaya');assert.equal(typo.history[0].points,10);
 const alias=newRun(puzzles[0],'practice',now);alias.puzzle.rounds[0][0]=prompts.find(p=>p.id==='vegetable');answer(alias,'vegetable','Courgette');assert.equal(alias.history[0].answer,'Zucchini');
 const ambiguous=newRun(puzzles[0],'practice',now);ambiguous.puzzle.rounds[0][0]={id:'test',title:'Test',answers:[{key:'STONE',word:'Stone',points:5},{key:'STOVE',word:'Stove',points:5}]};assert.throws(()=>answer(ambiguous,'test','STOLE'),/dictionary/);
 const short=newRun(puzzles[0],'practice',now);assert.throws(()=>answer(short,'fruit','Fag'),/dictionary/);
 assert(oneTypo('PAPYA','PAPAYA'));assert(oneTypo('PAPYAA','PAPAYA'));assert(!oneTypo('XXX','PAPAYA'));
});
test('echo, skips and final remaining guesses preserve the exact scoring and Air rules',()=>{
 const r=newRun(puzzles[0],'practice',now);r.tested=['P','E','A','C','H'];answer(r,'fruit','Peach');assert.equal(r.phase,'decision');assert.equal(r.history[0].result,'echo');assert.equal(r.rarity,5);assert.equal(r.air,6);
 next(r);move(r,'skip-answer');assert.equal(r.rarity,5);assert.equal(r.air,6);
 for(let i=2;i<5;i++){next(r);move(r,'skip-answer');}
 assert.equal(r.phase,'decision');move(r,'solve',{value:'Wrong answer'});move(r,'solve',{value:'Wrong again'});assert.equal(r.air,2);assert.equal(r.wrong,2);move(r,'solve',{value:'Wrong last'});assert.equal(r.status,'bust');assert.equal(r.air,0);assert.equal(r.rarity,5);assert.equal(r.bonus,0);
});
test('five misses leave one Air; a wrong final guess floors to zero and keeps banked points',()=>{
 const r=newRun(puzzles[0],'practice',now);
 for(const [i,[prompt,value,letter]]of [['fruit','Jackfruit','J'],['country','Qatar','Q'],['bird','Kiwi','K'],['food','Yak','Y'],['sport','Zebra','Z']].entries()){
  if(i)next(r);r.puzzle.rounds[i][0]={id:prompt,title:prompt,answers:[{key:value.toUpperCase(),word:value,points:20,tier:'Rare'}]};answer(r,prompt,value);move(r,'probe',{value:letter});
 }
 assert.equal(r.air,1);move(r,'solve',{value:'Mount Rainier'});assert.equal(r.air,0);assert.equal(r.rarity,100);assert.equal(r.status,'bust');
});
test('early solve reward exceeds any additional round; terminal and 24-hour expiry are final',()=>{
 const r=newRun(puzzles[0],'practice',now);answer(r,'fruit','Rambutan');move(r,'skip-probe');move(r,'solve',{value:'Machu Picchu'});assert.equal(publicRun(r).score,460);
 const expired=newRun(puzzles[1],'practice',now);expire(expired,now+86400000);assert.equal(expired.status,'expired');assert.throws(()=>move(expired,'skip-answer'),/ended/);
 for(let n=1;n<5;n++){const a=100+120+50*(5-n),b=40+100+120+50*(4-n);assert(a>b);}
});
test('3,000 deterministic stress dives: scores, bounds, phase transitions, immutable snapshots',()=>{
 let seed=17;const rand=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};
 for(let i=0;i<3000;i++){
  const r=newRun(puzzles[i%30],'practice',now);let steps=0;
  while(r.status==='active'&&steps++<35){
   if(r.phase==='answer'){const p=r.puzzle.rounds[r.history.length][rand(2)];const choices=p.answers.filter(a=>!r.history.some(h=>h.key===a.key));if(rand(8)===0)move(r,'skip-answer');else answer(r,p.id,choices[rand(choices.length)].word);}
   else if(r.phase==='probe'){const letters=publicRun(r).available;if(rand(6)===0)move(r,'skip-probe');else move(r,'probe',{value:letters[rand(letters.length)]});}
   else if(rand(3)===0&&r.wrong<3)move(r,'solve',{value:rand(4)===0?r.puzzle.answer:'Wrong answer'});
   else move(r,r.history.length===5?'finish':'next');
   assert(r.air>=0&&r.air<=6);assert(r.wrong<=3);assert(r.history.length<=5);assert.equal(r.rarity,r.history.reduce((s,h)=>s+h.points,0));assert(Number.isInteger(publicRun(r).score));assert(publicRun(r).score<=460);assert.equal(new Set(r.tested).size,r.tested.length);
  }
  assert.notEqual(r.status,'active');assert(r.status==='solved'||r.bonus===0);
 }
 assert.deepEqual(validateLibrary(),[]);
});
test('service: concurrent starts choose once; disk restart resumes; duplicate move credits once',async()=>{
 const f=await fixture(),c=f.client();const responses=await Promise.all(Array.from({length:8},()=>f.call(c,'start')));assert.equal(new Set(responses.map(r=>r.run.id)).size,1);assert.equal(responses[0].remaining,29);
 const run=responses[0].run;const b={runId:run.id,revision:run.revision,requestId:randomUUID(),action:'answer',prompt:'fruit',value:'Papaya'};
 const moves=await Promise.all(Array.from({length:5},()=>f.call(c,'move',b)));assert(moves.every(r=>r.run.score===10));const loaded=await f.call(c,'state');assert.equal(loaded.run.phase,'probe');assert.equal(loaded.run.score,10);
 const restarted=createHiddenService({store:createHiddenStore({env:{},file:f.file}),database:{},now:()=>now});const resumed=await restarted('/api/hidden/state',c.req,c.res,{});assert.equal(resumed.run.id,run.id);assert.equal(resumed.run.score,10);
 await assert.rejects(f.call(c,'move',{...b,requestId:randomUUID()}),/Another tab/);
});
test('daily assignment, UTC rollover, abandoned puzzles remain seen, exhaustion and start retries',async()=>{
 const f=await fixture(),c=f.client('11111111-1111-4111-8111-111111111111');
 const s=await f.call(c,'start',{mode:'daily'});const id=s.run.id;
 let r=await f.call(c,'move',{mode:'daily',runId:id,revision:0,requestId:randomUUID(),action:'abandon'});assert.equal(r.run.status,'abandoned');
 r=await f.call(c,'start',{mode:'daily'});assert.equal(r.run.id,id);
 f.setTime(now+86400000);r=await f.call(c,'start',{mode:'daily'});assert.notEqual(r.run.id,id);assert.equal(r.remaining,28);
 const g=f.client(null,'b'.repeat(64));await assert.rejects(f.call(g,'start',{mode:'daily'}),/Sign in/);
 const startId=randomUUID();r=await f.call(g,'start',{requestId:startId});await f.call(g,'move',{runId:r.run.id,revision:0,requestId:randomUUID(),action:'abandon'});
 const replay=await f.call(g,'start',{requestId:startId});assert.equal(replay.run.id,r.run.id);assert.equal(replay.remaining,29);
 for(let i=1;i<30;i++){r=await f.call(g,'start');r=await f.call(g,'move',{runId:r.run.id,revision:0,requestId:randomUUID(),action:'abandon'});assert.equal(r.remaining,29-i);}
 await assert.rejects(f.call(g,'start'),/every starter puzzle/);assert.equal((await f.call(g,'state')).history.length,20);
});
test('guest claim is atomic, preserves existing daily/active account run, cannot move to second account',async()=>{
 const f=await fixture();const guest=f.client();const before=await f.call(guest,'start');
 const account=f.client('11111111-1111-4111-8111-111111111111');const claimed=await f.call(account,'state');assert.equal(claimed.run.id,before.run.id);
 const other=f.client('22222222-2222-4222-8222-222222222222');assert.equal((await f.call(other,'state')).run,null);
 const a=emptyPlayer(),g=emptyPlayer();a.runs.practice=newRun(puzzles[1],'practice',now);a.runs.daily=newRun(puzzles[2],'daily',now);g.runs.practice=newRun(puzzles[0],'practice',now);g.seen=[puzzles[0].canonical];a.seen=[puzzles[1].canonical,puzzles[2].canonical];const id=a.runs.practice.id,dailyId=a.runs.daily.id;mergeGuest(a,g);assert.equal(a.runs.practice.id,id);assert.equal(a.runs.daily.id,dailyId);assert.equal(a.seen.length,3);assert.equal(a.history[0].status,'abandoned');
});
test('hosted store fails closed without database; no local file fallback on Vercel',async()=>{
 const store=createHiddenStore({env:{VERCEL:'1'},database:{configured:()=>false}});assert.equal(store.local,false);await assert.rejects(store.read('g:'+'a'.repeat(64)),/database connection/);
});
test('Postgres-backed service survives new instances and concurrent guest-to-account claims',async()=>{
 const db=new PGlite();try{
  await db.exec('CREATE ROLE anon;CREATE ROLE authenticated;CREATE ROLE service_role BYPASSRLS;');await db.exec(await readFile(new URL('../supabase/migrations/006_hidden_depths.sql',import.meta.url),'utf8'));
  const database={configured:()=>true,verifyUser:async()=>({id:'11111111-1111-4111-8111-111111111111'}),request:async(endpoint,{body})=>{
   const params=Object.values(body),name=endpoint.split('/')[1];assert(['hd_read','hd_cas','hd_claim'].includes(name));return (await db.query(`SELECT ${name}(${params.map((_,i)=>'$'+(i+1)).join(',')}) AS result`,params.map(p=>typeof p==='object'?JSON.stringify(p):p))).rows[0].result;
  }};
  const service=()=>createHiddenService({store:createHiddenStore({env:{VERCEL:'1'},database}),database,now:()=>now,choose:()=>0});
  const headers={cookie:'hd_guest='+'f'.repeat(64)},req={headers,serverless:true},res={setHeader(){}};
  const first=await service()('/api/hidden/start',req,res,{requestId:randomUUID()});
  const requests=Array.from({length:8},()=>service()('/api/hidden/start',req,res,{requestId:randomUUID()}));const results=await Promise.all(requests);assert(results.every(r=>r.run.id===first.run.id&&r.remaining===29));
  req.headers={...headers,'x-account-token':'test-authenticated-account'};
  const claimed=await Promise.all(Array.from({length:6},()=>service()('/api/hidden/state',req,res,{})));assert(claimed.every(r=>r.run.id===first.run.id&&r.signedIn));
  const otherDevice={headers:{'x-account-token':'test-authenticated-account',cookie:'hd_guest='+'e'.repeat(64)},serverless:true};const resumed=await service()('/api/hidden/state',otherDevice,res,{});assert.equal(resumed.run.id,first.run.id);
 }finally{await db.close();}
});
test('Postgres migration: RLS, CAS conflicts, atomic claims and service-only access',async()=>{
 const db=new PGlite();try{
  await db.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;');await db.exec(await readFile(new URL('../supabase/migrations/006_hidden_depths.sql',import.meta.url),'utf8'));
  const g='g:'+'a'.repeat(64),a='a:11111111-1111-4111-8111-111111111111';
  await db.exec('SET ROLE anon');await assert.rejects(db.query('SELECT hd_read($1)',[g]),/permission denied/);await assert.rejects(db.query('SELECT * FROM hidden_depths_players'),/permission denied/);
  await db.exec('RESET ROLE; SET ROLE authenticated');await assert.rejects(db.query('SELECT hd_cas($1,0,$2)',[g,'{}']),/permission denied/);
  await db.exec('RESET ROLE; SET ROLE service_role');let row=(await db.query('SELECT hd_read($1) AS r',[g])).rows[0].r;assert.equal(row.revision,0);
  await db.query('SELECT hd_read($1)',[a]);const state=emptyPlayer();state.seen=['MACHUPICCHU'];
  assert.equal((await db.query('SELECT hd_cas($1,0,$2) AS ok',[g,JSON.stringify(state)])).rows[0].ok,true);assert.equal((await db.query('SELECT hd_cas($1,0,$2) AS ok',[g,'{}'])).rows[0].ok,false);
  assert.equal((await db.query('SELECT hd_claim($1,$2,1,0,$3) AS ok',[g,a,JSON.stringify(state)])).rows[0].ok,true);
  assert.equal((await db.query('SELECT hd_claim($1,$2,1,0,$3) AS ok',[g,a,JSON.stringify(state)])).rows[0].ok,false);
  assert.equal((await db.query('SELECT hd_cas($1,2,$2) AS ok',[g,'{}'])).rows[0].ok,false);
  row=(await db.query('SELECT hd_read($1) AS r',[g])).rows[0].r;assert.equal(row.state.claim,a);assert.deepEqual(row.state.seen,[]);
  assert.deepEqual((await db.query('SELECT hd_read($1) AS r',[a])).rows[0].r.state.seen,['MACHUPICCHU']);
 }finally{await db.close();}
});
