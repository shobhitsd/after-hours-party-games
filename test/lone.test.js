import test from 'node:test';
import assert from 'node:assert/strict';
import {createRoom,joinRoom,startGame,act,tick,view,expected,configureRoom} from '../engine.js';
import {scoreLone,loneAwards} from '../lone.js';
import {loneQuestions} from '../lone-content.js';
import {chooseBotAction} from '../bots.js';

function setup(n=6,practice=false){const {room:r,host}=createRoom('LONEX','Host',practice);if(!practice)for(let i=1;i<n;i++)joinRoom(r,'P'+i);startGame(r,host.id,'lone');return r;}
function talk(r){act(r,r.data.leader,'submit',r.data.board.map((_,i)=>i));if(r.practice)act(r,r.host,'continuePractice');assert.equal(r.stage,'talk');}
function pick(r){talk(r);act(r,r.host,'skipTalk');}
function scoring(picks,{ranker=0,reverse=false,final=false,underdog=null,jackpot=0,streaks=[],scores=[]}={}){
 const r=setup(picks.length);r.round=final?r.total:1;r.lone.reverseRound=reverse?r.round:2;r.lone.jackpot=jackpot;
 const ids=r.players.map(p=>p.id),n=picks.length+(final?1:-1);r.data.board=Array.from({length:n},(_,i)=>'Option '+i);r.data.ranking=Array.from({length:n},(_,i)=>i);r.data.leader=ids[ranker];r.data.underdog=underdog;r.data.picks=Object.fromEntries(ids.map((id,i)=>[id,picks[i]]));
 r.players.forEach((p,i)=>{p.score=scores[i]||0;r.lone.stats[p.id].streak=streaks[i]||0;});return {r,ids,result:scoreLone(r)};
}

