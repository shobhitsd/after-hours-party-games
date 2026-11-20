import {randomUUID,createHash} from 'node:crypto';
import {normalize,promptById,puzzleById,dealRounds} from './hidden-content.js';
import {RULES,quickBonus,quickWindowMs,solveParts,rating,pilotRank} from '../public/updraft-rules.js';
export const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
export const suggestAnswer=word=>{throw Object.assign(new Error(`Did you mean ${word}?`),{status:422,code:'ANSWER_CONFIRMATION_REQUIRED',suggestion:{word}});};
const emptyStats=()=>({flights:0,solved:0,best:0,total:0,streak:0,bestStreak:0,lastDay:null});
export const emptyPlayer=()=>({seen:[],runs:{},history:[],daily:{},reports:[],claim:null,stats:emptyStats()});
const dayOf=ms=>new Date(ms).toISOString().slice(0,10);

// A flight stores only prompt references (id/title/icon/note); answers are resolved from the bank
// when a move arrives. `puzzle.rounds` may be supplied (tests, older saved flights) and is then
// used as given, including any embedded answer lists.
export function newRun(puzzle,mode,now=Date.now(),choose){
 const {rounds,...core}=puzzle;
 return {id:randomUUID(),v:2,puzzle:{...structuredClone(core),rounds:structuredClone(rounds||dealRounds(puzzle,choose))},mode,day:dayOf(now),created:now,expires:now+86400000,revision:0,status:'active',phase:'answer',
  air:RULES.fuel,wrong:0,history:[],tested:[],rarity:0,quick:0,hitPoints:0,bonus:0,parts:null,hints:[],clock:now,asked:now,active:0,receipts:[]};
}
function finish(run,status,now){run.status=status;run.phase='finished';run.ended=now;}
export function expire(run,now=Date.now()){if(run?.status==='active'&&run.expires<=now){finish(run,'expired',run.expires);run.revision++;}return run;}
// Every point a flight can hold. Older saved flights simply have no quick/hit components.
export const total=run=>run.rarity+(run.quick||0)+(run.hitPoints||0)+run.bonus;
// Damerau-Levenshtein edit distance: insertions, deletions, substitutions, and adjacent transpositions.
export function editDistance(a,b){
 if(a===b)return 0;const la=a.length,lb=b.length;if(Math.abs(la-lb)>4)return Math.max(la,lb);
 const d=Array.from({length:la+1},()=>new Uint8Array(lb+1));
 for(let i=0;i<=la;i++)d[i][0]=i;for(let j=0;j<=lb;j++)d[0][j]=j;
 for(let i=1;i<=la;i++){for(let j=1;j<=lb;j++){
  const cost=a[i-1]===b[j-1]?0:1;
  d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+cost);
  if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+cost);
 }}
 return d[la][lb];
}
const deph=s=>s.replace(/PH/g,'F');
const deRepeat=s=>s.replace(/([A-Z0-9])\1+/g,'$1');

export function isFuzzySolveMatch(key,target,aliases=[]){
 const k=key.replace(/^THE/,''),t=target.replace(/^THE/,''),cands=[t,...aliases.map(a=>a.replace(/^THE/,''))];
 if(cands.includes(k))return true;
 for(const c of cands)if(k+'S'===c||(k.endsWith('S')&&k.slice(0,-1)===c))return true;
 const normK=deRepeat(deph(k));
 for(const c of cands)if(deRepeat(deph(c))===normK)return true;
 for(const c of cands){
  const d=editDistance(k,c);
  if(c.length>=6&&d<=1)return true;
  if(c.length>=8&&d<=2)return true;
  if(c.length>=13&&d<=3)return true;
 }
 return false;
}

