const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const animate=(el,frames,options={})=>{if(!el||reduced()||!el.animate)return;return el.animate(frames,{duration:280,easing:'cubic-bezier(.2,.8,.25,1)',...options});};
export function press(el){animate(el,[{transform:'scale(1)'},{transform:'scale(.94)',offset:.35},{transform:'scale(1.04)',offset:.7},{transform:'scale(1)'}],{duration:240});}
function burst(el,celebrate=false){
 if(!el||reduced())return;const layer=document.querySelector('#sky-effects');if(!layer)return;
 const rect=el.getBoundingClientRect(),x=rect.left+rect.width/2,y=rect.top+rect.height/2;
 const count=celebrate?22:8;
 for(let i=0;i<count;i++){
  const mote=document.createElement('i');mote.className='sky-spark';mote.style.left=x+'px';mote.style.top=y+'px';mote.style.background=['#ffc55b','#f77677','#89bce9','#a6d6bb','#a99bdd'][i%5];layer.append(mote);
  const angle=(i/count)*Math.PI*2,travel=celebrate?100+(i%4)*35:28+(i%3)*12;
  const a=animate(mote,[{transform:'translate(-50%,-50%) scale(.5)',opacity:1},{transform:`translate(${Math.cos(angle)*travel}px,${Math.sin(angle)*travel-35}px) rotate(${i*57}deg) scale(1)`,opacity:0}],{duration:celebrate?950:500,delay:i*8});
  if(a)a.finished.catch(()=>{}).finally(()=>mote.remove());else mote.remove();
 }
}
export function selectPrompt(el){press(el);burst(el);}
export function sending(el){press(el);if(!reduced())el?.classList.add('launching');}
export function feedback(before,after,action){
 document.querySelectorAll('.launching').forEach(el=>el.classList.remove('launching'));
 if(!after||reduced())return;
 if(before?.mask!==after.mask){
  document.querySelectorAll('[data-letter-index]').forEach(el=>{const i=Number(el.dataset.letterIndex);if(before?.mask[i]==='_'&&after.mask[i]!=='_')animate(el,[{transform:'translateY(0) rotateX(0)',opacity:.4},{transform:'translateY(-12px) rotateX(90deg)',opacity:.7,offset:.38},{transform:'translateY(0) rotateX(0)',opacity:1}],{duration:420,delay:i*22});});
 }
 if(before&&after.score>before.score){press(document.querySelector('.score-chip'));const badge=document.createElement('span');badge.className='points-pop';badge.textContent='+'+(after.score-before.score);const chip=document.querySelector('.score-chip');chip?.append(badge);const a=animate(badge,[{transform:'translateY(0) scale(.7)',opacity:0},{transform:'translateY(-14px) scale(1)',opacity:1,offset:.3},{transform:'translateY(-40px)',opacity:0}],{duration:850});a?.finished.catch(()=>{}).finally(()=>badge.remove());}
 if(after.air<before?.air||after.wrong>before?.wrong)animate(document.querySelector('.puzzle-panel'),[{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(4px)'},{transform:'translateX(-2px)'},{transform:'translateX(0)'}],{duration:270});
 if(action==='probe'&&after.history.at(-1)?.result==='hit')burst(document.querySelector('.hidden-words'));
 if(after.status==='solved'&&before?.status!=='solved'){burst(document.querySelector('.answer-reveal'),true);animate(document.querySelector('.result'),[{transform:'translateY(18px) scale(.98)',opacity:.2},{transform:'translateY(0) scale(1)',opacity:1}],{duration:380});}
 if(action==='next')animate(document.querySelector('.flight-balloon'),[{transform:'translateY(0) rotate(-4deg)'},{transform:'translateY(-16px) rotate(5deg)'},{transform:'translateY(0) rotate(-4deg)'}],{duration:520});
}
export function invalid(){document.querySelectorAll('.launching').forEach(el=>el.classList.remove('launching'));animate(document.querySelector('.action-panel'),[{transform:'translateX(0)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:220});}
