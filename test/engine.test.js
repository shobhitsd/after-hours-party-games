import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoom, joinRoom, startGame, act, view, tick, expected } from '../engine.js';
import { games, prompts, pairSets, pairHints } from '../data.js';

function setup(game,n=6){const {room,host}=createRoom('ABCDE','Alice');if(game==='packed')room.selectedGame='packed';for(let i=1;i<n;i++)joinRoom(room,'Player '+i);startGame(room,host.id,game);return room;}
function answer(r,id){const d=r.data;
 if(r.game==='packed')return r.stage==='rank'?d.board.map((_,i)=>i):r.players.findIndex(p=>p.id===id)%d.board.length;
 if(r.game==='signals')return r.stage==='clue'?d.suggested:d.boards[id].target;
 if(r.game==='decoy')return r.stage==='clue'?d.suggested:r.stage==='sabotage'?0:d.board.indexOf(d.target);
 if(r.game==='crowd')return r.stage==='tune'?'1000':expected(r).indexOf(id)<d.target;
 if(r.game==='twins')return r.stage==='clue'?'Mystery':d.partners[id];
 if(r.game==='borrowed'){
  const t=d.teams.findIndex(a=>a.includes(id));
  if(r.stage==='sabotage')return [0,1,2];
  if(r.stage==='clue')return r.data.sets[t].hand.map((_,i)=>i).filter(i=>!r.data.sets[t].removed.includes(i)).slice(0,3);
  return d.board.indexOf(d.sets[t].target);
 }
}
function completeRound(r){for(let guard=0;r.stage!=='reveal'&&guard<10;guard++){
 const phase=r.stage;for(const id of expected(r)){assert.equal(r.stage,phase);act(r,id,'submit',answer(r,id));}
 if(r.game==='packed'&&['rank','pick'].includes(r.stage))tick(r,r.deadline+1);
 }assert.equal(r.stage,'reveal');}

