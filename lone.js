import {randomInt} from 'node:crypto';
import {loneQuestions} from './lone-content.js';

const requireRule=(ok,message)=>{if(!ok)throw new Error(message);};
const validChoice=(value,n)=>Number.isInteger(value)&&value>=0&&value<n;
function shuffled(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=randomInt(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}
export function initLone(r){
 r.lone={reverseRound:randomInt(2,r.players.length+1),jackpot:0,previous:null,questions:shuffled(loneQuestions),stats:Object.fromEntries(r.players.map(p=>[p.id,{ranked:0,unique:0,streak:0,bestStreak:0,collisions:0,detective:0,sucker:0,ghost:0,spyAvailable:true}]))};
}
export function nextLone(r,stage){
 const pool=r.players.filter(p=>p.id!==r.lone.previous&&r.lone.stats[p.id].ranked<2).flatMap(p=>Array(3-r.lone.stats[p.id].ranked).fill(p.id));
 const leader=pool[randomInt(pool.length)];r.lone.stats[leader].ranked++;r.lone.previous=leader;
 const [question,options]=r.lone.questions[r.round-1],board=shuffled(options).slice(0,r.players.length+(r.round===r.total?1:-1));
 r.data={leader,question,board,ranking:null,claim:null,spies:{},picks:{},beliefs:{},autoPicks:[],underdog:randomInt(100)<r.options.loneUnderdogChance?randomInt(board.length):null};
 stage(r,'rank',r.options.loneRankSeconds);
}
export function loneExpected(r){
 if(r.stage==='rank')return [r.data.leader];
 if(r.stage==='pick')return r.players.map(p=>p.id).filter(id=>!r.data.spies[id]);
 if(r.stage==='spy')return Object.keys(r.data.spies);
 return [];
}
export function loneAction(r,id,action,value,{stage,touch,completePhase}){
 const d=r.data,stats=r.lone.stats;
 requireRule(r.status==='playing'&&!['reveal','finished'].includes(r.stage),'Wait for the next round.');
 requireRule(!r.deadline||Date.now()<r.deadline,'Time is up. Wait for the next phase.');
 if(action==='skipTalk'){
  requireRule(id===r.host&&r.stage==='talk','Only the host can finish discussion.');r.actions={};stage(r,'pick',r.options.lonePickSeconds);return;
 }
 if(action==='claim'){
  requireRule(r.stage==='talk'&&id===d.leader,'Only the Ranker can record a claim during discussion.');
  requireRule(value&&validChoice(value.first,d.board.length),'Choose the option you claim to have ranked first.');
  requireRule(typeof value.message==='string'&&value.message.trim().length<=160,'Use at most 160 characters.');
  d.claim={first:value.first,message:value.message.trim()};touch(r);return;
 }
 if(action==='spyTarget'){
  requireRule(['talk','pick'].includes(r.stage)&&!r.practiceReady,'Play your Spy Card during discussion or before picks close.');
  requireRule(stats[id].spyAvailable&&!d.spies[id]&&!(id in r.actions),'Your Spy Card is unavailable or your pick is already locked.');
  requireRule(value!==id&&r.players.some(p=>p.id===value),'Choose another player to spy on.');
  d.spies[id]={target:value,public:false,refunded:false};stats[id].spyAvailable=false;touch(r);
  if(r.practice&&r.stage==='pick'&&loneExpected(r).every(p=>p in r.actions))completePhase(r);return;
 }
 if(action==='revealSpy'){
  requireRule(['talk','pick','spy'].includes(r.stage)&&d.spies[id]&&!d.spies[id].public,'Your target is already public or you have not played a Spy Card.');
  d.spies[id].public=true;touch(r);return;
 }
 requireRule(action==='submit','Invalid action.');
 requireRule(loneExpected(r).includes(id),'It is not your turn to act.');requireRule(!(id in r.actions),'Your answer is already locked in.');
 if(r.stage==='rank'){
  requireRule(Array.isArray(value)&&value.length===d.board.length&&new Set(value).size===d.board.length&&value.every(i=>validChoice(i,d.board.length)),'Rank every option exactly once.');
  r.actions[id]=[...value];
 }else{
  const pick=typeof value==='object'&&value!==null?value.pick:value,belief=typeof value==='object'&&value!==null?value.belief:'unsure';
  requireRule(validChoice(pick,d.board.length),'Choose one of the available options.');
  requireRule(['believe','doubt','unsure'].includes(belief),'Choose a valid read on the claim.');
  d.beliefs[id]=belief;r.actions[id]=pick;
 }
 touch(r);
 // Multiplayer Pick always waits for the timer, allowing all Spy Cards to resolve together.
 if(loneExpected(r).every(p=>p in r.actions)&&(r.stage!=='pick'||r.practice))completePhase(r);
}
export function advanceLone(r,{stage,reveal}){
 const d=r.data;
 if(r.stage==='rank'){d.ranking=r.actions[d.leader]||shuffled(d.board.map((_,i)=>i));d.autoRank=!r.actions[d.leader];r.actions={};stage(r,'talk',r.options.loneTalkSeconds);return;}
 if(r.stage==='talk'){r.actions={};stage(r,'pick',r.options.lonePickSeconds);return;}
 if(r.stage==='pick'){
  for(const id of loneExpected(r)){if(!(id in r.actions)){r.actions[id]=randomInt(d.board.length);d.autoPicks.push(id);}d.picks[id]=r.actions[id];}
  const refunded=new Set();for(const [id,spy]of Object.entries(d.spies))if(d.spies[spy.target]){refunded.add(id);refunded.add(spy.target);}
  for(const id of refunded){d.spies[id].refunded=true;r.lone.stats[id].spyAvailable=true;}
  if(Object.keys(d.spies).length){r.actions={};stage(r,'spy',r.options.loneSpySeconds);}else reveal(r);return;
 }
 if(r.stage==='spy'){
  for(const id of loneExpected(r)){if(!(id in r.actions)){r.actions[id]=randomInt(d.board.length);d.autoPicks.push(id);}d.picks[id]=r.actions[id];}
  reveal(r);
 }
}
// Deterministic: every random draw was committed before scoring begins.
export function scoreLone(r){
 const d=r.data,l=r.lone,stats=l.stats,final=r.round===r.total,reverse=r.round===l.reverseRound;
 const values=d.board.map((_,i)=>(reverse?d.ranking.indexOf(i)+1:d.board.length-d.ranking.indexOf(i))*(final?2:1));
 const groups=d.board.map((_,i)=>r.players.filter(p=>d.picks[p.id]===i).map(p=>p.id));
 const unique=r.players.filter(p=>groups[d.picks[p.id]].length===1).map(p=>p.id),eligible=unique.filter(id=>id!==d.leader);
 const collisions=groups.filter(ids=>ids.length>1).length,mastermind=Math.min(2,collisions),pot=l.jackpot;
 const jackpotWinner=eligible.length?[...eligible].sort((a,b)=>values[d.picks[b]]-values[d.picks[a]])[0]:null;
 l.jackpot=eligible.length?0:Math.min(6,pot+3);stats[d.leader].collisions+=collisions;
 const claimTrue=d.claim?d.claim.first===d.ranking[0]:null;
 const points={},rows=r.players.map(p=>{
  const id=p.id,s=stats[id],alone=unique.includes(id),ranker=id===d.leader,value=values[d.picks[id]];
  s.streak=alone?s.streak+1:0;s.bestStreak=Math.max(s.bestStreak,s.streak);if(alone)s.unique++;
  const discounted=ranker?Math.ceil(value/2):value,streak=s.streak>=3?2:s.streak===2?1.5:1,lms=alone&&!ranker&&unique.length===1;
  const multiplier=Math.min(2,streak*(lms?2:1)),base=alone?discounted*multiplier:0;
  const underdog=alone&&d.picks[id]===d.underdog?2:0,master=ranker?mastermind:0,jackpot=id===jackpotWinner?pot:0;
  points[id]=base+underdog+master+jackpot;
  if(!ranker&&claimTrue===false&&d.beliefs[id]==='doubt')s.detective++;
  if(!ranker&&claimTrue===false&&d.beliefs[id]==='believe'&&d.picks[id]===d.claim.first&&!alone)s.sucker++;
  if(d.spies[id]&&!d.spies[id].refunded&&alone)s.ghost=Math.max(s.ghost,points[id]);
  const parts=[alone?`${value}${ranker?` → Ranker base ${discounted}`:''} × ${multiplier} = ${base}${lms?' · Last Man Standing':''}`:'Collision · 0 pick points'];
  if(underdog)parts.push('Underdog +2');if(master)parts.push(`Mastermind +${master}`);if(jackpot)parts.push(`Jackpot +${jackpot}`);if(d.autoPicks.includes(id))parts.push('Random timeout pick');
  return {id,answer:d.board[d.picks[id]],correct:alone,extra:parts.join(' · '),breakdown:{value,discounted,multiplier,base,underdog,mastermind:master,jackpot,streak:s.streak,lms}};
 });
 let finalJackpot=null;
 if(final&&l.jackpot){
  const lowest=Math.min(...r.players.map(p=>p.score+points[p.id])),last=r.players.filter(p=>p.score+points[p.id]===lowest),share=Math.floor(l.jackpot/last.length);
  finalJackpot={pot:l.jackpot,share,players:last.map(p=>p.id),unpaidRemainder:l.jackpot-share*last.length};
  for(const p of last){points[p.id]+=share;const row=rows.find(x=>x.id===p.id);row.extra+=` · Final Jackpot +${share}`;row.breakdown.finalJackpot=share;}l.jackpot=0;
 }
 return {headline:reverse?'Surprise: reverse ranking!':final?'Final round. Bigger choices.':`${unique.length} solo ${unique.length===1?'pick':'picks'}. ${collisions} crowded ${collisions===1?'option':'options'}.`,detail:`${d.question} ${final?'Final base values are doubled. ':''}${jackpotWinner&&pot?'The Jackpot has been claimed.':!eligible.length?`Dead round: Jackpot ${final?'settled below':`grows to ${l.jackpot}`}.`:'Only unique picks earn option points.'}`,rows,points,lone:{reverse,final,underdog:d.underdog,claim:d.claim,claimTrue,autoRank:d.autoRank,ranking:d.ranking,options:d.board.map((label,i)=>({label,players:groups[i],value:values[i],rank:d.ranking.indexOf(i)+1})),jackpot:l.jackpot,finalJackpot,telemetry:{claimTrue,followedClaim:d.claim?r.players.filter(p=>p.id!==d.leader&&d.picks[p.id]===d.claim.first).length:0,collisionOptions:collisions,lastManStanding:unique.length===1&&unique[0]!==d.leader}}};
}
export function loneAwards(r){
 const awards=[['The Silver Tongue','collisions','Collided options across Ranker rounds'],['The Detective','detective','Recorded doubts about false first-place claims'],['The Solo Maverick','unique','Unique picks'],['The Sucker','sucker','Believed a false first-place claim and collided on it'],['The Streak Master','bestStreak','Longest run of unique picks'],['The Ghost','ghost','Best unique-pick score after a successful Spy Card']];
 return awards.map(([title,key,description])=>{const value=Math.max(...Object.values(r.lone.stats).map(s=>s[key]));return {title,description,value,winners:value?r.players.filter(p=>r.lone.stats[p.id][key]===value).map(p=>p.id):[]};});
}
export function loneView(r,id){
 const d=r.data,spy=d.spies[id],revealed=['reveal','finished'].includes(r.stage);
 return {role:id===d.leader?'Ranker':'Player',question:d.question,board:d.board,ranking:id===d.leader?d.ranking:undefined,claim:d.claim,jackpot:r.lone.jackpot,finalRound:r.round===r.total,uniqueCounts:Object.fromEntries(Object.entries(r.lone.stats).map(([id,s])=>[id,s.unique])),streak:r.lone.stats[id].streak,spyAvailable:r.lone.stats[id].spyAvailable,
  spy:spy?{target:spy.target,public:spy.public,refunded:spy.refunded,...(r.stage==='spy'&&!spy.refunded?{peek:d.picks[spy.target]}:{})}:null,
  spyPlayers:Object.entries(d.spies).map(([id,s])=>({id,...(s.public?{target:s.target}:{})})),
  ownPick:d.picks[id],ownBelief:d.beliefs[id],...(r.stage==='finished'?{awards:loneAwards(r)}:{}),...(revealed?{ranking:d.ranking}:{})};
}
