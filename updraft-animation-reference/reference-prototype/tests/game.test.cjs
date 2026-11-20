const test=require('node:test');
const assert=require('node:assert/strict');
const logic=require('../src/game.js');
const config=require('../src/config.js');
const deck=logic.deckFor('2026-11-17');
test('daily flights are reproducible and have five unique questions',()=>{
 assert.equal(logic.dailySeed(new Date(2026,10,17)),'2026-11-17');
 assert.deepEqual(logic.deckFor('2026-11-17'),deck);
 assert.equal(deck.length,5);
 assert.equal(new Set(deck.map(q=>q.id)).size,5);
});
test('all bank questions have sound options and valid answers',()=>{
 for(const q of logic.BANK){assert.equal(q.choices.length,3);assert.ok(q.correct>=0&&q.correct<3);assert.ok(q.fact);}
});
test('answer changes state and emits event separately from animation',()=>{
 let g=logic.start(logic.createGame(deck));
 const before=g;const hit=logic.answer(g,g.deck[0].correct);
 assert.equal(hit.event.kind,'CORRECT_ANSWER');
 assert.equal(hit.game.altitude,config.game.altitudeGain[0]);
 assert.equal(hit.game.fuel,6);assert.equal(before.altitude,0);
 assert.equal(logic.answer(hit.game,0).event,null); // input locked while cinematic plays
 g=logic.advance(hit.game);assert.equal(g.index,1);assert.equal(g.phase,'playing');
});
test('wrong answers cost fuel, descend safely and cannot go negative',()=>{
 let g=logic.start(logic.createGame(deck));
 for(let i=0;i<3;i++){
  const q=g.deck[g.index];const miss=(q.correct+1)%3;
  const {game,event}=logic.answer(g,miss);
  assert.equal(event.hit,false);
  assert.ok(game.altitude>=0);assert.ok(game.fuel>=0);
  g=logic.advance(game);
 }
 assert.equal(g.fuel,0);assert.equal(g.phase,'end');assert.equal(g.history.length,3);
});
test('five correct answers reach landing, collect postcards and a high sky',()=>{
 let g=logic.start(logic.createGame(deck));
 for(let i=0;i<5;i++){const {game}=logic.answer(g,g.deck[g.index].correct);g=logic.advance(game);}
 assert.equal(g.phase,'end');assert.equal(g.correct,5);
 assert.equal(g.history.length,5);assert.ok(g.altitude>=1500);
});
test('debug values are clamped, tier boundary transitions are correct',()=>{
 let g=logic.createGame(deck);g=logic.debugSet(g,'fuel',-10);
 assert.equal(g.fuel,0);g=logic.debugSet(g,'fuel',100);assert.equal(g.fuel,6);
 assert.equal(logic.getTierIndex(1499),3);assert.equal(logic.getTierIndex(1500),4);
});
test('a daily flight follows a deliberate arc with a rare finale and varied topics',()=>{
 for(const date of ['2026-11-17','2026-11-18','2026-12-01','2027-01-21']){
  const route=logic.deckFor(date);
  assert.deepEqual(route.map(q=>q.rarity),['common','common','uncommon','uncommon','rare']);
  assert.equal(new Set(route.map(q=>q.topic)).size,5);
  assert.equal(new Set(route.map(q=>q.id)).size,5);
 }
 assert.equal(logic.BANK.length,38);
});
