import {randomInt,randomBytes,randomUUID,createHash} from 'node:crypto';
import {packedTemplates,packedPools,packedQuestions} from './packed-content.js';
import {proofText} from './public/packed-proof.js';
const insist=(ok,message)=>{if(!ok)throw new Error(message);};
const shuffle=a=>{const b=[...a];for(let i=b.length-1;i>0;i--){const j=randomInt(i+1);[b[i],b[j]]=[b[j],b[i]];}return b;};
export function validatePackedOptions(o){
 insist(Number.isInteger(o.packedRounds)&&o.packedRounds>=5&&o.packedRounds<=10,'Choose 5–10 rounds.');
 for(const key of ['packedRankSeconds','packedPickSeconds'])insist(Number.isInteger(o[key])&&o[key]>=10&&o[key]<=120,'Choose timers from 10 to 120 seconds.');
 insist(typeof o.packedAnonymous==='boolean'&&typeof o.packedSoftLanding==='boolean','Choose valid house rules.');
 insist(['curated','custom'].includes(o.packedPack),'Choose a curated or custom pack.');
 insist(Array.isArray(o.packedCustom)&&o.packedCustom.length<=30,'Use at most 30 custom questions.');
 for(const q of o.packedCustom){insist(q&&typeof q.question==='string'&&q.question.trim().length>0&&q.question.length<=120,'Each custom question needs 1–120 characters.');insist(Array.isArray(q.options)&&q.options.length>=5&&q.options.length<=6&&q.options.every(x=>typeof x==='string'&&x.trim().length>0&&x.length<=40)&&new Set(q.options.map(x=>x.trim().toLowerCase())).size===q.options.length,'Give each custom question 5 or 6 distinct options (up to 40 characters).');}
 insist(new Set(o.packedCustom.map(q=>q.question.trim().toLowerCase())).size===o.packedCustom.length,'Use a different question for every round.');
}
export function aggregateRankings(optionIds,rankings,tieOrder){
 const scores=Object.fromEntries(optionIds.map(id=>[id,{id,total:0,first:0,last:0}]));
 for(const ranking of rankings)ranking.forEach((id,i)=>{scores[id].total+=optionIds.length-i;if(i===0)scores[id].first++;if(i===optionIds.length-1)scores[id].last++;});
 const order=Object.fromEntries(tieOrder.map((id,i)=>[id,i]));return Object.values(scores).sort((a,b)=>b.total-a.total||b.first-a.first||a.last-b.last||order[a.id]-order[b.id]);
}
export function roomPayout(pool,capacity,count,soft=false){
 if(!count)return {each:0,awarded:0,lost:pool,remainder:0,status:'empty'};
 if(count>capacity){const each=soft&&count===capacity+1?1:0;return {each,awarded:each*count,lost:pool,remainder:0,status:each?'soft':'crash'};}
 const each=Math.floor(pool/count);return {each,awarded:each*count,lost:pool-each*count,remainder:pool-each*count,status:'fits'};
}
export function packedStandings(r){return [...r.players].sort((a,b)=>b.score-a.score||r.packedStats[b.id].scored-r.packedStats[a.id].scored||r.packedStats[a.id].zero-r.packedStats[b.id].zero);}
export function initPacked(r){
 const k=r.players.length>=9?6:5;
 const questions=r.options.packedPack==='custom'?r.options.packedCustom.map(q=>[q.question.trim(),q.options.map(x=>x.trim())]):packedQuestions;
 insist(questions.length>=r.options.packedRounds,'Add at least one different custom question per round.');insist(questions.every(q=>q[1].length>=k),`Each question needs ${k} options for this group.`);
 r.total=r.options.packedRounds;r.seatedCount=r.players.length;r.packedQuestions=shuffle(questions);r.packedStats=Object.fromEntries(r.players.map(p=>[p.id,{scored:0,zero:0}]));r.paused=null;r.endedEarly=null;
}
export function nextPacked(r,stage){
 const caps=packedTemplates[r.seatedCount],k=caps.length,[question,options]=r.packedQuestions[r.round-1],board=shuffle(options).slice(0,k);
 const proof={roundId:randomUUID(),version:'PH-1.0',seatedCount:r.seatedCount,capacities:caps.map(max=>randomInt(1,max+1)),tieOrder:shuffle(board.map((_,i)=>i)),nonce:randomBytes(32).toString('hex')};
 r.data={question,board,proof,commitment:createHash('sha256').update(proofText(proof)).digest('hex'),rankings:{},picks:{},tiers:[],receipts:{}};stage(r,'rank',r.options.packedRankSeconds);
}
export function expectedPacked(r){return ['rank','pick'].includes(r.stage)?r.players.filter(p=>p.connected!==false).map(p=>p.id):[];}
export function packedAction(r,id,action,value,{touch,stage,advance},requestId){
 insist(r.status==='playing','This game has finished.');
 if(action==='endPacked'){insist(id===r.host&&r.paused,'Only the host can end a paused game.');endPacked(r,stage,'The host ended the paused game.');return;}
 insist(!r.paused,'The game is paused while players reconnect.');
 insist(!r.deadline||Date.now()<r.deadline,'Time is up. Wait for the next phase.');
 insist(action==='submit'&&['rank','pick'].includes(r.stage),'Submit only during Rank or Pick.');insist(expectedPacked(r).includes(id),'Only connected seated players can submit.');
 const k=r.data.board.length;
 if(r.stage==='rank')insist(Array.isArray(value)&&value.length===k&&new Set(value).size===k&&value.every(i=>Number.isInteger(i)&&i>=0&&i<k),'Rank every option exactly once.');
 else insist(Number.isInteger(value)&&value>=0&&value<k,'Choose one of the available rooms.');
 if(requestId!==undefined){insist(typeof requestId==='string'&&/^[a-zA-Z0-9-]{8,80}$/.test(requestId),'Invalid request identifier.');const key=id+':'+requestId,fingerprint=JSON.stringify([r.phaseId,action,value]);if(r.data.receipts[key]){insist(r.data.receipts[key]===fingerprint,'Request identifier was reused.');return;}insist(Object.keys(r.data.receipts).length<5000,'Too many submissions this round.');r.data.receipts[key]=fingerprint;}
 r.actions[id]=Array.isArray(value)?[...value]:value;touch(r);
 if(r.practice&&expectedPacked(r).every(p=>p in r.actions)){r.practiceReady=true;touch(r);}
}
export function advancePacked(r,{stage,reveal}){
 const d=r.data;
 if(r.stage==='rank'){
  d.rankings=Object.fromEntries(expectedPacked(r).filter(id=>id in r.actions).map(id=>[id,[...r.actions[id]]]));d.tiers=aggregateRankings(d.board.map((_,i)=>i),Object.values(d.rankings),d.proof.tieOrder).map((s,i)=>({...s,tier:i+1,pool:packedPools[i],range:[1,packedTemplates[r.seatedCount][i]]}));r.actions={};stage(r,'pick',r.options.packedPickSeconds);return;
 }
 if(r.stage==='pick'){d.picks=Object.fromEntries(expectedPacked(r).filter(id=>id in r.actions).map(id=>[id,r.actions[id]]));reveal(r);}
}
export function scorePacked(r){
 const d=r.data,points=Object.fromEntries(r.players.map(p=>[p.id,0]));
 const rooms=d.tiers.map(t=>{const ids=r.players.filter(p=>d.picks[p.id]===t.id).map(p=>p.id),capacity=d.proof.capacities[t.tier-1],payout=roomPayout(t.pool,capacity,ids.length,r.options.packedSoftLanding);ids.forEach(id=>points[id]=payout.each);return {...t,label:d.board[t.id],capacity,players:ids,...payout};});
 const rows=r.players.map(p=>{const room=rooms.find(t=>t.id===d.picks[p.id]);const amount=points[p.id];r.packedStats[p.id][amount>0?'scored':'zero']++;return {id:p.id,answer:room?.label||'No pick',correct:amount>0,extra:!room?'No pick · no seat taken · 0 points':room.status==='fits'?`${room.pool} ÷ ${room.players.length} ${room.remainder?'→':'='} ${room.each} each${room.remainder?` · ${room.remainder} point${room.remainder===1?'':'s'} lost to rounding`:''}`:room.status==='soft'?'One over capacity · Soft Landing +1':`${room.players.length} entered, ${room.capacity} seats · ${room.players.length-room.capacity} too many · 0 each`};});
 const ballotRows=Object.entries(d.rankings).map(([id,ranking])=>({...(r.options.packedAnonymous?{}:{id}),ranking}));
 return {headline:'Did your room have space?',detail:`${d.question} Pools are split by the people who entered. Unused rooms do not carry points forward.`,points,rows,packed:{rooms,rankings:r.options.packedAnonymous?shuffle(ballotRows):ballotRows,proof:d.proof,rankingCount:ballotRows.length,softLanding:r.options.packedSoftLanding}};
}
export function endPacked(r,stage,reason){r.status='finished';r.endedEarly=reason;r.paused=null;r.result=null;stage(r,'finished',0);}
export function packedPresence(r,{touch,stage},now=Date.now()){
 if(r.game!=='packed'||r.status!=='playing'||r.practice)return false;let changed=false;
 const connected=r.players.filter(p=>p.connected!==false);
 if(!connected.some(p=>p.id===r.host)){const next=connected.filter(p=>!p.bot).sort((a,b)=>(a.connectedSince||0)-(b.connectedSince||0))[0];if(next&&next.id!==r.host){r.host=next.id;touch(r);changed=true;}}
 if(connected.length<4&&!r.paused){r.paused={until:now+120000,remaining:r.deadline?Math.max(0,r.deadline-now):null};r.deadline=null;touch(r);changed=true;}
 if(r.paused&&now>=r.paused.until){endPacked(r,stage,'Fewer than four players reconnected within two minutes. Completed scores were kept.');return true;}
 if(r.paused&&connected.length>=4){r.deadline=r.paused.remaining===null?null:now+r.paused.remaining;r.paused=null;touch(r);changed=true;}
 return changed;
}
export function packedView(r,id){
 const d=r.data,rank=r.stage==='rank',picker=r.stage==='pick',spectator=!r.players.some(p=>p.id===id);
 const sorted=packedStandings(r),best=sorted[0],winners=sorted.filter(p=>p.score===best.score&&r.packedStats[p.id].scored===r.packedStats[best.id].scored&&r.packedStats[p.id].zero===r.packedStats[best.id].zero).map(p=>p.id);
 return {role:spectator?'Spectator':'Room seeker',spectator,question:d.question,board:d.board,roundId:d.proof.roundId,commitment:d.commitment,seatedCount:r.seatedCount,paused:r.paused?{until:r.paused.until}:null,endedEarly:r.endedEarly,canAct:!spectator&&!r.paused&&r.status==='playing'&&(rank||picker)&&r.players.find(p=>p.id===id)?.connected!==false,ownRanking:d.rankings[id],tiers:d.tiers.map(({total,first,last,...t})=>t),stats:r.packedStats,standings:sorted.map(p=>p.id),winners};
}
