import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createRoom,joinRoom,configureRoom,startGame,act,tick,view,expected,setPresence,takeSeat} from '../engine.js';
import {aggregateRankings,roomPayout,packedStandings} from '../packed.js';
import {packedTemplates,packedPools,packedQuestions} from '../packed-content.js';
import {proofText,sha256,verifyProof} from '../public/packed-proof.js';
import {games} from '../data.js';
const clone=x=>structuredClone(x);
const permutation=k=>Array.from({length:k},(_,i)=>i).sort(()=>Math.random()-.5);
function setup(n=6,options={},practice=false){const {room:r,host}=createRoom('PACKD','Host',practice);configureRoom(r,host.id,'packed',options);if(!practice)for(let i=1;i<n;i++)joinRoom(r,'Player '+i);startGame(r,host.id,'packed');return r;}
function advance(r){if(r.practice)act(r,r.host,'continuePractice');else tick(r,r.deadline+1);}
function ranked(r){for(const id of expected(r))act(r,id,'submit',r.data.board.map((_,i)=>i));advance(r);}
function picking(r){ranked(r);}

test('Three question changes are shared, host-only, ranking-only, reset each round and clear all drafts',()=>{
 const r=setup(),seen=new Set([r.data.question]);
 assert.throws(()=>act(r,r.players[1].id,'changeQuestion'),/host/);
 for(let i=0;i<3;i++){for(const p of r.players)act(r,p.id,'submit',[0,1,2,3,4]);const old={round:r.round,phase:r.phaseId,hash:r.data.commitment,scores:r.players.map(p=>p.score)};act(r,r.host,'changeQuestion');assert.equal(r.round,old.round);assert.ok(r.phaseId>old.phase);assert.notEqual(r.data.commitment,old.hash);assert.deepEqual(r.players.map(p=>p.score),old.scores);assert.deepEqual(r.actions,{});assert.ok(!seen.has(r.data.question));seen.add(r.data.question);assert.equal(view(r,r.host).questionChangesLeft,2-i);}
 assert.throws(()=>act(r,r.host,'changeQuestion'),/three/);ranked(r);assert.throws(()=>act(r,r.host,'changeQuestion'),/ranking/);advance(r);act(r,r.host,'next');assert.equal(view(r,r.host).questionChangesLeft,3);
 r.deadline=Date.now()-1;assert.throws(()=>act(r,r.host,'changeQuestion'),/Time is up/);
});

test('Question changes refill a small custom deck without repeats within a round, including practice',()=>{
 const custom=Array.from({length:5},(_,i)=>({question:'Custom '+i,options:['A','B','C','D','E','F']}));
 for(const practice of [false,true]){const r=setup(6,{packedRounds:5,packedPack:'custom',packedCustom:custom},practice);for(let round=1;round<=5;round++){const seen=new Set([r.data.question]);for(let i=0;i<3;i++){act(r,r.host,'changeQuestion');assert.equal(r.practiceReady,false);assert.ok(!seen.has(r.data.question));seen.add(r.data.question);}for(const id of expected(r))act(r,id,'submit',[0,1,2,3,4]);advance(r);for(const id of expected(r))act(r,id,'submit',0);advance(r);act(r,r.host,'next');}assert.equal(r.status,'finished');}
});

test('Packed House has exactly three steps with choices open throughout discussion',()=>{
 const r=setup();assert.equal(r.stage,'rank');assert.ok(r.deadline-r.since===30000);assert.ok(verifyProof(r.data.proof,r.data.commitment));
 const commitment=r.data.commitment;for(const p of r.players)act(r,p.id,'submit',[0,1,2,3,4]);assert.equal(r.stage,'rank');
 advance(r);assert.equal(r.stage,'pick');assert.equal(r.deadline-r.since,65000);assert.equal(r.data.commitment,commitment);
 for(const p of r.players)act(r,p.id,'submit',0);assert.equal(r.stage,'pick');act(r,r.host,'submit',1);assert.equal(r.actions[r.host],1);
 assert.throws(()=>act(r,r.host,'skipTalk'));assert.equal(r.stage,'pick');advance(r);assert.equal(r.stage,'reveal');assert.equal(r.history.length,1);
 act(r,r.host,'next');assert.equal(r.stage,'rank');assert.notEqual(r.data.commitment,commitment);
});

