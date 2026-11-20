/* Updraft Sky Mail: a deterministic, portable SVG letter made only from flight data.
   No DOM, assets, timers, external fonts, or changes to the game state. */
(function(root){
'use strict';
const escapeXml=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
function hash(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function pointsFromHistory(history){
  // Five gentle, distinct stations, with route-dependent drift: your answers draw a unique sky.
  const base=[278,368,268,402,312];
  return history.map((item,i)=>({
    x:165+i*214+((hash(item.id)%41)-20),
    y:base[i%5]+((hash(item.id+'-wind')%53)-26),
    hit:item.hit,icon:item.icon,id:item.id,
  }));
}
function buildSvg(flight,stamp=''){
  const history=flight.history||[];
  const perfect=history.length===5&&history.every(item=>item.hit);
  const points=pointsFromHistory(history);
  const found=history.filter(item=>item.hit).length;
  const peak=Math.max(0,Math.round(flight.peak||0));
  const title=perfect?'The Co-pilot’s Constellation':'Every detour belongs to the sky';
  const subtitle=perfect?'Five bright discoveries. One new shape in the stars.':'Not every star needs to shine to tell a story.';
  const date=escapeXml(stamp||'A FLIGHT WORTH REMEMBERING');
  const seed=hash(history.map(item=>item.id).join('|'));
  const backgroundStars=Array.from({length:45},(_,i)=>{
    const x=38+((i*193+seed%71)%1120);
    const y=206+((i*97+seed%59)%377);
    const r=i%7===0?3.1:i%3===0?1.9:1.1;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffe9b2" opacity="${i%6===0?'.8':'.38'}"/>`;
  }).join('');
  const connections=perfect?`<path class="constellation-path" d="${points.map((p,i)=>(i?'L':'M')+p.x+' '+p.y).join(' ')}" fill="none" stroke="#f9ddb0" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" opacity=".93"/>`:'';
  const stars=points.map((p,i)=>p.hit?`
    <g transform="translate(${p.x} ${p.y})"><circle r="28" fill="#ffe6a9" opacity=".10"/><circle r="14" fill="#ffeba8" opacity=".18"/><path d="M0 -19 L4.7 -4.7 L19 0 L4.7 4.7 L0 19 L-4.7 4.7 L-19 0 L-4.7 -4.7Z" fill="#fff4c7" stroke="#e5ba81" stroke-width="1"/><circle r="3" fill="white"/></g>`:`
    <g transform="translate(${p.x} ${p.y})"><circle r="14" fill="none" stroke="#f4deb8" stroke-width="2.7" stroke-dasharray="3 5" opacity=".8"/><circle r="3.3" fill="#e8ccb9" opacity=".7"/></g>`).join('');
  const labels=points.map((p,i)=>`<text x="${p.x+17}" y="${p.y-25}" font-family="Trebuchet MS, Arial, sans-serif" font-size="16" font-weight="bold" fill="#fbeace" opacity=".92">${String(i+1).padStart(2,'0')}</text>`).join('');
  const souvenirs=history.map((item,i)=>{
    const x=63+i*217;
    const label=escapeXml(item.souvenir);
    return `<g><circle cx="${x+15}" cy="694" r="15" fill="${item.hit?'#e4aa69':'#d6d0c5'}" opacity=".72"/><text x="${x+15}" y="700" text-anchor="middle" font-size="19" font-family="Georgia, serif" fill="#263b4d">${item.hit?'✦':'·'}</text><text x="${x}" y="735" font-family="Georgia, serif" font-size="18" fill="${item.hit?'#3e5058':'#948c80'}">${label}</text><text x="${x}" y="765" font-family="Trebuchet MS,Arial,sans-serif" font-size="12" letter-spacing="1.2" fill="#9a8977">${item.hit?'DISCOVERED':'A GENTLE DETOUR'}</text></g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" data-perfect="${perfect}" aria-label="Updraft sky mail postcard, ${found} discoveries, peak ${peak} metres">
  <title>${escapeXml(title)} — Updraft Sky Mail</title>
  <defs><linearGradient id="night" x1="0" y1="0" x2=".84" y2="1"><stop stop-color="#182a50"/><stop offset=".55" stop-color="#405781"/><stop offset="1" stop-color="#b08b9b"/></linearGradient><radialGradient id="glow"><stop stop-color="#f5b98f" stop-opacity=".63"/><stop offset="1" stop-color="#f5b98f" stop-opacity="0"/></radialGradient></defs>
  <rect width="1200" height="800" rx="26" fill="#f7edda"/>
  <path d="M26 0H1174Q1200 0 1200 26V610H0V26Q0 0 26 0Z" fill="url(#night)"/>
  <circle cx="970" cy="394" r="288" fill="url(#glow)" opacity=".28"/>
  <circle cx="1050" cy="218" r="44" fill="#f8dcaf" opacity=".94"/><circle cx="1074" cy="201" r="41" fill="#46577b"/>
  <path d="M0 535Q165 480 306 533T639 521T967 520T1200 514V607H0Z" fill="#677794" opacity=".32"/>
  <path d="M0 582Q200 539 360 590T756 568T1200 577V612H0Z" fill="#f1b996" opacity=".26"/>
  <g>${backgroundStars}</g>
  <g fill="none" stroke="#edc9a7" stroke-width="1.4" opacity=".3"><circle cx="600" cy="365" r="233" stroke-dasharray="2 14"/><path d="M54 208H1146M54 556H1146" stroke-dasharray="3 10"/></g>
  <text x="60" y="64" font-family="Trebuchet MS, Arial, sans-serif" font-size="20" font-weight="bold" letter-spacing="6" fill="#fbead1">U P D R A F T</text>
  <text x="60" y="98" font-family="Trebuchet MS, Arial, sans-serif" font-size="14" letter-spacing="3" fill="#e7d1b9">SKY MAIL  /  THE LITTLE WONDERS EXPEDITION</text>
  <text x="1148" y="64" text-anchor="end" font-family="Trebuchet MS, Arial, sans-serif" font-size="15" font-weight="bold" letter-spacing="2" fill="#fbead1">${date}</text>
  <text x="60" y="160" font-family="Georgia, Times New Roman, serif" font-size="49" fill="#fff0d5">${escapeXml(title)}</text>
  <text x="62" y="189" font-family="Trebuchet MS, Arial, sans-serif" font-size="16" letter-spacing=".6" fill="#f7d8bb">${escapeXml(subtitle)}</text>
  <g>${connections}${stars}${labels}</g>
  <g transform="translate(1025 421) rotate(9)"><path d="M0 0C-43-2-70 26-68 67c0 32 25 65 54 92h28c31-29 53-57 54-92C70 25 42-2 0 0Z" fill="#e9ae8e" opacity=".72"/><path d="M0 0V158M-32 15l17 143M32 15L15 158" stroke="#fce6c7" stroke-width="3" opacity=".35"/><path d="M-17 158l-8 42m42-42 8 42" stroke="#f9d4af" stroke-width="3"/><path d="M-28 198H28L21 227H-21Z" fill="#cfa78b"/><path d="M-30 198H30" stroke="#f3cfaa" stroke-width="5"/></g>
  <text x="62" y="589" font-family="Trebuchet MS, Arial, sans-serif" font-size="16" font-weight="bold" letter-spacing="2" fill="#ffe1be">MIRI QUILL • YOUR CO-PILOT</text>
  <rect y="610" width="1200" height="190" fill="#f8edda"/>
  <path d="M0 610H1200" stroke="#c5977d" stroke-width="4"/>
  <text x="62" y="653" font-family="Trebuchet MS, Arial, sans-serif" font-size="17" font-weight="bold" letter-spacing="3" fill="#a57662">THE WONDERS WE MET</text>
  <text x="1145" y="653" text-anchor="end" font-family="Trebuchet MS, Arial, sans-serif" font-size="19" font-weight="bold" letter-spacing="1.3" fill="#465d67">${found}/5 FOUND  ·  ${peak}m HIGH</text>
  ${souvenirs}
  <path d="M22 22H1178V778H22Z" fill="none" stroke="#ead6bf" stroke-width="2" stroke-dasharray="5 9" opacity=".35"/>
</svg>`;
}
const api=Object.freeze({pointsFromHistory,buildSvg});
root.UpdraftPostcard=api;
if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
