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
test('only the host can configure the lobby; invalid options never mutate a room',()=>{
 const r=room();assert.throws(()=>configureRoom(r,r.players[1].id,'packed',{}),/host/);
 for(const options of [{signalCards:100},{packedRounds:100},{packedPack:'__proto__'},{fake:true},null,[]]){const before=JSON.stringify(r);assert.throws(()=>configureRoom(r,r.host,'packed',options));assert.equal(JSON.stringify(r),before);}
 configureRoom(r,r.host,'signals',{signalCards:12});assert.equal(view(r,r.players[1].id).options.signalCards,12);startGame(r,r.host,'signals');assert.throws(()=>configureRoom(r,r.host,'signals',{}),/lounge/);
});
test('only clue-givers can inspect both hands, and neither view exposes the opponent target',()=>{
 const r=room();startGame(r,r.host,'borrowed');for(const p of r.players){const v=view(r,p.id);if(v.role==='Guesser')assert.equal(v.teamHands,undefined);else {assert.equal(v.teamHands.length,2);assert.ok(v.teamHands.every(h=>!('target' in h)));}}
});