for(const game of Object.keys(games))test(`${game}: a full multiplayer game, score, rotation, rematch`,()=>{
 const r=setup(game);const leaders=[];
 for(let i=1;i<=r.total;i++){
  assert.equal(r.round,i);leaders.push(r.game==='borrowed'?r.data.givers:r.data.leader);
  completeRound(r);assert.ok(r.result.rows.length>0);assert.ok(r.players.some(p=>p.score>0));
  const scores=r.players.map(p=>p.score);assert.throws(()=>act(r,r.host,'submit','again'));assert.deepEqual(r.players.map(p=>p.score),scores);
  act(r,r.host,'next');
 }
 assert.equal(r.stage,'finished');assert.equal(r.status,'finished');
 if(['crowd','decoy'].includes(game))assert.equal(new Set(leaders).size,r.players.length);
 if(game==='borrowed')assert.equal(new Set(leaders.flat()).size,r.players.length);
 if(game==='signals')assert.ok(r.players.every(p=>p.score===(r.players.length+1)*5));
 if(game==='twins')assert.ok(r.players.every(p=>p.score===10));
 if(game==='crowd')assert.ok(r.players.every(p=>p.score===3));
 if(game==='borrowed')assert.ok(r.players.every(p=>p.score===3));
 startGame(r,r.host,game);assert.equal(r.round,1);assert.ok(r.players.every(p=>p.score===0));
});
test('private views never expose tokens or other players’ secret words / targets',()=>{
 for(const game of Object.keys(games)){
  const r=setup(game);for(const p of r.players){const v=view(r,p.id);assert.equal('data' in v,false);assert.equal(JSON.stringify(v).includes(p.token),false);assert.ok(v.players.every(x=>!('token' in x)));
   if(game==='signals'&&p.id!==r.host){assert.equal(v.boards,undefined);assert.equal(v.target,undefined);assert.equal(v.board.length,r.options.signalCards);}
   if(game==='decoy'&&v.role==='Guesser'){assert.equal(v.target,undefined);assert.equal(v.hand,undefined);assert.equal(v.board,undefined);}
   if(game==='crowd'&&p.id!==r.host)assert.equal(v.target,undefined);
   if(game==='twins'){assert.equal(v.word,r.data.words[p.id]);assert.equal(v.partners,undefined);assert.equal(v.words,undefined);}
   if(game==='borrowed'){assert.equal(v.target,undefined);assert.equal(v.sets,undefined);if(v.role==='Clue-giver')assert.deepEqual(v.hand,r.data.sets[1-v.team].hand);}
  }
 }
});
test('votes stay private until the reveal, including after reconnecting',()=>{
 const r=setup('crowd');act(r,r.host,'submit','1000');const voters=expected(r);act(r,voters[0],'submit',true);
 assert.equal(view(r,voters[0]).ownAnswer,true);assert.equal(view(r,voters[0]).canAct,false);
 assert.equal(view(r,voters[1]).ownAnswer,undefined);assert.equal(view(r,voters[1]).actions,undefined);assert.equal(view(r,r.host).result,null);
 assert.throws(()=>act(r,voters[0],'submit',false),/already locked/);
});
test('reject invalid input and role impersonation',()=>{
 const r=setup('signals');assert.throws(()=>act(r,r.players[1].id,'submit',0),/not your turn/);assert.throws(()=>act(r,r.host,'submit','two words'),/one word/);
 const word=Object.values(r.data.boards)[0].cards[0];assert.throws(()=>act(r,r.host,'submit',word),/cannot be a word/);
 act(r,r.host,'submit','Connection');assert.throws(()=>act(r,r.players[1].id,'submit',99));assert.throws(()=>act(r,r.players[1].id,'submit',-1));assert.throws(()=>act(r,r.players[1].id,'submit','1'));
 assert.throws(()=>act(r,r.players[1].id,'lobby'),/Only the host/);assert.throws(()=>act(r,r.players[1].id,'next'),/Only the host/);assert.throws(()=>startGame(r,r.players[1].id,'seat'),/Only the host/);
 assert.throws(()=>joinRoom(r,'Late arrival'),/already running/);
});
test('room limits, player names, and even team sizes',()=>{
 const {room,host}=createRoom('ABCD2','Alice');assert.throws(()=>joinRoom(room,'alice'),/taken/);assert.throws(()=>joinRoom(room,''));assert.throws(()=>startGame(room,host.id,'signals'),/needs/);
 for(let i=0;i<6;i++)joinRoom(room,'P'+i);assert.throws(()=>startGame(room,host.id,'twins'),/even/);assert.throws(()=>startGame(room,host.id,'borrowed'),/even/);joinRoom(room,'P7');assert.throws(()=>joinRoom(room,'P8'),/full/);
});
test('mutual pairing is required',()=>{
 const r=setup('twins');for(const p of r.players)act(r,p.id,'submit','Hint');const ids=r.players.map(p=>p.id);for(let i=0;i<ids.length;i++)act(r,ids[i],'submit',ids[(i+1)%ids.length]);assert.ok(r.players.every(p=>p.score===0));
});
test('each saboteur earns two points for each decoy selection',()=>{
 const r=setup('decoy');act(r,r.host,'submit',r.data.suggested);for(const id of r.data.saboteurs)act(r,id,'submit',0);const owner=r.data.saboteurs[0],index=r.data.board.indexOf(r.data.decoys[owner]);const n=expected(r).length;for(const id of expected(r))act(r,id,'submit',index);assert.equal(r.players.find(p=>p.id===owner).score,n*2);assert.equal(r.players.find(p=>p.id===r.host).score,0);
});
test('borrowed words rejects removed cards, limits redraw, and keeps the opponent target secret',()=>{
 const r=setup('borrowed');for(const id of expected(r))act(r,id,'submit',[0,1,2]);const giver=r.data.givers[0];assert.throws(()=>act(r,giver,'submit',[0]),/removed/);assert.throws(()=>act(r,giver,'submit',[3,3]),/different/);assert.throws(()=>act(r,giver,'submit',[3,4,5,6]),/one to three/);
 act(r,giver,'redraw');assert.equal(view(r,giver).redrawn,true);assert.throws(()=>act(r,giver,'redraw'),/used your redraw/);assert.equal(view(r,giver).target,r.data.sets[0].target);assert.equal(view(r,giver).sets,undefined);
});
for(const game of Object.keys(games))test(`${game}: every phase times out without hanging`,()=>{
 const r=setup(game);for(let i=0;i<8&&r.stage!=='reveal';i++)assert.equal(tick(r,r.deadline+1),true);assert.equal(r.stage,'reveal');assert.ok(r.result);assert.ok(r.players.every(p=>Number.isFinite(p.score)));
});
test('practice bots complete all games with the human participating',()=>{
 for(const game of Object.keys(games)){
  const {room:r,host}=createRoom('PRACT','Human',true);startGame(r,host.id,game);
  for(let i=0;i<20&&r.stage!=='reveal';i++){
   if(r.practiceReady){act(r,host.id,'continuePractice');continue;}
   if(expected(r).includes(host.id)&&!(host.id in r.actions))act(r,host.id,'submit',answer(r,host.id));
   tick(r,r.since+2000);
  }assert.equal(r.stage,'reveal',game);
 }
});
test('content has forty unique Crowd Control prompt templates',()=>{assert.equal(prompts.length,40);assert.equal(new Set(prompts.map(p=>p[0])).size,40);assert.ok(prompts.every(p=>p[0].includes('___')));});
test('every supported player count completes a round in every game',()=>{
 for(const [game,g]of Object.entries(games))for(let n=g.min;n<=g.max;n++){
  if(['twins','borrowed'].includes(game)&&n%2)continue;const r=setup(game,n);completeRound(r);assert.equal(r.result.rows.length>0,true,`${game} with ${n} players`);
 }
});
test('all seven receivers get distinct sets of cards',()=>{const r=setup('signals',8);assert.equal(new Set(Object.values(r.data.boards).map(b=>[...b.cards].sort().join(','))).size,7);});
test('every paired word has a legal authored practice clue',()=>{for(const word of pairSets.flat(2)){assert.ok(pairHints[word],word);assert.ok(!pairHints[word].toLowerCase().includes(word.toLowerCase()),word);assert.ok(pairHints[word].length<=35);}});
