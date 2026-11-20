import {skyForAltitude} from './cinema-config.js';
// A deliberately narrow read adapter. Never mutate or retain a game's state object.
export function visualSnapshot(run){
 return {id:run?.id||null,revision:run?.revision??-1,status:run?.status||'welcome',
  sky:skyForAltitude((Number(run?.score)||0)*10),
  stitches:Math.min(5,(run?.history||[]).filter(row=>row.answer).length),
  solved:run?.status==='solved'};
}
export function visualEvents(before,after,action){
 if(!before||!after||before.id!==after.id||after.revision<=before.revision)return [];
 const snapshot=visualSnapshot(after),events=[];
 const event=(kind,detail)=>({kind,detail,snapshot,key:`${after.id}:${after.revision}:${kind}`});
 const last=after.history?.at(-1);
 if(action==='answer'&&after.history.length>before.history.length&&last?.answer){events.push(event(['Rare','Deep cut'].includes(last.tier)?'rare':'correct','answer'));}
 else if(action==='probe'&&after.tested.length>before.tested.length){events.push(event(last?.result==='hit'?'correct':'wrong',last?.result==='hit'?'hit':'miss'));}
 else if(action==='solve'&&after.wrong>before.wrong){events.push(event('wrong','guess'));}
 if(before.status==='active'&&after.status!=='active')events.push(event('landing',after.status));
 else if(snapshot.sky!==visualSnapshot(before).sky)events.push(event('sky','transition'));
 return events;
}
