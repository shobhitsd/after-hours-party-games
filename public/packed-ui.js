import {verifyProof} from './packed-proof.js';

const optText = o => (typeof o === 'object' && o !== null ? o.text || o.label || '' : String(o || ''));
const optImg = o => (typeof o === 'object' && o !== null ? o.image || '' : '');

export function packedOptions(o,disabled,esc){
 const select=(key,label,values)=>`<label for="option-${key}">${label}</label><select id="option-${key}" data-option="${key}" ${disabled?'disabled':''}>${values.map(([v,t])=>`<option value="${v}" ${String(o[key])===String(v)?'selected':''}>${t}</option>`).join('')}</select>`;
 return `<div class="game-options" data-key="game-options"><h3>Make room for your people</h3>${select('packedRounds','Rounds',[5,6,7,8,9,10].map(n=>[n,`${n} rounds${n===6?' · recommended for 9–10 people':''}`]))}<div class="packed-timer-options">${[['packedRankSeconds','Rank'],['packedTalkSeconds','Talk'],['packedPickSeconds','Pick']].map(([key,label])=>`<label>${label} (seconds)<input type="number" data-option="${key}" min="10" max="120" value="${o[key]}" ${disabled?'disabled':''}></label>`).join('')}</div>${select('packedAnonymous','Rankings at reveal',[[false,'Show who ranked what'],[true,'Anonymous ballots']])}${select('packedSoftLanding','Overcrowding rule',[[false,'Classic · overcrowded rooms score 0'],[true,'Soft Landing · exactly one over earns 1 each']])}<p>Soft Landing is an optional house rule. It does not change the seats or pool splits.</p>${select('packedPack','Question pack',[['curated','Curated · 60 verified questions with photos'],['custom','Your private questions']])}${o.packedPack==='custom'?`<label for="packed-custom">One question per line: Question | Option 1 | Option 2 | …</label><textarea id="packed-custom" rows="6" maxlength="15000" ${disabled?'disabled':''} placeholder="Best holiday? | Beach | Mountains | City | Cruise | Desert | Countryside">${esc(o.packedCustom.map(q=>[q.question,...q.options].join(' | ')).join('\n'))}</textarea><p>Save at least ${o.packedRounds} questions. Use 5 options per question, or 6 for groups of 9–10. Each option must be distinct.</p><button class="btn outline" data-action="save-packed-custom" ${disabled?'disabled':''}>Save questions</button><small>${o.packedCustom.length} saved questions</small>`:''}<p>Five to ten seated players. Extra friends can watch. Practice waits for you at each step.</p></div>`;
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
     <img src="${esc(img)}" alt="${esc(opt)}" class="packed-room-img" loading="lazy" />
     <span class="packed-tier-badge">TIER ${t.tier}</span>
     <span class="room-door" aria-hidden="true"><i></i><i></i><i></i></span>
    </div>
   `:`
    <div class="packed-room-header-plain">
     <span class="packed-tier">TIER ${t.tier}</span>
     <span class="room-door" aria-hidden="true"><i></i><i></i><i></i></span>
    </div>
   `}
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

 if(s.stage==='question')return top+intro(esc(s.question),'What do you like most? Everyone will rank these options. Your shared preferences build the rooms.')+`<div class="packed-preview">${s.board.map((opt,i)=>{
  const img=optImg(opt);
  return `<div class="packed-preview-card" style="--order:${i}">
   ${img?`<div class="preview-media"><img src="${esc(img)}" alt="${esc(opt)}" class="preview-img" loading="lazy" /></div>`:`<span>${['✦','◈','✿','☀','❖','✧'][i]}</span>`}
   <strong class="preview-label">${esc(opt)}</strong>
  </div>`;
 }).join('')}</div>`+proof;

 if(s.stage==='rank')return top+intro(esc(s.question),spectator?'The seated players are ranking. You will see the combined rooms next.':'Drag the grip or use the arrows to order every option, favourite first. Save your ranking; you can change it until this phase closes.')+(spectator?'<div class="waiting-box">Watching the room take shape…</div>':`<ol class="rank-list packed-rank" aria-label="Your private ranking">${selected.map((id,pos)=>{
  const opt=s.board[id];
  const img=optImg(opt);
  return `<li class="rank-item" data-key="packed-rank-${id}" data-rank-pos="${pos}" draggable="${s.canAct}">
   <span class="rank-drag-handle" aria-hidden="true" title="Drag to reorder">⠿</span>
   <span class="rank-position">${pos+1}</span>
   ${img?`<div class="rank-thumb-wrap"><img src="${esc(img)}" alt="${esc(opt)}" class="rank-thumb-img" loading="lazy" /></div>`:''}
   <strong class="rank-label">${esc(opt)}</strong>
   <span class="rank-value">${s.board.length-pos}<small>Borda pts</small></span>
   <div class="rank-controls">
    <button data-rank-move="${pos}" data-direction="-1" aria-label="Move ${esc(opt)} up" ${!s.canAct||pos===0?'disabled':''}>↑</button>
    <button data-rank-move="${pos}" data-direction="1" aria-label="Move ${esc(opt)} down" ${!s.canAct||pos===selected.length-1?'disabled':''}>↓</button>
   </div>
  </li>`;
 }).join('')}</ol><div class="packed-submit">${button(saved?'Update ranking →':'Save ranking →','lock-rank','primary',s.canAct?'':'disabled')}<p aria-live="polite">${saved?'Ranking saved. Your latest saved order counts.':'Nothing submitted yet.'} ${s.submitted.length}/${s.expectedCount} rankings saved.</p></div>`)+proof;

 if(s.stage==='tiers')return top+intro('You built these rooms.',`Your combined rankings decided this order. The pools are fixed by tier; ${s.options.packedAnonymous?'anonymous':'individual'} ballots appear after picks.`)+roomCards()+proof;

 if(s.stage==='talk')return top+intro(esc(s.question),'Talk in person or on your voice call. Make pacts, question promises, and decide which room might stay quiet.')+roomCards()+`<div class="packed-explainer"><strong>One person gets the whole pool.</strong><p>Two or more split it if they fit. More people than seats? Everyone there gets ${s.options.packedSoftLanding?'0, except exactly one over earns 1 each':'0'}. The range shows possible seat counts. Even one person can enter.</p></div>`+(s.host===s.me?button('Everyone ready? Open picks →','skipTalk','outline'):'')+proof;

 return top+intro(esc(s.question),spectator?'Watch the room choose. Individual picks stay secret until the reveal.':'Choose your room. The latest pick you save before the timer ends counts.')+roomCards(true)+(!spectator?`<div class="packed-submit">${button(saved?'Update my room →':'Save my room →','lock','primary',s.canAct&&selected.length?'':'disabled')}<p aria-live="polite">${saved?`Saved: ${esc(s.board[s.ownAnswer])}. You can still change it.`:'No pick yet. Missing this phase scores 0 and takes no seat.'}</p></div>`:'')+proof;
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
    ${img?`<div class="result-thumb-wrap"><img src="${esc(img)}" alt="${esc(t.label)}" class="result-thumb-img" loading="lazy" /></div>`:''}
    <div class="result-header-text">
     <span>TIER ${t.tier}</span>
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
