import {CONFIG} from './gsap-config.js';
import {cinematicFeedback} from './visual-director.js';
import {flipTiles,countUp,spendFuel,unfoldHint,showResult,stepEnter,choosePrompt,resetDepth} from './flightdeck-motion.js';
const controlContexts=new Set();
export const controlsAllowed=()=>Boolean(gsap)&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.hidden&&document.querySelector('.ud-scene')?.dataset.motion!=='off';
export function clearControlMotion(){for(const record of controlContexts){record.ctx.revert();record.cleanup?.();}controlContexts.clear();resetDepth();}
export function controlSequence(build,cleanup){
 if(!controlsAllowed()){cleanup?.();return;}
 const record={ctx:null,cleanup};
 record.ctx=gsap.context(()=>{const tl=gsap.timeline({onComplete:()=>{controlContexts.delete(record);record.ctx.revert();cleanup?.();}});build(tl);tl.timeScale(CONFIG.speed);});controlContexts.add(record);
}
export function press(el){if(!el)return;controlSequence(tl=>{
 // Button compression and rebound; timings come from the same configuration as the scene.
 tl.to(el,{scale:CONFIG.ui.buttonScale,duration:CONFIG.ui.press*CONFIG.beats.impact,ease:CONFIG.ease.out}).to(el,{scale:1,duration:CONFIG.ui.press*CONFIG.segments.recover,ease:CONFIG.ease.rebound});
});}
function burst(el,celebrate=false){
 if(!el||!controlsAllowed())return;const layer=document.querySelector('#sky-effects');if(!layer)return;
 const r=el.getBoundingClientRect(),nodes=[],count=celebrate?CONFIG.particles.celebrate:Math.ceil(CONFIG.particles.confetti*CONFIG.responsive.particles);
 for(let i=0;i<count;i++){const n=document.createElement('i');n.className='sky-spark';n.style.left=r.left+r.width/2+'px';n.style.top=r.top+r.height/2+'px';n.style.background=CONFIG.particles.colors[i%CONFIG.particles.colors.length];layer.append(n);nodes.push(n);}
 controlSequence(tl=>{
  // Input/letter sparks are bounded and removed on either completion or interruption.
  nodes.forEach((n,i)=>{const angle=i/count*Math.PI*2;tl.fromTo(n,{scale:.4,opacity:1},{x:Math.cos(angle)*CONFIG.particles.spread,y:Math.sin(angle)*CONFIG.particles.lift,scale:1,opacity:0,duration:CONFIG.ui.spark,ease:CONFIG.ease.out},i*CONFIG.particles.stagger);});
 },()=>nodes.forEach(n=>n.remove()));
}
export function selectPrompt(el){choosePrompt(el);burst(el);}
export function sending(el){press(el);}
export function windWisps(){
 const panel=document.querySelector('.puzzle-panel');if(!panel||!controlsAllowed())return;
 const nodes=Array.from({length:3},(_,i)=>{const n=document.createElement('div');n.className='wind-wisp';n.style.top=25+i*26+'%';n.style.width=60+i*35+'px';panel.append(n);return n;});
 controlSequence(tl=>nodes.forEach((n,i)=>tl.fromTo(n,{xPercent:-100,opacity:.6},{x:panel.clientWidth,opacity:0,duration:CONFIG.ui.wind,ease:CONFIG.ease.out},i*CONFIG.ui.windStagger)),()=>nodes.forEach(n=>n.remove()));
}
export function launchLetter(button){
 if(!button||!controlsAllowed())return;const from=button.getBoundingClientRect(),to=document.querySelector('.hidden-words')?.getBoundingClientRect();if(!to)return;
 const token=document.createElement('div');token.className='flying-letter-token';token.textContent=button.dataset.probe;Object.assign(token.style,{left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px'});document.body.append(token);
 controlSequence(tl=>{
  // Fly the selected token toward the existing answer mask; no letters are awarded here.
  // A tumbling 3D arc: sideways travel is linear while the climb eases, so the path curves.
  const dx=to.left+to.width/2-from.left-from.width/2,dy=to.top+to.height/2-from.top-from.height/2,d=CONFIG.deck.launch;
  tl.to(token,{x:dx,duration:d,ease:CONFIG.ease.linear},0).to(token,{y:dy,duration:d,ease:CONFIG.ease.rise},0)
    .to(token,{rotationX:540,rotationY:180,transformPerspective:CONFIG.deck.tilePerspective,scale:.7,duration:d,ease:CONFIG.ease.out},0).to(token,{opacity:0,scale:.3,duration:d*.25,ease:CONFIG.ease.fall},d*.78);
 },()=>token.remove());
}
function popLabel(text,anchor,className){if(!anchor||!controlsAllowed())return;const label=document.createElement('span');label.className=className;label.textContent=text;anchor.append(label);controlSequence(tl=>tl.fromTo(label,{y:0,scale:.7,opacity:1},{y:-CONFIG.rise.height,scale:1,opacity:0,duration:CONFIG.ui.points,ease:CONFIG.ease.out}),()=>label.remove());}
export function feedback(before,after,action){
 cinematicFeedback(before,after,action);if(!after||!controlsAllowed())return;
 // Observe already-computed scores, masks and fuel. These timelines cannot change them.
 if(before&&before.mask!==after.mask)flipTiles([...document.querySelectorAll('[data-letter-index]')].filter(el=>before.mask[Number(el.dataset.letterIndex)]==='_'&&after.mask[Number(el.dataset.letterIndex)]!=='_'));
 if(before&&after.score>before.score){press(document.querySelector('.score-chip'));press(document.querySelector('.altimeter'));popLabel('+'+(after.score-before.score),document.querySelector('.score-chip'),'points-pop');windWisps();countUp(document.querySelector('.score-value'),before.score,after.score);countUp(document.querySelector('.alt-val'),before.score*10,after.score*10,'m');}
 if(after.air<before?.air){popLabel('-'+(before.air-after.air)+' Fuel',document.querySelector('.air'),'fuel-loss-pop');spendFuel(before.air,after.air);}
 if(before&&(after.hint?.used||0)>(before.hint?.used||0)&&after.hint.used===1)unfoldHint();
 if(before?.status==='active'&&after.status!=='active')showResult();
 if(action==='probe'&&after.history.at(-1)?.result==='hit')burst(document.querySelector('.hidden-words'));
 if(after.status==='solved'&&before?.status!=='solved')burst(document.querySelector('.answer-reveal')||document.querySelector('.hidden-words'),true);
 // A hint leaves the current step in place; every other confirmed action deals the next step card.
 if(action!=='hint'||before?.phase!==after.phase)stepEnter(document.querySelector('.action-panel'));
 if(action==='next')windWisps();
}
export function invalid(){const panel=document.querySelector('.action-panel');if(panel)controlSequence(tl=>{
 // Validation feedback is a small panel nudge, never the confirmed-wrong balloon scene.
 tl.to(panel,{x:-CONFIG.shake.amplitude,duration:CONFIG.ui.error/CONFIG.shake.repeat,ease:CONFIG.ease.linear,repeat:CONFIG.shake.repeat,yoyo:true}).to(panel,{x:0,duration:CONFIG.ui.error/CONFIG.shake.repeat,ease:CONFIG.ease.out});
});}
