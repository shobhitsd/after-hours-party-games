import test from 'node:test';
import assert from 'node:assert/strict';
import {createRoom,joinRoom,configureRoom,startGame,act,view,expected} from '../engine.js';
import {associations,decoys} from '../data.js';
import {choicePacks} from '../variety.js';

function room(n=6){const {room:r}=createRoom('WORDS','Host');for(let i=1;i<n;i++)joinRoom(r,`Guest ${i}`);return r;}
test('all Signal Bridge board sizes have unique cards, valid targets, distinct boards, and legal authored clues',()=>{
 for(const size of [6,9,12])for(let run=0;run<100;run++){
  const r=room(8);startGame(r,r.host,'signals',{signalCards:size});
  const signatures=[];for(const b of Object.values(r.data.boards)){assert.equal(b.cards.length,size);assert.equal(new Set(b.cards).size,size);assert.ok(b.cards[b.target]);assert.ok(!b.cards.some(w=>w.toLowerCase()===r.data.suggested.toLowerCase()));signatures.push([...b.cards].sort().join('|'));}
  assert.equal(new Set(signatures).size,7);assert.equal(view(r,r.players[1].id).board.length,size);
 }
 assert.equal(associations.length,24);
});
test('every Decoy board is curated, related, and disjoint from both sabotage hands',()=>{
 assert.equal(decoys.length,12);
 for(const set of decoys){assert.equal(set.related.length,7);assert.equal(set.decoys.length,8);const all=[set.target,...set.related,...set.decoys];assert.equal(new Set(all).size,16,set.target);assert.ok(![set.target,...set.related].some(w=>w.toLowerCase()===set.clue.toLowerCase()));}
 const bee=decoys.find(s=>s.target==='Bee');for(const irrelevant of ['Tent','Bicycle','Rainbow'])assert.ok(!bee.related.includes(irrelevant));assert.ok(bee.related.includes('Wasp'));
 const r=room();startGame(r,r.host,'decoy');const set=decoys.find(s=>s.target===r.data.target);assert.deepEqual([...r.data.board].sort(),[set.target,...set.related].sort());
});
test('all six topics, both limit modes and every player count complete six rounds with fair scoring',()=>{
 for(const pack of ['mixed',...Object.keys(choicePacks)])for(const mode of ['open','mystery'])for(const n of [4,5,6,7,8]){
  const r=room(n);startGame(r,r.host,'seat',{seatPack:pack,seatLimits:mode});const topics=[],questions=[];
  for(let round=1;round<=6;round++){
   const limits=r.data.destinations.map(d=>d.capacity);const before=JSON.stringify(limits);const v=view(r,r.host);topics.push(v.topic);questions.push(v.destinations.map(d=>d.name).join('|'));
   assert.equal(v.destinations.length,4);assert.equal(v.destinations.filter(d=>d.safe).length,1);
   for(let i=0;i<3;i++){const d=v.destinations[i];if(mode==='mystery')assert.equal('capacity' in d,false);else assert.equal(d.capacity,limits[i]);assert.ok(limits[i]>=d.capacityRange[0]&&limits[i]<=d.capacityRange[1]);}
   act(r,r.host,'skipTalk');for(const id of expected(r))act(r,id,'submit',3);assert.equal(r.stage,'reveal');assert.equal(JSON.stringify(r.data.destinations.map(d=>d.capacity)),before);assert.ok(view(r,r.host).destinations.every(d=>Number.isInteger(d.capacity)));
   assert.ok(r.players.every(p=>p.score===(round===6?7:round)));act(r,r.host,'next');
  }
  assert.equal(r.status,'finished');assert.equal(new Set(questions).size,6);if(pack==='mixed')assert.equal(new Set(topics).size,6);
 }
});
test('mystery limits are committed before voting and overbooked choices score zero',()=>{
 const r=room(8);startGame(r,r.host,'seat',{seatLimits:'mystery'});const limit=r.data.destinations[0].capacity;act(r,r.host,'skipTalk');for(const id of expected(r))act(r,id,'submit',0);assert.ok(limit<8);assert.ok(r.players.every(p=>p.score===0));assert.ok(r.result.rows.every(row=>row.extra.includes(`limit ${limit}`)));
});
test('only the host can configure the lobby; invalid options never mutate a room',()=>{
 const r=room();assert.throws(()=>configureRoom(r,r.players[1].id,'seat',{}),/host/);
 for(const options of [{signalCards:100},{seatPack:'__proto__'},{seatLimits:'infinite'},{fake:true},null,[]]){const before=JSON.stringify(r);assert.throws(()=>configureRoom(r,r.host,'seat',options));assert.equal(JSON.stringify(r),before);}
 configureRoom(r,r.host,'signals',{signalCards:12});assert.equal(view(r,r.players[1].id).options.signalCards,12);startGame(r,r.host,'signals');assert.throws(()=>configureRoom(r,r.host,'signals',{}),/lounge/);
});
test('only clue-givers can inspect both hands, and neither view exposes the opponent target',()=>{
 const r=room();startGame(r,r.host,'borrowed');for(const p of r.players){const v=view(r,p.id);if(v.role==='Guesser')assert.equal(v.teamHands,undefined);else {assert.equal(v.teamHands.length,2);assert.ok(v.teamHands.every(h=>!('target' in h)));}}
});
