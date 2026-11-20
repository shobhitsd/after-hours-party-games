import test from 'node:test';
import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {mkdtemp,readFile,readdir} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {PGlite} from '@electric-sql/pglite';
import {puzzles,prompts,promptById,validateLibrary,roundsFrom,dealRounds,isTrivia,bankStats,normalize} from '../lib/hidden-content.js';
import {newRun,applyMove,publicRun,emptyPlayer,mergeGuest,expire,oneTypo,matchAnswer,total,recordFlight,statsView} from '../lib/hidden-engine.js';
import {createHiddenStore} from '../lib/hidden-store.js';
import {createHiddenService} from '../lib/hidden-service.js';
import {RULES,quickBonus,swiftBonus,solveParts,rating,pilotRank} from '../public/updraft-rules.js';
const now=Date.UTC(2026,10,17,12),DAY=86400000;
const CLASSIC=['fruit','animal','country','instrument','bird','flower','vegetable','food','sport','color'];
// A flight with the ten original prompts in a fixed order: [fruit|animal] [country|instrument] [bird|flower] [vegetable|food] [sport|color].
const classic=(index=0)=>({...puzzles[index],rounds:roundsFrom(CLASSIC)});
const move=(r,action,extra={},at=now)=>applyMove(r,{runId:r.id,revision:r.revision,requestId:randomUUID(),action,...extra},at);
const answer=(r,prompt,value,at)=>move(r,'answer',{prompt,value},at);
const next=(r,at)=>move(r,'next',{},at);
const points=(id,word)=>matchAnswer(promptById(id),word).points;
const fixture=async(options={})=>{
 const dir=await mkdtemp(path.join(os.tmpdir(),'hd-test-'));const file=path.join(dir,'players.json'),store=createHiddenStore({env:{},file});
 let time=now;const service=createHiddenService({store,database:{verifyUser:async t=>{if(t==='invalid')throw Object.assign(new Error('Invalid account'),{status:401});return {id:t};}},now:()=>time,choose:()=>0,...options});
 const client=(token,cookie='a'.repeat(64))=>({req:{headers:{cookie:'hd_guest='+cookie,...(token?{'x-account-token':token}:{})}},res:{setHeader(){}}});
 const call=(c,route,body={})=>service('/api/hidden/'+route,c.req,c.res,{mode:'practice',...(route==='start'?{requestId:randomUUID()}:{}),...body});
 return {store,call,client,file,setTime:v=>time=v};
};

