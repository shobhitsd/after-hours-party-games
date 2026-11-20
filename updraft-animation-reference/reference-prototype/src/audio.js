/* CHAPTER V — The Sound of the Sky.
 * A small self-contained Web Audio ensemble: two pad oscillators, one reusable
 * filtered-noise loop and short melodic cues. Never consulted by game logic.
 * No audio assets, network access, autoplay, or always-running muted timers.
 */
(function(root){
  'use strict';
  const score=root.UpdraftScore || (typeof require==='function' ? require('./soundscore.js') : null);
  const config=(root.UPDRAFT_CONFIG || (typeof require==='function' ? require('./config.js') : null)).audio;
  let mode='off',ctx=null,master=null,ambience=null,windGain=null,windFilter=null,
    padGain=null,tones=[],wind=null,motifTimer=null,activeMoment=null,
    currentAltitude=0,lastUpdate=-10,hidden=false,closingToken=0;
  const modes=['off','quiet','cinematic'];
  const safeFreq=f=>Math.min(4000,Math.max(40,f));
  const now=()=>ctx?ctx.currentTime:0;
  const step=(param,target,time=.4)=>{if(!ctx||!param)return;
    const t=now();param.cancelScheduledValues(t);param.setTargetAtTime(Math.max(.00001,target),t,Math.max(.012,time)/3);
  };
  const level=()=>mode==='off'||hidden?0:config.master*(mode==='quiet'?config.quietScale:1);
  function makeNoise(){
    const length=Math.floor(ctx.sampleRate*config.windLoopSeconds),buffer=ctx.createBuffer(1,length,ctx.sampleRate);
    const channel=buffer.getChannelData(0);let seed=19071,previous=0;
    // Deterministic, smoothly correlated wind; this allocates only on first opt-in.
    for(let i=0;i<length;i++){
      seed=(Math.imul(seed,1664525)+1013904223)>>>0;
      const white=(seed/4294967295)*2-1;
      previous=previous*.91+white*.09;
      channel[i]=previous*.66;
    }
    return buffer;
  }
  function unlock(){
    if(ctx)return true;
    const AudioContext=root.AudioContext||root.webkitAudioContext;
    if(!AudioContext)return false;
    try{
      const audio=new AudioContext();ctx=audio;
      master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
      ambience=ctx.createGain();ambience.connect(master);
      windFilter=ctx.createBiquadFilter();windFilter.type='lowpass';windFilter.frequency.value=700;
      windGain=ctx.createGain();windGain.gain.value=.0001;
      wind=ctx.createBufferSource();wind.buffer=makeNoise();wind.loop=true;
      wind.connect(windFilter);windFilter.connect(windGain);windGain.connect(ambience);wind.start();
      padGain=ctx.createGain();padGain.gain.value=.0001;padGain.connect(ambience);
      tones=[0,1].map((i)=>{
        const osc=ctx.createOscillator();osc.type=i===0?'sine':'triangle';
        osc.frequency.value=i?260:175;
        const envelope=ctx.createGain();envelope.gain.value=i?.25:.65;
        osc.connect(envelope);envelope.connect(padGain);osc.start();return osc;
      });
      // Restrained breathing in the pad. One tiny LFO; no per-frame audio nodes.
      const wobble=ctx.createOscillator();wobble.type='sine';wobble.frequency.value=.09;
      const depth=ctx.createGain();depth.gain.value=.007;
      wobble.connect(depth);depth.connect(padGain.gain);wobble.start();tones.push(wobble);
      const plan=score.at(currentAltitude);applyPlan(plan,true);
      if(ctx.state==='suspended')ctx.resume().catch(()=>{});
      return true;
    }catch(e){try{ctx?.close();}catch(_){}ctx=null;return false;}
  }
  function applyPlan(plan,immediate=false){
    if(!ctx||!windFilter)return;
    const seconds=immediate?.05:config.crossfadeSeconds;
    step(windFilter.frequency,plan.brightness,seconds);
    step(windGain.gain,.065*plan.wind,seconds);
    step(padGain.gain,.035+.011*plan.shimmer,seconds);
    step(tones[0].frequency,safeFreq(plan.root),seconds);
    step(tones[1].frequency,safeFreq(plan.root*1.4983),seconds);
    // Let every atmosphere breathe at its own slow pace.
    if(tones[2])step(tones[2].frequency,.07+plan.pulse*.24,seconds);
  }
  function setAltitude(altitude){
    currentAltitude=Math.max(0,Math.min(2000,Number.isFinite(altitude)?altitude:0));
    if(!ctx)return;
    const time=now();if(Math.abs(currentAltitude-lastUpdate)<16&&time-(setAltitude.lastAt||0)<.22)return;
    lastUpdate=currentAltitude;setAltitude.lastAt=time;
    applyPlan(score.at(currentAltitude));
  }
  function note(frequency,time,duration,gain,bus,type='sine'){
    if(!ctx)return;
    const osc=ctx.createOscillator(),v=ctx.createGain();
    osc.type=type;osc.frequency.setValueAtTime(safeFreq(frequency),time);
    v.gain.setValueAtTime(.00001,time);
    v.gain.exponentialRampToValueAtTime(Math.max(.00002,gain),time+.027);
    v.gain.exponentialRampToValueAtTime(.00001,time+duration);
    osc.connect(v);v.connect(bus);
    osc.onended=()=>{try{osc.disconnect();v.disconnect();}catch(_){}};
    osc.start(time);osc.stop(time+duration+.02);
  }
  function finishMoment(){
    const item=activeMoment;if(!item||!ctx)return;
    step(item.gain.gain,.00001,.05);
    if(ambience)step(ambience.gain,1,.25);
    activeMoment=null;
  }
  function play(kind,history){
    if(mode==='off'||hidden||!ctx)return false;
    const cue=score.cue(kind);if(!cue)return false;
    finishMoment();
    const bus=ctx.createGain();bus.gain.value=1;bus.connect(master);
    // Let Miri's reaction own the foreground; the bed returns after the beat.
    if(ambience)step(ambience.gain,config.cueDuck,.18);
    const t=now()+.022,plan=score.at(currentAltitude);
    activeMoment={kind,gain:bus};
    const isSoft=kind==='wrong'||kind==='landing';
    const notes=kind==='constellation'?score.flightMelody(history):[];
    const steps=notes.length?notes:cue.steps;
    steps.forEach((semitone,i)=>{
      const frequency=plan.root*Math.pow(2,(12+semitone)/12);
      note(frequency,t+i*cue.seconds,.33+(i===steps.length-1?.5:.13),
        cue.level*(isSoft?.83:1),bus,isSoft?'sine':i%2?'triangle':'sine');
    });
    // The burner catches with the lift: noise is filtered, short, and never harsh.
    if(['correct','rare','start'].includes(kind)){
      const p=ctx.createBufferSource();p.buffer=wind.buffer;
      const filter=ctx.createBiquadFilter();filter.type='bandpass';filter.frequency.value=210;filter.Q.value=.43;
      const v=ctx.createGain();v.gain.setValueAtTime(.00001,t);
      v.gain.linearRampToValueAtTime(kind==='rare'?.11:.075,t+.08);
      v.gain.exponentialRampToValueAtTime(.00001,t+.68);
      p.connect(filter);filter.connect(v);v.connect(bus);p.onended=()=>{p.disconnect();filter.disconnect();v.disconnect();};
      p.start(t);p.stop(t+.71);
    }
    // Reclaim the moment bus when the longest envelope finishes.
    const last=steps.length*cue.seconds+1.1;
    // Do not add another timer; the final sentinel's onended unplugs the bus.
    const endNode=ctx.createOscillator(),endGain=ctx.createGain();endGain.gain.value=0;
    endNode.connect(endGain);endGain.connect(bus);
    endNode.onended=()=>{endNode.disconnect();endGain.disconnect();bus.disconnect();
      if(activeMoment?.gain===bus){activeMoment=null;if(ambience)step(ambience.gain,1,.32);}
    };
    endNode.start(t+last);endNode.stop(t+last+.03);
    return true;
  }
  function motif(){
    if(!ctx||hidden||mode!=='cinematic'||!root.document||root.document.hidden)return;
    const s=score.at(currentAltitude), t=now()+.04;
    const pattern=s.tier===4?[0,7,14]:s.tier===3?[0,5]:s.tier===2?[0,4,9]:s.tier===1?[0,7,9]:[0,4];
    pattern.forEach((n,i)=>note(s.root*2*Math.pow(2,n/12),t+i*.54,.8,.019+s.shimmer*.009,ambience,'sine'));
  }
  function startMotif(){stopMotif();motifTimer=setInterval(motif,config.motifEveryMs);}
  function stopMotif(){if(motifTimer!==null){clearInterval(motifTimer);motifTimer=null;}}
  function setMode(next){
    if(!modes.includes(next))next='off';
    if(next==='off'){
      mode='off';stopMotif();finishMoment();
      if(ctx){
        const old=ctx,token=++closingToken;step(master.gain,0,.10);
        // Stop all three continuous oscillators and wind after the fade.
        setTimeout(()=>{
          if(token!==closingToken)return;
          try{wind?.stop();tones.forEach(o=>o.stop());old.close().catch(()=>{});}catch(_){}
          ctx=null;master=null;ambience=null;windGain=null;windFilter=null;padGain=null;wind=null;tones=[];
        },240);
      }
      return mode;
    }
    // Prevent an old fade-out from closing a freshly resumed score.
    if(ctx&&mode==='off'){
      ++closingToken;
    }
    if(!unlock()){mode='off';return mode;}
    mode=next;
    if(ctx.state==='suspended')ctx.resume().catch(()=>{});
    step(master.gain,level(),.32);setAltitude(currentAltitude);
    if(mode==='cinematic')startMotif();else stopMotif();
    return mode;
  }
  function setHidden(next){
    hidden=!!next;
    if(ctx){
      step(master.gain,level(),.12);
      if(hidden){
        const parked=ctx;setTimeout(()=>{if(hidden&&ctx===parked&&mode!=='off')parked.suspend().catch(()=>{});},280);
      } else if(mode!=='off'&&ctx.state==='suspended')ctx.resume().catch(()=>{});
    }
  }
  function inspect(){return {mode,enabled:mode!=='off',active:!!ctx&&!hidden,altitude:currentAltitude,tier:score.at(currentAltitude).name};}
  const api={get enabled(){return mode!=='off';},get mode(){return mode;},setMode,
    toggle(){return setMode(mode==='off'?'cinematic':'off')!=='off';},
    setAltitude,play,stopMoment:finishMoment,setHidden,inspect};
  root.UpdraftAudio=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
