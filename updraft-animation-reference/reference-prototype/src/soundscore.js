/* A pure, testable score map. Sound responds to altitude; it never changes gameplay. */
(function(root){
  'use strict';
  const cfg=root.UPDRAFT_CONFIG || (typeof require==='function' ? require('./config.js') : null);
  const bounded=(n,min,max)=>Math.max(min,Math.min(max,Number.isFinite(n)?n:0));
  function at(altitude){
    const height=bounded(altitude,0,2000),tiers=cfg.sky.tiers,voices=cfg.audio.skies;
    let low=0;
    for(let i=1;i<tiers.length;i++)if(height>=tiers[i].alt)low=i;
    const high=Math.min(low+1,tiers.length-1);
    const fraction=low===high?0:bounded((height-tiers[low].alt)/(tiers[high].alt-tiers[low].alt),0,1);
    const a=voices[low],b=voices[high];
    const between=(key)=>a[key]+(b[key]-a[key])*fraction;
    return Object.freeze({
      tier:low,upcoming:high,blend:fraction,
      name:tiers[low].name,subtitle:a.subtitle,
      wind:between('wind'),brightness:between('brightness'),
      root:between('root'),pulse:between('pulse'),shimmer:between('shimmer')
    });
  }
  function cue(kind){return cfg.audio.cues[kind]||null;}
  function flightMelody(history){
    // Every perfect route gets a reproducible five-note phrase from its question IDs.
    // Missed answers do not produce a constellation song, mirroring Sky Mail.
    if(!Array.isArray(history)||history.length!==5||history.some(item=>!item||!item.hit))return [];
    const scale=[0,2,4,7,9];
    return history.map((item,i)=>{
      let hash=2166136261;
      for(const c of String(item.id)){hash^=c.charCodeAt(0);hash=Math.imul(hash,16777619);}
      return scale[(hash>>>0)%scale.length]+(i>=3?12:0);
    });
  }
  const api=Object.freeze({at,cue,flightMelody,modes:Object.freeze(['off','quiet','cinematic'])});
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.UpdraftScore=api;
})(typeof window!=='undefined'?window:globalThis);
