/* Chapter IV · The Flight Atlas. Pure local-record model; no DOM or storage access. */
(function(root){
 'use strict';
 const VERSION=1, MAX_DAYS=90;
 const cleanDate=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s+'T12:00:00Z'))&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s;
 const keyFor=(date=new Date())=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
 function previousDates(today=keyFor(),count=7){
  if(!cleanDate(today))return [];
  const d=new Date(today+'T12:00:00Z');
  return Array.from({length:Math.max(0,Math.min(count,31))},(_,i)=>{
   const copy=new Date(d);copy.setUTCDate(d.getUTCDate()-i);return copy.toISOString().slice(0,10);
  });
 }
 const empty=()=>({version:VERSION,days:{}});
 function asEntry(value){
  if(!value||typeof value!=='object'||Array.isArray(value))return null;
  const flights=Number(value.flights),best=Number(value.best),peak=Number(value.peak),answered=Number(value.answered);
  if(![flights,best,peak,answered].every(Number.isInteger)||flights<1||flights>999||best<0||best>5||answered<1||answered>5||best>answered||peak<0||peak>10000)return null;
  return {flights,best,peak,answered,perfect:best===5};
 }
 function normalize(input){
  let data=input;
  if(typeof input==='string'){try{data=JSON.parse(input);}catch{return empty();}}
  if(!data||data.version!==VERSION||typeof data.days!=='object'||!data.days||Array.isArray(data.days))return empty();
  const days={};
  Object.entries(data.days).filter(([k])=>cleanDate(k)).sort(([a],[b])=>b.localeCompare(a)).slice(0,MAX_DAYS).forEach(([k,v])=>{
   const entry=asEntry(v);if(entry)days[k]=entry;
  });
  return {version:VERSION,days};
 }
 function record(input,date,flight){
  const log=normalize(input);
  if(!cleanDate(date)||!flight||flight.phase!=='end')return log;
  const score=Number(flight.correct),answered=flight.history?.length,peak=Math.round(Number(flight.peak));
  if(!Number.isInteger(score)||!Number.isInteger(answered)||!Number.isInteger(peak)||score<0||score>5||answered<1||answered>5||score>answered||peak<0||peak>10000)return log;
  const old=log.days[date];
  log.days[date]={flights:Math.min(999,(old?.flights||0)+1),best:Math.max(old?.best||0,score),peak:Math.max(old?.peak||0,peak),answered:Math.max(old?.answered||0,answered),perfect:score===5||!!old?.perfect};
  return normalize(log);
 }
 function summary(log,today=keyFor()){
  const entries=previousDates(today,7).map(date=>({date,...(normalize(log).days[date]||{flights:0,best:0,peak:0,answered:0,perfect:false})}));
  return {entries,flown:entries.filter(e=>e.flights>0).length,stars:entries.reduce((n,e)=>n+e.best,0)};
 }
 const api=Object.freeze({VERSION,keyFor,previousDates,normalize,record,summary});
 root.UpdraftLogbook=api;
 if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
