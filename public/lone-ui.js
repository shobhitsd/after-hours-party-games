const optImg = item => typeof item === 'object' && item ? (item.image || '') : '';
const optText = item => typeof item === 'object' && item ? (item.text || item.label || '') : item;

function customOptionDropdown(id, fieldName, options, currentVal, placeholder, esc) {
 const curIdx = currentVal !== '' && currentVal !== undefined ? Number(currentVal) : null;
 const curOpt = curIdx !== null && options[curIdx] !== undefined ? options[curIdx] : null;
 const curText = curOpt ? optText(curOpt) : '';
 const curImg = curOpt ? optImg(curOpt) : '';

 return `<div class="custom-select" data-custom-dropdown="${id}" data-key="dropdown-${id}">
  <select id="${id}" name="${id === 'claim-first' ? 'first' : id}" data-lone-field="${fieldName}" class="custom-select-native" tabindex="-1" aria-hidden="true">
   <option value="">${esc(placeholder)}</option>
   ${options.map((opt, i) => `<option value="${i}" ${String(currentVal) === String(i) ? 'selected' : ''}>${esc(optText(opt))}</option>`).join('')}
  </select>
  <button type="button" class="custom-select-trigger" aria-haspopup="listbox" aria-expanded="false" data-toggle-dropdown="${id}">
   <span class="custom-select-label">
    ${curImg ? `<span class="select-thumb-wrap"><img src="${esc(curImg)}" class="select-thumb-img" alt=""></span>` : ''}
    <span class="select-text ${!curOpt ? 'placeholder' : ''}">${esc(curText || placeholder)}</span>
   </span>
   <span class="custom-select-arrow" aria-hidden="true">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
   </span>
  </button>
  <div class="custom-select-menu" role="listbox" id="${id}-menu" aria-label="${esc(placeholder)}">
   <div class="custom-select-option ${currentVal === '' ? 'selected' : ''}" role="option" data-select-dropdown="${id}" data-value="">
    <span class="select-option-placeholder">✦</span>
    <span class="select-option-text">${esc(placeholder)}</span>
    ${currentVal === '' ? '<span class="select-check">✓</span>' : ''}
   </div>
   ${options.map((opt, i) => {
    const img = optImg(opt);
    const text = optText(opt);
    const isSel = String(currentVal) === String(i);
    return `<div class="custom-select-option ${isSel ? 'selected' : ''}" role="option" data-select-dropdown="${id}" data-value="${i}">
     ${img ? `<span class="select-thumb-wrap"><img src="${esc(img)}" class="select-thumb-img" alt="" loading="lazy"></span>` : ''}
     <span class="select-option-text">${esc(text)}</span>
     ${isSel ? '<span class="select-check">✓</span>' : ''}
    </div>`;
   }).join('')}
  </div>
 </div>`;
}