test('Packed House replaces both old titles and validates exact templates and averages',()=>{
 assert.equal(Object.keys(games).length,6);assert.equal(games.lone,undefined);assert.equal(games.seat,undefined);assert.equal(games.packed.max,10);
 for(const [n,ceilings]of Object.entries(packedTemplates)){assert.equal(ceilings.length,+n>=9?6:5);assert.equal(ceilings.reduce((sum,c)=>sum+(c+1)/2,0),+n===5?7.5:+n+2);ceilings.forEach((c,i)=>{assert.ok(c>=1);if(i){assert.ok(c<=ceilings[i-1]);assert.ok(packedPools[i]<=packedPools[i-1]);}});}
 assert.ok(packedQuestions.length>=10);
});
test('Packed House Borda worked ballots match the rules document',()=>{
 const ballots=[[0,1,2,3,4],[1,0,3,2,4],[0,2,1,4,3],[2,0,1,3,4],[1,3,0,2,4],[0,1,3,2,4]];
 const a=aggregateRankings([0,1,2,3,4],ballots,[0,1,2,3,4]);assert.deepEqual(a.map(x=>x.total),[26,24,18,15,7]);assert.equal(a.reduce((sum,x)=>sum+x.total,0),90);
});
test('Packed House tie cascade: firsts precede random order; no ballots and one ballot',()=>{
 const ids=[0,1,2,3,4],tie=[2,3,1,4,0],ballots=[ids,ids,ids,[...ids].reverse(),[...ids].reverse(),[...ids].reverse()];
 const tied=aggregateRankings(ids,ballots,tie);assert.deepEqual(tied.map(x=>x.id),[4,0,2,3,1]);assert.ok(tied.every(x=>x.total===18));
 assert.deepEqual(aggregateRankings(ids,[],tie).map(x=>x.id),tie);assert.deepEqual(aggregateRankings(ids,[ids],tie).map(x=>x.id),ids);
 const example=aggregateRankings(ids,[[1,0,3,2,4],[3,4,0,2,1],[2,4,1,0,3],[0,3,2,1,4]],tie);for(let i=1;i<example.length;i++){const a=example[i-1],b=example[i];if(a.total===b.total&&a.first===b.first)assert.ok(a.last<=b.last);}
});
test('Packed House 10000 aggregation fuzz cases: conservation and ordering invariance',()=>{
 for(let i=0;i<10000;i++){const k=i%2?5:6,n=5+i%6,ids=Array.from({length:k},(_,j)=>j),tie=permutation(k),ballots=Array.from({length:n},()=>permutation(k)),a=aggregateRankings(ids,ballots,tie);assert.equal(a.reduce((sum,x)=>sum+x.total,0),n*k*(k+1)/2);assert.deepEqual(a,aggregateRankings([...ids].reverse(),[...ballots].reverse(),tie));assert.equal(new Set(a.map(x=>x.id)).size,k);}
});
test('Packed House portable SHA-256 matches Node; valid proofs and edited fields',()=>{
 for(const text of ['', 'abc','Blue 💙','x'.repeat(1000)])assert.equal(sha256(text),createHash('sha256').update(text).digest('hex'));
 for(let i=0;i<300;i++){const r=setup(5+i%6),p=r.data.proof;assert.equal(p.nonce.length,64);assert.equal(sha256(proofText(p)),r.data.commitment);assert.ok(verifyProof(p,r.data.commitment));
  for(const key of ['roundId','version','seatedCount','capacities','tieOrder','nonce']){const q=clone(p);if(Array.isArray(q[key]))q[key][0]+=10;else if(typeof q[key]==='number')q[key]++;else q[key]+='x';assert.equal(verifyProof(q,r.data.commitment),false,key);}
 }
});
test('Packed House last valid rank/pick wins, identical retries are harmless, invalid replacements preserve state',()=>{
 const r=setup();const id=r.host,k=r.data.board.length,a=permutation(k),b=[...a].reverse();act(r,id,'submit',a,'request-one');act(r,id,'submit',b,'request-two');const revision=r.revision;act(r,id,'submit',a,'request-one');assert.equal(r.revision,revision);assert.deepEqual(r.actions[id],b);
 for(const bad of [null,[],[0,0,1,2,3],[0,1,2,3,99],'0,1,2,3,4']){assert.throws(()=>act(r,id,'submit',bad));assert.deepEqual(r.actions[id],b);}
 act(r,id,'submit',a);advance(r);act(r,id,'submit',0);act(r,id,'submit',1);assert.equal(r.actions[id],1);assert.throws(()=>act(r,id,'submit',99));assert.equal(r.actions[id],1);
 r.deadline=Date.now()-1;assert.throws(()=>act(r,id,'submit',2),/Time is up/);assert.equal(r.actions[id],1);
});
test('Packed House privacy in every pre-reveal phase includes spectators and duplicate views',()=>{
 const r=setup(),spectator=joinRoom(r,'Watcher');assert.equal(r.players.length,6);assert.equal(r.spectators.length,1);
 while(r.stage!=='reveal'){
  for(const id of expected(r))act(r,id,'submit',r.stage==='rank'?permutation(r.data.board.length):1);
  for(const p of [...r.players,spectator]){const v=view(r,p.id),text=JSON.stringify(v);assert.ok(!text.includes(r.data.proof.nonce));assert.equal(v.proof,undefined);assert.equal(v.rankings,undefined);assert.equal(v.picks,undefined);assert.equal(v.tieOrder,undefined);assert.ok(v.tiers.every(t=>!('capacity' in t)));for(const player of r.players)assert.ok(!text.includes(player.token));if(p===spectator){assert.equal(v.canAct,false);assert.equal(v.ownAnswer,undefined);assert.throws(()=>act(r,p.id,'submit',0));}}
  advance(r);
 }assert.ok(verifyProof(view(r,spectator.id).result.packed.proof,r.data.commitment));assert.equal(view(r,r.host).result.packed.rankings.length,6);
});
test('Packed House no ranking, no pick, unclaimed pools and zero rounds',()=>{
 const r=setup();const tie=[...r.data.proof.tieOrder];while(r.stage!=='reveal')advance(r);assert.deepEqual(r.data.tiers.map(t=>t.id),tie);assert.ok(r.players.every(p=>p.score===0));assert.ok(r.result.packed.rooms.every(t=>t.status==='empty'&&t.lost===t.pool));assert.ok(Object.values(r.packedStats).every(s=>s.zero===1));
});
test('Packed House paused exit cannot freeze another game; retained spectators have safe views',()=>{
 const r=setup(),watcher=joinRoom(r,'Watcher');for(const p of r.players.slice(3))setPresence(r,p.id,false);assert.ok(r.paused);act(r,r.host,'lobby');assert.equal(r.paused,null);
 for(const game of ['signals','decoy','crowd','twins','borrowed']){startGame(r,r.host,game);const v=view(r,watcher.id);assert.equal(v.role,'Spectator');assert.equal(v.canAct,false);assert.equal(v.board,undefined);assert.equal(v.target,undefined);assert.equal(v.word,undefined);assert.equal(tick(r,r.deadline+1),true);act(r,r.host,'lobby');}
});
test('Packed House exact fit, overfull, rounding, and optional Soft Landing',()=>{
 assert.deepEqual(roomPayout(10,3,3),{each:3,awarded:9,lost:1,remainder:1,status:'fits'});assert.equal(roomPayout(8,3,3).remainder,2);assert.equal(roomPayout(10,4,4).each,2);assert.equal(roomPayout(12,4,1).each,12);
 assert.equal(roomPayout(10,3,4).each,0);assert.equal(roomPayout(10,3,4,true).each,1);assert.equal(roomPayout(10,3,5,true).each,0);
 for(const n of [5,6,7,8,9,10]){const r=setup(n);picking(r);for(const p of r.players)act(r,p.id,'submit',0);advance(r);assert.ok(r.players.every(p=>p.score===0));}
});
test('Packed House all legal per-room splits lose only the three documented remainders',()=>{
 const losses=new Set();for(const ceilings of Object.values(packedTemplates))ceilings.forEach((max,i)=>{for(let n=1;n<=max;n++){const a=roomPayout(packedPools[i],max,n);if(a.remainder)losses.add(`${packedPools[i]}/${n}`);}});assert.deepEqual([...losses].sort(),['10/3','10/4','8/3']);
});
test('Packed House away rules: no seat for an away pick, fixed template, reconnect restores eligibility',()=>{
 const r=setup(7);picking(r);const p=r.players[1];act(r,p.id,'submit',0);setPresence(r,p.id,false);assert.equal(view(r,p.id).canAct,false);assert.equal(r.seatedCount,7);assert.equal(r.data.proof.capacities.length,5);advance(r);assert.equal(r.result.points[p.id],0);assert.equal(r.result.rows.find(x=>x.id===p.id).answer,'No pick');
 act(r,r.host,'next');setPresence(r,p.id,true);act(r,p.id,'submit',[0,1,2,3,4]);assert.ok(r.actions[p.id]);
});
test('Packed House quorum pause freezes timer, resumes remaining time, and times out without scoring an unfinished round',()=>{
 const r=setup(6);const original=r.deadline,now=Date.now();for(const p of r.players.slice(3))setPresence(r,p.id,false,now);assert.ok(r.paused);assert.equal(r.deadline,null);assert.throws(()=>act(r,r.host,'submit',[0,1,2,3,4]),/paused/);
 setPresence(r,r.players[3].id,true,now+10000);assert.equal(r.paused,null);assert.equal(r.deadline,original+10000);
 setPresence(r,r.players[3].id,false,now+10001);tick(r,now+130002);assert.equal(r.status,'finished');assert.equal(r.history.length,0);assert.ok(r.players.every(p=>p.score===0));assert.match(r.endedEarly,/two minutes/);
});
test('Packed House host migration, late spectators, explicit end and lobby seats',()=>{
 const r=setup();r.players.forEach((p,i)=>setPresence(r,p.id,true,100+i));const previous=r.host;setPresence(r,previous,false,200);assert.equal(r.host,r.players[1].id);assert.throws(()=>act(r,previous,'lobby'),/host/);
 const watcher=joinRoom(r,'Watcher');assert.throws(()=>act(r,watcher.id,'submit',0));assert.throws(()=>takeSeat(r,watcher.id));for(const p of r.players.slice(3))setPresence(r,p.id,false,201);assert.ok(r.paused);act(r,r.host,'endPacked');assert.equal(r.status,'finished');act(r,r.host,'lobby');takeSeat(r,watcher.id);assert.equal(r.players.length,7);
});
test('Packed House anonymous ballots have no identity; scoring-round ties and shared wins',()=>{
 const r=setup(6,{packedAnonymous:true});picking(r);for(const p of r.players)act(r,p.id,'submit',r.players.indexOf(p)%5);advance(r);assert.ok(r.result.packed.rankings.every(b=>Object.keys(b).join()==='ranking'));
 r.players.forEach(p=>p.score=0);const [a,b]=r.players;a.score=b.score=20;r.packedStats[a.id]={scored:2,zero:3};r.packedStats[b.id]={scored:3,zero:2};assert.equal(packedStandings(r)[0].id,b.id);assert.deepEqual(view(r,a.id).winners,[b.id]);r.packedStats[a.id]={scored:3,zero:2};assert.equal(view(r,a.id).winners.length,2);
});
test('Packed House custom packs and settings validate before any game state is changed',()=>{
 const {room:r,host}=createRoom('PACKD','Host',true);configureRoom(r,host.id,'packed',{packedPack:'custom'});const snapshot=JSON.stringify(r);assert.throws(()=>startGame(r,host.id,'packed'),/different custom question/);assert.equal(JSON.stringify(r),snapshot);
 const custom=Array.from({length:5},(_,i)=>({question:'Question '+i,options:['A','B','C','D','E','F']}));configureRoom(r,host.id,'packed',{packedRounds:5,packedPack:'custom',packedCustom:custom});startGame(r,host.id,'packed');assert.equal(r.total,5);
 for(const opts of [{packedRounds:4},{packedRankSeconds:9},{packedPickSeconds:121},{packedPickSeconds:'20'},{packedAnonymous:'true'},{packedSoftLanding:1},{packedPack:'__proto__'},{packedCustom:[{question:'Bad',options:['A','A','B','C','D']}]}]){const q=createRoom('CHECK','Host').room;const before=JSON.stringify(q);assert.throws(()=>configureRoom(q,q.host,'packed',opts));assert.equal(JSON.stringify(q),before);}
});
test('Packed House 1000 full games with skipped/replaced submissions, away players and integer scoring',t=>{
 let rounds=0;for(let run=0;run<1000;run++){const r=setup(5+run%6,{packedRounds:5+run%6,packedAnonymous:run%2===0,packedSoftLanding:run%3===0});let guard=0;const totals=Object.fromEntries(r.players.map(p=>[p.id,0]));
  while(r.status==='playing'&&guard++<100){if(r.stage==='reveal'){rounds++;for(const p of r.players){totals[p.id]+=r.result.points[p.id];assert.equal(totals[p.id],p.score);assert.ok(Number.isInteger(p.score)&&p.score>=0);assert.equal(r.packedStats[p.id].scored+r.packedStats[p.id].zero,r.history.length);}assert.ok(verifyProof(r.result.packed.proof,r.data.commitment));act(r,r.host,'next');continue;}
   if(['rank','pick'].includes(r.stage)){for(const p of r.players){if(p.id!==r.host)setPresence(r,p.id,r.players.indexOf(p)<4||Math.random()>.3);if(p.connected!==false&&Math.random()>.18){const value=r.stage==='rank'?permutation(r.data.board.length):Math.floor(Math.random()*r.data.board.length);act(r,p.id,'submit',value);if(Math.random()<.2)act(r,p.id,'submit',value);}}}advance(r);
  }assert.equal(r.status,'finished');
 }t.diagnostic(`Completed 1000 Packed House games and ${rounds} rounds.`);
});
