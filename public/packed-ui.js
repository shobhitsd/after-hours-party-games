import {verifyProof} from './packed-proof.js';

const optText = o => (typeof o === 'object' && o !== null ? o.text || o.label || '' : String(o || ''));
const optImg = o => (typeof o === 'object' && o !== null ? o.image || '' : '');

document.addEventListener('error',event=>{
 const img=event.target;
 if(!(img instanceof HTMLImageElement)||!img.matches('.packed-room-img, .packed-rank .rank-thumb-img, .packed-results .result-thumb-img'))return;
 const frame=img.parentElement;
 frame.style.removeProperty('display');
 frame.classList.add('packed-image-fallback');
 const note=document.createElement('span');note.textContent='Photo unavailable';
 frame.replaceChildren(note);
},true);

export function packedOptions(o,disabled,esc){
 const select=(key,label,values)=>{
  const currentEntry=values.find(([v])=>String(v)===String(o[key]))||values[0];
  const currentText=currentEntry?currentEntry[1]:'';
  return `<label for="option-${key}">${label}</label>
  <div class="custom-select ${disabled?'disabled':''}">
   <select id="option-${key}" data-option="${key}" class="custom-select-native" tabindex="-1" aria-hidden="true" ${disabled?'disabled':''}>
    ${values.map(([v,t])=>`<option value="${v}" ${String(o[key])===String(v)?'selected':''}>${esc(t)}</option>`).join('')}
   </select>
   <button type="button" class="custom-select-trigger" data-toggle-dropdown aria-haspopup="listbox" aria-expanded="false" ${disabled?'disabled':''}>
    <span class="custom-select-label"><span class="select-text">${esc(currentText)}</span></span>
    <span class="custom-select-arrow" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
   </button>
   <div class="custom-select-menu" role="listbox">
    ${values.map(([v,t])=>{
      const sel=String(o[key])===String(v);
      return `<div class="custom-select-option ${sel?'selected':''}" role="option" data-select-dropdown="option-${key}" data-value="${v}" aria-selected="${sel}">
       <span class="select-option-text">${esc(t)}</span>${sel?'<span class="select-check" aria-hidden="true">✓</span>':''}
      </div>`;
    }).join('')}
   </div>
  </div>`;
 };
 return `<div class="game-options" data-key="game-options"><h3>Make room for your people</h3>${select('packedRounds','Rounds',[5,6,7,8,9,10].map(n=>[n,`${n} rounds${n===6?' · recommended for 9–10 people':''}`]))}<div class="packed-timer-options">${[['packedRankSeconds','Rank'],['packedPickSeconds','Discuss & choose']].map(([key,label])=>`<label>${label} (seconds)<input type="number" data-option="${key}" min="10" max="120" value="${o[key]}" ${disabled?'disabled':''}></label>`).join('')}</div>${select('packedAnonymous','Rankings at reveal',[[false,'Show who ranked what'],[true,'Anonymous ballots']])}${select('packedSoftLanding','Overcrowding rule',[[false,'Classic · overcrowded rooms score 0'],[true,'Soft Landing · exactly one over earns 1 each']])}<p>Soft Landing is an optional house rule. It does not change the seats or pool splits.</p>${select('packedPack','Question pack',[['curated','Curated · 60 verified questions with photos'],['custom','Your private questions']])}${o.packedPack==='custom'?`<label for="packed-custom">One question per line: Question | Option 1 | Option 2 | …</label><textarea id="packed-custom" rows="6" maxlength="15000" ${disabled?'disabled':''} placeholder="Best holiday? | Beach | Mountains | City | Cruise | Desert | Countryside">${esc(o.packedCustom.map(q=>[q.question,...q.options].join(' | ')).join('\n'))}</textarea><p>Save at least ${o.packedRounds} questions. Use 5 options per question, or 6 for groups of 9–10. Each option must be distinct.</p><button class="btn outline" data-action="save-packed-custom" ${disabled?'disabled':''}>Save questions</button><small>${o.packedCustom.length} saved questions</small>`:''}<p>Five to ten seated players. Extra friends can watch. Practice waits for you at each step.</p></div>`;
}

