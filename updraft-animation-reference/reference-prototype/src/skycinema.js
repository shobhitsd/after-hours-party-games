/* Chapter VI: pure, deterministic atmosphere + shot directions.
   No game-state writes and no timers: the renderer consumes these values. */
(function(root){
'use strict';
const clamp=(x,a,b)=>Math.min(b,Math.max(a,x));
const finite=x=>Number.isFinite(Number(x))?Number(x):0;
function profile(altitude){
  const alt=clamp(finite(altitude),0,2000);
  // A paper kite visits only the middle skies. An altitude, not a random roll,
  // determines its appearance, so debug scrubbing and skipped scenes agree.
  const fadeIn=clamp((alt-420)/250,0,1);
  const fadeOut=clamp((1330-alt)/400,0,1);
  return Object.freeze({
    kite:Math.round(Math.min(fadeIn,fadeOut)*100)/100,
    near:Math.round(alt/2000*57),
    far:Math.round(alt/2000*23),
    light:Math.round(clamp(1-alt/2300,.12,1)*100)/100
  });
}
const shots=Object.freeze({
  correct:Object.freeze({name:'rise',direction:1}),
  rare:Object.freeze({name:'wonder',direction:1}),
  wrong:Object.freeze({name:'dip',direction:-1}),
  tier:Object.freeze({name:'reveal',direction:1}),
  landing:Object.freeze({name:'settle',direction:-1}),
  constellation:Object.freeze({name:'stars',direction:0}),
  wave:Object.freeze({name:'hello',direction:0})
});
function shot(scene){return shots[scene]||Object.freeze({name:'still',direction:0});}
const api=Object.freeze({profile,shot});
root.UpdraftSkyCinema=api;
if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