// Restricted edit distance: one insertion/deletion/substitution, or adjacent transposition.
export function oneTypo(a,b){
 if(Math.abs(a.length-b.length)>1)return false;
 if(a.length===b.length){const diff=[...a].flatMap((c,i)=>c!==b[i]?[i]:[]);return diff.length===1||(diff.length===2&&diff[1]===diff[0]+1&&a[diff[0]]===b[diff[1]]&&a[diff[1]]===b[diff[0]]);}
 if(a.length>b.length)[a,b]=[b,a];let i=0;while(i<a.length&&a[i]===b[i])i++;return a.slice(i)===b.slice(i+1);
}
function input(value){if(typeof value!=='string'||value.length>100||!/[A-Z0-9]/.test(normalize(value)))fail('Enter an answer of up to 100 characters, containing letters or digits.');return normalize(value);}
const lettersOf=key=>[...new Set(key)].filter(c=>c>='A'&&c<='Z');
const resolvePrompt=ref=>ref?.answers?ref:promptById(ref?.id);
// key/alias -> answer, built once per prompt (the bank is immutable at runtime).
const indexes=new WeakMap();
function indexOf(prompt){
 let index=indexes.get(prompt);
 if(!index){index=new Map();for(const a of prompt.answers)for(const key of [a.key,...(a.aliases||[])])if(!index.has(key))index.set(key,a);indexes.set(prompt,index);}
 return index;
}
// What a player types is forgiven in this order: exact entry or alias; a leading "The"; a simple
// plural/singular; phonetic equivalence (PH/F, collapsed repeated letters); then fuzzy matching (Levenshtein/transposition),
// only when exactly one entry is the best fit.
export function matchAnswer(prompt,value,{confirmTypos=false}={}){
 const approximate=a=>{if(confirmTypos)suggestAnswer(a.word);return a;};
 const key=input(value),index=indexOf(prompt),forms=[key];
 if(key.startsWith('THE')&&key.length>=6)forms.push(key.slice(3));
 for(const form of [...forms]){
  if(form.endsWith('IES')&&form.length>4)forms.push(form.slice(0,-3)+'Y');
  if(form.endsWith('ES')&&form.length>3)forms.push(form.slice(0,-2));
  if(form.endsWith('S')&&form.length>2)forms.push(form.slice(0,-1));else forms.push(form+'S');
 }
 for(const form of forms){const exact=index.get(form);if(exact)return exact;}
 const normVariants=forms.flatMap(f=>[deph(f),deRepeat(f),deRepeat(deph(f))]);
 const phonetic=new Set();
 for(const [candidate,a] of index){
  if(candidate.length<3)continue;
  const candNorms=[deph(candidate),deRepeat(candidate),deRepeat(deph(candidate))];
  if(normVariants.some(nv=>candNorms.includes(nv)))phonetic.add(a);
 }
 if(phonetic.size===1)return approximate([...phonetic][0]);
 if(key.length>=4){
  const maxDist=key.length>=8?2:1;let bestDist=maxDist+1,bestMatches=new Set();
  for(const [candidate,a] of index){
   if(candidate.length<3)continue;
   const cands=candidate.startsWith('THE')&&candidate.length>=6?[candidate,candidate.slice(3)]:[candidate];
   for(const cand of cands){
    if(Math.abs(key.length-cand.length)>maxDist)continue;
    const d=editDistance(key,cand);
    if(d<=maxDist){
     if(d<bestDist){bestDist=d;bestMatches=new Set([a]);}
     else if(d===bestDist)bestMatches.add(a);
    }
   }
  }
  if(bestMatches.size===1)return approximate([...bestMatches][0]);
 }
 fail('That answer is not in our dictionary yet. Try another, or report it so we can add it.');
}
const clueOf=run=>run.puzzle.hint||puzzleById(run.puzzle.id)?.hint||null;
// The 2nd hint reveals the unrevealed letter that appears most often (earliest wins a tie).
function hintLetter(run){
 const counts=new Map();for(const c of run.puzzle.canonical)if(!run.tested.includes(c))counts.set(c,(counts.get(c)||0)+1);
 return [...counts].sort((a,b)=>b[1]-a[1])[0]?.[0]||null;
}
export function applyMove(run,move,now=Date.now()){
 if(!move||typeof move.requestId!=='string'||!/^[\w-]{12,80}$/.test(move.requestId))fail('A valid request ID is required.');
 if(move.runId!==run.id)fail('This attempt has changed. Refresh to resume.',409);
 const digest=createHash('sha256').update(JSON.stringify([move.action,move.prompt,move.value])).digest('hex');
 const receipt=run.receipts.find(r=>r.id===move.requestId);if(receipt){if(receipt.digest!==digest)fail('This request ID was already used.',409);return run;}
 expire(run,now);
 if(run.status!=='active')fail('This flight has ended. Open your result.',409);
 if(move.revision!==run.revision)fail('Another tab updated this flight. Your latest progress has been loaded.',409);
 const requirePhase=p=>{if(run.phase!==p)fail('That action is not available at this step.',409);};
 // Server clock only. A long pause is capped, so leaving a flight open overnight costs one cap,
 // and nothing is recorded unless the move below succeeds.
 const active=(run.active||0)+Math.min(Math.max(0,now-(run.clock??now)),RULES.idleCapMs);
 switch(move.action){
  case 'answer':{
   requirePhase('answer');const ref=run.puzzle.rounds[run.history.length].find(p=>p.id===move.prompt);if(!ref)fail('Choose one of the two current prompts.');
   const prompt=resolvePrompt(ref);if(!prompt)fail('That prompt has been retired. Choose the other prompt or skip this round.');
   const a=matchAnswer(prompt,move.value,{confirmTypos:true}),variants=[a.key,...(a.aliases||[])];if(run.history.some(row=>[row.key,...(row.variants||[])].some(key=>variants.includes(key))))fail('You already used that answer. Try a different one.');
   const quick=run.asked==null?0:quickBonus(now-run.asked);
   run.rarity+=a.points;run.quick=(run.quick||0)+quick;const available=lettersOf(a.key).filter(l=>!run.tested.includes(l));
   run.history.push({prompt:prompt.title,answer:a.word,key:a.key,variants,points:a.points,quick,bonus:0,tier:a.tier,letter:null,result:available.length?'pending':'echo'});
   run.phase=available.length?'probe':'decision';break;
  }
  case 'skip-answer':requirePhase('answer');run.history.push({prompt:'Round skipped',answer:null,points:0,quick:0,bonus:0,letter:null,result:'skipped'});run.phase='decision';break;
  case 'probe':{
   requirePhase('probe');const row=run.history.at(-1);const letter=move.value;
   if(typeof letter!=='string'||!/^[A-Z]$/.test(letter)||!row.key.includes(letter)||run.tested.includes(letter))fail('Choose an unused letter from your accepted answer.');
   row.letter=letter;run.tested.push(letter);row.result=run.puzzle.canonical.includes(letter)?'hit':'miss';
   if(row.result==='hit'){row.bonus=RULES.hit;run.hitPoints=(run.hitPoints||0)+RULES.hit;}
   else run.air=Math.max(0,run.air-RULES.missCost);
   run.phase='decision';if(!run.air)finish(run,'bust',now);break;
  }
  case 'skip-probe':requirePhase('probe');run.history.at(-1).result='skipped';run.phase='decision';break;
  case 'hint':{
   if(!['answer','probe','decision'].includes(run.phase))fail('That action is not available at this step.',409);
   run.hints??=[];const level=run.hints.length,cost=RULES.hintCosts[level];
   if(cost==null)fail('Both hints have already been used on this flight.');
   if(run.air<=cost)fail(`That hint costs ${cost} Fuel, and a hint can never use your last Fuel.`);
   if(level===0){if(!clueOf(run))fail('This older flight has no written clue.');run.hints.push({kind:'clue',cost});}
   else{
    const letter=hintLetter(run);if(!letter)fail('Every letter is already showing. Time to solve it!');
    run.tested.push(letter);run.hints.push({kind:'letter',cost,letter});
    // The revealed letter may have been the last one the current answer could launch.
    if(run.phase==='probe'&&!lettersOf(run.history.at(-1).key).some(l=>!run.tested.includes(l))){run.history.at(-1).result='echo';run.phase='decision';}
   }
   run.air-=cost;break;
  }
  case 'solve':{
   requirePhase('decision');if(run.wrong>=RULES.guesses)fail('All three solve attempts have been used.');
   const key=input(move.value).replace(/^THE/,'');const target=run.puzzle.canonical.replace(/^THE/,'');
   if(isFuzzySolveMatch(key,target,run.puzzle.aliases)){
    const exact=[target,...(run.puzzle.aliases||[]).map(a=>a.replace(/^THE/,''))].some(c=>key===c||key+'S'===c||(key.endsWith('S')&&key.slice(0,-1)===c));
    if(!exact)suggestAnswer(run.puzzle.answer);
    run.parts=solveParts({air:run.air,rounds:run.history.length,wrong:run.wrong,activeMs:active,timed:run.v===2});run.bonus=run.parts.total;finish(run,'solved',now);
   }else{run.wrong++;run.air=Math.max(0,run.air-RULES.wrongCost);run.lastGuess=String(move.value).trim();if(!run.air)finish(run,'bust',now);else if(run.history.length===RULES.rounds&&run.wrong===RULES.guesses)finish(run,'unsolved',now);}
   break;
  }
  case 'next':requirePhase('decision');if(run.history.length>=RULES.rounds)fail('All five rounds have been played. Solve or finish the flight.');run.phase='answer';run.asked=now;delete run.lastGuess;break;
  case 'finish':requirePhase('decision');if(run.history.length!==RULES.rounds)fail('Finish is available after round five.');finish(run,'unsolved',now);break;
  case 'abandon':finish(run,'abandoned',now);break;
  default:fail('Unknown move.');
 }
 run.active=active;run.clock=now;run.revision++;run.receipts.push({id:move.requestId,digest});return run;
}
const promptView=p=>({id:p.id,title:p.title,icon:p.icon||'',note:p.note||''});
export function publicRun(run,now=Date.now()){
 if(!run)return null;
 const ended=run.status!=='active',score=total(run),hints=run.hints||[],level=hints.length,nextCost=RULES.hintCosts[level];
 const letterLeft=[...run.puzzle.canonical].some(c=>!run.tested.includes(c));
 return {id:run.id,mode:run.mode,day:run.day,revision:run.revision,status:run.status,phase:run.phase,expires:run.expires,category:run.puzzle.category,
  mask:run.puzzle.answer.toUpperCase().split('').map(c=>/[A-Z]/.test(c)&&!run.tested.includes(c)&&!ended?'_':c).join(''),
  lengths:run.puzzle.answer.split(/[ -]/).map(normalize).map(s=>s.length),
  round:Math.min(RULES.rounds,run.history.length+(run.phase==='answer'?1:0)),air:run.air,wrong:run.wrong,tested:run.tested,
  // Itemised score: every figure the result screen shows comes from here, never from the browser.
  rarity:run.rarity,quick:run.quick||0,hitPoints:run.hitPoints||0,bonus:run.bonus,parts:run.parts||null,score,rating:ended?rating(run.status,score):null,
  history:run.history.map(({key,variants,...row})=>({quick:0,bonus:0,...row})),lastGuess:run.lastGuess||null,
  hint:{used:level,clue:level>=1?clueOf(run):null,letter:hints.find(h=>h.kind==='letter')?.letter||null,
   next:!ended&&nextCost!=null&&(level===0?Boolean(clueOf(run)):letterLeft)?{kind:level===0?'clue':'letter',cost:nextCost,affordable:run.air>nextCost}:null},
  // Presentation aid only: how much of the quick-answer window is left, by the server's clock.
  timing:{quickLeftMs:!ended&&run.phase==='answer'&&run.asked!=null?Math.max(0,quickWindowMs-(now-run.asked)):0,activeSeconds:Math.round((run.active||0)/1000),timed:run.v===2},
  prompts:run.phase==='answer'?run.puzzle.rounds[run.history.length].map(promptView):[],
  // Public prompt titles only: next-round UI can open immediately while its move saves.
  nextPrompts:run.status==='active'&&run.phase==='decision'&&run.history.length<RULES.rounds?run.puzzle.rounds[run.history.length].map(promptView):[],
  available:run.phase==='probe'?lettersOf(run.history.at(-1).key).filter(l=>!run.tested.includes(l)):[],
  ...(ended?{answer:run.puzzle.answer,explanation:run.puzzle.explanation,puzzleId:run.puzzle.id}:{}),
 };
}
export function summary(run){const score=total(run);return {id:run.id,mode:run.mode,day:run.day,status:run.status,score,air:run.air,rounds:run.history.length,stars:rating(run.status,score).stars,...(run.status!=='active'?{answer:run.puzzle.answer}:{})};}

