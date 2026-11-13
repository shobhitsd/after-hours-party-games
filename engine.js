import { randomUUID, randomInt } from 'node:crypto';
import { games, associations, decoys, filler, prompts, pairSets, borrowedSets, destinationSets } from './data.js';
import { chooseBotAction, chooseLoneSideAction } from './bots.js';
import {initLone,nextLone,loneExpected,loneAction,advanceLone,scoreLone,loneView} from './lone.js';
import { choicePacks, defaultOptions } from './variety.js';

export const shuffle = a => { const b=[...a]; for(let i=b.length-1;i>0;i--){const j=randomInt(i+1); [b[i],b[j]]=[b[j],b[i]];} return b; };
const insist = (ok, message) => { if(!ok) throw new Error(message); };
const short = (value,max=60) => { insist(typeof value==='string','Please enter some text.'); const s=value.trim(); insist(s.length>0 && s.length<=max,`Use 1–${max} characters.`); return s; };
const oneWord = v => { const s=short(v,30); insist(/^[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*$/u.test(s),'Use one word, without spaces or punctuation.'); return s; };
const choice = (v,n) => { insist(Number.isInteger(v) && v>=0 && v<n,'Choose one of the available cards.'); return v; };
const list = (v,n,len) => { insist(Array.isArray(v)&&v.length===len&&new Set(v).size===len,`Choose exactly ${len} different cards.`); return v.map(i=>choice(i,n)); };
const player = (name,bot=false) => ({ id:randomUUID(), token:randomUUID(), name:short(name,20), score:0, bot });
export function createRoom(code,name,practice=false){
  const host=player(name); const room={code,host:host.id,players:[host],game:null,selectedGame:'signals',options:{...defaultOptions},status:'lobby',round:0,stage:'lobby',created:Date.now(),updated:Date.now(),seed:randomInt(10000),practice,revision:0,phaseId:0};
  if(practice) ['Miso','Cleo','Ziggy','Pip','Nova'].forEach(n=>room.players.push(player(n.toLowerCase()===host.name.toLowerCase()?`${n} Bot`:n,true)));
  return {room,host};
}
export function joinRoom(room,name){
  insist(room.status==='lobby','This game is already running. Join after the host returns to the lounge.');
  insist(room.players.length<8,'This room is full (eight players maximum).');
  const p=player(name); insist(!room.players.some(x=>x.name.toLowerCase()===p.name.toLowerCase()),'That name is taken. Try another.');
  room.players.push(p); touch(room); return p;
}
function touch(room){room.revision++;room.updated=Date.now();}
function stage(room,value,seconds=60){room.stage=value;room.phaseId++;room.since=Date.now();room.deadline=seconds&&!room.practice?Date.now()+seconds*1000:null;room.practiceReady=false;touch(room);}
function completePhase(room){if(room.practice){room.practiceReady=true;touch(room);}else advance(room);}
function validateOptions(options){
 insist(options&&typeof options==='object'&&!Array.isArray(options),'Choose valid game options.');
 insist(Object.keys(options).every(key=>Object.hasOwn(defaultOptions,key)),'Unknown game option.');
 const next={...defaultOptions,...options};
 insist([6,9,12].includes(next.signalCards),'Choose 6, 9, or 12 cards.');
 insist(next.seatPack==='mixed'||Object.hasOwn(choicePacks,next.seatPack),'Choose a valid topic pack.');
 insist(['open','mystery'].includes(next.seatLimits),'Choose visible or mystery limits.');
 for(const key of ['loneRankSeconds','loneTalkSeconds','lonePickSeconds'])insist(Number.isInteger(next[key])&&next[key]>=10&&next[key]<=120,'Choose a timer between 10 and 120 seconds.');
 insist(Number.isInteger(next.loneSpySeconds)&&next.loneSpySeconds>=5&&next.loneSpySeconds<=30,'Choose a Spy Window between 5 and 30 seconds.');
 insist(Number.isInteger(next.loneUnderdogChance)&&next.loneUnderdogChance>=0&&next.loneUnderdogChance<=100,'Choose an Underdog chance from 0 to 100 percent.');return next;
}
export function configureRoom(room,id,game,options={}){
 insist(id===room.host,'Only the host can choose game options.');insist(room.status==='lobby','Options can only change in the lounge.');
 insist(typeof game==='string'&&Object.hasOwn(games,game),'Choose a game.');const next=validateOptions(options);
 room.selectedGame=game;room.options=next;touch(room);
}
export function startGame(room,id,game,options=room.options){
  insist(room.host===id,'Only the host can start the game.'); insist(room.status!=='playing','Finish this game first.');
  insist(typeof game==='string'&&Object.hasOwn(games,game),'Choose a game.');const g=games[game];
  insist(room.players.length>=g.min&&room.players.length<=g.max,`${g.name} needs ${g.min}–${g.max} players.`);
  if(['twins','borrowed'].includes(game)) insist(room.players.length%2===0,'This game needs an even number of players.');
  const nextOptions=validateOptions(options);room.options=nextOptions;room.selectedGame=game;
  room.game=game;room.status='playing';room.round=0;room.total=g.rounds||room.players.length;room.players.forEach(p=>p.score=0);room.history=[];room.seed=randomInt(10000);
  room.deck=shuffle(Array.from({length:game==='crowd'?prompts.length:game==='twins'?pairSets.length:associations.length},(_,i)=>i));
  if(game==='seat'){room.seatTopics=shuffle(Object.keys(choicePacks));room.seatRounds=shuffle([0,1,2,3,4,5]);}
  if(game==='lone')initLone(room);
  nextRound(room);
}
function nextRound(r){
  r.round++; r.result=null; r.actions={}; const index=r.deck[(r.round-1)%r.deck.length]; const ids=r.players.map(p=>p.id); const leader=ids[(r.round-1)%ids.length];
  r.data={leader};
  if(r.game==='lone'){nextLone(r,stage);return;}
  if(r.game==='signals'){
    const set=associations[index%associations.length]; r.data.suggested=set[0];r.data.boards={};
    const vocabulary=[...new Set(associations.flatMap(([,targets,others])=>[...targets,...others]))].filter(w=>!set[1].includes(w)&&w.toLowerCase()!==set[0].toLowerCase());
    ids.filter(id=>id!==leader).forEach((id,i)=>{const section=i%3;const target=set[1][section];const distractors=set[2].slice(section*5,section*5+5).filter(w=>!set[1].includes(w)&&w.toLowerCase()!==set[0].toLowerCase());if(i>=3)distractors[distractors.length-1]=vocabulary.filter(w=>!distractors.includes(w))[(index+i)%20];const extra=shuffle(vocabulary.filter(w=>!distractors.includes(w)));while(distractors.length<r.options.signalCards-1)distractors.push(extra.pop());const cards=shuffle([target,...distractors]);r.data.boards[id]={cards,target:cards.indexOf(target)};});stage(r,'clue');
  } else if(r.game==='decoy'){
    const set=decoys[(r.seed+r.round-1)%decoys.length];const pos=ids.indexOf(leader);r.data.saboteurs=[ids[(pos+1)%ids.length],ids[(pos+2)%ids.length]];
    r.data.target=set.target;r.data.suggested=set.clue;r.data.board=shuffle([set.target,...set.related]);r.data.hands=Object.fromEntries(r.data.saboteurs.map((id,i)=>[id,set.decoys.slice(i*4,i*4+4)]));r.data.decoys={};stage(r,'clue',45);
  } else if(r.game==='crowd'){
    const p=prompts[index%prompts.length];r.data.prompt=p[0];r.data.suggested=p[1];r.data.target=randomInt(1,ids.length-1);stage(r,'tune');
  } else if(r.game==='seat'){
    const topic=r.options.seatPack==='mixed'?r.seatTopics[r.round-1]:r.options.seatPack;const pack=choicePacks[topic];const cards=pack.rounds[r.seatRounds[r.round-1]];r.data.question=pack.question;r.data.topic=pack.name;
    r.data.destinations=destinationSets[r.round-1].map(([, ,base,reward],i)=>{const [name,icon]=cards[i];const capacity=base===99?99:Math.min(ids.length-1,base+(ids.length>=7?1:0));const range=capacity===99?null:[Math.max(1,capacity-1),Math.min(ids.length-1,capacity+1)];return {name,icon,reward,safe:capacity===99,capacityRange:range,capacity:capacity===99?99:r.options.seatLimits==='mystery'?randomInt(range[0],range[1]+1):capacity};});stage(r,'talk',30);
  } else if(r.game==='twins'){
    const pairs=shuffle(pairSets[index%pairSets.length]).slice(0,ids.length/2);const order=shuffle(ids);r.data.words={};r.data.partners={};r.data.clues={};
    pairs.forEach((pair,i)=>{r.data.words[order[i*2]]=pair[0];r.data.words[order[i*2+1]]=pair[1];r.data.partners[order[i*2]]=order[i*2+1];r.data.partners[order[i*2+1]]=order[i*2];});stage(r,'clue');
  } else if(r.game==='borrowed'){
    r.data.teams=[ids.filter((_,i)=>i%2===0),ids.filter((_,i)=>i%2===1)];r.data.givers=r.data.teams.map(team=>team[(r.round-1)%team.length]);
    r.total=ids.length/2; // Both teams play each round; every player gives one clue.
    r.data.sets=[0,1].map(t=>{const set=borrowedSets[(r.seed+(r.round-1)*2+t)%borrowedSets.length];const hand=shuffle(set.clue);return {target:set.target,hand,initialHand:[...hand],removed:[],clue:[],redrawn:false};});
    const targets=r.data.sets.map(s=>s.target);r.data.board=shuffle([...targets,...shuffle(borrowedSets.map(x=>x.target).filter(x=>!targets.includes(x))).slice(0,6)]);stage(r,'sabotage',40);
  }
}
export function expected(r){
 const ids=r.players.map(p=>p.id),d=r.data;
 if(['reveal','finished','lobby'].includes(r.stage))return [];
 if(r.game==='lone')return loneExpected(r);
 if(r.game==='seat')return r.stage==='talk'?[]:ids;
 if(r.game==='twins')return ids;
 if(r.game==='borrowed')return r.stage==='guess'?ids.filter(id=>!d.givers.includes(id)):d.givers;
 if(['clue','tune'].includes(r.stage))return [d.leader];
 if(r.game==='decoy')return r.stage==='sabotage'?d.saboteurs:ids.filter(id=>id!==d.leader&&!d.saboteurs.includes(id));
 return ids.filter(id=>id!==d.leader);
}
export function act(r,id,action,value){
  insist(r.players.some(p=>p.id===id),'Player not found.');
  if(action==='lobby'){insist(id===r.host,'Only the host can return everyone to the lounge.');r.status='lobby';stage(r,'lobby',0);r.data=null;r.actions={};r.result=null;r.game=null;return;}
  if(action==='next'){insist(id===r.host,'Only the host can advance the round.');insist(r.stage==='reveal','Wait for the reveal.');if(r.round>=r.total){r.status='finished';stage(r,'finished',0);}else nextRound(r);return;}
  if(action==='skipTalk'&&r.game!=='lone'){insist(id===r.host && r.game==='seat'&&r.stage==='talk','Only the host can finish discussion.');stage(r,'pick',30);return;}
  if(action==='continuePractice'){insist(r.practice&&r.host===id&&r.practiceReady&&r.status==='playing','Wait for everyone to lock in before continuing the demo.');advance(r);return;}
  if(r.game==='lone'){loneAction(r,id,action,value,{stage,touch,completePhase});return;}
  insist(r.status==='playing'&&expected(r).includes(id),'It is not your turn to act.');insist(!(id in r.actions),'Your answer is already locked in.');
  insist(!r.deadline||Date.now()<r.deadline,'Time is up. Wait for the next phase.');
  const d=r.data;
  if(r.game==='signals'&&r.stage==='clue'){
    insist(action==='submit','Invalid action.');value=oneWord(value);insist(!Object.values(d.boards).some(b=>b.cards.some(w=>w.toLowerCase()===value.toLowerCase())),'Your clue cannot be a word on a board.');
  }else if(r.game==='signals') value=choice(value,d.boards[id].cards.length);
  else if(r.game==='decoy'&&r.stage==='clue'){value=oneWord(value);insist(!d.board.some(w=>w.toLowerCase()===value.toLowerCase()),'Your clue cannot be a word on the board.');}
  else if(r.game==='decoy'&&r.stage==='sabotage')value=choice(value,d.hands[id].length);
  else if(r.game==='decoy')value=choice(value,d.board.length);
  else if(r.game==='crowd'&&r.stage==='tune')value=short(value,45);
  else if(r.game==='crowd'){insist(typeof value==='boolean','Choose yes or no.');}
  else if(r.game==='seat')value=choice(value,4);
  else if(r.game==='twins'&&r.stage==='clue'){value=short(value,35);insist(!value.toLowerCase().includes(d.words[id].toLowerCase()),'Give a clue without saying your secret word.');}
  else if(r.game==='twins'){insist(id!==value&&r.players.some(p=>p.id===value),'Choose another player.');}
  else if(r.game==='borrowed'){
    const team=d.givers.indexOf(id);
    if(r.stage==='sabotage')value=list(value,12,3);
    else if(r.stage==='clue'){
      const set=d.sets[team];
      if(action==='redraw'){insist(!set.redrawn,'You have used your redraw.');const replacements=shuffle(['Near','Far','Happy','Fast','Slow','Large','Small','Together','Bright','People','Place','Thing','Inside','Outside','Morning','Evening','Light','Heavy','Fun','Work','Life','Move','Touch','See'].filter(w=>!set.hand.includes(w)));set.hand=set.hand.map((w,i)=>set.removed.includes(i)?w:replacements.pop());set.redrawn=true;touch(r);return;}
      insist(Array.isArray(value)&&value.length>=1&&value.length<=3,'Arrange one to three word cards.');value=list(value,12,value.length);insist(value.every(i=>!set.removed.includes(i)),'That card was removed.');
    }else value=choice(value,d.board.length);
  }
  insist(action==='submit','Invalid action.');r.actions[id]=value;touch(r);
  if(expected(r).every(p=>p in r.actions))completePhase(r);
}
function advance(r){
 if(r.game==='lone'){advanceLone(r,{stage,reveal});return;}
 const d=r.data,a=r.actions;
 if(r.game==='signals'&&r.stage==='clue'){d.clue=a[d.leader]||'…';r.actions={};stage(r,'guess',45);}
 else if(r.game==='decoy'&&r.stage==='clue'){d.clue=a[d.leader]||'…';r.actions={};stage(r,'sabotage',30);}
 else if(r.game==='decoy'&&r.stage==='sabotage'){d.saboteurs.forEach(id=>{d.decoys[id]=d.hands[id][a[id]??0];});d.board=shuffle([...d.board,...Object.values(d.decoys)]);r.actions={};stage(r,'guess',40);}
 else if(r.game==='crowd'&&r.stage==='tune'){d.question=d.prompt.replace('___',a[d.leader]||'…');r.actions={};stage(r,'vote',30);}
 else if(r.game==='seat'&&r.stage==='talk'){r.actions={};stage(r,'pick',30);}
 else if(r.game==='twins'&&r.stage==='clue'){d.clues={...a};r.actions={};stage(r,'match',40);}
 else if(r.game==='borrowed'&&r.stage==='sabotage'){d.givers.forEach((id,t)=>d.sets[1-t].removed=a[id]||[0,1,2]);r.actions={};stage(r,'clue',45);}
 else if(r.game==='borrowed'&&r.stage==='clue'){d.givers.forEach((id,t)=>d.sets[t].clue=(a[id]||[]).map(i=>d.sets[t].hand[i]));r.actions={};stage(r,'guess',40);}
 else reveal(r);
}
function reveal(r){
  const d=r.data,a=r.actions,points=Object.fromEntries(r.players.map(p=>[p.id,0]));let rows=[],headline='',detail='';
  if(r.game==='lone'){r.result=scoreLone(r);r.players.forEach(p=>p.score+=r.result.points[p.id]);r.history.push(r.result);stage(r,'reveal',0);return;}
  if(r.game==='signals'){
    rows=Object.entries(d.boards).map(([id,b])=>({id,answer:b.cards[a[id]]||'No answer',target:b.cards[b.target],correct:a[id]===b.target}));const count=rows.filter(x=>x.correct).length;const total=count+(count===rows.length?2:0);r.players.forEach(p=>points[p.id]=total);headline=count===rows.length?'Perfect connection!':`${count} of ${rows.length} signals connected`;detail=`“${d.clue}” earned the group ${total} points${count===rows.length?' — including a 2-point bonus':''}.`;
  }else if(r.game==='decoy'){
    rows=expected(r).map(id=>{const word=d.board[a[id]];const correct=word===d.target;if(correct){points[id]++;points[d.leader]++;}const owner=Object.keys(d.decoys).find(s=>d.decoys[s]===word);if(owner)points[owner]+=2;return {id,answer:word||'No answer',target:d.target,correct,extra:owner?'A saboteur’s decoy!':''};});headline=`The real answer: ${d.target}`;detail=`The clue was “${d.clue}”. Decoys: ${Object.values(d.decoys).join(' and ')}.`;
  }else if(r.game==='crowd'){
    const count=Object.values(a).filter(v=>v===true).length;const diff=Math.abs(count-d.target);points[d.leader]=diff===0?3:diff===1?1:0;rows=r.players.filter(p=>p.id!==d.leader).map(p=>({id:p.id,answer:p.id in a?(a[p.id]?'Yes':'No'):'No vote',correct:a[p.id]===true}));headline=diff===0?'You read the room!':diff===1?'So close. One vote away.':'A room full of surprises.';detail=`Target: ${d.target} yes votes. Actual: ${count}. The setter earns ${points[d.leader]} points.`;
  }else if(r.game==='seat'){
    rows=r.players.map(p=>{const dest=d.destinations[a[p.id]];const count=Object.values(a).filter(v=>v===a[p.id]).length;const correct=!!dest&&count<=dest.capacity;if(correct)points[p.id]=dest.reward;return {id:p.id,answer:dest?.name||'No choice',correct,extra:dest?`${count} chose this · ${dest.safe?'No limit':`limit ${dest.capacity}`} · ${correct?`+${dest.reward} points`:'Too crowded: 0 points'}`:'No selection'};});headline='Did everyone have the same idea?';detail=`${d.question} ${r.options.seatLimits==='mystery'?'The exact limits are now revealed.':'Crowded choices pay nothing.'}`;
  }else if(r.game==='twins'){
    rows=r.players.map(p=>{const correct=a[p.id]===d.partners[p.id]&&a[d.partners[p.id]]===p.id;if(correct)points[p.id]=2;return {id:p.id,answer:d.words[p.id],target:r.players.find(x=>x.id===d.partners[p.id]).name,correct,extra:`Picked ${r.players.find(x=>x.id===a[p.id])?.name||'nobody'} · partner word: ${d.words[d.partners[p.id]]}`};});headline=`${rows.filter(x=>x.correct).length/2} pairs found their person`;detail='Both partners must choose each other to earn two points each.';
  }else if(r.game==='borrowed'){
    rows=d.teams.map((team,t)=>{const votes=team.filter(id=>id!==d.givers[t]&&id in a).map(id=>a[id]);const counts=d.board.map((_,i)=>votes.filter(v=>v===i).length);const chosen=votes.length?counts.indexOf(Math.max(...counts)):-1;const answer=d.board[chosen];const correct=answer===d.sets[t].target;if(correct)team.forEach(id=>points[id]++);return {id:d.givers[t],label:t===0?'Team Peach':'Team Violet',answer:answer||'No answer',target:d.sets[t].target,correct,extra:`Clue: ${d.sets[t].clue.join(' → ')||'No clue'}`,removed:d.sets[t].removed.map(i=>d.sets[t].initialHand[i]),redrawn:d.sets[t].redrawn};});headline='A little lost in translation?';detail='One point per teammate for each correct team answer.';
  }
  r.players.forEach(p=>p.score+=points[p.id]);r.result={headline,detail,rows,points};r.history.push(r.result);stage(r,'reveal',0);
}
export function tick(r,now=Date.now()){
  if(r.status!=='playing'||['reveal','finished'].includes(r.stage)||r.practiceReady)return false;
  if(r.deadline&&now>=r.deadline){advance(r);return true;}
  let changed=false;
  const phase=r.phaseId;
  if(now-r.since>1800){
    for(const p of r.players.filter(p=>p.bot)){
      if(r.phaseId!==phase||r.practiceReady)break;
      if(r.game==='lone'){const move=chooseLoneSideAction(view(r,p.id));if(move){act(r,p.id,move.action,move.value);changed=true;}if(r.phaseId!==phase||r.practiceReady)break;}
      if(expected(r).includes(p.id)&&!(p.id in r.actions)){act(r,p.id,'submit',chooseBotAction(view(r,p.id)));changed=true;}
    }
  }
  if(r.phaseId===phase&&r.deadline&&now>=r.deadline){advance(r);changed=true;}
  return changed;
}
export function view(r,id){
 const me=r.players.find(p=>p.id===id);insist(me,'Player not found.');
 const v={code:r.code,host:r.host,me:id,practice:r.practice,practiceReady:r.practiceReady,revision:r.revision,phaseId:r.phaseId,options:r.options,selectedGame:r.selectedGame,players:r.players.map(({token,...p})=>p),status:r.status,stage:r.stage,game:r.game,round:r.round,total:r.total,deadline:r.deadline,serverTime:Date.now(),result:r.result||null};
 if(r.status==='lobby')return v;
 const d=r.data;v.submitted=Object.keys(r.actions||{});v.expectedCount=expected(r).length;v.canAct=expected(r).includes(id)&&!(id in r.actions);v.ownAnswer=r.actions[id];v.leader=d.leader;
 if(r.game==='lone')return Object.assign(v,loneView(r,id));
 if(r.game==='signals'){
   v.clue=d.clue;v.role=id===d.leader?'Signal sender':'Receiver';
   if(id===d.leader)v.boards=d.boards;else v.board=d.boards[id].cards;
 }else if(r.game==='decoy'){
   v.clue=d.clue;v.role=id===d.leader?'Guide':d.saboteurs.includes(id)?'Saboteur':'Guesser';
   if(v.role!=='Guesser')v.target=d.target;
   if(r.stage==='guess'||r.stage==='reveal'||v.role==='Guide')v.board=d.board;
   if(v.role==='Saboteur')v.hand=d.hands[id];
 }else if(r.game==='crowd'){
   v.role=id===d.leader?'Question setter':'Voter';v.prompt=d.prompt;v.question=d.question;if(id===d.leader)v.target=d.target;
 }else if(r.game==='seat'){v.role='Decision maker';v.question=d.question;v.topic=d.topic;v.destinations=d.destinations.map(({capacity,...option})=>({...option,...(r.options.seatLimits==='open'||option.safe||['reveal','finished'].includes(r.stage)?{capacity}:{})}));}
 else if(r.game==='twins'){v.role='Secret twin';v.word=d.words[id];if(r.stage!=='clue')v.clues=d.clues;}
 else if(r.game==='borrowed'){
   const t=d.teams.findIndex(team=>team.includes(id));v.team=t;v.teams=d.teams;v.givers=d.givers;v.role=d.givers.includes(id)?'Clue-giver':'Guesser';v.board=d.board;
   if(v.role==='Clue-giver'){
     v.teamHands=d.sets.map(set=>({cards:set.hand,removed:set.removed,redrawn:set.redrawn}));
     const opponent=d.sets[1-t];v.opponentHand={cards:opponent.hand,initialCards:opponent.initialHand,removed:opponent.removed,redrawn:opponent.redrawn};
     if(r.stage==='sabotage')v.hand=d.sets[1-t].hand;
     else {v.hand=d.sets[t].hand;v.target=d.sets[t].target;v.removed=d.sets[t].removed;v.redrawn=d.sets[t].redrawn;}
   }
   if(r.stage==='guess'||r.stage==='reveal')v.clue=d.sets[t].clue;
 }
 return v;
}
