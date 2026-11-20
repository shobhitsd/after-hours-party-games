import test from 'node:test';
import assert from 'node:assert/strict';
import {createTutorial,tutorialMove,restoreTutorial} from '../public/updraft-tutorial.js';
test('Updraft tutorial: independent, synchronous teaching example; hits, misses, score and resume',()=>{
 let r=createTutorial();const first=r;r=tutorialMove(r,'answer','Papaya','fruit');assert.equal(first.phase,'answer');r=tutorialMove(r,'probe','P');assert.equal(r.mask,'P_P__ P____');assert.equal(r.air,6);
 r=tutorialMove(r,'next');r=tutorialMove(r,'answer','Piano','instrument');r=tutorialMove(r,'probe','I');assert.equal(r.air,5);assert.equal(r.history[1].result,'miss');
 r=restoreTutorial(JSON.stringify(r));assert.equal(r.phase,'decision');r=tutorialMove(r,'solve','Paper Plane');assert.equal(r.status,'solved');
 // Papaya 10 + P hit 5 + Piano 5; solve 100 + 5 Fuel x 20 + 3 unused rounds x 60 + first guess 25; the lesson is untimed.
 assert.deepEqual(r.parts,{base:100,fuel:100,rounds:180,swift:0,clean:25,total:405});assert.equal(r.score,425);assert.equal(r.rating.stars,4);assert.equal(r.mode,'tutorial');assert.throws(()=>tutorialMove(r,'next'),/finished/);
});
test('Updraft tutorial: rejects invalid phases, invalid answers, reused letters and malformed saves',()=>{
 let r=createTutorial();assert.throws(()=>tutorialMove(r,'solve','Paper Plane'),/Finish this step/);assert.throws(()=>tutorialMove(r,'answer','Gibberish','fruit'),/guided example/);r=tutorialMove(r,'answer','Papaya','fruit');assert.throws(()=>tutorialMove(r,'probe','Z'),/unused letter/);assert.equal(restoreTutorial('bad JSON'),null);assert.equal(restoreTutorial('{}'),null);
});
test('Updraft tutorial: hints follow the real rules and cost Fuel',()=>{
 let r=createTutorial();assert.deepEqual(r.hint.next,{kind:'clue',cost:1,affordable:true});assert.equal(r.hint.clue,null);
 r=tutorialMove(r,'hint');assert.equal(r.air,5);assert.match(r.hint.clue,/sheet/);assert.equal(r.phase,'answer');
 r=tutorialMove(r,'hint');assert.equal(r.air,3);assert.equal(r.hint.letter,'P');assert.equal(r.mask,'P_P__ P____');assert.equal(r.hint.next,null);
 assert.throws(()=>tutorialMove(r,'hint'),/Both hints/);
 r=tutorialMove(r,'answer','Papaya','fruit');r=tutorialMove(r,'probe','A');assert.equal(r.hitPoints,5);r=tutorialMove(r,'solve','paper plane');
 assert.equal(r.parts.fuel,60);assert.equal(r.score,10+5+100+60+240+25);
 let low=createTutorial();low.air=1;assert.throws(()=>tutorialMove(low,'hint'),/last Fuel/);
});
test('Updraft tutorial: forgiving matching handles typos on answers and solve',()=>{
 let r=createTutorial();
 r=tutorialMove(r,'answer','Papya','fruit');assert.equal(r.history[0].answer,'Papaya');
 r=tutorialMove(r,'probe','P');
 r=tutorialMove(r,'solve','Paper planes');assert.equal(r.status,'solved');
});
