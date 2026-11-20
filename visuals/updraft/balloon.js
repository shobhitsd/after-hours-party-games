import {CONFIG} from './gsap-config.js';
const gsap=globalThis.gsap;

export class Balloon{
 constructor(stage){this.stage=stage;this.q=s=>stage.querySelectorAll(s);this.one=s=>stage.querySelector(s);this.factor=()=>innerWidth<=CONFIG.responsive.breakpoint?CONFIG.responsive.travel:1;}
 idle(){
  // Reversible sine loops: director owns this timeline in a separate GSAP context.
  const tl=gsap.timeline();
  tl.to(this.q('.ud-balloon-drift'),{y:-CONFIG.idle.lift,rotation:CONFIG.idle.tilt,duration:CONFIG.idle.float,ease:CONFIG.ease.float,repeat:-1,yoyo:true},0);
  tl.to(this.q('.ud-gondola'),{svgOrigin:'200 330',smoothOrigin:false,rotation:-CONFIG.idle.tilt,duration:CONFIG.idle.rotation,ease:CONFIG.ease.float,repeat:-1,yoyo:true},0);
  tl.to(this.q('.scarf-tail'),{svgOrigin:'221 458',smoothOrigin:false,rotation:CONFIG.acting.nod,duration:CONFIG.idle.scarf,ease:CONFIG.ease.float,repeat:-1,yoyo:true},0);
  tl.to(this.q('.ud-clouds-far'),{x:CONFIG.rise.cloudFar,duration:CONFIG.idle.cloud,ease:CONFIG.ease.float,repeat:-1,yoyo:true},0);
  tl.to(this.q('.ud-light-shafts'),{opacity:.8,x:CONFIG.camera.followY,duration:CONFIG.idle.light,ease:CONFIG.ease.float,repeat:-1,yoyo:true},0);
  // Blink closes and opens immediately, followed by a long open-eyed pause.
  const blink=gsap.timeline({repeat:-1,repeatDelay:CONFIG.idle.blinkPause});
  blink.to(this.q('.lid-cover'),{scaleY:1,duration:CONFIG.idle.blink,ease:CONFIG.ease.float}).to(this.q('.lid-cover'),{scaleY:0,duration:CONFIG.idle.blink,ease:CONFIG.ease.float});tl.add(blink,CONFIG.idle.blinkPause);
  return tl.timeScale(CONFIG.speed);
 }
 face(tl,kind,d){for(const [at,pose] of CONFIG.poses[kind]||[[0,'soft']])tl.call(()=>{this.stage.dataset.pose=pose;},[],at*d);}
 particles(tl,type,at){
  const f=this.factor(),count=Math.ceil(CONFIG.particles[type]*(f<1?CONFIG.responsive.particles:1));
  for(let i=0;i<count;i++){
   const p=document.createElement('i');p.className='ud-particle '+(type==='dust'?'ud-dust':'ud-confetti');p.style.background=type==='dust'?'#e6cfb2':CONFIG.particles.colors[i%CONFIG.particles.colors.length];this.one('.ud-particles').append(p);
   const angle=Math.PI*2*i/count,spread=CONFIG.particles.spread*f*(.4+Math.random()*.6),start=at+i*CONFIG.particles.stagger;
   // Bounded emitter: outward burst followed by gravity/fade; reset removes every node.
   tl.fromTo(p,{x:0,y:0,scale:type==='dust'?.3:.6,opacity:0,rotation:0},{x:Math.cos(angle)*spread,y:Math.sin(angle)*CONFIG.particles.lift*f,scale:type==='dust'?2:1,opacity:.85,rotation:i*29,duration:CONFIG.particles.life*CONFIG.segments.burst,ease:CONFIG.ease.out},start);
   tl.to(p,{y:'+='+CONFIG.particles.fall*f,opacity:0,scale:type==='dust'?3:.6,rotation:'+=90',duration:CONFIG.particles.life*(1-CONFIG.segments.burst),ease:CONFIG.ease.fall},start+CONFIG.particles.life*CONFIG.segments.burst);
  }
 }
 rise(tl,d,variant){
  const f=this.factor(),s=variant===1?-1:1,b=CONFIG.beats;this.face(tl,'correct',d);
  // Anticipation -> ignition -> lift; the camera follows and near clouds move faster.
  tl.to(this.q('.ud-balloon-position'),{y:CONFIG.rise.anticipation*f,duration:d*CONFIG.segments.anticipate,ease:CONFIG.ease.move},0)
    .to(this.q('.ud-balloon-position'),{y:-CONFIG.rise.height*f,rotation:s*CONFIG.idle.tilt,duration:d*(b.settle-b.anticipate),ease:CONFIG.ease.rise},d*b.anticipate)
    .to(this.q('.ud-balloon-position'),{y:0,rotation:0,duration:d*(1-b.settle),ease:CONFIG.ease.float},d*b.settle);
  tl.to(this.q('.burner-flame'),{scaleY:CONFIG.rise.flameScale,opacity:1,duration:d*CONFIG.segments.burst,ease:CONFIG.ease.out},d*b.flame);
  tl.to(this.q('.burner-flame'),{scaleY:.4,opacity:.2,duration:d*(1-b.settle),ease:CONFIG.ease.float},d*b.settle);
  this.gesture(tl,d,variant,true);
  tl.to(this.q('.ud-camera'),{scale:CONFIG.camera.riseZoom,y:-CONFIG.camera.followY*f,duration:d*b.settle,ease:CONFIG.ease.rise},0);
  tl.to(this.q('.ud-clouds-near'),{y:CONFIG.rise.cloudNear*f,duration:d,ease:CONFIG.ease.move},0);
  tl.to(this.q('.ud-clouds-far'),{y:CONFIG.rise.cloudFar*f,duration:d,ease:CONFIG.ease.move},0);
  tl.to(this.q('.ud-warmth'),{opacity:.65,duration:d*CONFIG.segments.burst,ease:CONFIG.ease.out},d*b.flame);
  // Decelerate the camera and scenery back to rest before context cleanup (no snap).
  tl.to(this.q('.ud-camera'),{scale:1,y:0,duration:d*(1-b.settle),ease:CONFIG.ease.float},d*b.settle);
  tl.to(this.q('.ud-clouds-near,.ud-clouds-far'),{y:0,duration:d*(1-b.settle),ease:CONFIG.ease.float},d*b.settle);
  tl.to(this.q('.ud-warmth'),{opacity:0,duration:d*(1-b.settle),ease:CONFIG.ease.float},d*b.settle);
  this.particles(tl,'confetti',d*b.particles);
 }
 fall(tl,d,variant){
  const f=this.factor(),s=variant===1?-1:1,b=CONFIG.beats,drop=CONFIG.fall.distance*f;this.face(tl,'wrong',d);
  const rope=this.one('.ud-balloon-position .ropes path'),straight=rope.getAttribute('d');
  const slack='M120 287 Q102 399 138 474 M280 287 Q300 399 261 474 M172 356 Q144 423 159 474 M228 356 Q256 423 241 474';
  // Deflate and slacken independently before gravity takes over.
  tl.to(this.q('.ud-balloon-position .envelope-body'),{svgOrigin:'200 346',smoothOrigin:false,scaleX:CONFIG.fall.deflateX,scaleY:CONFIG.fall.deflateY,duration:d*CONFIG.segments.anticipate,ease:CONFIG.ease.move},0);
  tl.set(rope,{attr:{d:slack}},d*b.anticipate); // Different path commands: switch, do not interpolate incompatible paths.
  tl.to(this.q('.ud-camera'),{scale:CONFIG.camera.tenseZoom,duration:d*CONFIG.segments.zoomIn,ease:CONFIG.ease.move},0);
  // Accelerating power2.in fall with lightweight SVG afterimages instead of a blur filter.
  tl.to(this.q('.ud-balloon-position'),{y:drop,rotation:s*CONFIG.fall.rotation,duration:d*CONFIG.segments.drop,ease:CONFIG.ease.fall},d*b.anticipate);
  this.one('.ud-afterimages').innerHTML=Array.from({length:CONFIG.fall.trailCount},()=>'<svg class="ud-afterimage" viewBox="0 0 400 575"><ellipse cx="200" cy="180" rx="134" ry="160"/><path d="m120 320 20 150h120l20-150M140 470h120l-10 62H150Z" fill="none" stroke="currentColor" stroke-width="7"/></svg>').join('');
  for(const [i,ghost] of [...this.q('.ud-afterimage')].entries())tl.fromTo(ghost,{opacity:CONFIG.fall.trailOpacity,y:0},{y:drop,opacity:0,duration:CONFIG.fall.trailLife,ease:CONFIG.ease.fall},d*b.anticipate+i*CONFIG.fall.trailGap);
  // Impact: squash, bounded camera shake, cloud dust and cool color grade.
  tl.to(this.q('.ud-balloon-position .envelope-body'),{svgOrigin:'200 346',smoothOrigin:false,scaleX:CONFIG.fall.squashX,scaleY:CONFIG.fall.squashY,duration:d*CONFIG.segments.squash,ease:CONFIG.ease.out},d*b.impact);
  tl.to(this.q('.ud-gondola'),{svgOrigin:'200 330',smoothOrigin:false,rotation:-s*CONFIG.fall.basketSwing,duration:d*b.impact,ease:CONFIG.ease.fall},0);
  tl.to(this.q('.ud-camera'),{x:CONFIG.shake.amplitude*(f<1?CONFIG.responsive.shake:1),duration:CONFIG.shake.step,ease:CONFIG.ease.linear,repeat:CONFIG.shake.repeat,yoyo:true},d*b.impact);
  tl.to(this.q('.ud-camera'),{x:0,scale:1,duration:d*CONFIG.segments.zoomOut,ease:CONFIG.ease.float},d*b.rebound);
  tl.to(this.q('.ud-coolth'),{opacity:.55,duration:d*CONFIG.segments.squash,ease:CONFIG.ease.out},d*b.impact);
  tl.to(this.q('.ud-coolth'),{opacity:0,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.float},d*b.rebound);
  this.particles(tl,'dust',d*b.impact);
  // Reinflate, tighten ropes, relight and recover to the exact resting position.
  tl.to(this.q('.ud-balloon-position'),{y:0,rotation:0,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.rebound},d*b.rebound);
  tl.to(this.q('.ud-balloon-position .envelope-body'),{svgOrigin:'200 346',smoothOrigin:false,scaleX:1,scaleY:1,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.rebound},d*b.rebound);
  tl.set(rope,{attr:{d:straight}},d*b.rebound);
  tl.to(this.q('.ud-gondola'),{svgOrigin:'200 330',smoothOrigin:false,rotation:0,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.rebound},d*b.rebound);
  tl.to(this.q('.burner-flame'),{scaleY:CONFIG.fall.flameScale,opacity:1,duration:d*CONFIG.segments.rebound,ease:CONFIG.ease.out},d*b.rebound);
  tl.to(this.q('.burner-flame'),{scaleY:.4,opacity:.2,duration:d*(1-b.settle),ease:CONFIG.ease.float},d*b.settle);
  tl.to(this.q('.ud-clouds-near'),{y:-CONFIG.fall.cloudTravel*f,duration:d*b.impact,ease:CONFIG.ease.fall},0);
  tl.to(this.q('.ud-clouds-near'),{y:0,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.float},d*b.rebound);
  tl.to(this.q('.arm-left'),{svgOrigin:'165 457',smoothOrigin:false,rotation:CONFIG.acting.surpriseArm,duration:d*b.anticipate,ease:CONFIG.ease.out},0);
  tl.to(this.q('.arm-right'),{svgOrigin:'247 458',smoothOrigin:false,rotation:-CONFIG.acting.surpriseArm,duration:d*b.anticipate,ease:CONFIG.ease.out},0);
  tl.to(this.q('.arm'),{svgOrigin:(_,el)=>el.classList.contains('arm-left')?'165 457':'247 458',smoothOrigin:false,rotation:0,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.float},d*b.rebound);
  tl.to(this.q('.eyes'),{svgOrigin:'201 402',smoothOrigin:false,scale:CONFIG.acting.eyes,duration:d*b.anticipate,ease:CONFIG.ease.out},0);
  tl.to(this.q('.eyes'),{svgOrigin:'201 402',smoothOrigin:false,scale:1,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.float},d*b.rebound);
 }
 celebrate(tl,d){
  const f=this.factor(),b=CONFIG.beats;this.face(tl,'landing',d);
  // Solved flights climb into a bright backdrop with rays and birds, then gently rest.
  tl.to(this.q('.ud-happy-place'),{opacity:1,duration:d*b.rebound,ease:CONFIG.ease.float},0);
  tl.to(this.q('.ud-balloon-position'),{y:-CONFIG.finale.ascent*f,scale:.8,duration:d*b.rebound,ease:CONFIG.ease.rise},0);
  tl.to(this.q('.ud-balloon-position'),{y:CONFIG.finale.restY*f,scale:1,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.float},d*b.rebound);
  tl.to(this.q('.burner-flame'),{scaleY:CONFIG.rise.flameScale,opacity:1,duration:d*b.rebound,ease:CONFIG.ease.out},0);
  tl.to(this.q('.burner-flame'),{scaleY:.4,opacity:.2,duration:d*(1-b.settle),ease:CONFIG.ease.float},d*b.settle);
  tl.to(this.q('.ud-birds'),{x:CONFIG.finale.birdsX*f,y:-CONFIG.camera.followY,duration:d,ease:CONFIG.ease.float},0);
  tl.to(this.q('.ud-happy-rays'),{rotation:CONFIG.acting.arm,opacity:CONFIG.finale.raysOpacity,duration:d,ease:CONFIG.ease.float},0);
  this.particles(tl,'celebrate',d*b.impact);
 }
 gesture(tl,d,variant,happy=false){
  const s=variant===1?-1:1,b=CONFIG.beats;
  // Head, eye and hand beats. Timings are normalized to the scene duration.
  for(const [selector,property,value] of [['.head','rotation',s*CONFIG.acting.nod],['.eyebrows','y',-CONFIG.acting.brow],['.arm-right','rotation',-CONFIG.acting.arm]]){
   tl.to(this.q(selector),{...(selector==='.head'?{svgOrigin:'201 407',smoothOrigin:false}:selector==='.arm-right'?{svgOrigin:'247 458',smoothOrigin:false}:{}),[property]:value,duration:d*b.impact,ease:CONFIG.ease.float},0);
   tl.to(this.q(selector),{...(selector==='.head'?{svgOrigin:'201 407',smoothOrigin:false}:selector==='.arm-right'?{svgOrigin:'247 458',smoothOrigin:false}:{}),[property]:0,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.float},d*b.rebound);
  }
  if(!happy)tl.to(this.q('.pupils'),{x:s*CONFIG.acting.pupil,duration:d*b.impact,ease:CONFIG.ease.float},0).to(this.q('.pupils'),{x:0,duration:d*CONFIG.segments.recover,ease:CONFIG.ease.float},d*b.rebound);
  if(variant===1)tl.to(this.q('.lid-right'),{scaleY:1,duration:CONFIG.acting.wink/2,repeat:1,yoyo:true,ease:CONFIG.ease.float},d*CONFIG.acting.winkAt);
 }
 reset(){this.one('.ud-particles').replaceChildren();this.one('.ud-afterimages').replaceChildren();}
}