function customPlayerDropdown(id, fieldName, players, currentVal, placeholder, esc) {
 const curP = players.find(p => p.id === currentVal);
 const curName = curP ? curP.name : '';
 const curAvatar = curP ? Array.from(curP.name)[0].toUpperCase() : '';

 return `<div class="custom-select" data-custom-dropdown="${id}" data-key="dropdown-${id}">
  <select id="${id}" data-lone-field="${fieldName}" class="custom-select-native" tabindex="-1" aria-hidden="true">
   <option value="">${esc(placeholder)}</option>
   ${players.map(p => `<option value="${p.id}" ${currentVal === p.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}
  </select>
  <button type="button" class="custom-select-trigger" aria-haspopup="listbox" aria-expanded="false" data-toggle-dropdown="${id}">
   <span class="custom-select-label">
    ${curAvatar ? `<span class="chip-avatar">${esc(curAvatar)}</span>` : ''}
    <span class="select-text ${!curP ? 'placeholder' : ''}">${esc(curName || placeholder)}</span>
   </span>
   <span class="custom-select-arrow" aria-hidden="true">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
   </span>
  </button>
  <div class="custom-select-menu" role="listbox" id="${id}-menu" aria-label="${esc(placeholder)}">
   <div class="custom-select-option ${!currentVal ? 'selected' : ''}" role="option" data-select-dropdown="${id}" data-value="">
    <span class="select-option-placeholder">◈</span>
    <span class="select-option-text">${esc(placeholder)}</span>
    ${!currentVal ? '<span class="select-check">✓</span>' : ''}
   </div>
   ${players.map(p => {
    const isSel = currentVal === p.id;
    const av = Array.from(p.name)[0].toUpperCase();
    return `<div class="custom-select-option ${isSel ? 'selected' : ''}" role="option" data-select-dropdown="${id}" data-value="${p.id}">
     <span class="chip-avatar">${esc(av)}</span>
     <span class="select-option-text">${esc(p.name)}</span>
     ${isSel ? '<span class="select-check">✓</span>' : ''}
    </div>`;
   }).join('')}
  </div>
 </div>`;
}

export function loneContent(s,{esc,button,intro,cards,lock,waiting,nameOf},local,selected){
 const isRanker=s.me===s.leader;
 const meta=`<div class="lone-meta"><span>Ranker <strong>${esc(nameOf(s.leader))}</strong></span><span>Jackpot <strong>${s.jackpot}</strong></span><span>Your streak <strong>${s.streak}</strong></span>${s.finalRound?'<span class="lone-final">FINAL · TWO EXTRA OPTIONS · DOUBLE BASE</span>':''}</div>`;
 const claimImg=s.claim&&s.board[s.claim.first]?optImg(s.board[s.claim.first]):'';
 const claimText=s.claim&&s.board[s.claim.first]?optText(s.board[s.claim.first]):'';
 const claim=s.claim?`<div class="lone-claim ${claimImg?'has-claim-thumb':''}">${claimImg?`<div class="claim-thumb-wrap"><img src="${esc(claimImg)}" class="claim-thumb-img" alt="" loading="lazy"></div>`:''}<div class="claim-body"><span>${esc(nameOf(s.leader))} CLAIMS</span><strong>“I ranked ${esc(claimText)} first.”</strong>${s.claim.message?`<p>${esc(s.claim.message)}</p>`:''}<small>A recorded claim, not a promise. The truth comes at reveal.</small></div></div>`:'<div class="lone-claim"><span>NO RECORDED CLAIM YET</span><p>The Ranker can bluff out loud or record a claim during discussion.</p></div>';
 const spies=s.spyPlayers.length?`<div class="spy-announcements" aria-live="polite">${s.spyPlayers.map(spy=>`<p>◈ <strong>${esc(nameOf(spy.id))}</strong> played a Spy Card${spy.target?` · watching ${esc(nameOf(spy.target))}`:' · target private'}.</p>`).join('')}</div>`:'';
 let spyUI='';
 if(s.spy){
  spyUI=`<div class="spy-panel"><span class="eyebrow">YOUR SPY CARD</span><h3>Watching ${esc(nameOf(s.spy.target))}</h3><p>${s.spy.refunded?'Spy clash: your card was refunded. Choose without a peek in this window.':s.stage==='spy'?`Their final pick: <strong>${esc(optText(s.board[s.spy.peek]))}</strong>. They cannot change it.`:'Your pick opens in the Spy Window, after everyone else locks.'}</p>${!s.spy.public?button('Reveal my target','revealSpy','outline small'): '<small>You made your target public.</small>'}</div>`;
 }
 else if(s.spyAvailable&&['talk','pick'].includes(s.stage)&&s.ownAnswer===undefined&&!s.practiceReady){
  const otherPlayers = s.players.filter(p=>p.id!==s.me);
  spyUI=`<details class="spy-panel" data-key="spy-controls"><summary>◈ Use your Spy Card · one per game</summary><p>Wait until regular picks close, then see one player’s final pick. Targeting another spy refunds both cards.</p><label for="spy-target">Watch another player</label><div class="spy-select-wrap">${customPlayerDropdown('spy-target','spyTarget',otherPlayers,local.spyTarget,'Choose a player',esc)}</div><div class="spy-chips" aria-label="Quick select">${otherPlayers.map(p=>`<button type="button" class="spy-chip ${local.spyTarget===p.id?'active':''}" data-select-spy="${p.id}"><span class="chip-avatar">${esc(Array.from(p.name)[0].toUpperCase())}</span><span>${esc(p.name)}</span></button>`).join('')}</div>${button('Play Spy Card','play-spy','outline',local.spyTarget?'':'disabled')}</details>`;
 }
 else if(!s.spyAvailable)spyUI='<p class="micro-note">Your Spy Card has been used this game.</p>';
 if(s.stage==='rank'){
  return meta+intro(esc(s.question),isRanker?'Order every option from first to last. Drag items or use arrows; the ranking stays private. You may rank honestly or bluff.':'The Ranker is secretly ordering the options. Their ranking sets the values, but nobody knows the hidden twists yet.')+(isRanker?`<ol class="rank-list" aria-label="Your private ranking">${selected.map((i,pos)=>{
   const img=optImg(s.board[i]);
   const text=optText(s.board[i]);
   return `<li class="rank-item" data-rank-pos="${pos}" data-key="rank-option-${i}" draggable="${s.canAct?'true':'false'}">
    ${s.canAct?`<span class="rank-drag-handle" title="Drag to reorder" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.8"/><circle cx="15" cy="6" r="1.8"/><circle cx="9" cy="12" r="1.8"/><circle cx="15" cy="12" r="1.8"/><circle cx="9" cy="18" r="1.8"/><circle cx="15" cy="18" r="1.8"/></svg></span>`:''}
    <span class="rank-position">${pos+1}</span>
    ${img?`<span class="rank-thumb-wrap"><img src="${esc(img)}" class="rank-thumb-img" alt="" loading="lazy"></span>`:''}
    <strong>${esc(text)}</strong>
    <span class="rank-value">${(s.board.length-pos)*(s.finalRound?2:1)} pts<small>before twists</small></span>
    <div class="rank-controls">
     <button data-rank-move="${pos}" data-direction="-1" aria-label="Move ${esc(text)} up" ${!s.canAct||pos===0?'disabled':''}>↑</button>
     <button data-rank-move="${pos}" data-direction="1" aria-label="Move ${esc(text)} down" ${!s.canAct||pos===selected.length-1?'disabled':''}>↓</button>
    </div>
   </li>`;
  }).join('')}</ol><p class="micro-note">A secret Reverse Round can flip these values. As Ranker, your unique-pick base is halved, rounded up.</p>`+(s.canAct?button('Lock my ranking →','lock-rank'):waiting('Your ranking is locked.')):cards(s.board,{disabled:true})+waiting(`${esc(nameOf(s.leader))} is ranking…`));
 }
 const privateRanking=isRanker&&s.ranking?`<details class="lone-private"><summary>Your locked ranking · only you can see this</summary><ol>${s.ranking.map(i=>{const img=optImg(s.board[i]);return `<li>${img?`<span class="private-rank-thumb-wrap"><img src="${esc(img)}" class="private-rank-thumb" alt="" loading="lazy"></span>`:''}<span>${esc(optText(s.board[i]))}</span></li>`;}).join('')}</ol></details>`:'';
 if(s.stage==='talk')return meta+intro(esc(s.question),'Talk in person or on your voice call. Make promises, question the Ranker, and avoid the crowd.')+claim+privateRanking+(isRanker?`<form id="lone-claim-form" class="lone-form"><label for="claim-first">I claim I ranked this first</label>${customOptionDropdown('claim-first','claimFirst',s.board,local.claimFirst,'Choose an option',esc)}<label for="claim-message">Add a bluff or explanation (optional)</label><input id="claim-message" name="message" maxlength="160" data-lone-field="message" value="${esc(local.message)}" placeholder="Trust me. Or don't.">${button(s.claim?'Update my claim':'Record my claim','noop','outline','type="submit"')}</form>`:'')+spies+spyUI+`<div class="discussion-note">Everyone gets a secret pick, including the Ranker. ${s.practice?'Take your time.':'The Pick phase follows the discussion timer.'}</div>`+(s.host===s.me?button('Everyone ready? Open picks →','skipTalk'):waiting('Your host can open picks after discussion.'));
 const belief=s.claim&&!isRanker&&s.canAct?`<fieldset class="belief-picker"><legend>Do you believe the recorded first-place claim?</legend>${[['believe','Believe it'],['doubt','Doubt it'],['unsure','Not sure']].map(([v,label])=>`<button type="button" data-belief="${v}" aria-pressed="${local.belief===v}">${label}</button>`).join('')}<small>Private and optional. Used for end-of-game awards; it does not change points.</small></fieldset>`:'';
 return meta+intro(esc(s.question),s.stage==='spy'?'Spy Window: regular picks are final. Spies now lock their own choices.':'Choose what nobody else will choose. Shared options score zero pick points.')+claim+privateRanking+spies+spyUI+cards(s.board,{disabled:!s.canAct})+belief+(s.canAct?lock('Lock my pick'):waiting(s.spy&&s.stage==='pick'?'Your turn comes in the Spy Window.':'Your pick is locked.'))+`<p class="micro-note">${s.practice?'Continue demo closes this step once all required picks are in.':'The main Pick phase runs for its full timer, even after regular picks lock. Missing picks are random.'} Unique streaks: ×1 → ×1.5 → ×2. Multipliers cap at ×2; flat bonuses are added afterward.</p>`;
}

export function loneReveal(s,{esc,nameOf}){
 const r=s.result.lone;
 return `<div class="lone-option-reveals" aria-label="Picks by option">${r.options.map((option,i)=>{const img=optImg(option.label);const text=optText(option.label);return `<article class="lone-option-reveal ${option.players.length===1?'unique':option.players.length>1?'collision':''}" style="--reveal-delay:${i*.22}s"><span>${option.players.length===1?'SOLO PICK':option.players.length?'COLLISION':'UNPICKED'}</span>${img?`<div class="reveal-img-wrap"><img src="${esc(img)}" class="reveal-option-img" alt="" loading="lazy"></div>`:''}<h3>${esc(text)}</h3><p>${option.players.map(id=>esc(nameOf(id))).join(', ')||'Nobody chose this'}</p></article>`;}).join('')}</div><section class="lone-truth" style="--reveal-delay:${r.options.length*.22}s"><h3>The ranking behind the bluff</h3>${r.claim?`<p>Claim: <strong>“${esc(optText(s.board[r.claim.first]))} was first.”</strong> ${r.claim.message?`<q>${esc(r.claim.message)}</q>`:''}</p><p class="claim-verdict">${r.claimTrue?'True claim':'False claim'} · Actual first: <strong>${esc(optText(s.board[r.ranking[0]]))}</strong></p>`:'<p>No first-place claim was recorded; belief awards do not count this round.</p>'}${r.reverse?'<p class="lone-twist">↔ REVERSE ROUND · First is now lowest, last is highest.</p>':''}${r.final?'<p class="lone-twist">✦ FINAL ROUND · Base values doubled.</p>':''}<p>${r.underdog===null?'No Underdog Bonus this round.':`Underdog Bonus: <strong>${esc(optText(s.board[r.underdog]))}</strong> · +2 only for a unique pick.`}</p><ol class="truth-ranking">${r.ranking.map(i=>`<li><span>${esc(optText(s.board[i]))}</span><b>${r.options[i].value} pts</b></li>`).join('')}</ol>${r.autoRank?'<p>Ranking timer expired: this order was assigned randomly.</p>':''}${r.finalJackpot?`<p>Unpaid Jackpot ${r.finalJackpot.pot}: ${r.finalJackpot.players.map(id=>esc(nameOf(id))).join(', ')} received ${r.finalJackpot.share} each as the lowest scorers before this payout.${r.finalJackpot.unpaidRemainder?` ${r.finalJackpot.unpaidRemainder} point(s) left after rounding down.`:''}</p>`:`<p>Jackpot carried forward: <strong>${r.jackpot}</strong></p>`}</section>`;
}
export function loneAwardCards(s,{esc,nameOf}){
 return `<p class="micro-note">Ties are broken by total unique picks. If those also tie, the victory is shared.</p><div class="lone-awards">${s.awards.map(a=>`<article><span>✧</span><h3>${a.title}</h3><strong>${a.winners.length?a.winners.map(id=>esc(nameOf(id))).join(' & '):'Not awarded this game'}</strong><p>${a.description}${a.value?` · ${a.value}`:''}</p></article>`).join('')}</div>`;
}