test('library: 300+ mysteries, 100+ prompts, tens of thousands of validated answers',async()=>{
 assert.deepEqual(validateLibrary(),[]);
 assert(puzzles.length>=300,`${puzzles.length} puzzles`);assert(prompts.length>=100,`${prompts.length} prompts`);assert(bankStats.answers>=25000,`${bankStats.answers} answers`);
 assert(promptById('animal').answers.length>=500);assert(promptById('color').answers.length>=200);
 for(const id of ['bollywood_movie','nba_player','cricketer','hollywood_movie','pokemon'])assert(promptById(id).answers.length>=150,id);
 // Every category file is in the generated index, and nothing else is.
 const files=(await readdir(new URL('../lib/updraft-bank/',import.meta.url))).filter(n=>n.endsWith('.js')&&n!=='index.js').map(n=>n.slice(0,-3)).sort();
 assert.deepEqual(prompts.map(p=>p.id).sort(),files);
 assert.deepEqual(puzzles.slice(0,30).map(p=>p.id),Array.from({length:30},(_,i)=>'hd-1-'+String(i+1).padStart(3,'0')));
 assert.equal(puzzles[0].canonical,'MACHUPICCHU');
});
test('dealing: five everyday/specialist pairs, ten distinct prompts, every hidden letter reachable',()=>{
 let seed=7;const choose=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};
 const used=new Set();
 for(const puzzle of puzzles){
  const rounds=dealRounds(puzzle,choose),ids=rounds.flat().map(p=>p.id);
  assert.equal(rounds.length,5);assert.equal(new Set(ids).size,10);
  for(const pair of rounds){assert.equal(pair.filter(p=>isTrivia(p.id)).length,1);for(const p of pair){assert.deepEqual(Object.keys(p),['id','title','icon','note']);used.add(p.id);}}
  for(const letter of new Set(puzzle.canonical))assert(ids.filter(id=>promptById(id).answers.some(a=>a.points<40&&a.key.includes(letter))).length>=2,`${puzzle.id} ${letter}`);
 }
 assert(used.size>=prompts.length*.9,'nearly every prompt is dealt across the library');
 // A constant chooser is still a legal, repeatable deal.
 assert.deepEqual(dealRounds(puzzles[0],()=>0),dealRounds(puzzles[0],()=>0));
});
test('saved flights reference prompts instead of copying the answer bank',()=>{
 const r=newRun(puzzles[0],'practice',now,()=>0);
 assert(JSON.stringify(r).length<6000);assert(!JSON.stringify(r).includes('"answers"'));
 const prompt=r.puzzle.rounds[0][0],word=promptById(prompt.id).answers[0].word;answer(r,prompt.id,word);assert.equal(r.history[0].answer,word);
});
test('worked example: every point itemised and reproducible from the rules',()=>{
 const r=newRun(classic(),'practice',now);let t=now;
 for(const [i,[prompt,value,letter]]of [['fruit','Papaya','P'],['country','Chile','E'],['bird','Hornbill','H'],['vegetable','Cucumber','C']].entries()){
  if(i)next(r,t+=2000);answer(r,prompt,value,t+=5000);move(r,'probe',{value:letter},t+=3000);
 }
 const rarity=points('fruit','Papaya')+points('country','Chile')+points('bird','Hornbill')+points('vegetable','Cucumber');
 assert.equal(publicRun(r,t).mask,'__CH_ P_CCH_');assert.equal(r.air,5);assert.equal(r.rarity,rarity);
 assert.equal(r.quick,40,'four answers inside ten seconds');assert.equal(r.hitPoints,15,'P, H and C hit; E missed');
 move(r,'solve',{value:'  the Machu Picchu  '},t+=4000);
 // 4 answers x (5s+3s) + 3 x 2s + 4s = 42s of play: full swift bonus.
 assert.deepEqual(r.parts,{base:100,fuel:100,rounds:60,swift:60,clean:25,total:345});assert.equal(r.active,42000);
 const view=publicRun(r,t);assert.equal(view.score,rarity+40+15+345);assert.equal(view.score,view.rarity+view.quick+view.hitPoints+view.bonus);
 assert.equal(view.rating.stars,rating('solved',view.score).stars);assert.equal(r.status,'solved');assert.equal(view.timing.activeSeconds,42);
 assert.throws(()=>next(r),/ended/);
});
test('quick-answer and swift bonuses follow the server clock, cap idle time and never penalise',()=>{
 assert.deepEqual([0,10000,10001,20000,20001,30000,30001,-5,NaN].map(quickBonus),[10,10,6,6,3,3,0,0,0]);
 assert.deepEqual([0,60000,180000,300000,900000].map(swiftBonus),[60,60,30,0,0]);
 for(const [delay,bonus] of [[9000,10],[15000,6],[29000,3],[31000,0]]){const r=newRun(classic(),'practice',now);answer(r,'fruit','Apple',now+delay);assert.equal(r.quick,bonus);assert.equal(r.history[0].quick,bonus);}
 // A rejected answer does not restart the quick window.
 const slow=newRun(classic(),'practice',now);assert.throws(()=>answer(slow,'fruit','zzzzzz',now+1000),/dictionary/);answer(slow,'fruit','Apple',now+25000);assert.equal(slow.quick,3);
 // The window restarts when the next round is dealt, not when the previous one ended.
 move(slow,'skip-probe',{},now+26000);next(slow,now+200000);answer(slow,'country','India',now+204000);assert.equal(slow.history[1].quick,10);
 // Leaving a flight open overnight counts as one capped pause, so a swift bonus is still possible.
 const idle=newRun(classic(),'practice',now);answer(idle,'fruit','Apple',now+5000);move(idle,'skip-probe',{},now+6000);move(idle,'solve',{value:'Machu Picchu'},now+6000+20*3600000);
 assert.equal(idle.active,6000+RULES.idleCapMs);assert.equal(idle.parts.swift,swiftBonus(6000+RULES.idleCapMs));assert(idle.parts.swift>0);
 // A failed move records no time.
 const fresh=newRun(classic(),'practice',now);assert.throws(()=>move(fresh,'solve',{value:'x'},now+50000),/not available/);assert.equal(fresh.active,0);assert.equal(fresh.clock,now);
});
test('hints: a clue for 1 Fuel, then a letter for 2; never the last Fuel; nothing leaks before purchase',()=>{
 const r=newRun(classic(),'practice',now);let view=publicRun(r,now);
 assert.deepEqual(view.hint,{used:0,clue:null,letter:null,next:{kind:'clue',cost:1,affordable:true}});assert(!JSON.stringify(view).includes(puzzles[0].hint));
 move(r,'hint');view=publicRun(r,now);assert.equal(r.air,5);assert.equal(view.hint.clue,puzzles[0].hint);assert.deepEqual(view.hint.next,{kind:'letter',cost:2,affordable:true});assert.equal(view.phase,'answer');
 // MACHU PICCHU: C appears four times, so it is the letter revealed.
 move(r,'hint');view=publicRun(r,now);assert.equal(r.air,3);assert.equal(view.hint.letter,'C');assert.equal(view.mask,'__C__ __CC__');assert.equal(view.hint.next,null);assert.deepEqual(r.tested,['C']);
 assert.throws(()=>move(r,'hint'),/Both hints/);assert.equal(r.air,3);
 const low=newRun(classic(),'practice',now);low.air=1;assert.throws(()=>move(low,'hint'),/last Fuel/);assert.equal(publicRun(low,now).hint.next.affordable,false);
 low.air=2;move(low,'hint');assert.equal(low.air,1);assert.throws(()=>move(low,'hint'),/last Fuel/);
 // A hint letter that was the answer's only launchable letter turns the probe into an echo.
 const probe=newRun(classic(),'practice',now);probe.hints=[{kind:'clue',cost:1}];probe.tested=[...'MAHUPI'];
 probe.puzzle.rounds[0][0]={id:'test',title:'Test',answers:[{key:'CCC',word:'Ccc',points:5,tier:'Common'}]};answer(probe,'test','Ccc');assert.equal(probe.phase,'probe');
 move(probe,'hint');assert.equal(probe.phase,'decision');assert.equal(probe.history[0].result,'echo');
 // Hints cost Fuel, which is exactly what a solve pays for; the first-guess bonus is unaffected.
 const solved=newRun(classic(),'practice',now);move(solved,'hint');answer(solved,'fruit','Apple');move(solved,'skip-probe');move(solved,'solve',{value:'Machu Picchu'});
 assert.equal(solved.parts.fuel,100);assert.equal(solved.parts.clean,25);
 assert.throws(()=>move(solved,'hint'),/ended/);
});
test('private view never exposes hidden answer, future prompts, dictionary, aliases or scoring authority',()=>{
 const r=newRun(classic(),'practice',now);const v=publicRun(r,now),json=JSON.stringify(v);
 assert(!json.includes('MACHUPICCHU'));assert(!json.includes('Machu Picchu'));assert(!json.includes('Papaya'));assert(!json.includes('explanation'));assert(!json.includes('canonical'));assert(!json.includes('hd-1-001'));assert(!json.includes('Urubamba'));
 assert.equal(v.prompts.length,2);assert.deepEqual(v.prompts.map(p=>p.id),['fruit','animal']);assert(v.prompts.every(p=>p.icon&&p.title));assert(!('puzzle' in v));
 answer(r,'fruit','Papaya');const after=JSON.stringify(publicRun(r,now));assert(!after.includes('canonical'));assert(!after.includes('"key"'));assert(!after.includes('variants'));
});
test('no zero-round solves, forged prompt/letter, duplicate answer, stale move or double credit',()=>{
 const r=newRun(classic(),'practice',now);assert.throws(()=>move(r,'solve',{value:r.puzzle.answer}),/not available/);
 assert.throws(()=>answer(r,'country','Chile'),/current prompts/);assert.throws(()=>answer(r,'fruit','randomgibberish'),/dictionary/);assert.equal(r.rarity,0);
 const action={runId:r.id,revision:r.revision,requestId:randomUUID(),action:'answer',prompt:'fruit',value:'Papaya'};
 applyMove(r,action,now);applyMove(r,action,now);assert.equal(r.rarity,points('fruit','Papaya'));assert.equal(r.quick,10);assert.equal(r.revision,1);
 assert.throws(()=>applyMove(r,{...action,value:'Apple'},now),/already used/);
 assert.throws(()=>applyMove(r,{...action,requestId:randomUUID()},now),/Another tab/);
 assert.throws(()=>move(r,'probe',{value:'Z'}),/unused letter/);assert.throws(()=>move(r,'probe',{value:'PA'}),/unused letter/);
 move(r,'probe',{value:'P'});assert.throws(()=>move(r,'probe',{value:'P'}),/not available/);
 next(r);r.puzzle.rounds[1][0]=promptById('fruit');assert.throws(()=>answer(r,'fruit','papaya'),/already used/);
});
test('forgiving matching: accents, aliases, a leading "The", plurals, one unambiguous typo; exact short words',()=>{
 const r=newRun(classic(),'practice',now);answer(r,'fruit','Pápaya');assert.equal(r.history[0].answer,'Papaya');
 const typo=newRun(classic(),'practice',now);assert.throws(()=>answer(typo,'fruit','Pappaya'),{code:'ANSWER_CONFIRMATION_REQUIRED',suggestion:{word:'Papaya'}});assert.equal(typo.history.length,0);answer(typo,'fruit','Papaya');assert.equal(typo.history[0].answer,'Papaya');
 assert.equal(matchAnswer(promptById('vegetable'),'Courgette').word,'Zucchini');assert.equal(matchAnswer(promptById('vegetable'),'aubergine').word,matchAnswer(promptById('vegetable'),'Eggplant').word);
 assert.equal(matchAnswer(promptById('fruit'),'apples').word,'Apple');assert.equal(matchAnswer(promptById('fruit'),'CHERRIES').word,'Cherry');assert.equal(matchAnswer(promptById('fruit'),'  the mango ').word,'Mango');
 assert.equal(matchAnswer(promptById('country'),'usa').word,matchAnswer(promptById('country'),'United States').word);
 // Specialist prompts: nicknames and unique surnames resolve to the listed person.
 assert.equal(matchAnswer(promptById('nba_player'),'lebron').word,'LeBron James');assert.equal(matchAnswer(promptById('nba_player'),'Nowitzki').word,'Dirk Nowitzki');
 assert.equal(matchAnswer(promptById('bollywood_movie'),'ddlj').word,'Dilwale Dulhania Le Jayenge');assert.equal(matchAnswer(promptById('bollywood_movie'),'three idiots').word,'3 Idiots');
 const ambiguous=newRun(classic(),'practice',now);ambiguous.puzzle.rounds[0][0]={id:'test',title:'Test',answers:[{key:'STONE',word:'Stone',points:5},{key:'STOVE',word:'Stove',points:5}]};assert.throws(()=>answer(ambiguous,'test','STOLE'),/dictionary/);
 const short=newRun(classic(),'practice',now);assert.throws(()=>answer(short,'fruit','Fag'),/dictionary/);assert.throws(()=>answer(short,'fruit','12345'),/dictionary/);assert.throws(()=>answer(short,'fruit','?!'),/letters or digits/);
 // Digit-only titles are real answers; with no letters to launch they bank as an echo.
 assert.equal(matchAnswer(promptById('book'),'1984').word,'Nineteen Eighty-Four');
 const digits=newRun(classic(),'practice',now);digits.puzzle.rounds[0][0]={id:'test',title:'Test',answers:[{key:'1917',word:'1917',points:10,tier:'Uncommon',aliases:[]}]};answer(digits,'test','1917');assert.equal(digits.history[0].result,'echo');assert.equal(digits.phase,'decision');assert.equal(digits.rarity,10);
 assert(oneTypo('PAPYA','PAPAYA'));assert(oneTypo('PAPYAA','PAPAYA'));assert(!oneTypo('XXX','PAPAYA'));
 assert.equal(normalize('Tom & Jerry'),'TOMANDJERRY');assert.equal(normalize('3 Idiots'),'3IDIOTS');assert.equal(normalize('Pokémon'),'POKEMON');
 // Symbols that are spoken: C++, C#, Disney+; a free-standing "+" reads as "and".
 assert.deepEqual(['C++','C#','Disney+','Dan + Shay'].map(normalize),['CPLUSPLUS','CSHARP','DISNEYPLUS','DANANDSHAY']);
 const code=promptById('programming_language');
 assert.deepEqual(['C','c++','C#','F#','r','cpp'].map(v=>matchAnswer(code,v).word),['C language','C Plus Plus','C Sharp','F Sharp','R language','C Plus Plus']);
 assert.equal(matchAnswer(promptById('band'),'Florence and the Machine').word,matchAnswer(promptById('band'),'Florence + the Machine').word);
 assert.equal(matchAnswer(promptById('fruit'),'watermellons').word,'Watermelon');
 assert.equal(matchAnswer(promptById('animal'),'elefant').word,'Elephant');
 assert.equal(matchAnswer(promptById('vegetable'),'brocolli').word,'Broccoli');
 assert.equal(matchAnswer(promptById('drink'),'cappucino').word,'Cappuccino');
 assert.equal(matchAnswer(promptById('fruit'),'avacado').word,'Avocado');
});
test('typo confirmation: Miami suggestion is read-only; canonical resubmit is validated, timed and idempotent',()=>{
 const r=newRun(classic(),'practice',now);r.puzzle.rounds[0][0]=promptById('city');
 const before=structuredClone(r);
 assert.throws(()=>answer(r,'city','maimi',now+9000),{status:422,code:'ANSWER_CONFIRMATION_REQUIRED',suggestion:{word:'Miami'}});
 assert.deepEqual(r,before,'no score, Fuel, revision, history, clock or receipt changes before Yes');
 assert.throws(()=>move(r,'answer',{prompt:'city',value:'maimi',confirmed:true},now+11000),{code:'ANSWER_CONFIRMATION_REQUIRED'});
 const yes={runId:r.id,revision:r.revision,requestId:randomUUID(),action:'answer',prompt:'city',value:'Miami'};
 applyMove(r,yes,now+15000);assert.equal(r.history[0].answer,'Miami');assert.equal(r.quick,6,'confirmation does not reset the quick window');
 const confirmed=structuredClone(r);applyMove(r,yes,now+18000);assert.deepEqual(r,confirmed,'retries cannot award twice');
 assert.throws(()=>applyMove(r,{...yes,requestId:randomUUID()},now+18000),{status:409});
});

