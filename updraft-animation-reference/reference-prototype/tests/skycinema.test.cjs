const test=require('node:test');
const assert=require('node:assert/strict');
const c=require('../src/skycinema.js');
test('weather only depends on altitude and stays within known ranges',()=>{
 for(const alt of [-100,0,420,700,1000,1330,2000,99999]){
  const p=c.profile(alt);
  assert.ok(p.kite>=0&&p.kite<=1);
  assert.ok(p.light>=0&&p.light<=1);
  assert.ok(p.near>=0&&p.near<=57);
  assert.ok(p.far>=0&&p.far<=23);
  assert.deepEqual(c.profile(alt),p);
 }
 assert.equal(c.profile(0).kite,0);
 assert.equal(c.profile(800).kite,1);
 assert.equal(c.profile(1500).kite,0);
});
test('camera shot directions map to kind reactions, not game outcomes',()=>{
 assert.equal(c.shot('correct').name,'rise');
 assert.equal(c.shot('wrong').name,'dip');
 assert.equal(c.shot('tier').name,'reveal');
 assert.equal(c.shot('landing').name,'settle');
 assert.equal(c.shot('unknown').name,'still');
 assert.equal(c.shot('correct').direction,1);
 assert.equal(c.shot('wrong').direction,-1);
});
test('visual profiles and shots are frozen, side-effect-free values',()=>{
 assert.ok(Object.isFrozen(c.profile(720)));
 assert.ok(Object.isFrozen(c.shot('rare')));
 assert.ok(Object.isFrozen(c));
});