// Personal statistics. A streak counts consecutive UTC days on which at least one flight was
// flown to its end (solved, landed out of Fuel, or revealed after round five).
const previousDay=day=>dayOf(Date.parse(day+'T00:00:00Z')-86400000);
export function statsFromHistory(history=[]){
 const stats=emptyStats();for(const h of history){if(h.status==='expired')continue;stats.flights++;if(h.status==='solved')stats.solved++;stats.best=Math.max(stats.best,h.score||0);stats.total+=h.score||0;}
 return stats;
}
export function recordFlight(state,run,today){
 const stats=state.stats??=statsFromHistory(state.history),score=total(run);
 if(run.status==='expired')return stats;
 stats.flights++;if(run.status==='solved')stats.solved++;stats.best=Math.max(stats.best,score);stats.total+=score;
 if(['solved','bust','unsolved'].includes(run.status)&&stats.lastDay!==today){
  stats.streak=stats.lastDay===previousDay(today)?stats.streak+1:1;stats.lastDay=today;stats.bestStreak=Math.max(stats.bestStreak,stats.streak);
 }
 return stats;
}
export function statsView(state,today){
 const stats={...emptyStats(),...(state.stats||statsFromHistory(state.history))};
 const alive=stats.lastDay===today||stats.lastDay===previousDay(today);
 return {flights:stats.flights,solved:stats.solved,best:stats.best,total:stats.total,streak:alive?stats.streak:0,bestStreak:stats.bestStreak,flownToday:stats.lastDay===today,rank:pilotRank(stats.total)};
}
function mergeStats(a,b){
 const later=(a.lastDay||'')>=(b.lastDay||'')?a:b,other=later===a?b:a;
 // Same day or adjacent days on two identities are one continuous streak; keep the longer count.
 const streak=later.lastDay&&other.lastDay&&(other.lastDay===later.lastDay||other.lastDay===previousDay(later.lastDay))?Math.max(later.streak,other.streak+(other.lastDay===later.lastDay?0:1)):later.streak;
 return {flights:a.flights+b.flights,solved:a.solved+b.solved,best:Math.max(a.best,b.best),total:a.total+b.total,streak,bestStreak:Math.max(a.bestStreak,b.bestStreak,streak),lastDay:later.lastDay};
}
export function mergeGuest(account,guest){
 // Statistics first, from each side's own history, so a flight is never counted twice.
 account.stats=mergeStats({...emptyStats(),...(account.stats||statsFromHistory(account.history))},{...emptyStats(),...(guest.stats||statsFromHistory(guest.history))});
 account.seen=[...new Set([...account.seen,...guest.seen])];
 account.starts=[...(account.starts||[]),...(guest.starts||[])].slice(-100);
 account.history=[...account.history,...guest.history.filter(h=>!account.history.some(a=>a.id===h.id))].slice(-100);
 if(guest.runs.practice){
  if(!account.runs.practice||account.runs.practice.status!=='active')account.runs.practice=guest.runs.practice;
  else if(!account.history.some(r=>r.id===guest.runs.practice.id))account.history.push({...summary(guest.runs.practice),status:'abandoned'});
 }
 return account;
}