export function packedContent(s,{esc,intro,button,nameOf},selected){
 const spectator=s.spectator;
 if(s.paused)return intro('Keeping your seats warm.','Fewer than four seated players are connected. The phase timer is paused for up to two minutes; completed scores are safe.')+`<div class="packed-pause" role="status">${s.players.filter(p=>p.connected!==false).length} connected · need 4 to resume</div>`+(s.host===s.me?button('End game with current scores','confirm-end-packed','outline'):'');
 const top=`<div class="packed-meta"><span>${s.seatedCount} players at game start</span><span>${s.board.length} rooms</span><span>${s.options.packedSoftLanding?'Soft Landing':'Classic scoring'}</span>${spectator?'<span>Watching · you do not take a seat</span>':''}</div>`;
 const proof=`<details class="packed-proof"><summary>Hidden seats locked before rankings</summary><p>The exact seats and random tie-break order were committed at the start. Your device checks the reveal against this fingerprint.</p><code>${s.commitment}</code></details>`;

 const roomCards=(choosing=false)=>`<div class="packed-rooms">${s.tiers.map(t=>{
  const opt=s.board[t.id];
  const img=optImg(opt);
  return `<button class="packed-room tier-${t.tier} ${selected[0]===t.id&&choosing?'picked':''}" data-choice="${t.id}" aria-pressed="${choosing&&selected[0]===t.id}" ${!choosing||!s.canAct?'disabled':''} data-key="packed-room-${t.id}">
   ${img?`
    <div class="packed-room-media">
     <img src="${esc(img)}" alt="${esc(opt)}" class="packed-room-img" loading="lazy" draggable="false" />
    </div>
   `:''}
   <div class="packed-room-info">
    <strong class="packed-room-title">${esc(opt)}</strong>
    <div class="packed-room-stats">
     <span class="packed-pool">${t.pool}<small>POINT POOL</small></span>
     <span class="packed-capacity">${t.range[0]}–${t.range[1]} hidden seats</span>
    </div>
    <small class="packed-room-split-note">Split by the people who enter</small>
   </div>
  </button>`;
 }).join('')}</div>`;

 const saved=s.ownAnswer!==undefined;

 if(s.stage==='rank')return top+intro(esc(s.question),spectator?'The seated players are ranking. You will see the combined rooms next.':'Drag the grip or use the arrows to order every option, favourite first. Lock in your ranking below. You can update it until this step closes.')+(spectator?'<div class="waiting-box">Watching the room take shape…</div>':`<ol class="rank-list packed-rank" aria-label="Your private ranking">${selected.map((id,pos)=>{
  const opt=s.board[id];
  const img=optImg(opt);
  return `<li class="rank-item" data-key="packed-rank-${id}" data-rank-pos="${pos}" draggable="${s.canAct}">
   <span class="rank-drag-handle" aria-hidden="true" title="Drag to reorder">⠿</span>
   <span class="rank-position">${pos+1}</span>
   ${img?`<div class="rank-thumb-wrap"><img src="${esc(img)}" alt="${esc(opt)}" class="rank-thumb-img" loading="lazy" draggable="false" /></div>`:''}
   <strong class="rank-label">${esc(opt)}</strong>
   <span class="rank-value">${s.board.length-pos}<small>Borda pts</small></span>
   <div class="rank-controls">
    <button data-rank-move="${pos}" data-direction="-1" aria-label="Move ${esc(opt)} up" ${!s.canAct||pos===0?'disabled':''}>↑</button>
    <button data-rank-move="${pos}" data-direction="1" aria-label="Move ${esc(opt)} down" ${!s.canAct||pos===selected.length-1?'disabled':''}>↓</button>
   </div>
  </li>`;
 }).join('')}</ol><div class="packed-submit">${button(saved?'Update ranking →':'Lock in ranking →','lock-rank','primary',s.canAct?'':'disabled')}<p aria-live="polite">${saved?'Ranking saved. Your latest saved order counts.':'Nothing submitted yet.'} ${s.submitted.length}/${s.expectedCount} rankings saved.</p></div>`)+proof;

 return top+intro(esc(s.question),spectator?'Watch the room choose. Individual picks stay secret until the reveal.':'Discuss your plans in person or on your voice call, and choose a room while you talk. Save your choice now; you can update it until the timer ends.')+roomCards(true)+`<div class="packed-explainer"><strong>One person gets the whole pool.</strong><p>If everyone fits, split the pool. Too many people? ${s.options.packedSoftLanding?'Exactly one over earns 1 each; otherwise everyone scores 0.':'Everyone there scores 0.'} The range shows possible seat counts.</p></div>`+(!spectator?`<div class="packed-submit">${button(saved?'Update my room →':'Lock in my room →','lock','primary',s.canAct&&selected.length?'':'disabled')}<p aria-live="polite">${saved?`Saved: ${esc(s.board[s.ownAnswer])}. You can still change it.`:'No pick yet. Missing this phase scores 0 and takes no seat.'}</p></div>`:'')+proof;
}

