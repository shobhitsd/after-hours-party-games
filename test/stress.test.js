import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoom, joinRoom, startGame, act, expected, tick, view, shuffle } from '../engine.js';
import { chooseBotAction } from '../bots.js';
import { games } from '../data.js';

function setup(game,practice=false,n=6){const {room:r,host}=createRoom('STRES','Miso',practice);if(game==='packed')r.selectedGame='packed';if(!practice)for(let i=1;i<n;i++)joinRoom(r,'Player '+i);startGame(r,host.id,game);return r;}
function checkHand(r){if(r.game!=='borrowed')return;for(const hand of r.data.sets){assert.equal(hand.hand.length,12);assert.equal(new Set(hand.hand).size,12);assert.equal(hand.initialHand.length,12);for(const i of hand.removed)assert.equal(hand.hand[i],hand.initialHand[i]);}}

test('practice never skips a completed step, times out, or advances twice',()=>{
 const r=setup('borrowed',true);assert.equal(r.deadline,null);assert.throws(()=>act(r,r.host,'continuePractice'));
 const original=structuredClone(r.data.sets);act(r,r.host,'submit',[2,5,9]);tick(r,r.since+2000);assert.equal(r.practiceReady,true);
 const before=r.phaseId;tick(r,Date.now()+3600000);assert.equal(r.phaseId,before);assert.equal(r.stage,'sabotage');assert.equal(view(r,r.host).expectedCount,2);
 act(r,r.host,'continuePractice');assert.equal(r.stage,'clue');assert.throws(()=>act(r,r.host,'continuePractice'));assert.deepEqual(r.data.sets[1].removed,[2,5,9]);assert.deepEqual(r.data.sets[0].hand,original[0].hand);assert.deepEqual(r.data.sets[1].hand,original[1].hand);
 const mine=view(r,r.host);assert.deepEqual(mine.opponentHand.cards,original[1].hand);assert.deepEqual(mine.opponentHand.removed,[2,5,9]);assert.equal(mine.opponentHand.target,undefined);
});

test('1000 redraws keep twelve unique cards and preserve the exact removed slots',()=>{
 for(let i=0;i<1000;i++){
  const r=setup('borrowed');for(const id of expected(r))act(r,id,'submit',shuffle(Array.from({length:12},(_,i)=>i)).slice(0,3));
  for(const giver of r.data.givers){const before=structuredClone(r.data.sets);act(r,giver,'redraw');checkHand(r);const team=r.data.givers.indexOf(giver);assert.deepEqual(r.data.sets[1-team],before[1-team]);assert.throws(()=>act(r,giver,'redraw'));}
 }
});

test('bots reason from visible clues instead of reading the hidden target',()=>{
 const r=setup('borrowed',true);for(const id of expected(r))act(r,id,'submit',[0,1,2]);act(r,r.host,'continuePractice');for(const id of expected(r))act(r,id,'submit',[3]);act(r,r.host,'continuePractice');
 const guesser=r.players.find(p=>!r.data.givers.includes(p.id));const visible=view(r,guesser.id);visible.board=['Airport','Pizza','Library'];visible.clue=['Cheese','Tomato','Slice'];assert.equal(chooseBotAction(visible),1);
 visible.clue=['Quiet','Book','Shelf'];assert.equal(chooseBotAction(visible),2);
 const twinView={game:'twins',stage:'match',me:'a',word:'Coffee',players:[{id:'a'},{id:'b'},{id:'c'}],clues:{b:'leaves',c:'tracks'}};assert.equal(chooseBotAction(twinView),'b');
});

test('invalid games, repeated actions, names, and late submissions are rejected safely',()=>{
 const {room:r,host}=createRoom('ABCDE','Miso',true);assert.equal(new Set(r.players.map(p=>p.name.toLowerCase())).size,6);
 for(const game of ['__proto__','constructor','toString',{},null,42])assert.throws(()=>startGame(r,host.id,game),/Choose a game/);
 const normal=setup('crowd');normal.deadline=Date.now()-1;assert.throws(()=>act(normal,normal.host,'submit','100'),/Time is up/);assert.equal(Object.keys(normal.actions).length,0);tick(normal);assert.equal(normal.stage,'vote');
});

test('1200 complete randomized games: all roles, player counts, timeouts, redraws, rematches, privacy, and scoring',t=>{
 let rounds=0,actions=0;
 for(const game of Object.keys(games))for(let run=0;run<200;run++){
  const practice=run%2===0;const counts=game==='twins'?[6,8]:game==='borrowed'?[4,6,8]:game==='packed'?[5,6,7,8,9,10]:game==='decoy'?[5,6,7,8]:[4,5,6,7,8];
  const r=setup(game,practice,counts[run%counts.length]);const totals=Object.fromEntries(r.players.map(p=>[p.id,0]));let guard=0;
  while(r.status==='playing'&&guard++<100){
   checkHand(r);
   for(const p of r.players){const visible=JSON.stringify(view(r,p.id));assert.ok(r.players.every(other=>!visible.includes(other.token)));}
   if(r.stage==='reveal'){
    rounds++;for(const p of r.players){totals[p.id]+=r.result.points[p.id];assert.equal(p.score,totals[p.id]);assert.ok(Number.isInteger(p.score*(game==='lone'?2:1))&&p.score>=0);}
    const scores=r.players.map(p=>p.score);tick(r,Date.now()+999999);assert.deepEqual(r.players.map(p=>p.score),scores);act(r,r.host,'next');continue;
   }
   if(r.practiceReady){const phase=r.phaseId;tick(r,Date.now()+999999);assert.equal(r.phaseId,phase);act(r,r.host,'continuePractice');continue;}
   if(r.stage==='talk'){act(r,r.host,'skipTalk');continue;}
   if(r.game==='packed'&&['question','tiers'].includes(r.stage)){tick(r,r.deadline+1);continue;}
   if(!practice&&run%5===1&&r.round%2===0){tick(r,r.deadline+1);continue;}
   for(const id of expected(r).filter(id=>!(id in r.actions))){
    if(r.game==='borrowed'&&r.stage==='clue'&&run%3===0&&!r.data.sets[r.data.givers.indexOf(id)].redrawn)act(r,id,'redraw');
    const answer=chooseBotAction(view(r,id));act(r,id,'submit',answer);actions++;
   }
   if(r.game==='packed'&&!r.practice&&['rank','pick'].includes(r.stage))tick(r,r.deadline+1);
  }
  assert.equal(r.status,'finished',`${game}, run ${run}, stage ${r.stage}`);const phase=r.phaseId;startGame(r,r.host,game);assert.ok(r.phaseId>phase);assert.ok(r.players.every(p=>p.score===0));
 }
 t.diagnostic(`Completed ${Object.keys(games).length*200} games, ${rounds} rounds, ${actions} accepted player actions with no stalled phase or scoring/privacy invariant failure.`);
});
