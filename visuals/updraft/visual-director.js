import {CONFIG,skyForAltitude} from './gsap-config.js';
import {visualSnapshot,visualEvents} from './visual-events.js';
import {sceneArt} from './scene-art.js';
import {actingVariant} from './character-acting.js';
import {Balloon} from './balloon.js';

export class SceneDirector{
 constructor(game){
  this.game=game;this.actual=visualSnapshot(null);this.queue=[];this.seen=new Set();this.variant=0;this.lastGesture=0;this.playing=false;this.motion=true;
  this.media=matchMedia('(prefers-reduced-motion: reduce)');
  this.mobile=matchMedia('(max-width:760px)');this.editing=false;
  this.shell=document.createElement('div');this.shell.className='ud-shell';game.before(this.shell);this.shell.append(game);this.shell.insertAdjacentHTML('beforeend',sceneArt());
  this.stage=this.shell.querySelector('.ud-scene');this.q=s=>this.stage.querySelector(s);this.balloon=new Balloon(this.stage);document.body.classList.add('ud-gsap');
  for(const svg of this.stage.querySelectorAll('.ud-balloon-svg')){
   const gondola=document.createElementNS('http://www.w3.org/2000/svg','g');gondola.setAttribute('class','ud-gondola');
   for(const node of [...svg.children])if(node.matches('.captain,.basket,.basket-badge'))gondola.append(node);svg.append(gondola);
  }
  // SVG origins are explicit so rotations work identically in Chrome and SVG-aware engines.
  for(const [selector,origin] of [['.head','201 407'],['.arm-left','165 457'],['.arm-right','247 458'],['.scarf-tail','221 458'],['.ud-gondola','200 330'],['.envelope-body','200 346']])gsap.set(this.balloon.q(selector),{svgOrigin:origin});
  gsap.set(this.balloon.q('.eyes,.eyebrows,.pupils'),{transformOrigin:'50% 50%'});gsap.set(this.balloon.q('.lid-cover'),{transformOrigin:'50% 0%',scaleY:0});gsap.set(this.balloon.q('.burner-flame'),{transformOrigin:'50% 100%',scaleY:.4,opacity:.2});
  this.q('.ud-happy-place').style.background=`linear-gradient(155deg,${CONFIG.finale.sky.join(',')})`;
  try{this.motion=localStorage.getItem('updraft-cinema-motion')!=='off';}catch{}
  this.stage.addEventListener('click',event=>this.click(event));
  game.addEventListener('click',event=>{if(event.target.closest('[data-prompt]:not(:disabled)'))this.gesture('consider');});
  game.addEventListener('input',event=>{if(event.target.matches('#trivia-answer,#solve-answer')&&performance.now()-this.lastGesture>CONFIG.idle.typingCooldown*1000)this.gesture('ponder');});
  this.q('[data-ud-altitude]').addEventListener('input',event=>{this.stop();this.play({kind:'sky',snapshot:{...this.actual,sky:skyForAltitude(Number(event.target.value))}});});
  document.addEventListener('keydown',event=>{if(event.key.toLowerCase()==='d'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!event.target.closest('input,textarea,select,[contenteditable="true"]')){const panel=this.q('.ud-director');panel.hidden=!panel.hidden;panel.open=!panel.hidden;}});
  this.media.addEventListener('change',()=>{this.stop();clearControlMotion();this.motionUI();this.ambient();});
  document.addEventListener('visibilitychange',()=>{this.stop();clearControlMotion();this.motionUI();this.ambient();});
  document.addEventListener('focusin',()=>this.editingUI());
  document.addEventListener('focusout',()=>requestAnimationFrame(()=>this.editingUI()));
  this.mobile.addEventListener('change',()=>this.editingUI());
  window.visualViewport?.addEventListener('resize',()=>this.editingUI());
  this.motionUI();this.rest();this.ambient();
 }
 editingUI(){
  const focused=document.activeElement?.matches('input:not([type="range"]),textarea,[contenteditable="true"]');
  const keyboardVisible=window.visualViewport&&innerHeight-window.visualViewport.height>120;
  // Keep the layout steady when focus moves from the input to Submit/Yes/Next.
  // Expanding on pointer-down would move that button before pointer-up and swallow the tap.
  const editorControl=this.editing&&document.activeElement?.closest('.action-panel');
  const editing=this.mobile.matches&&Boolean(focused||editorControl||(this.editing&&keyboardVisible));
  // The keyboard can resize the viewport after focus. Keep the active field above it on each resize.
  if(editing&&focused)requestAnimationFrame(()=>document.activeElement?.scrollIntoView?.({block:'nearest',behavior:'instant'}));
  if(editing===this.editing)return;this.editing=editing;document.body.classList.toggle('ud-input-active',editing);
  this.stop();clearControlMotion();this.motionUI();this.ambient();
 }
 canMove(){return this.motion&&!this.media.matches&&!document.hidden&&!this.editing;}
 motionUI(){this.stage.dataset.motion=this.canMove()?'on':'off';const button=this.q('[data-ud-motion]');button.textContent=this.media.matches?'Reduced motion':this.motion?'Motion on':'Motion off';button.setAttribute('aria-pressed',String(this.canMove()));button.setAttribute('aria-label',this.motion?'Turn cinematic motion off':'Turn cinematic motion on');}
 line(event){return CONFIG.lines[event.detail==='hit'?'hit':event.kind==='landing'&&event.snapshot.solved?'solved':event.kind]||CONFIG.lines.welcome;}
 palette(index){const sky=CONFIG.skies[index]||CONFIG.skies[0];this.q('.ud-sky-current').style.background=`linear-gradient(155deg,${sky.colors.join(',')})`;this.stage.dataset.sky=String(index);this.q('.ud-sky-name').textContent=sky.name;}
 rest(snapshot=this.actual){
  this.palette(snapshot.sky);this.stage.dataset.pose=snapshot.solved?'happy':'soft';this.stage.dataset.solved=String(snapshot.solved);
  this.q('.ud-happy-place').style.opacity=snapshot.solved?'1':'0';
  this.q('.ud-happy-rays').style.opacity=snapshot.solved?String(CONFIG.finale.raysOpacity):'0';
  gsap.set(this.balloon.q('.ud-balloon-position'),{y:snapshot.solved?CONFIG.finale.restY*this.balloon.factor():0});
  if(snapshot.solved)this.q('.ud-sky-name').textContent='Sunlit skies';
  for(const group of this.stage.querySelectorAll('.scarf-stitches'))[...group.querySelectorAll('.scarf-star')].forEach((star,i)=>star.classList.toggle('ud-found',i<snapshot.stitches));
 }
 clear(){this.idleCall?.kill();this.idleCall=null;this.ambientContext?.revert();this.ambientContext=null;this.context?.revert();this.context=null;this.timeline=null;this.balloon.reset();this.playing=false;this.stage.dataset.shot='still';this.q('[data-ud-skip]').hidden=true;this.q('.ud-caption').textContent='';}
 stop(){const last=this.queue.at(-1);if(last)this.q('.ud-line').textContent=this.line(last);this.queue=[];this.clear();this.rest();this.q('.ud-debug-status').textContent='idle';}
 ambient(){
  if(!this.canMove()||this.playing||this.ambientContext)return;
  this.ambientContext=gsap.context(()=>this.balloon.idle(),this.stage);
  if(!['active','welcome'].includes(this.actual.status))return;
  this.idleCall=gsap.delayedCall((CONFIG.idle.gestureMinimum+Math.random()*CONFIG.idle.gestureVariation)/CONFIG.speed,()=>{
   this.idleCall=null;const box=this.stage.getBoundingClientRect();if(box.bottom>0&&box.top<innerHeight)this.gesture('idle');else{this.ambientContext?.revert();this.ambientContext=null;this.ambient();}
  });
 }
 gesture(kind){if(this.playing||!this.canMove())return;this.lastGesture=performance.now();this.play({kind,detail:'gesture',snapshot:this.actual});}
 finish(){this.clear();const next=this.queue.shift();if(next)this.play(next);else{this.rest();this.q('.ud-debug-status').textContent='idle';this.ambient();}}
 play(event){
  this.clear();const {kind,snapshot,detail}=event;this.playing=true;this.stage.dataset.shot=kind;this.stage.dataset.pose='soft';this.stage.dataset.variant=String(this.variant=actingVariant(this.variant));
  if(detail!=='gesture')this.q('.ud-line').textContent=this.line(event);this.q('.ud-debug-status').textContent=kind;
  if(!this.canMove()){const final=this.queue.at(-1)||event;this.q('.ud-line').textContent=detail==='gesture'?this.q('.ud-line').textContent:this.line(final);this.queue=[];this.rest(snapshot);this.playing=false;this.stage.dataset.shot='still';return;}
  this.q('[data-ud-skip]').hidden=false;
  const d=CONFIG.durations[kind==='landing'&&snapshot.solved?'celebrate':kind]||CONFIG.durations.correct,b=CONFIG.beats;
  this.context=gsap.context(()=>{
   // The master sequence owns every tween, expression and particle. Completion is visual only.
   const tl=this.timeline=gsap.timeline({paused:true,onComplete:()=>this.finish(),defaults:{ease:CONFIG.ease.float}});
   if(kind==='correct'){this.balloon.rise(tl,d,this.variant);this.q('.ud-caption').textContent=detail==='hit'?'A little more of the mystery.':'Curiosity looks good on you.';}
   else if(kind==='wrong'){this.balloon.fall(tl,d,this.variant);this.q('.ud-caption').textContent='A little turbulence. A brave little recovery.';}
   else if(kind==='landing'&&snapshot.solved){this.q('.ud-happy-place').style.opacity='0';this.balloon.celebrate(tl,d);this.q('.ud-caption').textContent='A mystery found. A sky full of possibility.';}
   else if(kind==='rare'){
    // Anticipation -> close-up -> delight -> wide shot. All cuts use the same SVG face.
    this.balloon.face(tl,'rare',d);this.balloon.gesture(tl,d,this.variant,true);
    tl.to(this.balloon.q('.ud-camera'),{opacity:0,scale:CONFIG.camera.tenseZoom,duration:d*b.portraitIn},0);
    tl.fromTo(this.balloon.q('.ud-closeup'),{opacity:0,scale:.9},{opacity:1,scale:1,duration:d*b.portraitIn},0);
    tl.to(this.balloon.q('.ud-closeup'),{opacity:0,duration:d*(1-b.portraitHold)},d*b.portraitHold);
    tl.to(this.balloon.q('.ud-camera'),{opacity:1,scale:1,duration:d*(1-b.portraitHold)},d*b.portraitHold);
    this.balloon.particles(tl,'confetti',d*b.portraitHold);
   }else if(kind==='sky'){
    // Crossfade from the previous sky while near clouds sweep across the frame.
    const previous=this.q('.ud-sky-previous');previous.style.background=this.q('.ud-sky-current').style.background;this.palette(snapshot.sky);this.stage.dataset.pose='awe';
    tl.fromTo(previous,{opacity:1},{opacity:0,duration:d},0);
    tl.fromTo(this.balloon.q('.ud-clouds-near'),{x:-CONFIG.rise.cloudNear,y:CONFIG.rise.cloudFar},{x:0,y:0,duration:d},0);this.balloon.gesture(tl,d,this.variant);
   }else if(kind==='landing'){
    // Unsolved/abandoned flights get a gentle landing; no invented success award.
    this.balloon.face(tl,'landing',d);tl.fromTo(this.balloon.q('.ud-balloon-position'),{y:-CONFIG.rise.height*this.balloon.factor()},{y:0,duration:d},0);this.balloon.gesture(tl,d,this.variant);
   }else{this.stage.dataset.pose=kind==='ready'||kind==='wave'?'happy':'thinking';this.balloon.gesture(tl,d,this.variant);}
   // A neutral clock keeps short gestures alive to their configured duration.
   tl.to({clock:0},{clock:1,duration:d,ease:CONFIG.ease.linear},0);tl.timeScale(CONFIG.speed).play();
  },this.stage);
 }
 sync(run){this.editingUI();const next=visualSnapshot(run),changed=this.actual.id!==next.id;this.actual=next;this.shell.dataset.playing=String(Boolean(run));if(changed){this.stop();clearControlMotion();this.q('.ud-line').textContent=CONFIG.lines[next.solved?'solved':'welcome'];}else if(!this.playing)this.rest();this.ambient();}
 feedback(before,after,action){
  const events=visualEvents(before,after,action).filter(event=>!this.seen.has(event.key));
  if(!events.length){if(before?.id===after?.id&&after?.revision>before?.revision&&['next','skip-probe','skip-answer','hint'].includes(action)){this.stop();if(action==='hint')this.q('.ud-line').textContent=CONFIG.lines.hint;this.gesture(action==='hint'?'ponder':'ready');}return;}
  for(const event of events)this.seen.add(event.key);while(this.seen.size>64)this.seen.delete(this.seen.values().next().value);
  this.stop();if(events.some(event=>event.kind==='sky'))this.palette(visualSnapshot(before).sky);this.queue=events.slice(1,CONFIG.maxQueue+1);this.play(events[0]);
 }
 click(event){const button=event.target.closest('button');if(!button)return;
  if(button.hasAttribute('data-ud-skip'))this.stop();
  if(button.hasAttribute('data-ud-motion')){this.motion=!this.motion;try{localStorage.setItem('updraft-cinema-motion',this.motion?'on':'off');}catch{}this.stop();clearControlMotion();this.motionUI();this.ambient();}
  if(button.hasAttribute('data-ud-wave')){this.stop();this.play({kind:'wave',snapshot:this.actual});}
  if(button.hasAttribute('data-ud-demo')){this.stop();this.play({kind:button.dataset.udDemo==='celebrate'?'landing':button.dataset.udDemo,snapshot:button.dataset.udDemo==='celebrate'?{...this.actual,solved:true}:this.actual,detail:'preview'});}
  if(button.hasAttribute('data-ud-reset')){this.stop();this.q('.ud-line').textContent=CONFIG.lines.welcome;this.ambient();}
 }
}
let cinema=null;
function getCinema(){if(new URLSearchParams(location.search).get('cinema')==='off'||!gsap)return null;const game=document.querySelector('#game');if(!cinema&&game)cinema=new SceneDirector(game);return cinema;}
export function syncCinema(run){try{getCinema()?.sync(run);}catch(error){console.warn('Updraft scene unavailable',error);}}
export function cinematicFeedback(before,after,action){try{getCinema()?.feedback(before,after,action);}catch(error){console.warn('Updraft cinematic unavailable',error);}}
export function cinemaDiagnostics(){return {engine:gsap?.version,playing:cinema?.playing||false,shot:cinema?.stage.dataset.shot,ambient:Boolean(cinema?.ambientContext),queue:cinema?.queue.length||0,particles:cinema?.stage.querySelectorAll('.ud-particle,.ud-afterimage').length||0};}
