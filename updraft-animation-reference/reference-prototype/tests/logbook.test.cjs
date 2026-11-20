const {test}=require('node:test');
const assert=require('node:assert/strict');
const atlas=require('../src/logbook.js');
const logic=require('../src/game.js');
const daily='2026-11-17';
function complete(wins){
 let g=logic.start(logic.createGame(logic.deckFor(daily)));
 for(let i=0;i<wins.length;i++){
  const q=g.deck[g.index];
  const result=logic.answer(g,wins[i]?q.correct:(q.correct+1)%3);
  g=logic.advance(result.game);
  if(g.phase==='end')break;
 }
 return g;
}
test('seven daily routes cross month boundaries and leap years without duplicates',()=>{
 assert.deepEqual(atlas.previousDates('2024-03-02',4),['2024-03-02','2024-03-01','2024-02-29','2024-02-28']);
 assert.equal(atlas.previousDates('bogus').length,0);
 assert.equal(atlas.keyFor(new Date(2026,10,17)),'2026-11-17');
});
test('the atlas saves best result and attempts without storing personal data',()=>{
 const weak=complete([false,false,false]);assert.equal(weak.phase,'end');
 const strong=complete([true,true,true,true,true]);assert.equal(strong.phase,'end');
 let log=atlas.record(atlas.empty?.()||atlas.normalize({}),daily,weak);
 assert.equal(log.days[daily].best,0);
 log=atlas.record(log,daily,strong);
 assert.equal(log.days[daily].flights,2);
 assert.equal(log.days[daily].best,5);
 assert.equal(log.days[daily].perfect,true);
 assert.deepEqual(Object.keys(log.days[daily]).sort(),['answered','best','flights','peak','perfect']);
 assert.equal(atlas.summary(log,daily).stars,5);
});
test('rejects unfinished flights and corrupt storage, bounds records',()=>{
 const initial=atlas.normalize('{broken');assert.deepEqual(initial,{version:1,days:{}});
 assert.equal(Object.keys(atlas.record(initial,daily,logic.createGame(logic.deckFor(daily))).days).length,0);
 assert.equal(Object.keys(atlas.normalize({version:1,days:{'2026-02-30':{flights:1,best:5,peak:200,answered:5}}}).days).length,0);
 assert.equal(atlas.previousDates(daily,100).length,31);
});
