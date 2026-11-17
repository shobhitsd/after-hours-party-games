import {randomUUID,createHash} from 'node:crypto';
import {normalize} from './hidden-content.js';
export const fail=(message,status=400)=>{throw Object.assign(new Error(message),{status});};
export const emptyPlayer=()=>({seen:[],runs:{},history:[],daily:{},reports:[],claim:null});
export function newRun(puzzle,mode,now=Date.now()){
 return {id:randomUUID(),puzzle:structuredClone(puzzle),mode,day:new Date(now).toISOString().slice(0,10),created:now,expires:now+86400000,revision:0,status:'active',phase:'answer',air:6,wrong:0,history:[],tested:[],rarity:0,bonus:0,receipts:[]};
}
export function expire(run,now=Date.now()){if(run?.status==='active'&&run.expires<=now){run.status='expired';run.phase='finished';run.revision++;}return run;}
export const total=run=>run.rarity+run.bonus;
function finish(run,status){run.status=status;run.phase='finished';}
// Restricted edit distance: one insertion/deletion/substitution, or adjacent transposition.
export function oneTypo(a,b){
 if(Math.abs(a.length-b.length)>1)return false;
 if(a.length===b.length){const diff=[...a].flatMap((c,i)=>c!==b[i]?[i]:[]);return diff.length===1||(diff.length===2&&diff[1]===diff[0]+1&&a[diff[0]]===b[diff[1]]&&a[diff[1]]===b[diff[0]]);}
 if(a.length>b.length)[a,b]=[b,a];let i=0;while(i<a.length&&a[i]===b[i])i++;return a.slice(i)===b.slice(i+1);
}
function input(value){if(typeof value!=='string'||value.length>100||!normalize(value))fail('Enter an answer of up to 100 characters, containing letters.');return normalize(value);}
function matchAnswer(prompt,value){
 const key=input(value);const exact=prompt.answers.find(a=>a.key===key||a.aliases?.includes(key));if(exact)return exact;
 // Short words are ambiguous. Accept longer typos only when exactly one entry matches.
 if(key.length>=5){const matches=prompt.answers.filter(a=>oneTypo(key,a.key)||a.aliases?.some(alias=>oneTypo(key,alias)));if(matches.length===1)return matches[0];}
 fail('That answer is not in this starter dictionary. Try another, or report it for review.');
}
export function applyMove(run,move,now=Date.now()){
 if(!move||typeof move.requestId!=='string'||!/^[\w-]{12,80}$/.test(move.requestId))fail('A valid request ID is required.');
 if(move.runId!==run.id)fail('This attempt has changed. Refresh to resume.',409);
 const digest=createHash('sha256').update(JSON.stringify([move.action,move.prompt,move.value])).digest('hex');
 const receipt=run.receipts.find(r=>r.id===move.requestId);if(receipt){if(receipt.digest!==digest)fail('This request ID was already used.',409);return run;}
 expire(run,now);
 if(run.status!=='active')fail('This dive has ended. Open your result.',409);
 if(move.revision!==run.revision)fail('Another tab updated this dive. Your latest progress has been loaded.',409);
 const requirePhase=p=>{if(run.phase!==p)fail('That action is not available at this step.',409);};
 switch(move.action){
  case 'answer':{
   requirePhase('answer');const prompt=run.puzzle.rounds[run.history.length].find(p=>p.id===move.prompt);if(!prompt)fail('Choose one of the two current prompts.');
   const a=matchAnswer(prompt,move.value),variants=[a.key,...(a.aliases||[])];if(run.history.some(row=>[row.key,...(row.variants||[])].some(key=>variants.includes(key))))fail('You already used that answer. Try a different one.');
   run.rarity+=a.points;const available=[...new Set(a.key)].filter(l=>!run.tested.includes(l));
   run.history.push({prompt:prompt.title,answer:a.word,key:a.key,variants,points:a.points,tier:a.tier,letter:null,result:available.length?'pending':'echo'});
   run.phase=available.length?'probe':'decision';break;
  }
  case 'skip-answer':requirePhase('answer');run.history.push({prompt:'Round skipped',answer:null,points:0,letter:null,result:'skipped'});run.phase='decision';break;
  case 'probe':{
   requirePhase('probe');const row=run.history.at(-1);const letter=move.value;
   if(typeof letter!=='string'||!/^[A-Z]$/.test(letter)||!row.key.includes(letter)||run.tested.includes(letter))fail('Choose an unused letter from your accepted answer.');
   row.letter=letter;run.tested.push(letter);row.result=run.puzzle.canonical.includes(letter)?'hit':'miss';
   if(row.result==='miss')run.air=Math.max(0,run.air-1);run.phase='decision';if(!run.air)finish(run,'bust');break;
  }
  case 'skip-probe':requirePhase('probe');run.history.at(-1).result='skipped';run.phase='decision';break;
  case 'solve':{
   requirePhase('decision');if(run.wrong>=3)fail('All three solve attempts have been used.');
   const key=input(move.value).replace(/^THE/,'');const target=run.puzzle.canonical.replace(/^THE/,'');
   if(key===target||run.puzzle.aliases.includes(key)||(target.length>=8&&oneTypo(key,target))){run.bonus=100+20*run.air+50*(5-run.history.length);finish(run,'solved');}
   else {run.wrong++;run.air=Math.max(0,run.air-2);run.lastGuess=String(move.value).trim();if(!run.air)finish(run,'bust');else if(run.history.length===5&&run.wrong===3)finish(run,'unsolved');}
   break;
  }
  case 'next':requirePhase('decision');if(run.history.length>=5)fail('All five rounds have been played. Solve or finish the dive.');run.phase='answer';delete run.lastGuess;break;
  case 'finish':requirePhase('decision');if(run.history.length!==5)fail('Finish is available after round five.');finish(run,'unsolved');break;
  case 'abandon':finish(run,'abandoned');break;
  default:fail('Unknown move.');
 }
 run.revision++;run.receipts.push({id:move.requestId,digest});return run;
}
export function publicRun(run){
 if(!run)return null;
 const ended=run.status!=='active';
 return {id:run.id,mode:run.mode,day:run.day,revision:run.revision,status:run.status,phase:run.phase,expires:run.expires,category:run.puzzle.category,
  mask:run.puzzle.answer.toUpperCase().split('').map(c=>/[A-Z]/.test(c)&&!run.tested.includes(c)&&!ended?'_':c).join(''),
  lengths:run.puzzle.answer.split(/[ -]/).map(normalize).map(s=>s.length),
  round:Math.min(5,run.history.length+(run.phase==='answer'?1:0)),air:run.air,wrong:run.wrong,rarity:run.rarity,bonus:run.bonus,score:total(run),tested:run.tested,
  history:run.history.map(({key,variants,...row})=>row),lastGuess:run.lastGuess||null,
  prompts:run.phase==='answer'?run.puzzle.rounds[run.history.length].map(p=>({id:p.id,title:p.title})):[],
  available:run.phase==='probe'?[...new Set(run.history.at(-1).key)].filter(l=>!run.tested.includes(l)):[],
  ...(ended?{answer:run.puzzle.answer,explanation:run.puzzle.explanation,puzzleId:run.puzzle.id}:{}),
 };
}
export function summary(run){return {id:run.id,mode:run.mode,day:run.day,status:run.status,score:total(run),air:run.air,rounds:run.history.length};}
export function mergeGuest(account,guest){
 account.seen=[...new Set([...account.seen,...guest.seen])];
 account.starts=[...(account.starts||[]),...(guest.starts||[])].slice(-100);
 account.history=[...account.history,...guest.history.filter(h=>!account.history.some(a=>a.id===h.id))].slice(-100);
 if(guest.runs.practice){
  if(!account.runs.practice||account.runs.practice.status!=='active')account.runs.practice=guest.runs.practice;
  else if(!account.history.some(r=>r.id===guest.runs.practice.id))account.history.push({...summary(guest.runs.practice),status:'abandoned'});
 }
 return account;
}