test('service: a suggested answer is not persisted until the canonical answer is confirmed',async()=>{
 const puzzle=classic();puzzle.rounds[0][0]=promptById('city');
 const f=await fixture({library:[puzzle]}),c=f.client();const initial=await f.call(c,'start');
 const body={runId:initial.run.id,revision:initial.run.revision,requestId:randomUUID(),action:'answer',prompt:'city',value:'maimi'};
 await assert.rejects(f.call(c,'move',body),{code:'ANSWER_CONFIRMATION_REQUIRED',suggestion:{word:'Miami'}});
 assert.deepEqual((await f.call(c,'state')).run,initial.run);
 const confirmed=await f.call(c,'move',{...body,requestId:randomUUID(),value:'Miami'});assert.equal(confirmed.run.history[0].answer,'Miami');assert.equal(confirmed.run.revision,1);
});

test('echo, skips and final remaining guesses preserve the exact scoring and Fuel rules',()=>{
 const r=newRun(classic(),'practice',now);r.tested=['P','E','A','C','H'];answer(r,'fruit','Peach');assert.equal(r.phase,'decision');assert.equal(r.history[0].result,'echo');assert.equal(r.rarity,points('fruit','Peach'));assert.equal(r.air,6);
 next(r);move(r,'skip-answer');assert.equal(r.rarity,points('fruit','Peach'));assert.equal(r.air,6);
 for(let i=2;i<5;i++){next(r);move(r,'skip-answer');}
 const banked=total(r);
 assert.equal(r.phase,'decision');move(r,'solve',{value:'Wrong answer'});move(r,'solve',{value:'Wrong again'});assert.equal(r.air,2);assert.equal(r.wrong,2);move(r,'solve',{value:'Wrong last'});assert.equal(r.status,'bust');assert.equal(r.air,0);assert.equal(total(r),banked);assert.equal(r.bonus,0);assert.equal(r.parts,null);
 // A second-guess solve keeps everything except the first-guess bonus.
 const second=newRun(classic(),'practice',now);answer(second,'fruit','Apple');move(second,'skip-probe');move(second,'solve',{value:'Nope'});move(second,'solve',{value:'Machu Picchu'});
 assert.deepEqual(second.parts,solveParts({air:4,rounds:1,wrong:1,activeMs:0}));assert.equal(second.parts.clean,0);
 const fuzzySolve=newRun(classic(),'practice',now);answer(fuzzySolve,'fruit','Apple');move(fuzzySolve,'skip-probe');
 const before=structuredClone(fuzzySolve);assert.throws(()=>move(fuzzySolve,'solve',{value:'Machu Pichu'}),{code:'ANSWER_CONFIRMATION_REQUIRED',suggestion:{word:'Machu Picchu'}});assert.deepEqual(fuzzySolve,before);
 move(fuzzySolve,'solve',{value:'Machu Picchu'});assert.equal(fuzzySolve.status,'solved');
});
test('five misses leave one Fuel; a wrong final guess floors to zero and keeps banked points',()=>{
 const r=newRun(classic(),'practice',now);
 for(const [i,[prompt,value,letter]]of [['fruit','Jackfruit','J'],['country','Qatar','Q'],['bird','Kiwi','K'],['food','Yak','Y'],['sport','Zebra','Z']].entries()){
  if(i)next(r);r.puzzle.rounds[i][0]={id:prompt,title:prompt,answers:[{key:value.toUpperCase(),word:value,points:20,tier:'Rare'}]};answer(r,prompt,value);move(r,'probe',{value:letter});
 }
 assert.equal(r.air,1);assert.equal(r.hitPoints,0);move(r,'solve',{value:'Mount Rainier'});assert.equal(r.air,0);assert.equal(r.rarity,100);assert.equal(r.status,'bust');assert.equal(total(r),150);
});
test('scoring shape: the documented maximum is reachable, and solving now beats any extra round',()=>{
 const r=newRun(classic(),'practice',now);r.puzzle.rounds[0][0]={id:'test',title:'Test',answers:[{key:'MMM',word:'Mmm',points:40,tier:'Deep cut'}]};
 answer(r,'test','Mmm');move(r,'probe',{value:'M'});move(r,'solve',{value:'Machu Picchu'});assert.equal(publicRun(r,now).score,RULES.maxScore);assert.equal(publicRun(r,now).rating.stars,5);
 assert(RULES.perRound>RULES.tiers['Deep cut']+RULES.quick[0][1]+RULES.hit,'an unused round is worth more than the best possible round');
 const expired=newRun(classic(1),'practice',now);expire(expired,now+DAY);assert.equal(expired.status,'expired');assert.throws(()=>move(expired,'skip-answer'),/ended/);
 assert.deepEqual([rating('solved',600).stars,rating('solved',450).stars,rating('solved',300).stars,rating('solved',299).stars,rating('bust',80).stars,rating('abandoned',0).stars],[5,4,3,2,1,0]);
});
test('3,000 deterministic stress flights: itemised scores, bounds, phase transitions, hints and clocks',()=>{
 let seed=17;const rand=n=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed%n;};
 for(let i=0;i<3000;i++){
  let t=now;const r=newRun(puzzles[i%puzzles.length],'practice',t,rand);let steps=0;
  while(r.status==='active'&&steps++<45){
   t+=rand(40000);
   const offer=publicRun(r,t).hint.next;
   if(rand(12)===0&&offer?.affordable){const air=r.air;move(r,'hint',{},t);assert.equal(r.air,air-offer.cost);}
   else if(r.phase==='answer'){const ref=r.puzzle.rounds[r.history.length][rand(2)],p=promptById(ref.id);const choices=p.answers.filter(a=>!r.history.some(h=>h.key===a.key||h.variants?.some(v=>[a.key,...a.aliases].includes(v))));if(rand(8)===0)move(r,'skip-answer',{},t);else answer(r,p.id,choices[rand(choices.length)].word,t);}
   else if(r.phase==='probe'){const letters=publicRun(r,t).available;assert(letters.length>0);if(rand(6)===0)move(r,'skip-probe',{},t);else move(r,'probe',{value:letters[rand(letters.length)]},t);}
   else if(rand(3)===0&&r.wrong<3)move(r,'solve',{value:rand(4)===0?r.puzzle.answer:'Wrong answer'},t);
   else move(r,r.history.length===5?'finish':'next',{},t);
   const view=publicRun(r,t);
   assert(r.air>=0&&r.air<=6);assert(r.wrong<=3);assert(r.history.length<=5);assert(r.hints.length<=2);
   assert.equal(r.rarity,r.history.reduce((s,h)=>s+h.points,0));assert.equal(r.quick,r.history.reduce((s,h)=>s+h.quick,0));assert.equal(r.hitPoints,RULES.hit*r.history.filter(h=>h.result==='hit').length);
   assert.equal(view.score,r.rarity+r.quick+r.hitPoints+r.bonus);assert(Number.isInteger(view.score));assert(view.score<=RULES.maxScore);assert.equal(new Set(r.tested).size,r.tested.length);
   assert(r.active<=steps*RULES.idleCapMs);assert(view.history.every(h=>!('key' in h)));
  }
  assert.notEqual(r.status,'active');assert(r.status==='solved'?r.bonus===r.parts.total&&r.parts.total===r.parts.base+r.parts.fuel+r.parts.rounds+r.parts.swift+r.parts.clean:r.bonus===0);
  assert(6-r.air===r.history.filter(h=>h.result==='miss').length+2*r.wrong+r.hints.reduce((s,h)=>s+h.cost,0)||r.air===0,'Fuel is fully accounted for');
 }
});
test('flights saved before this release still resume, score and finish',()=>{
 const legacy={id:randomUUID(),puzzle:{id:'hd-1-001',canonical:'MACHUPICCHU',answer:'Machu Picchu',category:'A famous place',explanation:'x',version:1,aliases:[],rounds:Array.from({length:5},()=>[{id:'fruit',title:'Name a fruit',answers:[{word:'Papaya',key:'PAPAYA',points:10,tier:'Uncommon',aliases:[]}]},{id:'animal',title:'Name a mammal',answers:[{word:'Cat',key:'CAT',points:5,tier:'Common',aliases:[]}]}])},
  mode:'practice',day:'2026-11-17',created:now,expires:now+DAY,revision:3,status:'active',phase:'answer',air:6,wrong:0,history:[],tested:[],rarity:0,bonus:0,receipts:[]};
 const view=publicRun(legacy,now);assert.equal(view.score,0);assert.equal(view.timing.timed,false);assert.equal(view.hint.next.kind,'clue');
 answer(legacy,'fruit','Papaya',now+1000);assert.equal(legacy.quick,0,'no clock was running for the first prompt');move(legacy,'probe',{value:'P'},now+2000);assert.equal(legacy.hitPoints,5);
 move(legacy,'solve',{value:'Machu Picchu'},now+3000);assert.equal(legacy.status,'solved');assert.equal(legacy.parts.swift,0);assert.equal(publicRun(legacy,now).score,10+5+legacy.parts.total);
});
test('service: concurrent starts choose once; disk restart resumes; duplicate move credits once',async()=>{
 const f=await fixture(),c=f.client();const responses=await Promise.all(Array.from({length:8},()=>f.call(c,'start')));assert.equal(new Set(responses.map(r=>r.run.id)).size,1);assert.equal(responses[0].remaining,puzzles.length-1);
 const run=responses[0].run;assert.equal(run.prompts[0].id,'fruit');assert.equal(responses[0].bank.categories,prompts.length);
 const b={runId:run.id,revision:run.revision,requestId:randomUUID(),action:'answer',prompt:'fruit',value:'Papaya'},expected=points('fruit','Papaya')+10;
 const moves=await Promise.all(Array.from({length:5},()=>f.call(c,'move',b)));assert(moves.every(r=>r.run.score===expected));const loaded=await f.call(c,'state');assert.equal(loaded.run.phase,'probe');assert.equal(loaded.run.score,expected);
 const restarted=createHiddenService({store:createHiddenStore({env:{},file:f.file}),database:{},now:()=>now});const resumed=await restarted('/api/hidden/state',c.req,c.res,{});assert.equal(resumed.run.id,run.id);assert.equal(resumed.run.score,expected);
 await assert.rejects(f.call(c,'move',{...b,requestId:randomUUID()}),/Another tab/);
 // The saved player record stays small however large the answer bank grows.
 assert((await readFile(f.file,'utf8')).length<12000);
});
test('daily assignment, UTC rollover, abandoned puzzles remain seen, recycling instead of a dead end',async()=>{
 const library=puzzles.slice(0,30),f=await fixture({library}),c=f.client('11111111-1111-4111-8111-111111111111');
 const s=await f.call(c,'start',{mode:'daily'});const id=s.run.id;
 let r=await f.call(c,'move',{mode:'daily',runId:id,revision:0,requestId:randomUUID(),action:'abandon'});assert.equal(r.run.status,'abandoned');
 r=await f.call(c,'start',{mode:'daily'});assert.equal(r.run.id,id);
 f.setTime(now+DAY);r=await f.call(c,'start',{mode:'daily'});assert.notEqual(r.run.id,id);assert.equal(r.remaining,28);
 const g=f.client(null,'b'.repeat(64));await assert.rejects(f.call(g,'start',{mode:'daily'}),/Sign in/);
 const startId=randomUUID();r=await f.call(g,'start',{requestId:startId});assert.equal(r.run.answer,undefined,'an active flight never reveals its answer');
 const revealed=await f.call(g,'move',{runId:r.run.id,revision:0,requestId:randomUUID(),action:'abandon'});
 const replay=await f.call(g,'start',{requestId:startId});assert.equal(replay.run.id,r.run.id);assert.equal(replay.remaining,29);
 const flown=[revealed.run.answer];
 for(let i=1;i<30;i++){r=await f.call(g,'start');r=await f.call(g,'move',{runId:r.run.id,revision:0,requestId:randomUUID(),action:'abandon'});assert.equal(r.remaining,29-i);flown.push(r.run.answer);}
 assert.equal(new Set(flown).size,30,'no mystery repeats until the library is exhausted');
 // The 31st flight recycles the oldest mysteries; the 15 most recent stay retired.
 r=await f.call(g,'start');assert.equal(r.run.status,'active');assert.equal(r.remaining,14);
 r=await f.call(g,'move',{runId:r.run.id,revision:0,requestId:randomUUID(),action:'abandon'});assert(flown.slice(0,15).includes(r.run.answer));assert(!flown.slice(15).includes(r.run.answer));
 assert.equal((await f.call(g,'state')).history.length,20);
});
test('pilot record: streaks count finished days, survive one day, reset after a gap; ranks follow lifetime points',async()=>{
 const f=await fixture(),c=f.client();
 // With the fixed test chooser, the n-th flight is always the n-th mystery in the library.
 let flights=0;const fly=async(finish=true)=>{let r=await f.call(c,'start');const id=r.run.id,target=puzzles[flights++].answer;r=await f.call(c,'move',{runId:id,revision:r.run.revision,requestId:randomUUID(),action:'skip-answer'});
  if(!finish)return f.call(c,'move',{runId:id,revision:r.run.revision,requestId:randomUUID(),action:'abandon'});
  return f.call(c,'move',{runId:id,revision:r.run.revision,requestId:randomUUID(),action:'solve',value:target});};
 let v=await f.call(c,'state');assert.deepEqual({...v.stats,rank:v.stats.rank.name},{flights:0,solved:0,best:0,total:0,streak:0,bestStreak:0,flownToday:false,rank:'Fledgling'});
 v=await fly();assert.equal(v.run.status,'solved');assert.equal(v.stats.streak,1);assert.equal(v.stats.flownToday,true);assert.equal(v.stats.solved,1);assert.equal(v.stats.best,v.run.score);assert.equal(v.history[0].stars,v.run.rating.stars);assert.equal(v.history[0].answer,v.run.answer);
 const first=v.run.score;v=await fly();assert.equal(v.stats.streak,1,'two flights on one day are one streak day');assert.equal(v.stats.flights,2);assert.equal(v.stats.total,first+v.run.score);
 f.setTime(now+DAY);v=await f.call(c,'state');assert.equal(v.stats.streak,1,'yesterday’s streak is still alive today');assert.equal(v.stats.flownToday,false);
 v=await fly(false);assert.equal(v.stats.streak,1,'an abandoned flight does not extend a streak');assert.equal(v.stats.flownToday,false);assert.equal(v.stats.flights,3);
 v=await fly();assert.equal(v.stats.streak,2);assert.equal(v.stats.bestStreak,2);
 f.setTime(now+4*DAY);v=await f.call(c,'state');assert.equal(v.stats.streak,0,'a missed day ends it');assert.equal(v.stats.bestStreak,2);
 v=await fly();assert.equal(v.stats.streak,1);assert.equal(v.stats.bestStreak,2);
 // Re-reading never counts a finished flight twice.
 const again=await f.call(c,'state');assert.equal(again.stats.flights,v.stats.flights);assert.equal(again.stats.total,v.stats.total);
 assert.deepEqual([0,299,300,2500,19999,20000,1e9].map(n=>pilotRank(n).name),['Fledgling','Fledgling','Sky Cadet','Thermal Rider','Stratonaut','Aurora Legend','Aurora Legend']);
 assert.equal(pilotRank(650).progress,.5);assert.equal(pilotRank(650).nextAt,1000);assert.equal(pilotRank(1e9).progress,1);
 // Older saved records (no stats yet) are rebuilt from their history, once.
 const state=emptyPlayer();delete state.stats;state.history=[{id:'a',status:'solved',score:300},{id:'b',status:'bust',score:40},{id:'c',status:'expired',score:10}];
 assert.deepEqual({...statsView(state,'2026-11-17'),rank:0},{flights:2,solved:1,best:300,total:340,streak:0,bestStreak:0,flownToday:false,rank:0});
 const run=newRun(classic(),'practice',now);move(run,'abandon');recordFlight(state,run,'2026-11-17');assert.equal(state.stats.flights,3);assert.equal(state.stats.streak,0);
});
test('guest claim is atomic, preserves existing daily/active account run, merges the pilot record once',async()=>{
 const f=await fixture();const guest=f.client();const before=await f.call(guest,'start');
 const account=f.client('11111111-1111-4111-8111-111111111111');const claimed=await f.call(account,'state');assert.equal(claimed.run.id,before.run.id);
 const other=f.client('22222222-2222-4222-8222-222222222222');assert.equal((await f.call(other,'state')).run,null);
 const a=emptyPlayer(),g=emptyPlayer();a.runs.practice=newRun(puzzles[1],'practice',now);a.runs.daily=newRun(puzzles[2],'daily',now);g.runs.practice=newRun(puzzles[0],'practice',now);g.seen=[puzzles[0].canonical];a.seen=[puzzles[1].canonical,puzzles[2].canonical];const id=a.runs.practice.id,dailyId=a.runs.daily.id;
 a.stats={flights:4,solved:2,best:410,total:900,streak:3,bestStreak:5,lastDay:'2026-11-16'};g.stats={flights:2,solved:1,best:300,total:350,streak:1,bestStreak:1,lastDay:'2026-11-17'};
 mergeGuest(a,g);assert.equal(a.runs.practice.id,id);assert.equal(a.runs.daily.id,dailyId);assert.equal(a.seen.length,3);assert.equal(a.history[0].status,'abandoned');assert(!('answer' in a.history[0]));
 assert.deepEqual(a.stats,{flights:6,solved:3,best:410,total:1250,streak:4,bestStreak:5,lastDay:'2026-11-17'});
});
test('hosted store fails closed without database; no local file fallback on Vercel',async()=>{
 const store=createHiddenStore({env:{VERCEL:'1'},database:{configured:()=>false}});assert.equal(store.local,false);await assert.rejects(store.read('g:'+'a'.repeat(64)),/database connection/);
});
test('Updraft: warm moves use one database call; fresh reads do not write; stale caches cannot double-score or bypass claims',async()=>{
 const rows=new Map(),calls=[];let offline=false;
 // The hosted default row predates the pilot record: reading it must still not cause a write.
 const blank=()=>({seen:[],runs:{},history:[],daily:{},reports:[],claim:null});
 const database={configured:()=>true,verifyUser:async()=>({id:'11111111-1111-4111-8111-111111111111'}),request:async(endpoint,{body:b})=>{
  calls.push(endpoint);if(offline)throw Object.assign(new Error('Database offline'),{status:503});
  const row=key=>{if(!rows.has(key))rows.set(key,{revision:0,state:blank()});return rows.get(key);};
  if(endpoint==='rpc/hd_read')return structuredClone(row(b.p_key));
  if(endpoint==='rpc/hd_cas'){const r=row(b.p_key);if(r.revision!==b.p_revision||r.state.claim)return false;rows.set(b.p_key,{revision:r.revision+1,state:structuredClone(b.p_state)});return true;}
  if(endpoint==='rpc/hd_claim'){const g=row(b.p_guest),a=row(b.p_account);if(g.revision!==b.p_guest_revision||a.revision!==b.p_account_revision||g.state.claim)return false;rows.set(b.p_guest,{revision:g.revision+1,state:{...blank(),claim:b.p_account}});rows.set(b.p_account,{revision:a.revision+1,state:structuredClone(b.p_state)});return true;}
  throw new Error('Unexpected RPC');
 }};
 const service=()=>createHiddenService({store:createHiddenStore({env:{VERCEL:'1'},database}),database,now:()=>now,choose:()=>0});
 const a=service(),b=service(),req={headers:{cookie:'hd_guest='+'b'.repeat(64)},serverless:true},res={setHeader(){}};
 const first=await a('/api/hidden/state',req,res,{});assert.deepEqual(calls.splice(0),['rpc/hd_read']);assert.equal(first.stats.flights,0);
 const start=await a('/api/hidden/start',req,res,{requestId:randomUUID()});calls.length=0;
 await b('/api/hidden/state',req,res,{});assert.deepEqual(calls.splice(0),['rpc/hd_read']);
 const action={runId:start.run.id,revision:0,requestId:randomUUID(),action:'answer',prompt:'fruit',value:'Papaya'},expected=points('fruit','Papaya')+10;
 const won=await a('/api/hidden/move',req,res,action);assert.equal(won.run.score,expected);assert.deepEqual(calls.splice(0),['rpc/hd_cas']);
 await assert.rejects(b('/api/hidden/move',req,res,{...action,requestId:randomUUID(),value:'Apple'}),/Another tab/);assert.deepEqual(calls.splice(0),['rpc/hd_cas','rpc/hd_read']);
 offline=true;await assert.rejects(a('/api/hidden/move',req,res,{...action,revision:1,requestId:randomUUID(),action:'probe',value:'P'}),/offline/);offline=false;
 const signed={...req,headers:{...req.headers,'x-account-token':'test-account'}};await b('/api/hidden/state',signed,res,{});
 await assert.rejects(a('/api/hidden/move',req,res,action),/moved to an account/);
 const final=await b('/api/hidden/state',signed,res,{});assert.equal(final.run.score,expected);assert.equal(final.run.phase,'probe');
});
test('Postgres-backed service survives new instances and concurrent guest-to-account claims',async()=>{
 const db=new PGlite();try{
  await db.exec('CREATE ROLE anon;CREATE ROLE authenticated;CREATE ROLE service_role BYPASSRLS;');await db.exec(await readFile(new URL('../supabase/migrations/006_hidden_depths.sql',import.meta.url),'utf8'));
  const database={configured:()=>true,verifyUser:async()=>({id:'11111111-1111-4111-8111-111111111111'}),request:async(endpoint,{body})=>{
   const params=Object.values(body),name=endpoint.split('/')[1];assert(['hd_read','hd_cas','hd_claim'].includes(name));return (await db.query(`SELECT ${name}(${params.map((_,i)=>'$'+(i+1)).join(',')}) AS result`,params.map(p=>typeof p==='object'?JSON.stringify(p):p))).rows[0].result;
  }};
  const service=()=>createHiddenService({store:createHiddenStore({env:{VERCEL:'1'},database}),database,now:()=>now,choose:()=>0});
  const headers={cookie:'hd_guest='+'f'.repeat(64)},req={headers,serverless:true},res={setHeader(){}};
  const first=await service()('/api/hidden/start',req,res,{requestId:randomUUID()});
  const requests=Array.from({length:8},()=>service()('/api/hidden/start',req,res,{requestId:randomUUID()}));const results=await Promise.all(requests);assert(results.every(r=>r.run.id===first.run.id&&r.remaining===puzzles.length-1));
  // A complete flight through real Postgres JSON: hint, answer, probe, solve, then the pilot record.
  let view=await service()('/api/hidden/move',req,res,{runId:first.run.id,revision:0,requestId:randomUUID(),action:'hint'});assert.equal(view.run.air,5);assert.equal(typeof view.run.hint.clue,'string');
  view=await service()('/api/hidden/move',req,res,{runId:first.run.id,revision:1,requestId:randomUUID(),action:'answer',prompt:'fruit',value:'Apple'});
  view=await service()('/api/hidden/move',req,res,{runId:first.run.id,revision:2,requestId:randomUUID(),action:'skip-probe'});
  view=await service()('/api/hidden/move',req,res,{runId:first.run.id,revision:3,requestId:randomUUID(),action:'solve',value:puzzles[0].answer});
  assert.equal(view.run.status,'solved');assert.equal(view.run.score,view.run.rarity+view.run.quick+view.run.hitPoints+view.run.bonus);assert.equal(view.stats.solved,1);assert.equal(view.stats.streak,1);assert.equal(view.stats.total,view.run.score);
  req.headers={...headers,'x-account-token':'test-authenticated-account'};
  const claimed=await Promise.all(Array.from({length:6},()=>service()('/api/hidden/state',req,res,{})));assert(claimed.every(r=>r.run.id===first.run.id&&r.signedIn&&r.stats.solved===1));
  const otherDevice={headers:{'x-account-token':'test-authenticated-account',cookie:'hd_guest='+'e'.repeat(64)},serverless:true};const resumed=await service()('/api/hidden/state',otherDevice,res,{});assert.equal(resumed.run.id,first.run.id);assert.equal(resumed.stats.total,view.run.score);
 }finally{await db.close();}
});
test('Postgres migration: RLS, CAS conflicts, atomic claims and service-only access',async()=>{
 const db=new PGlite();try{
  await db.exec('CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;');await db.exec(await readFile(new URL('../supabase/migrations/006_hidden_depths.sql',import.meta.url),'utf8'));
  const g='g:'+'a'.repeat(64),a='a:11111111-1111-4111-8111-111111111111';
  await db.exec('SET ROLE anon');await assert.rejects(db.query('SELECT hd_read($1)',[g]),/permission denied/);await assert.rejects(db.query('SELECT * FROM hidden_depths_players'),/permission denied/);
  await db.exec('RESET ROLE; SET ROLE authenticated');await assert.rejects(db.query('SELECT hd_cas($1,0,$2)',[g,'{}']),/permission denied/);
  await db.exec('RESET ROLE; SET ROLE service_role');let row=(await db.query('SELECT hd_read($1) AS r',[g])).rows[0].r;assert.equal(row.revision,0);
  await db.query('SELECT hd_read($1)',[a]);const state=emptyPlayer();state.seen=['MACHUPICCHU'];
  assert.equal((await db.query('SELECT hd_cas($1,0,$2) AS ok',[g,JSON.stringify(state)])).rows[0].ok,true);assert.equal((await db.query('SELECT hd_cas($1,0,$2) AS ok',[g,'{}'])).rows[0].ok,false);
  assert.equal((await db.query('SELECT hd_claim($1,$2,1,0,$3) AS ok',[g,a,JSON.stringify(state)])).rows[0].ok,true);
  assert.equal((await db.query('SELECT hd_claim($1,$2,1,0,$3) AS ok',[g,a,JSON.stringify(state)])).rows[0].ok,false);
  assert.equal((await db.query('SELECT hd_cas($1,2,$2) AS ok',[g,'{}'])).rows[0].ok,false);
  row=(await db.query('SELECT hd_read($1) AS r',[g])).rows[0].r;assert.equal(row.state.claim,a);assert.deepEqual(row.state.seen,[]);
  assert.deepEqual((await db.query('SELECT hd_read($1) AS r',[a])).rows[0].r.state.seen,['MACHUPICCHU']);
 }finally{await db.close();}
});
