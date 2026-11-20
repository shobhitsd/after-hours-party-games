const {test}=require('node:test');
const assert=require('node:assert/strict');
const {directionFor,finalNote}=require('../src/acting.js');
test('every reaction has a film direction, including a tiny wave',()=>{
 for(const kind of ['correct','rare','wrong','tier','landing','constellation','wave']){
  const direction=directionFor(kind);
  assert.ok(direction.caption.length>14);
  assert.ok(direction.pose.length>2);
 }
});
test('final note is kind for all endings and does not mutate game state',()=>{
 const sample={correct:0,answered:3,total:5};const before=JSON.stringify(sample);
 assert.match(finalNote(sample.correct,sample.answered,sample.total),/detours|shorter story/i);
 assert.match(finalNote(5,5,5),/stars/i);
 assert.match(finalNote(4,5,5),/breeze/i);
 assert.equal(JSON.stringify(sample),before);
});
