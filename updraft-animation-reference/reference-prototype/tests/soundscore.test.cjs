const {test}=require('node:test');
const assert=require('node:assert/strict');
const score=require('../src/soundscore.js');
const audio=require('../src/audio.js');
const config=require('../src/config.js');
test('all five skies produce finite, distinct acoustic profiles',()=>{
 const points=[0,300,700,1100,1500].map(alt=>score.at(alt));
 assert.equal(new Set(points.map(p=>p.name)).size,5);
 assert.equal(new Set(points.map(p=>p.root)).size,5);
 points.forEach(p=>{for(const field of ['root','wind','brightness','pulse','shimmer'])assert.ok(Number.isFinite(p[field]));});
 assert.equal(points[4].name,'Night Orchard');
});
test('score blends smoothly at tier boundaries and clamps invalid altitude',()=>{
 const a=score.at(299.999),b=score.at(300),mid=score.at(500);
 assert.ok(Math.abs(a.root-b.root)<.01);
 assert.ok(mid.root>config.audio.skies[1].root);
 assert.deepEqual(score.at(-55),score.at(0));
 assert.deepEqual(score.at(NaN),score.at(0));
 assert.deepEqual(score.at(1e10),score.at(2000));
});
test('cue palettes include every cinematic, including kind wrong answers and wave',()=>{
 for(const event of ['start','correct','rare','wrong','tier','constellation','wave','landing']){
  const cue=score.cue(event);assert.ok(cue.steps.length>=2);
  assert.ok(cue.level>0&&cue.level<.2);
 }
 assert.equal(score.cue('not-an-event'),null);
});
test('audio is OFF before any user action; pure game rules work without an AudioContext',()=>{
 assert.equal(audio.mode,'off');assert.equal(audio.enabled,false);
 assert.equal(audio.play('correct'),false);
 audio.setAltitude(2000);assert.equal(audio.inspect().tier,'Night Orchard');
 assert.equal(audio.setMode('quiet'),'off'); // Node has no browser audio device.
 assert.equal(audio.mode,'off');
});

test('a flawless route composes a unique, deterministic five-note sky song',()=>{
 const history=['moon','algae','stars','amber','sky'].map(id=>({id,hit:true}));
 const before=JSON.stringify(history);
 const song=score.flightMelody(history);
 assert.equal(song.length,5);
 assert.deepEqual(song,score.flightMelody(history));
 assert.notDeepEqual(song,score.flightMelody(history.map((e,i)=>({...e,id:e.id+i}))));
 assert.equal(score.flightMelody(history.map((e,i)=>({...e,hit:i!==2}))).length,0);
 assert.equal(JSON.stringify(history),before);
});
