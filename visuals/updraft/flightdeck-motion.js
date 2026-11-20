import {CONFIG} from './gsap-config.js';
import {controlSequence,controlsAllowed} from './controls-motion.js';
// Flight-deck motion: 3D depth for the controls (tiles, cards, results) and pointer parallax
// for the scene. Presentation only — every function here reads the DOM the game already
// rendered and never decides, delays or changes an outcome.
const DECK=CONFIG.deck;
globalThis.gsap?.config({nullTargetWarn:false});
const depthTweens=new Set();
let depthArmed=false,tilted=null,sceneLayers=null;
function releaseTilt(instant=false){
 if(!tilted)return;const el=tilted;tilted=null;
 if(instant){gsap.killTweensOf(el);gsap.set(el,{clearProps:'transform'});return;}
 gsap.to(el,{rotationX:0,rotationY:0,z:0,duration:DECK.tiltRelease,ease:CONFIG.ease.out,overwrite:'auto',onComplete:()=>gsap.set(el,{clearProps:'transform'})});
}
// Called with every other control animation when motion is switched off or interrupted.
export function resetDepth(){
 releaseTilt(true);
 if(sceneLayers){for(const layer of sceneLayers){gsap.killTweensOf(layer.el);gsap.set(layer.el,{clearProps:layer.props});}sceneLayers=null;}
 for(const tween of depthTweens)tween.kill();depthTweens.clear();
}
function layersFor(scene){
 if(sceneLayers?.scene===scene)return sceneLayers;
 // Only elements the scene director never tweens, so parallax cannot fight a cinematic.
 const layers=DECK.parallax.map(([selector,depth])=>({el:scene.querySelector(selector),depth,props:'x,y'})).filter(layer=>layer.el);
 layers.scene=scene;sceneLayers=layers;return layers;
}
export function armDepth(root){
 if(depthArmed||!gsap||!root)return;depthArmed=true;
 // Cards lean toward the pointer; their icon and title sit on higher 3D planes (see flightdeck.css).
 root.addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse'||!controlsAllowed()){releaseTilt(true);return;}
  const el=event.target.closest?.('[data-tilt]');if(el!==tilted)releaseTilt();if(!el||el.disabled)return;tilted=el;
  const box=el.getBoundingClientRect(),px=(event.clientX-box.left)/box.width-.5,py=(event.clientY-box.top)/box.height-.5,soft=el.dataset.tilt==='soft',max=soft?DECK.tiltSoft:DECK.tilt;
  gsap.to(el,{rotationY:px*max*2,rotationX:-py*max*2,z:soft?0:DECK.tiltLift,transformPerspective:DECK.perspective,duration:DECK.tiltFollow,ease:CONFIG.ease.out,overwrite:'auto'});
 });
 root.addEventListener('pointerleave',()=>releaseTilt());
 // The storybook scene shifts in layers as the pointer crosses the page.
 addEventListener('pointermove',event=>{
  const scene=document.querySelector('.ud-scene');if(event.pointerType!=='mouse'||!scene||!controlsAllowed())return;
  const nx=event.clientX/innerWidth-.5,ny=event.clientY/innerHeight-.5;
  for(const layer of layersFor(scene))gsap.to(layer.el,{x:-nx*layer.depth,y:-ny*layer.depth*.6,duration:DECK.parallaxFollow,ease:CONFIG.ease.out,overwrite:'auto'});
 },{passive:true});
}
// One entrance per screen. Elements start from an offset 3D pose and settle into the layout
// the stylesheet already defines; the context revert leaves no inline styles behind.
export function stageEnter(root,kind){
 if(!root)return;
 if(kind==='welcome')controlSequence(tl=>{
  tl.fromTo(root.querySelectorAll('.welcome-copy>*'),{y:DECK.rise,opacity:0},{y:0,opacity:1,duration:DECK.enter,ease:CONFIG.ease.rise,stagger:DECK.stagger},0);
  tl.fromTo(root.querySelectorAll('.pilot-card>*'),{rotationX:-70,transformPerspective:DECK.perspective,transformOrigin:'50% 0%',opacity:0},{rotationX:0,opacity:1,duration:DECK.enter*1.2,ease:CONFIG.ease.rebound,stagger:DECK.stagger*1.5},DECK.stagger*3);
 });
 if(kind==='play')controlSequence(tl=>{
  tl.fromTo(root.querySelector('.puzzle-panel'),{rotationX:-14,y:DECK.rise*1.5,opacity:0,transformPerspective:DECK.perspective,transformOrigin:'50% 0%'},{rotationX:0,y:0,opacity:1,duration:DECK.enter*1.2,ease:CONFIG.ease.rise},0);
  // The mystery deals itself out, tile by tile.
  tl.fromTo(root.querySelectorAll('.letter-tile'),{rotationY:-90,z:-40,opacity:0,transformPerspective:DECK.tilePerspective},{rotationY:0,z:0,opacity:1,duration:DECK.flip*.8,ease:CONFIG.ease.rebound,stagger:DECK.tileStagger},DECK.enter*.35);
  tl.fromTo(root.querySelectorAll('.air i'),{scale:0,y:8},{scale:1,y:0,duration:DECK.pop,ease:CONFIG.ease.rebound,stagger:DECK.tileStagger},DECK.enter*.6);
  tl.fromTo(root.querySelectorAll('.play-layout aside>*'),{y:DECK.rise,opacity:0},{y:0,opacity:1,duration:DECK.enter,ease:CONFIG.ease.rise,stagger:DECK.stagger},DECK.enter*.4);
  dealPanel(tl,root.querySelector('.action-panel'),DECK.enter*.3);
 });
}
// The step card tips in from above and its contents rise in sequence.
function dealPanel(tl,panel,at=0){
 if(!panel)return;
 tl.fromTo(panel,{rotationX:-11,y:DECK.rise,opacity:0,transformPerspective:DECK.perspective,transformOrigin:'50% 0%'},{rotationX:0,y:0,opacity:1,duration:DECK.enter,ease:CONFIG.ease.rise},at);
 const parts=[...panel.children].filter(el=>!el.matches('.prompt-grid,.probe-letters'));
 tl.fromTo(parts,{y:DECK.rise*.6,opacity:0},{y:0,opacity:1,duration:DECK.enter*.8,ease:CONFIG.ease.out,stagger:DECK.stagger*.8},at+DECK.enter*.25);
 // Two prompt cards swing in like opening doors; launch keys flip up like keycaps.
 panel.querySelectorAll('.prompt').forEach((card,i)=>tl.fromTo(card,{rotationY:i?-38:38,x:i?40:-40,opacity:0,transformPerspective:DECK.perspective},{rotationY:0,x:0,opacity:1,duration:DECK.enter*1.15,ease:CONFIG.ease.rebound},at+DECK.enter*.3+i*DECK.stagger));
 tl.fromTo(panel.querySelectorAll('.probe-letters button'),{rotationX:95,y:18,opacity:0,transformPerspective:DECK.tilePerspective,transformOrigin:'50% 100%'},{rotationX:0,y:0,opacity:1,duration:DECK.flip*.75,ease:CONFIG.ease.rebound,stagger:DECK.tileStagger*1.4},at+DECK.enter*.35);
 const banner=panel.querySelector('.rarity-banner');if(banner)tl.fromTo(banner,{scale:1.18,rotationX:28,transformPerspective:DECK.perspective},{scale:1,rotationX:0,duration:DECK.enter,ease:CONFIG.ease.rebound},at+DECK.enter*.2);
}
export function stepEnter(panel){if(panel)controlSequence(tl=>dealPanel(tl,panel));}
// A revealed tile turns over on its horizontal axis and hops; later tiles follow in a wave.
export function flipTiles(tiles){
 tiles.forEach((tile,order)=>{
  const inner=tile.querySelector('.tile-inner');if(!inner)return;
  controlSequence(tl=>{
   tl.fromTo(inner,{rotationX:0},{rotationX:180,duration:DECK.flip,ease:CONFIG.ease.rebound},order*DECK.tileStagger*2);
   tl.fromTo(tile,{y:0,scale:1},{y:-DECK.flipLift,scale:1.14,duration:DECK.flip*.45,ease:CONFIG.ease.out,yoyo:true,repeat:1},order*DECK.tileStagger*2);
  });
 });
}
const countTargets=new WeakMap();
// Rolls a number up to the value the game has already rendered.
export function countUp(el,from,to,suffix=''){
 if(!el||from===to)return;countTargets.set(el,to);const state={value:from};
 controlSequence(tl=>tl.to(state,{value:to,duration:DECK.count,ease:CONFIG.ease.out,onUpdate:()=>{if(countTargets.get(el)===to)el.textContent=Math.round(state.value)+suffix;}}),()=>{if(countTargets.get(el)===to)el.textContent=to+suffix;});
}
export function spendFuel(from,to){
 const cells=[...document.querySelectorAll('.air i')].slice(to,from);if(!cells.length)return;
 controlSequence(tl=>{
  tl.fromTo(cells,{scale:1.9,y:-10,rotation:-25,opacity:1},{scale:1,y:0,rotation:12,opacity:1,duration:DECK.pop*1.4,ease:CONFIG.ease.rebound,stagger:DECK.tileStagger},0);
  tl.fromTo(document.querySelector('.air strong'),{x:-4},{x:0,duration:DECK.pop,ease:'elastic.out(1.4,.35)'},0);
 });
}
// The clue card unfolds downward from the mystery, like a note being opened.
export function unfoldHint(){
 const card=document.querySelector('.hint-card');if(!card)return;
 controlSequence(tl=>{
  tl.fromTo(card,{rotationX:-92,opacity:0,transformPerspective:DECK.perspective,transformOrigin:'50% 0%'},{rotationX:0,opacity:1,duration:DECK.flip,ease:CONFIG.ease.rebound});
  tl.fromTo(card.querySelector('span'),{scale:0,rotation:-40},{scale:1,rotation:0,duration:DECK.pop,ease:CONFIG.ease.rebound},DECK.flip*.4);
 });
}
// Result: the medal spins like a tossed coin, stars land one by one, the breakdown adds up.
export function showResult(){
 const card=document.querySelector('.result');if(!card)return;
 controlSequence(tl=>{
  tl.fromTo(card,{rotationX:-12,y:DECK.rise*1.5,opacity:0,transformPerspective:DECK.perspective,transformOrigin:'50% 0%'},{rotationX:0,y:0,opacity:1,duration:DECK.enter*1.2,ease:CONFIG.ease.rise},0);
  tl.fromTo(card.querySelector('.result-medal span'),{rotationY:-900,scale:.2},{rotationY:0,scale:1,duration:DECK.count*1.5,ease:CONFIG.ease.out},DECK.enter*.3);
  tl.fromTo(card.querySelector('.answer-reveal'),{scale:.7,opacity:0,letterSpacing:'.3em'},{scale:1,opacity:1,letterSpacing:'0em',duration:DECK.enter*1.3,ease:CONFIG.ease.rebound},DECK.enter*.35);
  tl.fromTo(card.querySelectorAll('.stars .lit'),{scale:0,rotation:-140,opacity:0},{scale:1,rotation:0,opacity:1,duration:DECK.pop*1.3,ease:CONFIG.ease.rebound,stagger:DECK.stagger*2.2},DECK.enter);
  tl.fromTo(card.querySelectorAll('.score-row'),{x:-18,opacity:0},{x:0,opacity:1,duration:DECK.enter*.8,ease:CONFIG.ease.out,stagger:DECK.stagger},DECK.enter*.9);
  tl.fromTo(card.querySelectorAll('.flight-facts span'),{rotationX:-80,opacity:0,transformPerspective:DECK.tilePerspective},{rotationX:0,opacity:1,duration:DECK.enter,ease:CONFIG.ease.rebound,stagger:DECK.stagger},DECK.enter*1.6);
 });
 const total=card.querySelector('.total [data-count]');if(total)countUp(total,0,Number(total.dataset.count));
}
// Choosing a prompt lifts that card toward the player and lets the other fall back.
export function choosePrompt(card){
 if(!card)return;const other=[...card.parentElement.children].find(el=>el!==card);
 controlSequence(tl=>{
  tl.fromTo(card,{z:0,rotationX:0,transformPerspective:DECK.perspective},{z:DECK.tiltLift*2.2,rotationX:9,duration:DECK.pop*.5,ease:CONFIG.ease.out}).to(card,{z:0,rotationX:0,duration:DECK.pop,ease:CONFIG.ease.rebound});
  tl.fromTo(card.querySelector('.prompt-icon'),{rotationY:0},{rotationY:360,duration:DECK.pop*1.6,ease:CONFIG.ease.out},0);
  if(other)tl.fromTo(other,{scale:1,opacity:1},{scale:.97,opacity:.72,duration:DECK.pop,ease:CONFIG.ease.out},0);
 });
}