test('Trust Issues: worked example 1 follows discounts, Underdog and Mastermind',()=>{
 // Option order: Greece, Malta, Switzerland, Paris, India.
 const {result,ids}=scoring([0,3,3,2,4,1],{underdog:4});assert.deepEqual(ids.map(id=>result.points[id]),[4,0,0,3,3,4]);
 assert.equal(result.rows[0].breakdown.discounted,3);assert.equal(result.lone.telemetry.lastManStanding,false);
});
test('Trust Issues: sole survivor and streak cap exclude flat bonuses',()=>{
 const {result,ids}=scoring([0,0,0,1,1,2],{underdog:2,jackpot:6,streaks:[0,0,0,0,0,2]});
 assert.equal(result.points[ids[5]],14);assert.equal(result.rows[5].breakdown.base,6);assert.equal(result.rows[5].breakdown.multiplier,2);assert.equal(result.points[ids[0]],2);
});
test('Trust Issues: half points persist, Ranker discount precedes streak, collisions reset streak despite Mastermind',()=>{
 const a=scoring([0,1,2,3,4,4],{streaks:[1,1,0,0,2,2]});assert.equal(a.result.points[a.ids[0]],5.5);assert.equal(a.result.points[a.ids[1]],6);assert.equal(a.r.lone.stats[a.ids[4]].streak,0);
 const b=scoring([0,0,1,1,2,2],{streaks:[4]});assert.equal(b.result.points[b.ids[0]],2);assert.equal(b.r.lone.stats[b.ids[0]].streak,0);
});
test('Trust Issues: Ranker alone feeds Jackpot; both unique denies lone-survivor bonus',()=>{
 const a=scoring([0,1,1,1,2,2],{jackpot:3});assert.equal(a.r.lone.jackpot,6);assert.equal(a.result.rows[0].breakdown.lms,false);assert.equal(a.result.rows[0].breakdown.jackpot,0);
 const b=scoring([0,1,2,2,3,3],{jackpot:6});assert.equal(b.result.points[b.ids[1]],10);assert.equal(b.result.rows[1].breakdown.multiplier,1);assert.equal(b.r.lone.jackpot,0);
});
test('Trust Issues: dead Jackpot caps at six and reverse payout uses flipped option value',()=>{
 const a=scoring([0,0,1,1,2,2],{jackpot:6});assert.equal(a.r.lone.jackpot,6);
 const b=scoring([0,1,2,3,4,4],{reverse:true,jackpot:6});assert.equal(b.result.rows[3].breakdown.jackpot,6);assert.equal(b.result.rows[1].breakdown.jackpot,0);assert.equal(b.result.lone.options[0].value,1);assert.equal(b.result.lone.options[4].value,5);
});
test('Trust Issues: final extra options, doubled base, reverse and streak keep flats separate',()=>{
 const a=scoring([0,1,2,3,4,5],{final:true,reverse:true,underdog:5,streaks:[0,0,0,0,0,2],jackpot:6});
 assert.equal(a.result.lone.options.length,7);assert.equal(a.result.points[a.ids[5]],32);assert.equal(a.result.rows[5].breakdown.base,24);
 const b=scoring([0,0,1,1,2,2],{final:true,jackpot:3});assert.equal(b.result.lone.finalJackpot.pot,6);assert.equal(b.result.lone.finalJackpot.share,1);assert.equal(b.result.lone.finalJackpot.unpaidRemainder,1);assert.equal(b.result.lone.finalJackpot.players.length,5);assert.equal(b.r.lone.jackpot,0);
});
test('Trust Issues: weighted Rankers never repeat consecutively or exceed two; exactly one secret reverse after round one',()=>{
 for(let n=4;n<=8;n++)for(let run=0;run<40;run++){
  const r=setup(n);let last=null,reverses=0;const counts={};
  while(r.status==='playing'){
   assert.notEqual(r.data.leader,last);last=r.data.leader;counts[last]=(counts[last]||0)+1;assert.ok(counts[last]<=2);
   assert.equal(r.data.board.length,n+(r.round===n?1:-1));assert.equal(new Set(r.data.board).size,r.data.board.length);
   while(r.stage!=='reveal')tick(r,r.deadline+1);
   if(r.result.lone.reverse){assert.ok(r.round>1);reverses++;}act(r,r.host,'next');
  }assert.equal(reverses,1);
 }
});
test('Trust Issues: every prompt supports the largest final and no repeats within one game',()=>{
 assert.ok(loneQuestions.length>=8);for(const [q,choices]of loneQuestions){assert.ok(q.endsWith('?'));assert.equal(choices.length,9);assert.equal(new Set(choices).size,9);}
 const r=setup(8),seen=new Set();while(r.status==='playing'){assert.ok(!seen.has(r.data.question));seen.add(r.data.question);while(r.stage!=='reveal')tick(r,r.deadline+1);act(r,r.host,'next');}assert.equal(seen.size,8);
});
test('Trust Issues: real Pick timer does not skip, timeout fills missing picks and ranking',()=>{
 const r=setup();pick(r);for(const id of expected(r))act(r,id,'submit',0);assert.equal(r.stage,'pick');tick(r,r.deadline-1);assert.equal(r.stage,'pick');tick(r,r.deadline+1);assert.equal(r.stage,'reveal');assert.ok(r.result.rows.every(x=>!x.correct));
 const q=setup();while(q.stage!=='reveal')tick(q,q.deadline+1);assert.equal(q.data.autoPicks.length,6);assert.equal(q.data.autoRank,true);assert.equal(new Set(q.data.ranking).size,5);
});
test('Trust Issues: spy sees one final pick; regular picks and secrets stay private through reload views',()=>{
 const r=setup(),[a,b,c]=r.players.map(p=>p.id);talk(r);act(r,a,'spyTarget',b);act(r,r.host,'skipTalk');
 assert.throws(()=>act(r,a,'submit',0),/not your turn/);act(r,b,'submit',3);
 for(const p of r.players){const v=view(r,p.id);assert.equal(v.reverseRound,undefined);assert.equal(v.underdog,undefined);assert.equal(v.picks,undefined);assert.equal(v.spyPlayers[0].target,undefined);if(p.id!==r.data.leader)assert.equal(v.ranking,undefined);if(p.id!==b)assert.equal(v.ownAnswer,undefined);}
 assert.equal(view(r,a).spy.peek,undefined);tick(r,r.deadline+1);assert.equal(r.stage,'spy');assert.equal(view(r,a).spy.peek,3);assert.equal(view(r,c).spy,null);assert.equal(view(r,b).canAct,false);
 assert.throws(()=>act(r,b,'submit',1));act(r,a,'submit',3);assert.equal(r.stage,'reveal');assert.equal(r.result.rows.find(p=>p.id===a).correct,false);assert.equal(r.lone.stats[a].spyAvailable,false);
});
test('Trust Issues: spy chains, cycles and all-spy rounds refund both ends and never leak unfinished picks',()=>{
 for(const targets of [[1,2,null,null,null,null],[1,0,null,null,null,null],[1,2,3,4,5,0]]){
  const r=setup(),ids=r.players.map(p=>p.id);talk(r);targets.forEach((target,i)=>{if(target!==null)act(r,ids[i],'spyTarget',ids[target]);});act(r,r.host,'skipTalk');tick(r,r.deadline+1);assert.equal(r.stage,'spy');
  for(const id of Object.keys(r.data.spies)){assert.equal(r.data.spies[id].refunded,true);assert.equal(view(r,id).spy.peek,undefined);assert.equal(r.lone.stats[id].spyAvailable,true);assert.equal(view(r,id).canAct,true);}
  tick(r,r.deadline+1);assert.equal(r.stage,'reveal');assert.equal(Object.keys(r.data.picks).length,6);
 }
});
test('Trust Issues: reveal-target opt-in, late/invalid/duplicate actions and strict rank validation',()=>{
 const r=setup(),[a,b]=r.players.map(p=>p.id),leader=r.data.leader;
 for(const ranking of [[0,0,1,2,3],[0,1],[-1,0,1,2,3],[0,1,2,3,99],null])assert.throws(()=>act(r,leader,'submit',ranking));
 talk(r);assert.throws(()=>act(r,a,'spyTarget',a));act(r,a,'spyTarget',b);assert.throws(()=>act(r,a,'spyTarget',b));act(r,a,'revealSpy');assert.equal(view(r,b).spyPlayers[0].target,b);assert.throws(()=>act(r,a,'revealSpy'));
 act(r,r.host,'skipTalk');act(r,b,'submit',0);assert.throws(()=>act(r,b,'spyTarget',a));assert.throws(()=>act(r,b,'submit',1));r.deadline=Date.now()-1;assert.throws(()=>act(r,leader,'claim',{first:0,message:'late'}));assert.throws(()=>act(r,r.players[2].id,'submit',2));
});
test('Trust Issues: claims, beliefs and awards measure recorded truth rather than reverse values',()=>{
 const {r,ids}=scoring([0,3,3,2,4,1]);r.data.claim={first:3,message:'My favourite'};r.data.beliefs={[ids[1]]:'believe',[ids[3]]:'doubt'};r.lone.reverseRound=1;
 scoreLone(r);assert.equal(r.lone.stats[ids[1]].sucker,1);assert.equal(r.lone.stats[ids[3]].detective,1);const awards=loneAwards(r);assert.equal(awards.length,6);assert.ok(awards.find(a=>a.title==='The Detective').winners.includes(ids[3]));
 const q=setup();talk(q);const other=q.players.find(p=>p.id!==q.data.leader).id;assert.throws(()=>act(q,other,'claim',{first:0,message:'fake'}));assert.throws(()=>act(q,q.data.leader,'claim',{first:0,message:'x'.repeat(161)}));act(q,q.data.leader,'claim',{first:0,message:'Truth'});assert.equal(view(q,other).claim.message,'Truth');
});
test('Trust Issues: custom settings enforce durations, Underdog extremes, and nonmutating validation',()=>{
 const {room:r,host}=createRoom('OPTSX','Host',true);configureRoom(r,host.id,'lone',{loneRankSeconds:10,loneTalkSeconds:15,lonePickSeconds:90,loneSpySeconds:5,loneUnderdogChance:100});
 const before=structuredClone(r.options);assert.throws(()=>configureRoom(r,host.id,'lone',{loneSpySeconds:0}));assert.deepEqual(r.options,before);assert.throws(()=>configureRoom(r,host.id,'lone',{loneUnderdogChance:101}));
 startGame(r,host.id,'lone');assert.notEqual(r.data.underdog,null);assert.equal(r.deadline,null);
 const q=setup();act(q,q.host,'lobby');configureRoom(q,q.host,'lone',{loneUnderdogChance:0,loneRankSeconds:10,loneTalkSeconds:15,lonePickSeconds:90,loneSpySeconds:5});startGame(q,q.host,'lone');assert.equal(q.deadline-q.since,10000);assert.equal(q.data.underdog,null);talk(q);assert.equal(q.deadline-q.since,15000);act(q,q.host,'skipTalk');assert.equal(q.deadline-q.since,90000);
});
test('Trust Issues: practice bots use only filtered information and every phase can finish without countdowns',()=>{
 for(let run=0;run<25;run++){
  const r=setup(6,true);let guard=0;
  while(r.status==='playing'&&guard++<100){
   assert.equal(r.deadline,null);
   if(r.stage==='reveal'){act(r,r.host,'next');continue;}
   if(r.practiceReady){const phase=r.phaseId;tick(r,Date.now()+999999);assert.equal(r.phaseId,phase);act(r,r.host,'continuePractice');continue;}
   if(r.stage==='talk'){tick(r,r.since+2000);tick(r,r.since+3000);act(r,r.host,'skipTalk');continue;}
   if(view(r,r.host).canAct)act(r,r.host,'submit',chooseBotAction(view(r,r.host)));tick(r,r.since+2000);
  }
  assert.equal(r.stage,'finished');assert.equal(view(r,r.host).awards.length,6);startGame(r,r.host,'lone');assert.equal(r.lone.jackpot,0);assert.ok(Object.values(r.lone.stats).every(s=>s.spyAvailable&&s.unique===0));
 }
});
