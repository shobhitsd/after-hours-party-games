// Deliberately public teaching example. Never submitted to account/scoring APIs.
// Same rules and scoring functions as real flights, except that the lesson is untimed:
// it awards no quick-answer or swift-solve bonuses, so its score is always reproducible.
import {RULES,solveParts,rating} from './updraft-rules.js';
const target='PAPER PLANE',clue='Fold a single sheet, pinch the nose and throw.';
const suggestAnswer=word=>{throw Object.assign(new Error(`Did you mean ${word}?`),{code:'ANSWER_CONFIRMATION_REQUIRED',suggestion:{word}});};
const normalize=s=>String(s).normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase().replace(/[^A-Z]/g,'');
const pairs=[
 [['fruit','Name a fruit','🍋','Papaya|Apple|Banana|Pear|Grape'],['animal','Name an animal','🐾','Panda|Elephant|Cat|Dog|Rabbit']],
 [['instrument','Name a musical instrument','🎵','Piano|Guitar|Flute|Harp'],['country','Name a country','🌍','India|Japan|Nepal|France']],
 [['flower','Name a flower','🌼','Rose|Lily|Daisy|Tulip'],['bird','Name a bird','🪶','Raven|Parrot|Owl|Eagle']],
 [['vegetable','Name a vegetable','🥕','Pea|Carrot|Potato|Onion'],['food','Name a dish or prepared food','🍲','Pancake|Pizza|Bread|Pasta']],
 [['color','Name a colour','🎨','Purple|Blue|Red|Green'],['sport','Name a sport','🏸','Tennis|Cricket|Golf|Football']]
];
const promptViews=index=>(pairs[index]||[]).map(([id,title,icon,words])=>({id,title,icon,note:'',sample:words.split('|')[0]}));
export function createTutorial(){return update({id:'tutorial-'+Date.now(),mode:'tutorial',day:'Tutorial',revision:0,status:'active',phase:'answer',expires:Date.now()+86400000,air:RULES.fuel,wrong:0,rarity:0,quick:0,hitPoints:0,bonus:0,parts:null,hints:[],history:[],tested:[],lastGuess:null});}
function editDist(a,b){
 if(a===b)return 0;const la=a.length,lb=b.length;if(Math.abs(la-lb)>3)return Math.max(la,lb);
 const d=Array.from({length:la+1},()=>new Uint8Array(lb+1));
 for(let i=0;i<=la;i++)d[i][0]=i;for(let j=0;j<=lb;j++)d[0][j]=j;
 for(let i=1;i<=la;i++){for(let j=1;j<=lb;j++){
  const cost=a[i-1]===b[j-1]?0:1;
  d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+cost);
  if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+cost);
 }}
 return d[la][lb];
}
const unrevealed=r=>[...normalize(target)].filter(c=>!r.tested.includes(c));
function update(r){
 const ended=r.status!=='active';r.hints??=[];r.quick??=0;r.hitPoints??=0;r.parts??=null;
 r.score=r.rarity+r.quick+r.hitPoints+r.bonus;r.rating=ended?rating(r.status,r.score):null;r.category='Something that flies';r.lengths=[5,5];r.round=Math.min(RULES.rounds,r.history.length+(r.phase==='answer'?1:0));
 r.mask=[...target].map(c=>c===' '||r.tested.includes(c)||ended?c:'_').join('');r.prompts=r.phase==='answer'?promptViews(r.history.length):[];r.nextPrompts=r.phase==='decision'&&r.history.length<RULES.rounds?promptViews(r.history.length):[];
 r.available=r.phase==='probe'?[...new Set(normalize(r.history.at(-1).answer))].filter(c=>!r.tested.includes(c)):[];
 const level=r.hints.length,cost=RULES.hintCosts[level];
 r.hint={used:level,clue:level>=1?clue:null,letter:r.hints.find(h=>h.kind==='letter')?.letter||null,next:!ended&&cost!=null&&(level===0||unrevealed(r).length)?{kind:level===0?'clue':'letter',cost,affordable:r.air>cost}:null};
 r.timing={quickLeftMs:0,activeSeconds:0,timed:false};
 if(ended){r.answer=target;r.explanation='A paper plane! Fold a sheet, give it a little lift, and see how far it goes.';r.puzzleId='tutorial-example';}
 return r;
}
export function tutorialMove(previous,action,value,prompt){
 const r=structuredClone(previous);if(r.status!=='active')throw new Error('This tutorial flight has finished. Start another from the launchpad.');
 const phase=expected=>{if(r.phase!==expected)throw new Error('Finish this step first.');};
 const end=status=>{r.status=status;r.phase='finished';};
 if(action==='answer'){
  phase('answer');const p=pairs[r.history.length].find(p=>p[0]===prompt);if(!p)throw new Error('Choose a prompt first.');
  const options=p[3].split('|'),normVal=normalize(value);const word=options.find(w=>normalize(w)===normVal);if(!word&&normVal.length>=4){const matches=options.filter(w=>{const nw=normalize(w);return Math.abs(normVal.length-nw.length)<=1&&editDist(normVal,nw)<=1;});if(matches.length===1)suggestAnswer(matches[0]);}if(!word)throw new Error('For this guided example, try '+options.slice(0,3).join(', ')+'.');
  if(r.history.some(h=>normalize(h.answer)===normalize(word)))throw new Error('Try a word you have not used yet.');
  const points=word==='Papaya'?RULES.tiers.Uncommon:RULES.tiers.Common,available=[...new Set(normalize(word))].filter(l=>!r.tested.includes(l));
  r.rarity+=points;r.history.push({prompt:p[1],answer:word,points,quick:0,bonus:0,tier:points===RULES.tiers.Uncommon?'Uncommon':'Common',letter:null,result:available.length?'pending':'echo'});r.phase=available.length?'probe':'decision';
 }else if(action==='probe'){
  phase('probe');if(!r.available.includes(value))throw new Error('Choose an unused letter from your answer.');r.tested.push(value);const h=r.history.at(-1);h.letter=value;h.result=target.includes(value)?'hit':'miss';
  if(h.result==='hit'){h.bonus=RULES.hit;r.hitPoints+=RULES.hit;}else r.air-=RULES.missCost;r.phase='decision';if(!r.air)end('bust');
 }else if(action==='skip-probe'){phase('probe');r.history.at(-1).result='skipped';r.phase='decision';}
 else if(action==='skip-answer'){phase('answer');r.history.push({prompt:'Round skipped',answer:null,points:0,quick:0,bonus:0,letter:null,result:'skipped'});r.phase='decision';}
 else if(action==='hint'){
  const level=r.hints.length,cost=RULES.hintCosts[level];if(cost==null)throw new Error('Both hints have already been used on this flight.');
  if(r.air<=cost)throw new Error(`That hint costs ${cost} Fuel, and a hint can never use your last Fuel.`);
  if(level===0)r.hints.push({kind:'clue',cost});
  else{
   const counts=new Map();for(const c of unrevealed(r))counts.set(c,(counts.get(c)||0)+1);const letter=[...counts].sort((a,b)=>b[1]-a[1])[0]?.[0];
   if(!letter)throw new Error('Every letter is already showing. Time to solve it!');r.tested.push(letter);r.hints.push({kind:'letter',cost,letter});
   if(r.phase==='probe'&&![...new Set(normalize(r.history.at(-1).answer))].some(l=>!r.tested.includes(l))){r.history.at(-1).result='echo';r.phase='decision';}
  }
  r.air-=cost;
 }
 else if(action==='next'){phase('decision');if(r.history.length>=RULES.rounds)throw new Error('All rounds are complete.');r.phase='answer';r.lastGuess=null;}
 else if(action==='solve'){
  phase('decision');if(r.wrong>=RULES.guesses)throw new Error('All guesses have been used.');if(!normalize(value))throw new Error('Type your guess first.');
  const k=normalize(value).replace(/^THE/,''),cleanTarget=normalize(target).replace(/^THE/,'');if(k===cleanTarget||(cleanTarget.length>=8&&editDist(k,cleanTarget)<=2)||(cleanTarget.length>=6&&editDist(k,cleanTarget)<=1)){if(k!==cleanTarget)suggestAnswer('Paper plane');r.parts=solveParts({air:r.air,rounds:r.history.length,wrong:r.wrong,timed:false});r.bonus=r.parts.total;end('solved');}
  else{r.wrong++;r.air=Math.max(0,r.air-RULES.wrongCost);r.lastGuess=String(value).slice(0,100);if(!r.air)end('bust');else if(r.history.length===RULES.rounds&&r.wrong===RULES.guesses)end('unsolved');}
 }else if(action==='finish'){phase('decision');if(r.history.length!==RULES.rounds)throw new Error('Complete the five rounds first.');end('unsolved');}
 else if(action==='abandon')end('abandoned');else throw new Error('Unknown tutorial action.');
 r.revision++;return update(r);
}
export function tutorialTip(r,selected){
 if(r.status!=='active')return 'Ready for takeoff? Real flights also reward speed: quick answers and a swift solve earn bonus points. Tutorial points stay in this example.';
 if(r.phase==='answer'){const p=r.prompts.find(p=>p.id===selected)||r.prompts[0];return `Try “${p.sample}” for “${p.title}”. Your answer gives you letters to launch at the mystery.`;}
 if(r.phase==='probe')return r.history.length===1?'Launch P to reveal every P. Each letter you uncover helps the mystery take shape.':'Choose any unused letter. A hit reveals every copy and earns 5 points; a miss costs one Fuel.';
 return r.history.length===1?'Three Ps, one little flying object. Guess now, tap Hint beside the mystery for a clue (it costs Fuel), or select Next round to collect more letters.':r.history.length===5?'Here is your final nudge: fold a sheet of paper and send it flying. Try “paper plane”.':'Ready to guess? You can try the full answer, or keep collecting letters in the next round.';
}
export function restoreTutorial(raw){try{const r=JSON.parse(raw);if(r?.mode!=='tutorial'||!Array.isArray(r.history)||r.history.length>5||!Array.isArray(r.tested)||!['answer','probe','decision','finished'].includes(r.phase)||!Number.isFinite(r.air))return null;return update(r);}catch{return null;}}
