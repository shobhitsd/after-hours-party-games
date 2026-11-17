import test from 'node:test';
import assert from 'node:assert/strict';
import {createTutorial,tutorialMove,restoreTutorial} from '../public/updraft-tutorial.js';
test('Updraft tutorial: independent, synchronous teaching example; hits, misses, score and resume',()=>{
 let r=createTutorial();const first=r;r=tutorialMove(r,'answer','Papaya','fruit');assert.equal(first.phase,'answer');r=tutorialMove(r,'probe','P');assert.equal(r.mask,'P_P__ P____');assert.equal(r.air,6);
 r=tutorialMove(r,'next');r=tutorialMove(r,'answer','Piano','instrument');r=tutorialMove(r,'probe','I');assert.equal(r.air,5);assert.equal(r.history[1].result,'miss');
 r=restoreTutorial(JSON.stringify(r));assert.equal(r.phase,'decision');r=tutorialMove(r,'solve','Paper Plane');assert.equal(r.status,'solved');assert.equal(r.score,365);assert.equal(r.mode,'tutorial');assert.throws(()=>tutorialMove(r,'next'),/finished/);
});
test('Updraft tutorial: rejects invalid phases, invalid answers, reused letters and malformed saves',()=>{
 let r=createTutorial();assert.throws(()=>tutorialMove(r,'solve','Paper Plane'),/Finish this step/);assert.throws(()=>tutorialMove(r,'answer','Gibberish','fruit'),/guided example/);r=tutorialMove(r,'answer','Papaya','fruit');assert.throws(()=>tutorialMove(r,'probe','Z'),/unused letter/);assert.equal(restoreTutorial('bad JSON'),null);assert.equal(restoreTutorial('{}'),null);
});
