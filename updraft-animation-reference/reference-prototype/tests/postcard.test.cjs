const test=require('node:test');
const assert=require('node:assert/strict');
const postcard=require('../src/postcard.js');
const logic=require('../src/game.js');
const deck=logic.deckFor('2026-11-17');
function run(choices){
 let game=logic.start(logic.createGame(deck));
 for(const hit of choices){
   const q=game.deck[game.index];
   const picked=hit?q.correct:(q.correct+1)%q.choices.length;
   game=logic.advance(logic.answer(game,picked).game);
 }
 return game;
}
test('Sky Mail route points are deterministic, distinct, and never mutate history',()=>{
 const game=run([true,true,true,true,true]);
 const old=JSON.stringify(game.history);
 const a=postcard.pointsFromHistory(game.history);
 assert.deepEqual(a,postcard.pointsFromHistory(game.history));
 assert.equal(a.length,5);assert.equal(new Set(a.map(s=>s.x)).size,5);
 assert.equal(JSON.stringify(game.history),old);
});
test('perfect flight gets a genuine five-star constellation and matching souvenirs',()=>{
 const game=run([true,true,true,true,true]);
 const svg=postcard.buildSvg(game,'NOV 17, 2026');
 assert.match(svg,/data-perfect="true"/);
 assert.match(svg,/class="constellation-path"/);
 assert.equal((svg.match(/r="28"/g)||[]).length,5);
 assert.match(svg,/5\/5 FOUND/);
 assert.match(svg,/2000m HIGH/);
 for(const item of game.history)assert.ok(svg.includes(item.souvenir));
});
test('soft landing gets unlit places, no connected constellation and accurate score',()=>{
 const game=run([false,false,false]);
 const svg=postcard.buildSvg(game,'NOV 17, 2026');
 assert.match(svg,/data-perfect="false"/);
 assert.doesNotMatch(svg,/class="constellation-path"/);
 assert.equal((svg.match(/stroke-dasharray="3 5"/g)||[]).length,3);
 assert.match(svg,/0\/5 FOUND/);
});
test('SVG text is escaped and cannot inject markup',()=>{
 const safe=postcard.buildSvg({peak:0,history:[{id:'abc',hit:true,souvenir:'Moon <script>alert("hi")</script>',icon:'✦'}]},'<unsafe&>');
 assert.ok(safe.includes('&lt;script&gt;'));
 assert.ok(safe.includes('&lt;unsafe&amp;&gt;'));
 assert.ok(!safe.includes('<script>'));
});
