import test from 'node:test';
import assert from 'node:assert/strict';
import {visualEvents,visualSnapshot} from '../visuals/updraft/visual-events.js';
import {createTutorial,tutorialMove} from '../public/updraft-tutorial.js';
import {skyForAltitude} from '../visuals/updraft/cinema-config.js';
import {actingVariant} from '../visuals/updraft/character-acting.js';
test('visual acting varies without immediately repeating, independently of gameplay',()=>{
 for(let previous=0;previous<3;previous++)for(const random of [()=>0,()=>.49,()=>.5,()=>.999]){
  const next=actingVariant(previous,random);assert.notEqual(next,previous);assert.ok(next>=0&&next<3);
 }
});
function frozen(value){Object.freeze(value);for(const child of Object.values(value))if(child&&typeof child==='object')frozen(child);return value;}
test('visual adapter observes confirmed results without modifying the authoritative state',()=>{
 const start=frozen(createTutorial());const answered=frozen(tutorialMove(start,'answer','Papaya','fruit'));
 assert.deepEqual(visualEvents(start,answered,'answer').map(e=>e.kind),['correct']);
 assert.equal(visualEvents(answered,answered,'answer').length,0);
 assert.equal(visualEvents(start,{...answered,id:'another-flight'},'answer').length,0);
 assert.equal(visualEvents(null,answered,'answer').length,0);
 const hit=frozen(tutorialMove(answered,'probe','P'));
 assert.equal(visualEvents(answered,hit,'probe')[0].detail,'hit');
 const miss=frozen(tutorialMove(answered,'probe','Y'));
 assert.deepEqual(visualEvents(answered,miss,'probe').map(e=>e.kind),['wrong']);
 const wrong=frozen(tutorialMove(hit,'solve','not a plane'));
 assert.equal(visualEvents(hit,wrong,'solve')[0].kind,'wrong');
 const solved=frozen(tutorialMove(hit,'solve','paper plane'));
 assert.deepEqual(visualEvents(hit,solved,'solve').map(e=>e.kind),['landing']);
 assert.equal(visualSnapshot(solved).solved,true);
});
test('rare and sky scenes use existing results, skips do not manufacture discoveries',()=>{
 const before=createTutorial();const answered=tutorialMove(before,'answer','Papaya','fruit');
 const rare={...answered,score:35,history:[{...answered.history[0],tier:'Rare'}]};
 assert.deepEqual(visualEvents(before,rare,'answer').map(e=>e.kind),['rare','sky']);
 assert.equal(visualSnapshot(rare).sky,1);
 const skipped=tutorialMove(before,'skip-answer');
 assert.deepEqual(visualEvents(before,skipped,'skip-answer'),[]);
 assert.equal(visualSnapshot(skipped).stitches,0);
 assert.equal(visualSnapshot(answered).stitches,1);
 assert.deepEqual([0,299,300,799,800,1499,1500,2499,2500].map(skyForAltitude),[0,0,1,1,2,2,3,3,4]);
});
