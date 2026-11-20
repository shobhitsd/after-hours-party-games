/* Updraft's presentation layer. Game logic is never changed by an animation callback. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const cfg=window.UPDRAFT_CONFIG, logic=window.UpdraftLogic, audio=window.UpdraftAudio, soundscore=window.UpdraftScore, acting=window.UpdraftActing, postcard=window.UpdraftPostcard, atlas=window.UpdraftLogbook, cinema=window.UpdraftSkyCinema;
const world=$('world');
// All new effects use GPU-friendly opacity/translation. Tunable from config.
world.style.setProperty('--ribbon-opacity', cfg.cinematography.ribbonOpacity);
world.style.setProperty('--veil-opacity', cfg.cinematography.veilOpacity);
world.style.setProperty('--beam-opacity', cfg.cinematography.sunbeamOpacity);
world.style.setProperty('--cloud-rush',cfg.cinematography.cloudRushPx+'px');
world.style.setProperty('--cloud-dip',cfg.cinematography.cloudDipPx+'px');
world.style.setProperty('--kite-breath',cfg.cinematography.kiteFloatSeconds+'s');
world.dataset.shot='still';
// The portrait borrows Miri's exact original SVG face and expression rig. No second asset.
$('portrait-face').appendChild(document.querySelector('.balloon-art .head').cloneNode(true));
const prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let game=logic.createGame(logic.deckFor(logic.dailySeed()));
const todaySeed=logic.dailySeed();
const STORAGE_KEY='updraft.flight.atlas.v1';
function loadAtlas(){try{return atlas.normalize(localStorage.getItem(STORAGE_KEY));}catch{return atlas.normalize(null);}}
function saveAtlas(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(atlasState));return true;}catch{return false;}}
let atlasState=loadAtlas();
let routeSeed=todaySeed,routeMode='daily',lastAtlasOpener=null;
let flightNumber=0,visualAltitude=0,altitudeTween=null,awaitingContinue=null;
let beat=null,beatTimer=null,beatQueue=[],frameCount=0,lastFpsTime=0;
let lastLiveTier=0;
const duration=(ms)=>reduced()?cfg.motion.reducedMs:ms*cfg.motion.debugTimeScale;
const reduced=()=>prefersReduced.matches||$('debug-reduced').checked;
const mobileView=()=>matchMedia('(max-width:900px)').matches;
function focusScene(){if(mobileView())world.scrollIntoView({block:'start',behavior:reduced()?'instant':'smooth'});}
function focusPanel(){if(mobileView())$('paper-panel').scrollIntoView({block:'start',behavior:reduced()?'instant':'smooth'});}
const expressions=['calm','happy','rueful','awe','wink','curious','thinking','soft'];
// Player attention never hints at correctness: every option gets the same curious gaze.
function setCurious(on){
  if(beat||awaitingContinue||game.phase!=='playing')on=false;
  world.classList.toggle('is-curious',on);
  if(on)world.dataset.expression='curious';
  else if(!beat&&game.phase==='playing')world.dataset.expression='calm';
}
function sewScarfStars(){
  document.querySelectorAll('.scarf-star').forEach((star,i)=>{
    star.classList.toggle('is-found',i<game.correct);
    star.classList.toggle('just-found',i===game.correct-1&&game.history.at(-1)?.hit===true);
  });
}
const hitLines=[
  'That answer has wings! Did you feel us lift?',
  'Oh, I knew I picked the right co-pilot.',
  'Well, the clouds are applauding. Quietly.',
  'You and I, we make a splendid crew.',
  'Look at you! A proper collector of wonders.'
];
const missLines=[
  'Ah. A scenic little detour. We do those.',
  'My! The balloon has developed an opinion.',
  'A wobble, not a worry. Still with me?',
  'I meant to show you those clouds anyway.'
];
const tierLines=[
  'Look at that! A completely different shade of sky.',
  'I have a feeling the clouds know our names now.',
  'The sunlight looks like melted honey up here.',
  'Is it me, or can we hear the stars?',
  'Oh... even the night has a garden. Look!'
];
const layers=cfg.sky.tiers.map((tier,index)=>{
  const layer=document.querySelector('.sky-'+index);
  layer.style.background=`linear-gradient(to bottom,${tier.sky[0]} 0%,${tier.sky[1]} 53%,${tier.sky[2]} 100%)`;
  return layer;
});
const fmt=n=>Math.max(0,Math.round(n)).toString().padStart(4,'0');
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const smooth=t=>1-Math.pow(1-t,3);
const particleHost=$('effect-particles');
// Fixed DOM pool: bursts reuse the same 36 nodes; no per-answer allocations or leaks.
const particlePool=Array.from({length:cfg.motion.particles.poolSize},()=>{
  const particle=document.createElement('span');particle.className='spark';
  particle.hidden=true;particleHost.appendChild(particle);return particle;
});
const resetParticles=()=>{
  for(const particle of particlePool){particle.hidden=true;particle.classList.remove('active');}
  $('debug-particles').textContent='0';
};
const stars=$('starfield');
const kite=$('sky-visitor'), nearCloudSvg=document.querySelector('.near-clouds svg'), farCloudSvg=document.querySelector('.far-clouds svg');
let kiteMoving=false;
for(let i=0;i<54;i++){
  const seed=(i*79+13)%97,other=(i*37+43)%101,s=document.createElement('i');
  s.className='star'+(i%11===0?' cross':'');
  s.style.left=(4+seed*.91)+'%';s.style.top=(7+other*.74)+'%';
  s.style.animationDelay=(-i*.27)+'s';s.style.animationDuration=(2.6+(i%7)*.46)+'s';
  s.style.opacity=String(.3+(i%5)*.13);
  stars.appendChild(s);
}

function skyAt(alt){
  const tiers=cfg.sky.tiers;let low=0;
  for(let i=1;i<tiers.length;i++)if(alt>=tiers[i].alt)low=i;
  const high=Math.min(low+1,tiers.length-1),frac=low===high?0:clamp((alt-tiers[low].alt)/(tiers[high].alt-tiers[low].alt),0,1);
  const cloud=tiers[low].cloud+(tiers[high].cloud-tiers[low].cloud)*frac;
  return {low,high,frac,cloud,star:clamp((alt-760)/630,0,1),aurora:clamp((alt-1320)/350,0,.88)};
}
function renderAltitude(alt){
  visualAltitude=alt;
  const sky=skyAt(alt), atmosphere=cinema.profile(alt);
  kite.style.opacity=atmosphere.kite;
  const kiteInRange=atmosphere.kite>0;
  if(kiteInRange!==kiteMoving){kiteMoving=kiteInRange;kite.classList.toggle('in-range',kiteMoving);}
  nearCloudSvg.style.setProperty('--altitude-drift', atmosphere.near+'px');
  farCloudSvg.style.setProperty('--altitude-drift', atmosphere.far+'px');
  world.style.setProperty('--sunlight-strength',atmosphere.light);
  world.classList.toggle('night-sky',alt>=890);
  layers.forEach((l,i)=>{l.style.opacity=(i===sky.low?1-sky.frac:i===sky.high?sky.frac:0).toFixed(3);});
  // Exactly one sky state (altitude) drives the atmosphere and HUD.
  stars.style.opacity=sky.star.toFixed(3);
  document.querySelector('.aurora').style.opacity=sky.aurora.toFixed(3);
  document.querySelector('.sun-halo').style.opacity=String(clamp(1-alt/1650,.02,1));
  document.querySelector('.near-clouds').style.opacity=String(clamp(sky.cloud*.94,0,1));
  document.querySelector('.far-clouds').style.opacity=String(clamp(sky.cloud*.87,0,1));
  document.querySelector('.ground').style.transform=`translate3d(0,${Math.round(clamp(alt*.26,0,330))}px,0)`;
  document.querySelector('.flying-birds').style.opacity=String(clamp(.75-alt/650,0,.75));
  audio.setAltitude(alt);
  $('altitude-num').textContent=fmt(alt);
  $('altimeter-progress').style.width=(clamp(alt/2000,0,1)*100)+'%';
  const liveTier=logic.getTierIndex(alt);
  if(liveTier!==lastLiveTier){
    lastLiveTier=liveTier;
    const t=cfg.sky.tiers[liveTier];
    $('tier-name').textContent=t.name.toUpperCase();
    updateSoundscape();
    $('tier-micro').textContent=['A GOOD PLACE TO BEGIN','THE CLOUDS SAY HELLO','FOLLOW THE GOLDEN WIND','WHERE THE AIR TURNS BLUE','THE STARS ARE LISTENING'][liveTier];
  }
}
function stopAltitudeTween(){if(altitudeTween){cancelAnimationFrame(altitudeTween.raf);altitudeTween=null;}}
function animateAltitude(to,ms){
  stopAltitudeTween();
  if(reduced()||ms<=0){renderAltitude(to);return;}
  const from=visualAltitude,start=performance.now(),state={raf:0};altitudeTween=state;
  function tick(now){
    if(document.hidden){state.raf=requestAnimationFrame(tick);return;}
    const progress=clamp((now-start)/ms,0,1);
    renderAltitude(from+(to-from)*smooth(progress));
    if(progress<1&&altitudeTween===state)state.raf=requestAnimationFrame(tick);
    else if(altitudeTween===state)altitudeTween=null;
  }
  state.raf=requestAnimationFrame(tick);
}
function fuelUI(){
  const holder=$('fuel-capsules');holder.replaceChildren();
  for(let i=0;i<cfg.game.maxFuel;i++){
    const cell=document.createElement('span');cell.className='fuel-cell'+(i>=game.fuel?' empty':'');
    cell.setAttribute('aria-hidden','true');holder.appendChild(cell);
  }
  holder.setAttribute('aria-label',`${game.fuel} of ${cfg.game.maxFuel} fuel left`);
  $('fuel-numeric').textContent=`${game.fuel} / ${cfg.game.maxFuel}`;
  world.classList.toggle('is-low-fuel',game.fuel<=2);
  $('debug-fuel').value=game.fuel;$('debug-fuel-value').textContent=game.fuel;
}
function view(id){
  for(const v of ['intro','question','result','end'])$(v+'-view').hidden=v!==id;
}
function say(text,expression='calm'){
  world.dataset.expression=expressions.includes(expression)?expression:'calm';
  $('speech-text').textContent=text;
}
function clearCinematic(){
  world.dataset.shot='still';
  world.classList.remove('moment-hit','moment-miss','moment-rare','moment-tier','moment-landing','moment-perfect','moment-constellation','moment-wave');
  resetParticles();
}
function shower(count){
  resetParticles();
  if(reduced())return;
  const visible=Math.min(count,particlePool.length);
  for(let i=0;i<visible;i++){
    const s=particlePool[i];
    s.textContent=['✧','✦','·','✳'][i%4];
    const angle=Math.PI*2*i/visible,radius=90+(i%5)*21;
    s.style.setProperty('--dx',`${Math.cos(angle)*radius}px`);
    s.style.setProperty('--dy',`${Math.sin(angle)*radius*.9}px`);
    s.style.setProperty('--spin',`${(i%2?1:-1)*110}deg`);
    s.style.animationDelay=`${(i%5)*.047}s`;
    s.hidden=false;s.classList.add('active');
  }
  $('debug-particles').textContent=visible;
}

// Exactly one cinematic can play. All UI advances are attached to director completion.
function enqueue(item){beatQueue.push(item);$('debug-queue').textContent=beatQueue.length;runNext();}
function runNext(){
  if(beat||!beatQueue.length)return;
  const item=beatQueue.shift();$('debug-queue').textContent=beatQueue.length;
  clearCinematic();
  if(item.scene){
    world.dataset.shot=cinema.shot(item.scene).name;
    const direction=acting.directionFor(item.scene);
    $('film-caption-text').textContent=direction.caption;
    $('film-caption-short').textContent=direction.shortCaption;
  }
  beat={...item,remaining:duration(item.ms),began:performance.now()};
  world.style.setProperty('--beat-ms',beat.remaining+'ms');
  $('debug-event').textContent=item.name;
  updateOverlay();
  if(item.start)item.start();
  if(!document.hidden)beatTimer=setTimeout(finishBeat,beat.remaining);
}
function finishBeat(){
  if(!beat)return;
  clearTimeout(beatTimer);beatTimer=null;
  // Skips commit the intended visual end state, never leave an altitude tween alive.
  stopAltitudeTween();
  const item=beat;beat=null;
  clearCinematic();audio.stopMoment();
  $('debug-event').textContent='IDLE';updateOverlay();
  if(item.end)item.end();
  runNext();
}
function skipBeat(){if(!beat)return;finishBeat();}
function flushDirector(){
  watchTheSky(false);
  clearTimeout(beatTimer);beatTimer=null;beat=null;beatQueue=[];
  $('debug-event').textContent='IDLE';$('debug-queue').textContent='0';clearCinematic();audio.stopMoment();updateOverlay();
}
function updateOverlay(){
  const el=$('event-overlay');
  el.hidden=!$('debug-overlay').checked;
  el.textContent=beat?`DIRECTOR · ${beat.name} · ${Math.round(beat.remaining)}ms`:'DIRECTOR · IDLE';
}
function showQuestion(){
  world.classList.remove('is-curious');
  view('question');
  const openings=['I have a little wonder for you.','A new question, fresh from the breeze.','Here comes one I quite like.','Ooh, this is a curious one.','Final wonder. Shall we make it count?'];
  if(game.index===0&&routeMode==='archive')openings[0]='An old sky! I remember the light up here.';
  else if(game.index===0&&routeMode==='practice')openings[0]='An encore! Just you, me, and the clouds.';
  else if(game.index===0&&atlasState.days[todaySeed])openings[0]='Welcome back! I kept your seat warm.';
  say(openings[game.index],'calm');
  const q=game.deck[game.index];$('question-counter').textContent=`WONDER ${String(game.index+1).padStart(2,'0')} / 05`;
  $('topic-label').textContent=q.topic;$('question-text').textContent=q.question;
  const dots=$('progress-dots');dots.replaceChildren();
  for(let i=0;i<game.deck.length;i++){
    const d=document.createElement('i');d.className='dot'+(i<game.index?' complete':i===game.index?' active':'');dots.appendChild(d);
  }
  const options=$('answer-buttons');options.replaceChildren();
  q.choices.forEach((choice,index)=>{
    const b=document.createElement('button');b.className='answer-choice';b.type='button';b.setAttribute('aria-label',`${String.fromCharCode(65+index)}. ${choice}`);
    const letter=document.createElement('span');letter.className='choice-letter';letter.textContent=String.fromCharCode(65+index);
    const text=document.createElement('span');text.className='choice-text';text.textContent=choice;
    b.append(letter,text);b.addEventListener('click',()=>choose(index));
    b.addEventListener('pointerenter',()=>setCurious(true));
    b.addEventListener('pointerleave',()=>setCurious(false));
    b.addEventListener('focus',()=>setCurious(true));
    b.addEventListener('blur',()=>setCurious(false));
    options.appendChild(b);
  });
  $('question-hint').textContent='NO CLOCK. JUST CURIOSITY.';
}
function watchTheSky(on){
  $('result-view').classList.toggle('is-watching',on);
  $('watching-beat').hidden=!on;
  for(const id of ['result-title','result-fact','result-note']){
    if(on)$(id).setAttribute('aria-hidden','true');
    else $(id).removeAttribute('aria-hidden');
  }
}
function showResult(event){
  view('result');
  watchTheSky(true);
  const q=event.question;
  $('result-kicker').textContent=event.hit?'A LITTLE MOMENT OF WONDER':'A GENTLE CHANGE OF WIND';
  $('result-symbol').textContent=event.hit?q.icon:'↝';
  $('result-title').textContent=event.hit?['Wonderful, really.','The sky approves.','Look what you found!','A brilliant little thought.','Up, up and beautifully done.'][game.index]:'A little wobble.';
  $('result-fact').textContent=q.fact;
  $('result-note').replaceChildren();
  const symbol=document.createElement('span');symbol.textContent='✦';
  $('result-note').append(symbol,document.createTextNode(event.hit?' A NEW PAGE IN YOUR FLIGHT JOURNAL':` THE ANSWER: ${q.choices[q.correct].toUpperCase()}`));
  $('skip-button').textContent='Skip the moment  →';
}
function drawSkyWriting(){
  const svg=$('sky-writing-svg');svg.replaceChildren();
  const items=game.history.length?game.history:game.deck.map(q=>({id:q.id,hit:true,icon:q.icon}));
  const points=postcard.pointsFromHistory(items);
  if(!points.length)return;
  const ns='http://www.w3.org/2000/svg';
  const path=document.createElementNS(ns,'path');
  path.classList.add('sky-ink');
  path.setAttribute('d',points.map((p,i)=>(i?'L':'M')+p.x+' '+p.y).join(' '));
  path.setAttribute('pathLength','1');svg.appendChild(path);
  points.forEach((p,i)=>{
    const halo=document.createElementNS(ns,'circle');halo.classList.add('sky-star-halo');
    halo.setAttribute('cx',p.x);halo.setAttribute('cy',p.y);halo.setAttribute('r','25');
    halo.style.setProperty('--star-index',i);svg.appendChild(halo);
    const star=document.createElementNS(ns,'path');star.classList.add('sky-star');
    star.style.setProperty('--star-index',i);
    star.setAttribute('d',`M${p.x} ${p.y-19} L${p.x+5} ${p.y-5} L${p.x+19} ${p.y} L${p.x+5} ${p.y+5} L${p.x} ${p.y+19} L${p.x-5} ${p.y+5} L${p.x-19} ${p.y} L${p.x-5} ${p.y-5} Z`);
    svg.appendChild(star);
  });
}
function choose(choiceIndex){
  if(game.phase!=='playing'||beat||awaitingContinue)return;
  world.classList.remove('is-curious');
  const previous=game;const result=logic.answer(game,choiceIndex);
  if(!result.event)return;
  game=result.game;
  const ev=result.event;
  const buttons=Array.from($('answer-buttons').children);
  buttons.forEach((b,i)=>{
    b.disabled=true;if(i===ev.question.correct)b.classList.add('correct-choice');
    if(i===choiceIndex&&!ev.hit)b.classList.add('wrong-choice');
  });
  fuelUI();sewScarfStars();
  showResult(ev);
  focusScene();
  const type=ev.hit?(ev.rarity==='rare'?'moment-rare':'moment-hit'):'moment-miss';
  const finalPerfect=ev.hit&&ev.finished&&game.correct===game.deck.length;
  $('portrait-line').textContent=finalPerfect?'FIVE WONDERS. AND YOU FOUND THEM ALL.':'DID YOU SEE WHAT WE JUST FOUND?';
  enqueue({scene:ev.hit?(ev.rarity==='rare'?'rare':'correct'):'wrong',name:ev.kind,ms:ev.hit?(ev.rarity==='rare'?cfg.motion.rareMs:cfg.motion.correctMs):cfg.motion.wrongMs,
    start(){
      world.classList.add(type);if(finalPerfect)world.classList.add('moment-perfect');
      say(ev.hit?hitLines[game.index]:missLines[game.index%missLines.length],ev.hit?(ev.rarity==='rare'?'awe':'happy'):'soft');
      animateAltitude(ev.toAltitude,duration(cfg.motion.altitudeMs));
      if(ev.hit)shower(ev.rarity==='rare'?cfg.motion.particles.rare:cfg.motion.particles.common);
      audio.play(ev.hit?(ev.rarity==='rare'?'rare':'correct'):'wrong');
    },
    end(){
      renderAltitude(ev.toAltitude);say(ev.hit?'A new horizon, thanks to you.':'A good explorer learns both ways.','wink');
      if(ev.toTier>ev.fromTier){
        enqueue({scene:'tier',name:'TIER_CHANGE',ms:cfg.motion.tierMs,
          start(){
            world.classList.add('moment-tier');
            $('tier-announcement-name').textContent=cfg.sky.tiers[ev.toTier].name.toUpperCase();
            say(tierLines[ev.toTier],'awe');audio.play('tier');
          },end(){onAnswerBeatFinished(ev);}
        });
      }else onAnswerBeatFinished(ev);
    }
  });
}
function onAnswerBeatFinished(ev){
  watchTheSky(false);
  // Preserve the discovery card until the player chooses to continue.
  // The character's movie moment must never make the trivia fact disappear mid-read.
  awaitingContinue=ev;
  $('skip-button').textContent=ev.finished?'Finish the flight  →':'Continue flight  →';
  say(ev.hit?'A little fact to tuck into your journal.':'The next horizon is just ahead.','wink');
  focusPanel();
}
function proceedFlight(){
  if(!awaitingContinue)return;
  const ev=awaitingContinue;awaitingContinue=null;
  game=logic.advance(game);
  if(game.phase==='end'){
    focusScene();
    if(game.correct===game.deck.length&&game.fuel>0){
      drawSkyWriting();
      enqueue({scene:'constellation',name:'SKY_WRITING',ms:cfg.motion.constellationMs,
        start(){world.classList.add('moment-constellation');say('Five wonders, five stars. We made a little sky song!','awe');audio.play('constellation',game.history);},
        end(){beginLanding(ev);}
      });
    }else beginLanding(ev);
  }else{showQuestion();focusPanel();}
}
function beginLanding(ev){
  enqueue({scene:'landing',name:ev.landing||'WIN_LANDING',ms:cfg.motion.landingMs,
    start(){
      world.classList.add('moment-landing');
      say(game.fuel===0?'Well, the burner is tired. The ground is kind, though.':'What a flight. I shall remember this sky.',game.fuel===0?'rueful':'happy');
      animateAltitude(0,duration(cfg.motion.landingMs));
      audio.play('landing');
    },end(){renderAltitude(0);showEnd();say('Same time tomorrow, co-pilot? I saved you a seat.','soft');focusPanel();}
  });
}

function showEnd(){
  view('end');
  if(routeMode!=='practice'){
    atlasState=atlas.record(atlasState,routeSeed,game);
    saveAtlas();
  }
  $('end-log-note').textContent=routeMode==='practice'?'A little practice flight — your daily record stays safe.':
    `Filed in your Flight Atlas · ${new Date(routeSeed+'T12:00:00').toLocaleDateString('en',{month:'short',day:'numeric'})}.`;
  refreshWelcome();
  const stranded=game.fuel===0;
  $('postcard-hint').textContent=game.correct===game.deck.length?'Your very own constellation is inside':'A little letter from your journey';
  $('end-kicker').textContent=stranded?'A SOFT LANDING':'A BRIGHT LANDING';
  $('end-title').textContent=stranded?'Every flight has a landing.':'The sky looked lovely on you.';
  $('end-lede').textContent=stranded?'The best explorers know when to let the wind take them home.':'Five little questions, a sky full of stories, and one very happy co-pilot.';
  $('end-correct').replaceChildren(document.createTextNode(String(game.correct)));
  const a=document.createElement('span');a.textContent='/5';$('end-correct').appendChild(a);
  $('end-peak').replaceChildren(document.createTextNode(String(Math.round(game.peak))));
  const m=document.createElement('span');m.textContent='m';$('end-peak').appendChild(m);
  $('miri-last-note').textContent=acting.finalNote(game.correct,game.history.length,game.deck.length);
  const journal=$('journal-items');journal.replaceChildren();
  for(const item of game.history){
    const line=document.createElement('div');line.className='journal-item';
    const seal=document.createElement('span');seal.className='seal';seal.textContent=item.hit?item.icon:'·';
    const title=document.createElement('span');title.textContent=item.souvenir;if(!item.hit)title.className='notfound';
    const check=document.createElement('span');check.className='found-icon';check.textContent=item.hit?'✓':'↝';
    line.append(seal,title,check);journal.appendChild(line);
  }
}
function postcardMarkup(){
  const source=/^\d{4}-\d{2}-\d{2}$/.test(routeSeed)?new Date(routeSeed+'T12:00:00'):new Date();
  const date=source.toLocaleDateString('en',{month:'short',day:'numeric',year:'numeric'}).toUpperCase();
  return postcard.buildSvg(game,date);
}
function openPostcard(){
  $('postcard-art').classList.remove('is-zoomed');
  $('postcard-zoom').setAttribute('aria-pressed','false');
  $('postcard-zoom').textContent='Inspect the star map up close  ↗';
  $('postcard-art').innerHTML=postcardMarkup();
  $('postcard-art').setAttribute('aria-label',`${game.correct} of ${game.deck.length} wonders found, altitude ${Math.round(game.peak)} metres. An illustrated star map of today's flight.`);
  $('postcard-description').textContent=game.correct===game.deck.length?'You discovered every wonder. Their five stars now form a constellation that is yours alone.':'Every discovery is a star. Every missed answer is a quiet dotted place in your journey.';
  $('postcard-status').textContent='Made from this very flight. Yours to keep.';
  $('postcard-mobile-stats').textContent=`${game.correct} / ${game.deck.length} discovered · ${Math.round(game.peak)}m peak altitude`;
  const stamps=$('postcard-mobile-stamps');stamps.replaceChildren();
  for(const entry of game.history){
    const chip=document.createElement('div');chip.className='postcard-mobile-stamp'+(entry.hit?'':' is-dim');
    const symbol=document.createElement('span');symbol.textContent=entry.hit?'✦':'○';
    const name=document.createElement('span');name.textContent=entry.souvenir;
    chip.append(symbol,name);stamps.appendChild(chip);
  }
  $('postcard-dialog').showModal();
  $('postcard-close').focus();
}
function closePostcard(){
  if($('postcard-dialog').open)$('postcard-dialog').close();
  $('postcard-open').focus();
}
function offerFile(blob,filename){
  const url=URL.createObjectURL(blob),link=document.createElement('a');
  link.href=url;link.download=filename;document.body.appendChild(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function savePostcard(){
  const btn=$('postcard-save');btn.disabled=true;
  $('postcard-status').textContent='Preparing your postcard image…';
  const markup=postcardMarkup();
  const sourceUrl=URL.createObjectURL(new Blob([markup],{type:'image/svg+xml;charset=utf-8'}));
  const image=new Image();
  const filename=`updraft-sky-mail-${/^\d{4}-\d{2}-\d{2}$/.test(routeSeed)?routeSeed:logic.dailySeed()}`;
  image.onload=()=>{
    URL.revokeObjectURL(sourceUrl);
    const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=800;
    try{
      const context=canvas.getContext('2d');
      if(!context)throw new Error('Canvas unavailable');
      context.drawImage(image,0,0,1200,800);
      canvas.toBlob(blob=>{
        if(blob){offerFile(blob,filename+'.png');$('postcard-status').textContent='Your Sky Mail image is ready to keep. ✦';}
        else{offerFile(new Blob([markup],{type:'image/svg+xml'}),filename+'.svg');$('postcard-status').textContent='Saved as a vector illustration instead.';}
        btn.disabled=false;
      },'image/png');
    }catch(err){offerFile(new Blob([markup],{type:'image/svg+xml'}),filename+'.svg');$('postcard-status').textContent='Saved as a vector illustration instead.';btn.disabled=false;}
  };
  image.onerror=()=>{URL.revokeObjectURL(sourceUrl);offerFile(new Blob([markup],{type:'image/svg+xml'}),filename+'.svg');$('postcard-status').textContent='Saved as a vector illustration instead.';btn.disabled=false;};
  image.src=sourceUrl;
}
function refreshWelcome(){
  const record=atlasState.days[todaySeed],note=$('returning-note');
  note.hidden=!record;
  if(record){
    note.textContent=record.perfect?'Miri remembers: you found every wonder in today’s sky. Want to fly it again?':
      `Miri remembers this sky: ${record.best} of 5 wonders found. The wind is ready for another try.`;
    if(game.phase==='intro')say('Oh, back again? I saved your place in the basket.','soft');
  }
}
function prettyDay(date){return new Date(date+'T12:00:00').toLocaleDateString('en',{weekday:'short',month:'short',day:'numeric'});}
function renderAtlas(){
  const summary=atlas.summary(atlasState,todaySeed);
  $('atlas-flown').textContent=summary.flown;
  $('atlas-stars').textContent=summary.stars;
  $('atlas-perfect').textContent=summary.entries.filter(entry=>entry.perfect).length;
  const grid=$('atlas-grid');grid.replaceChildren();
  for(const entry of summary.entries){
    const today=entry.date===todaySeed;
    const button=document.createElement('button');button.type='button';
    button.className='atlas-day'+(entry.flights?' is-played':'')+(entry.perfect?' is-perfect':'');
    const seal=document.createElement('span');seal.className='atlas-seal';seal.setAttribute('aria-hidden','true');
    seal.textContent=entry.perfect?'✦':entry.flights?'✳':'☁';
    const body=document.createElement('span');body.className='atlas-day-main';
    const label=document.createElement('strong');label.textContent=today?'Today’s sky':prettyDay(entry.date);
    const detail=document.createElement('span');detail.textContent=entry.flights?`BEST · ${entry.best} / 5 WONDERS`:'NOT YET EXPLORED';
    const sub=document.createElement('small');sub.textContent=entry.perfect?'A constellation to remember':entry.flights?
      `${entry.flights} ${entry.flights===1?'flight':'flights'} · Peak ${entry.peak} m`:'Five questions, one little expedition';
    body.append(label,detail,sub);
    const arrow=document.createElement('span');arrow.className='atlas-day-arrow';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
    button.append(seal,body,arrow);
    button.setAttribute('aria-label',`Fly ${today?'today':prettyDay(entry.date)}. ${entry.flights?`Best score ${entry.best} of 5.`:'Not yet explored.'}`);
    button.addEventListener('click',()=>{
      $('atlas-dialog').close();
      launch(entry.date,today?'daily':'archive');
      focusPanel();
      $('question-text').setAttribute('tabindex','-1');$('question-text').focus({preventScroll:true});
    });
    grid.appendChild(button);
  }
}
function openAtlas(){
  lastAtlasOpener=document.activeElement;
  renderAtlas();$('atlas-dialog').showModal();$('atlas-close').focus();
}
function launch(seed,mode){
  flushDirector();stopAltitudeTween();awaitingContinue=null;
  flightNumber++;
  routeSeed=typeof seed==='string'?seed:(flightNumber===1?todaySeed:`${todaySeed}-practice-${flightNumber}`);
  routeMode=typeof seed==='string'?(mode||'archive'):(flightNumber===1?'daily':'practice');
  game=logic.start(logic.createGame(logic.deckFor(routeSeed)));
  renderAltitude(0);lastLiveTier=0;fuelUI();sewScarfStars();
  $('date-label').textContent=routeMode==='practice'?'PRACTICE FLIGHT':`${prettyDay(routeSeed).toUpperCase()} · ${routeMode==='archive'?'ARCHIVE':'DAILY FLIGHT'}`;
  say(routeMode==='archive'?'Ah, an old sky! I remember the light here.':
    routeMode==='practice'?'One more turn around the clouds, shall we?':'Ah, there you are! Eyes on the horizon, my friend.','happy');
  view('question');showQuestion();
  audio.play('start');
}
async function share(){
  const text=`☁ UPDRAFT · MY LITTLE FLIGHT\n✦ ${game.correct}/5 wonders found\n↗ ${Math.round(game.peak)}m highest altitude\n${game.fuel===0?'A soft landing, a lovely sky.':'We found a little magic in the air.'}\nCome fly tomorrow!`;
  try{
    if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(text);
    else{const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();}
    $('share-button').textContent='Flight postcard copied ✓';
  }catch(err){$('share-button').textContent='Select and copy your flight summary';}
}
function replay(){launch();}
function toggleDebug(force){
  const el=$('debug-panel');el.hidden=typeof force==='boolean'?!force:!el.hidden;
  $('debug-alt').value=Math.round(visualAltitude/10)*10;
  $('debug-alt-value').textContent=Math.round(visualAltitude)+'m';
}
function waveHello(){
  if(beat||beatQueue.length)return;
  enqueue({scene:'wave',name:'HELLO_CO_PILOT',ms:cfg.motion.waveMs,
    start(){world.classList.add('moment-wave');say('Oh! A wave for me? Right back at you!','happy');audio.play('wave');},
    end(){say('A splendid crew, you and me.','wink');}
  });
}
function demo(type){
  if(beat)skipBeat();
  const map={wave:{name:'HELLO_CO_PILOT',ms:cfg.motion.waveMs,cl:'moment-wave',say:'Oh! A wave for me? Right back at you!',expression:'happy',sound:'wave'},
    correct:{name:'CORRECT_ANSWER',ms:cfg.motion.correctMs,cl:'moment-hit',say:'Ha! We caught a beautiful thermal!',expression:'happy',sound:'correct'},
    rare:{name:'DEEP_CUT',ms:cfg.motion.rareMs,cl:'moment-rare',say:'Oh... I think the sky just winked at us.',expression:'awe',sound:'rare'},
    wrong:{name:'WRONG_ANSWER',ms:cfg.motion.wrongMs,cl:'moment-miss',say:'A graceful wobble. My specialty.',expression:'rueful',sound:'wrong'},
    tier:{name:'TIER_CHANGE',ms:cfg.motion.tierMs,cl:'moment-tier',say:'New sky! Can you believe that view?',expression:'awe',sound:'tier'},
    landing:{name:'OUT_OF_FUEL',ms:cfg.motion.landingMs,cl:'moment-landing',say:'A lovely spot to land, I think.',expression:'rueful',sound:'landing'},
    awe:{name:'AWE',ms:cfg.motion.correctMs,cl:'moment-rare',say:'Somewhere up there, a star is saying hello.',expression:'awe',sound:'rare'},
    constellation:{name:'SKY_WRITING',ms:cfg.motion.constellationMs,cl:'moment-constellation',say:'A secret stitched across the stars!',expression:'awe',sound:'constellation'}};
  const d=map[type];if(!d)return;
  enqueue({scene:type==='awe'?'rare':type,name:d.name,ms:d.ms,start(){
    world.classList.add(d.cl);say(d.say,d.expression);audio.play(d.sound);
    if(type==='correct'||type==='rare'||type==='awe')shower(type==='correct'?cfg.motion.particles.common:cfg.motion.particles.rare);
    if(type==='constellation')drawSkyWriting();
    if(type==='tier')$('tier-announcement-name').textContent=cfg.sky.tiers[Math.min(4,logic.getTierIndex(visualAltitude)+1)].name.toUpperCase();
  },end(){say('Well, that was rather lovely.','wink');}});
}
$('start-button').addEventListener('click',()=>launch());
$('atlas-intro').addEventListener('click',openAtlas);
$('atlas-end').addEventListener('click',openAtlas);
$('atlas-close').addEventListener('click',()=>$('atlas-dialog').close());
$('atlas-dialog').addEventListener('close',()=>{if(lastAtlasOpener?.isConnected&&lastAtlasOpener.offsetParent!==null)lastAtlasOpener.focus();});
$('wave-button').addEventListener('click',waveHello);
$('replay-button').addEventListener('click',replay);
$('skip-button').addEventListener('click',()=>{if(beat)skipBeat();else proceedFlight();});
$('share-button').addEventListener('click',share);
$('postcard-open').addEventListener('click',openPostcard);
$('postcard-close').addEventListener('click',closePostcard);
$('postcard-save').addEventListener('click',savePostcard);
$('postcard-zoom').addEventListener('click',()=>{
  const zoomed=$('postcard-art').classList.toggle('is-zoomed');
  $('postcard-zoom').setAttribute('aria-pressed',String(zoomed));
  $('postcard-zoom').textContent=zoomed?'Fit the whole postcard  ↙':'Inspect the star map up close  ↗';
  if(zoomed)$('postcard-art').focus();
});
$('postcard-copy').addEventListener('click',async()=>{await share();$('postcard-status').textContent='Your flight note is ready to paste. ✦';});
function updateSoundscape(){
  const sky=soundscore.at(visualAltitude),mode=audio.mode;
  $('soundscape-name').textContent=sky.name;
  $('soundscape-open').setAttribute('aria-label',`The sound of ${sky.name}: ${sky.subtitle}. Open listening room.`);
  $('soundscape-subtitle').textContent=sky.subtitle;
  $('soundscape-track-name').textContent=sky.name;
  $('soundscape-track-note').textContent=sky.subtitle;
  $('soundscape-status').textContent=mode==='off'?'Sound is off. No audio plays without your choice.':
    mode==='quiet'?`Quiet skies · ${sky.name} · softly playing.`:`Cinematic skies · ${sky.name} · your sky is singing.`;
  document.body.classList.toggle('sound-on',mode!=='off');
  document.body.dataset.soundMode=mode;
  $('sound-toggle').setAttribute('aria-label',mode==='off'?'Turn cinematic sound on':'Turn sound off');
  $('sound-toggle').setAttribute('aria-pressed',String(mode!=='off'));
  $('sound-toggle').title=mode==='off'?'Turn cinematic sound on':'Sound on · click to mute';
  document.querySelectorAll('[data-sound-mode]').forEach(button=>{
    const selected=button.dataset.soundMode===mode;
    button.setAttribute('aria-pressed',String(selected));
    button.querySelector('.sound-choice-indicator').textContent=selected?'✓':'○';
  });
}
function chooseSoundMode(mode){
  const previous=audio.mode;
  const active=audio.setMode(mode);
  if(active!=='off'&&previous==='off')audio.play('start');
  updateSoundscape();
}
$('sound-toggle').addEventListener('click',()=>chooseSoundMode(audio.enabled?'off':'cinematic'));
$('soundscape-open').addEventListener('click',()=>{$('soundscape-dialog').showModal();$('soundscape-close').focus();});
$('soundscape-close').addEventListener('click',()=>$('soundscape-dialog').close());
$('soundscape-dialog').addEventListener('close',()=>$('soundscape-open').focus());
document.querySelectorAll('[data-sound-mode]').forEach(button=>button.addEventListener('click',()=>chooseSoundMode(button.dataset.soundMode)));

$('debug-toggle').addEventListener('click',()=>toggleDebug());
$('debug-close').addEventListener('click',()=>toggleDebug(false));
$('debug-alt').addEventListener('input',e=>{
  const value=+e.target.value;stopAltitudeTween();renderAltitude(value);
  game=logic.debugSet(game,'altitude',value);$('debug-alt-value').textContent=value+'m';
});
$('debug-fuel').addEventListener('input',e=>{game=logic.debugSet(game,'fuel',+e.target.value);fuelUI();});
$('debug-speed').addEventListener('input',e=>{
  cfg.motion.debugTimeScale=1/(+e.target.value);$('debug-speed-value').textContent=e.target.value+'×';
});
$('debug-reduced').addEventListener('change',e=>{
  document.body.classList.toggle('simulate-reduced',e.target.checked);
  if(e.target.checked)stopAltitudeTween();
});
$('debug-overlay').addEventListener('change',updateOverlay);
document.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>demo(b.dataset.demo)));
document.addEventListener('keydown',e=>{
  const tag=e.target&&e.target.tagName;
  if($('postcard-dialog').open||$('atlas-dialog').open||$('soundscape-dialog').open)return; // Let modals own keyboard and Escape.
  if(e.key.toLowerCase()==='d'&&!e.ctrlKey&&!e.metaKey&&tag!=='INPUT') {toggleDebug();return;}
  if(e.key==='Escape'&&!$('debug-panel').hidden){toggleDebug(false);return;}
  if((e.key===' '||e.code==='Space')&&tag!=='BUTTON'&&tag!=='INPUT'){
    if(beat){e.preventDefault();skipBeat();return;}
    if(awaitingContinue){e.preventDefault();proceedFlight();return;}
  }
  if(game.phase==='playing'&&!beat&&tag!=='INPUT'&&tag!=='BUTTON'){
    const idx={'1':0,'2':1,'3':2,a:0,b:1,c:2}[e.key.toLowerCase()];
    if(idx!==undefined){e.preventDefault();choose(idx);}
  }
});
// Touching the animated world fast-forwards an active beat, not the interactive question card.
world.addEventListener('click',e=>{if(beat&&e.target.closest('#world')&&!e.target.closest('button'))skipBeat();});
window.addEventListener('pagehide',()=>audio.setMode('off'));
document.addEventListener('visibilitychange',()=>{
  document.body.classList.toggle('tab-hidden',document.hidden);
  audio.setHidden(document.hidden);
  if(document.hidden){
    if(beat){beat.remaining=Math.max(0,beat.remaining-(performance.now()-beat.began));clearTimeout(beatTimer);beatTimer=null;}
  }else if(beat){beat.began=performance.now();beatTimer=setTimeout(finishBeat,beat.remaining);}
});
function fpsLoop(now){
  frameCount++;
  if(now-lastFpsTime>=1000){
    const fps=Math.round(frameCount*1000/(now-lastFpsTime));
    $('debug-fps').textContent=document.hidden?'PAUSED':fps;
    lastFpsTime=now;frameCount=0;
  }
  requestAnimationFrame(fpsLoop);
}
requestAnimationFrame(fpsLoop);
// Setup scene.
const today=new Date();$('date-label').textContent=`${today.toLocaleDateString('en',{month:'short',day:'numeric'}).toUpperCase()} · DAILY FLIGHT`;
renderAltitude(0);fuelUI();refreshWelcome();updateSoundscape();
const params=new URLSearchParams(location.search);
if(params.has('debug'))toggleDebug(true);
if(params.has('autostart'))launch();
if(params.has('showcase')){const showcase=params.get('showcase');demo(showcase);}
})();