export function observePackedCommitment(s){
 if(s.game!=='packed'||!s.roundId)return;
 const key='packed-commit:'+s.code+':'+s.roundId;
 if(!['reveal','finished'].includes(s.stage)&&!sessionStorage.getItem(key))sessionStorage.setItem(key,s.commitment);
}

export function packedReveal(s,{esc,nameOf}){
 const result=s.result.packed,proof=result.proof,original=sessionStorage.getItem('packed-commit:'+s.code+':'+s.roundId);
 const valid=verifyProof(proof,original||s.commitment)&&(!original||original===s.commitment)&&proof.roundId===s.roundId&&proof.seatedCount===s.seatedCount&&result.rooms.every(t=>t.capacity===proof.capacities[t.tier-1]);
 const badge=valid?(original?'✓ Round verified':'✓ Proof matches · earlier commitment not witnessed'):'⚠ Verification failed · do not trust this round';

 return `<div class="packed-verification ${valid?'valid':'invalid'}" role="status">${badge}</div><div class="packed-results">${result.rooms.map((t,i)=>{
  const img=optImg(t.label);
  return `<article class="packed-result ${t.status}" style="--reveal-delay:${i*.18}s">
   <header>
    ${img?`<div class="result-thumb-wrap"><img src="${esc(img)}" alt="${esc(t.label)}" class="result-thumb-img" loading="lazy" draggable="false" /></div>`:''}
    <div class="result-header-text">
     <strong>${esc(t.label)}</strong>
    </div>
    <b>${t.pool} pts</b>
   </header>
   <div class="packed-seats" aria-label="${t.players.length} players, ${t.capacity} ${t.capacity===1?'seat':'seats'}">${Array.from({length:Math.max(t.capacity,t.players.length)},(_,j)=>`<span class="${j<t.players.length?'occupied':''} ${j>=t.capacity?'overflow':''}">${j<t.players.length?'●':'○'}</span>`).join('')}</div>
   <p><strong>${t.players.length} entered · ${t.capacity} ${t.capacity===1?'seat':'seats'}</strong></p>
   <p>${t.players.map(id=>esc(nameOf(id))).join(', ')||'Nobody entered'}</p>
   <div class="packed-calculation">${t.status==='empty'?`${t.pool} points unclaimed`:t.status==='fits'?`${t.pool} ÷ ${t.players.length} → ${t.each} each${t.remainder?` · ${t.remainder} lost to rounding`:''}`:t.status==='soft'?'Exactly one over · Soft Landing: 1 each':`Over by ${t.players.length-t.capacity} · everyone scores 0`}</div>
  </article>`;
 }).join('')}</div><details class="packed-ballots"><summary>How everyone ranked · ${result.rankingCount} ballots counted</summary><p>Higher Borda total, then more firsts, then fewer lasts, then the committed random order.</p><div class="packed-ballot-list">${result.rankings.map((b,i)=>`<div><strong>${b.id?esc(nameOf(b.id)):`Anonymous ballot ${i+1}`}</strong><p>${b.ranking.map(id=>esc(s.board[id])).join(' → ')}</p></div>`).join('')||'<p>No rankings submitted. The committed order set all tiers.</p>'}</div><table><thead><tr><th>Option</th><th>Total</th><th>Firsts</th><th>Lasts</th></tr></thead><tbody>${result.rooms.map(t=>`<tr><td>${esc(t.label)}</td><td>${t.total}</td><td>${t.first}</td><td>${t.last}</td></tr>`).join('')}</tbody></table></details><details class="packed-proof"><summary>Inspect verification</summary><p>The check confirms that the committed draws have not changed. It does not prove an unbiased original draw.</p><pre>${esc(JSON.stringify({commitment:s.commitment,...proof},null,2))}</pre></details>`;
}
