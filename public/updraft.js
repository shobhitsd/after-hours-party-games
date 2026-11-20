import {patchHTML} from './dom.js';
import {initAccount,ensureAccount,accountHeaders,signInAccount,accountAction} from './account-ui.js';
import {createTutorial,tutorialMove,tutorialTip,restoreTutorial} from './updraft-tutorial.js';
import {RULES,quickBonus,quickWindowMs} from './updraft-rules.js';
import {press,selectPrompt,sending,feedback,invalid,launchLetter,syncCinema,stageEnter,armDepth} from './updraft-motion.js';

const root=document.querySelector('#game');
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>crypto.randomUUID?.()||`move-${Date.now()}-${Math.random().toString(36).slice(2)}`;
let data=null,mode='practice',busy=false,error='',selected='',pending=null,capabilities={},shareText='',inGame=false;
let inTutorial=false,tutorial=null,requestEpoch=0,noticeTimer,hintArmed=false,hintTimer,quickKey='',quickDeadline=0,stage='';
const drafts=new Map();
const activeRun=()=>inTutorial?tutorial:data?.run;
const locked=()=>!inTutorial&&(busy||Boolean(pending));
const draftKey=r=>`${r.id}:${r.phase}:${r.round}`;
const toast=message=>{clearTimeout(noticeTimer);document.querySelector('#notice').textContent=message;noticeTimer=setTimeout(()=>{document.querySelector('#notice').textContent='';},3500);};
const plural=(n,word)=>`${n} ${word}${n===1?'':/(s|ch)$/.test(word)?'es':'s'}`;
try{const saved=sessionStorage.getItem('hd-view');if(saved==='tutorial'){tutorial=restoreTutorial(sessionStorage.getItem('updraft-tutorial'));inTutorial=Boolean(tutorial);inGame=inTutorial;}else if(['daily','practice'].includes(saved)){mode=saved;inGame=true;}}catch{}

async function api(route,body={}){
 await ensureAccount();const response=await fetch('/api/hidden/'+route,{method:'POST',headers:{'Content-Type':'application/json',...accountHeaders()},body:JSON.stringify({mode,...body}),signal:AbortSignal.timeout(15000)});
 const result=await response.json();if(!response.ok)throw Object.assign(new Error(result.error||'Could not save this move. Please retry.'),{status:response.status});return result;
}

// ---- Quick-answer window: the server decides the bonus; this only shows its clock. ----
function trackQuick(run,full=false){
 const key=run&&run.status==='active'&&run.phase==='answer'&&run.timing?.timed?`${run.id}:${run.round}`:'';
 if(!key){quickKey='';return;}
 const deadline=Date.now()+(full?quickWindowMs:run.timing.quickLeftMs);
 // Never extend a window the player has already been watching.
 quickDeadline=key===quickKey?Math.min(quickDeadline,deadline):deadline;quickKey=key;
}
function quickMeter(r){
 if(!r.timing?.timed)return '<div class="quick-meter untimed" data-quick><span class="quick-ring" aria-hidden="true"></span><div><strong>Untimed lesson</strong><small>Real flights add a quick-answer bonus</small></div></div>';
 const left=Math.max(0,quickDeadline-Date.now()),bonus=left>0?quickBonus(quickWindowMs-left):0;
 if(!bonus)return '<div class="quick-meter spent" data-quick><span class="quick-ring" aria-hidden="true" style="--left:0"></span><div><strong>No rush now</strong><small>The quick bonus has drifted by. Take your time.</small></div></div>';
 const step=RULES.quick.find(([,points])=>points===bonus)[0]*1000,until=Math.ceil((left-(quickWindowMs-step))/1000);
 return `<div class="quick-meter tier-${bonus}" data-quick><span class="quick-ring" aria-hidden="true" style="--left:${(left/quickWindowMs).toFixed(3)}"></span><div><strong>⚡ +${bonus} quick bonus</strong><small>for the next ${plural(Math.max(1,until),'second')}</small></div></div>`;
}
function countdown(){
 if(!data?.resetAt)return '';const ms=Math.max(0,data.resetAt-Date.now()),h=Math.floor(ms/3600000),m=Math.floor(ms%3600000/60000),s=Math.floor(ms%60000/1000);
 return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(()=>{
 if(document.hidden)return;
 const slot=root.querySelector('.quick-slot'),run=inGame&&activeRun();if(slot&&run?.phase==='answer'&&run.timing?.timed)patchHTML(slot,quickMeter(run));
 for(const clock of root.querySelectorAll('[data-countdown]'))clock.textContent=countdown();
},500);

// ---- Pieces ----
const balloon=(className='')=>`<div class="balloon ${className}" aria-hidden="true"><div class="balloon-canopy"><i></i><i></i><span>?</span></div><div class="balloon-ropes"></div><div class="balloon-basket"></div></div>`;
function skyArt(){return `<div class="sky-art" aria-hidden="true"><span class="sun"></span><span class="cloud cloud-one"></span><span class="cloud cloud-two"></span><span class="cloud cloud-three"></span><div class="flight-path"></div>${balloon('hero-balloon')}${balloon('little-balloon')}<span class="flying-letter letter-a">A</span><span class="flying-letter letter-b">B</span><span class="flying-letter letter-c">C</span><svg class="paper-plane" viewBox="0 0 100 80"><path d="M3 33 96 4 64 75 43 46Z" fill="#fff7e7"/><path d="m43 46 53-42-39 49 7 22Z" fill="#e2a1a0"/><path d="m43 46-6 20 20-13" fill="#cc7982"/></svg><span class="sky-caption">BIG IDEAS. A LITTLE LIFT.</span><span class="sky-star star-one">✦</span><span class="sky-star star-two">✧</span></div>`;}
function instructions(){
 const q=RULES.quick;
 return `<details class="rules"><summary>How to play & how scoring works <span>＋</span></summary>
 <ol><li><strong>Answer trivia.</strong> Each of five rounds offers two prompts: one everyday, one for the fans. Pick one and type any answer you can think of.</li>
 <li><strong>Launch a letter.</strong> Take one unused letter from your answer. A hit reveals every copy and earns ${RULES.hit} points; a miss costs ${RULES.missCost} Fuel.</li>
 <li><strong>Connect the clues.</strong> Guess the hidden answer between rounds. A wrong guess costs ${RULES.wrongCost} Fuel; you have up to ${RULES.guesses} guesses.</li>
 <li><strong>Stuck?</strong> The Hint beside the mystery sells a written clue for ${RULES.hintCosts[0]} Fuel, then one revealed letter for ${RULES.hintCosts[1]} Fuel. A hint can never use your last Fuel.</li></ol>
 <p>You start with ${RULES.fuel} Fuel. At 0 your flight lands, and you keep everything you have banked. Free and daily flights can be resumed for 24 hours.</p>
 <table class="score-table"><caption>Every point, itemised (maximum ${RULES.maxScore})</caption><tbody>
 <tr><th>Trivia answer</th><td>common ${RULES.tiers.Common} · uncommon ${RULES.tiers.Uncommon} · rare ${RULES.tiers.Rare} · deep cut ${RULES.tiers['Deep cut']}</td></tr>
 <tr><th>Quick answer</th><td>+${q[0][1]} within ${q[0][0]}s of the prompt appearing · +${q[1][1]} within ${q[1][0]}s · +${q[2][1]} within ${q[2][0]}s</td></tr>
 <tr><th>Letter hit</th><td>+${RULES.hit} for each launched letter that is in the answer</td></tr>
 <tr><th>Solve</th><td>${RULES.solve} + ${RULES.perFuel} per Fuel left + ${RULES.perRound} per unused round</td></tr>
 <tr><th>Swift flight</th><td>up to +${RULES.swift}: full under ${RULES.swiftFullSeconds}s of play, fading to 0 at ${RULES.swiftZeroSeconds/60} minutes. Pauses longer than ${RULES.idleCapMs/1000}s are not counted against you.</td></tr>
 <tr><th>First-guess solve</th><td>+${RULES.clean} when your very first guess is right</td></tr></tbody></table>
 <p>Solving early always beats collecting another answer. Time is measured by the server and only ever adds a bonus; there is no countdown that ends your flight. Spaces, accents, punctuation and a leading “the” never matter; simple plurals and single typos in longer answers are accepted.</p>
 <p>Rarity tiers are editorial, not player statistics. Results are personal: different mysteries have different difficulty, so there is no public leaderboard. The guided tutorial is a separate, untimed teaching example.</p></details>`;
}
const stars=n=>`<span class="stars" role="img" aria-label="${n} of 5 stars">${Array.from({length:5},(_,i)=>`<i class="${i<n?'lit':''}" aria-hidden="true">★</i>`).join('')}</span>`;
function log(){return data?.history.length?`<details class="rules"><summary>Your recent flights <span>＋</span></summary><ul class="history-list">${data.history.map(h=>`<li><span>${esc(h.answer||'A mystery')}<small>${esc(h.day)} · ${h.mode==='daily'?'Daily':'Free flight'} · ${esc(h.status)} · ${h.rounds}/5 rounds</small></span><strong>${h.score} pts${Number.isInteger(h.stars)?stars(h.stars):''}</strong></li>`).join('')}</ul></details>`:'';}
function pilotCard(){
 const s=data?.stats;if(!s)return '<div class="pilot-card loading-card" aria-hidden="true"></div>';
 const rank=s.rank,toNext=rank.nextAt?`${rank.nextAt-rank.points} pts to ${esc(rank.nextName)}`:'Top rank reached';
 return `<section class="pilot-card" aria-label="Your pilot record">
 <div class="pilot-streak ${s.streak?'alive':''}" data-tilt><span class="flame" aria-hidden="true">🔥</span><strong>${s.streak}</strong><small>day streak${s.bestStreak>s.streak?` · best ${s.bestStreak}`:''}</small><em>${s.flownToday?'Flown today. See you tomorrow!':s.streak?'Fly today to keep it alive':'Finish a flight to light it'}</em></div>
 <div class="pilot-rank" data-tilt><small>PILOT RANK ${rank.level}</small><strong>${esc(rank.name)}</strong><span class="rank-bar" role="img" aria-label="${Math.round(rank.progress*100)}% of the way to the next rank"><i style="width:${Math.round(rank.progress*100)}%"></i></span><em>${toNext}</em></div>
 <div class="pilot-numbers"><span><b>${s.solved}</b>solved</span><span><b>${s.flights}</b>flights</span><span><b>${s.best}</b>best score</span></div></section>`;
}
function welcome(){
 const signedIn=data?.signedIn,daily=data?.modes.daily,dailyToday=daily?.day===data?.day;
 return `<section class="welcome"><div class="welcome-copy"><span class="eyebrow"><i></i> A SOLO WORD ADVENTURE</span><h1>Up<em>draft.</em><span class="title-trail">↗</span></h1><p class="lede">Let your imagination<br>take a little flight.</p><p>Turn trivia into letters. Turn letters into a lightbulb moment. Five rounds, one mystery, and a sky full of possibilities.</p>
 <div class="start-actions"><button class="primary" data-start="practice" ${busy?'disabled':''}>${data?.modes.practice?.status==='active'?'Resume your flight':'Start a free flight'} <span>↗</span></button><button class="secondary tutorial-start" data-tutorial>Show me how <span>✦</span></button>
 ${signedIn?`<button class="daily-button" data-start="daily" ${busy?'disabled':''}><span aria-hidden="true">☀</span><span>${dailyToday?(daily.status==='active'?'Continue today’s daily flight':'Today’s daily flight · flown'):'Fly today’s daily flight'}<small>New mystery in <b data-countdown>${countdown()}</b></small></span></button>`:'<button class="text-button" data-account>Sign in free for a personal daily flight and a saved streak ↗</button>'}</div>
 ${pilotCard()}
 <div class="welcome-facts"><span><b>${data?.bank?.categories??'100+'}</b> trivia prompts</span><span><b>${data?.bank?Math.floor(data.bank.answers/1000)+',000+':'30,000+'}</b> accepted answers</span><span><b>${data?.librarySize??'300+'}</b> mysteries</span></div>
 <p class="small">${data?`${data.remaining} of ${data.librarySize} mysteries still to discover.`:'Getting your saved progress…'} No account needed to play. The tutorial runs instantly in your browser.</p></div>${skyArt()}</section>${errorBox()}<div class="welcome-bottom">${instructions()}${log()}</div>`;
}
function errorBox(){return `<div id="game-error" class="error ${error?'visible':''}" role="alert">${esc(error)}${pending&&!inTutorial?'<button class="text-button" data-retry>Retry this move</button>':''}${!data&&!inTutorial?'<button class="text-button" data-refresh>Try again</button>':''}</div>`;}
// Each tile is a two-faced 3D card: the blank face, and the letter face it flips to.
function mask(r){let index=0;return `<div class="hidden-words" aria-label="Hidden answer: ${esc(r.mask.split('').join(' '))}">${r.mask.split(' ').map(w=>{const tiles=[...w].map(c=>{const i=index++;return c==='-'?'<span class="hyphen">−</span>':`<span data-letter-index="${i}" class="letter-tile ${c!=='_'?'revealed':''}"><span class="tile-inner"><span class="tile-front" aria-hidden="true">·</span><span class="tile-back">${c==='_'?'':esc(c)}</span></span></span>`;}).join('');index++;return `<span class="hidden-word">${tiles}</span>`;}).join('')}</div>`;}
const altitudeTier=m=>{if(m<300)return 'Breeze Level';if(m<800)return 'Cloud Surfer';if(m<1500)return 'High Thermal';if(m<2500)return 'Stratosphere';return 'Aurora Orbit';};
const tierIcon=t=>{const k=String(t||'').toLowerCase();if(k.includes('deep'))return '🌟';if(k.includes('rare'))return '⚡';if(k.includes('uncommon'))return '🌤️';return '🪶';};
const tierQuote=t=>{const k=String(t||'').toLowerCase();if(k.includes('deep'))return 'Peak altitude! An extraordinary strato-discovery!';if(k.includes('rare'))return 'Thin air and pristine views. Rare air up here!';if(k.includes('uncommon'))return 'Rising fast! Catching a warm thermal.';return 'A steady standard. Solid lift for your flight.';};
function hintBox(r){
 const h=r.hint;if(!h)return '';const next=h.next,disabled=locked()?'disabled':'';
 const button=!next||r.status!=='active'?'':!next.affordable
  ?`<button class="hint-button" disabled title="A hint can never use your last Fuel"><span aria-hidden="true">${next.kind==='clue'?'💡':'🔤'}</span> ${next.kind==='clue'?'Hint':'Reveal a letter'} <small>needs more than ${next.cost} Fuel</small></button>`
  :hintArmed?`<button class="hint-button armed" data-hint="confirm" ${disabled}><span aria-hidden="true">⛽</span> Spend ${next.cost} Fuel? <small>Tap again to confirm</small></button>`
  :`<button class="hint-button" data-hint="arm" ${disabled}><span aria-hidden="true">${next.kind==='clue'?'💡':'🔤'}</span> ${next.kind==='clue'?'Need a hint?':'Reveal a letter'} <small>−${next.cost} Fuel</small></button>`;
 const clue=h.clue?`<div class="hint-card" data-key="clue" role="note"><span aria-hidden="true">💡</span><p><strong>Clue</strong> ${esc(h.clue)}${h.letter?` <em>Hint letter: ${esc(h.letter)}</em>`:''}</p></div>`:'';
 return {button,clue};
}
function panel(r){
 const disabled=locked()?'disabled':'';
 if(r.phase==='answer'){
  const chosen=r.prompts.find(p=>p.id===selected);
  return `<div class="panel-head"><div><span class="eyebrow">ROUND ${r.round} OF 5 · PICK YOUR STARTING POINT</span><h2>A bright idea takes flight.</h2></div><div class="quick-slot">${quickMeter(r)}</div></div><p>Pick a prompt. Your answer gives you points and letters to launch.</p>
  <div class="prompt-grid ${selected?'has-choice':''}" role="group" aria-label="Choose your trivia prompt">${r.prompts.map((p,i)=>`<button class="prompt ${selected===p.id?'chosen':''}" data-tilt data-prompt="${esc(p.id)}" aria-pressed="${selected===p.id}"><span class="prompt-icon" aria-hidden="true">${esc(p.icon||'✦')}</span><span class="prompt-number">0${i+1}</span><strong>${esc(p.title)}</strong><i aria-hidden="true">${selected===p.id?'✓':'↗'}</i></button>`).join('')}</div>
  <form id="answer-form"><label for="trivia-answer">${esc(chosen?.title||'Choose a prompt above, then type your answer')}${chosen?.note?`<small class="prompt-note">${esc(chosen.note)}</small>`:''}</label><div class="input-row"><input id="trivia-answer" name="answer" value="${esc(drafts.get(draftKey(r))||'')}" required maxlength="100" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="Your bright idea…" ${!selected?'disabled':''}><button class="primary" ${!selected||locked()?'disabled':''}>Use answer →</button></div></form>
  <div class="panel-foot"><button class="text-button" data-move="skip-answer" ${disabled}>Skip this round · 0 points</button>${!inTutorial?'<button class="text-button" data-report>Missing an answer?</button>':''}</div>`;
 }
 if(r.phase==='probe'){
  const row=r.history.at(-1),tierClass=esc(row.tier).toLowerCase().replace(/\s+/g,'-');
  return `<div class="rarity-banner ${tierClass}"><div class="rarity-badge-inner"><span class="rarity-icon" aria-hidden="true">${tierIcon(row.tier)}</span><div class="rarity-meta"><span class="rarity-name">${esc(row.tier).toUpperCase()} DISCOVERY</span><strong class="rarity-pts">+${row.points} pts <small>(+${row.points*10}m alt)</small></strong></div>${row.quick?`<span class="quick-chip">⚡ +${row.quick} quick</span>`:''}</div><p class="rarity-quote">“${tierQuote(row.tier)}”</p></div>
  <h2>${esc(row.answer)}. Nice lift!</h2><p>Launch one unused letter${matchMedia('(pointer:fine)').matches?' (or press its key)':''}. A hit lights up every copy and earns ${RULES.hit} points; a miss uses ${RULES.missCost} Fuel.</p>
  <div class="probe-letters" role="group" aria-label="Choose a letter">${r.available.map((l,i)=>`<button style="--i:${i}" data-probe="${l}" aria-label="Test letter ${l}" ${disabled}>${l}<span aria-hidden="true">↑</span></button>`).join('')}</div><button class="text-button" data-move="skip-probe" ${disabled}>Keep the points, skip the letter</button>`;
 }
 const last=r.history.at(-1),final=r.round===RULES.rounds;
 const message=last.result==='hit'?`${last.letter} caught a breeze! +${last.bonus||RULES.hit}`:last.result==='miss'?`No ${last.letter}. A little turbulence.`:last.result==='echo'?'An echo from a familiar sky.':'A quiet glide. No Fuel used.';
 return `<span class="eyebrow">${final?'THE FINAL APPROACH':'A LITTLE CLOSER'}</span><h2>${esc(message)}</h2><p>${final?'Five rounds flown. Try the full answer, or land with your banked points.':last.result==='miss'?'One Fuel used. Try the full answer, or keep gathering letters.':'See the connection? Guess now, or catch the next round.'}</p>
 ${r.lastGuess?`<p class="guess-feedback" role="status">“${esc(r.lastGuess)}” wasn’t the answer. −${RULES.wrongCost} Fuel. ${plural(RULES.guesses-r.wrong,'guess')} left.</p>`:''}
 ${r.wrong<RULES.guesses?`<form id="solve-form"><label for="solve-answer">The hidden answer · ${RULES.guesses-r.wrong} guesses left</label><div class="input-row"><input id="solve-answer" name="answer" value="${esc(drafts.get(draftKey(r))||'')}" required maxlength="100" placeholder="That lightbulb moment…" autocomplete="off"><button class="primary" ${disabled}>Try to solve</button><button type="button" class="secondary skip-guess" data-move="${final?'finish':'next'}" ${disabled}>Skip guess ${final?'& finish':'→'}</button></div><small>A wrong guess costs ${RULES.wrongCost} Fuel. Solving now banks ${RULES.perRound} for each unused round${r.wrong?'':` and +${RULES.clean} for a first-guess solve`}.</small></form>`:'<p>All three guesses used. You can still earn trivia points.</p>'}
 <div class="panel-foot"><button class="secondary next-round" data-move="${final?'finish':'next'}" ${disabled}>${final?'Finish & reveal':'Next round →'}</button>${!inTutorial?'<button class="text-button" data-report>Report a problem</button>':''}</div>`;
}
const clock=seconds=>seconds<60?`${seconds}s`:`${Math.floor(seconds/60)}m ${String(seconds%60).padStart(2,'0')}s`;
function result(r){
 const solved=r.status==='solved',p=r.parts,rated=r.rating||{stars:0,title:''};
 const label={solved:'What a bright landing!',bust:'A gentle landing.',unsolved:'Mystery, meet daylight.',abandoned:'Back on solid ground.',expired:'Your flight window has ended.'}[r.status];
 const probes=r.history.filter(h=>h.letter).length,hits=r.history.filter(h=>h.result==='hit').length,answers=r.history.filter(h=>h.answer).length;
 const line=(name,note,value,extra='')=>`<div class="score-row ${extra}"><span>${name}${note?`<small>${note}</small>`:''}</span><strong data-count="${value}">${value}</strong></div>`;
 const s=!inTutorial&&data?.stats;
 return `<section class="result panel ${solved?'won':''}" data-key="result-${r.id}"><div class="result-medal" aria-hidden="true"><span>${solved?'✦':'☁'}</span></div><span class="eyebrow">${solved?'YOU FOUND IT':'THE REVEAL'} · ${esc(r.mode.toUpperCase())}</span><h2>${label}</h2><h3 class="answer-reveal">${esc(r.answer)}</h3><p>${esc(r.explanation)}</p>
 <div class="rating" aria-label="Flight rating">${stars(rated.stars)}<strong>${esc(rated.title)}</strong></div>
 <div class="score-breakdown">
 ${line('Trivia answers',`${plural(answers,'answer')} banked by rarity`,r.rarity)}
 ${line('Quick-answer bonuses',r.timing?.timed?`up to +${RULES.quick[0][1]} for each answer inside ${RULES.quick.at(-1)[0]}s`:'not awarded in the untimed lesson',r.quick)}
 ${line('Letter hits',`${hits} of ${plural(probes,'launch')} found a letter · ${RULES.hit} each`,r.hitPoints)}
 ${solved&&p?`<div class="score-group"><span class="score-group-title">Solve bonus</span>
  ${line('Solved the mystery','',p.base,'sub')}${line('Fuel left',`${r.air} × ${RULES.perFuel}`,p.fuel,'sub')}${line('Unused rounds',`${RULES.rounds-r.history.length} × ${RULES.perRound}`,p.rounds,'sub')}
  ${line('Swift flight',r.timing?.timed?`${clock(r.timing.activeSeconds)} of play`:'not timed in the lesson',p.swift,'sub')}${line('First-guess solve',r.wrong?`${plural(r.wrong,'wrong guess')} first`:'no wrong guesses',p.clean,'sub')}</div>`
  :line('Solve bonus',solved?'':'No solve bonus this flight',r.bonus)}
 <div class="score-row total"><span>${inTutorial?'Tutorial score':'Your score'}<small>out of a possible ${RULES.maxScore}</small></span><strong><b data-count="${r.score}">${r.score}</b><small>pts</small></strong></div></div>
 <div class="flight-facts"><span><b>${r.history.length}/5</b>rounds</span><span><b>${r.air}/6</b>Fuel left</span><span><b>${probes?Math.round(hits/probes*100)+'%':'–'}</b>letter accuracy</span><span><b>${r.hint?.used||0}</b>hints</span>${r.timing?.timed?`<span><b>${clock(r.timing.activeSeconds)}</b>play time</span>`:''}</div>
 ${s?`<div class="result-streak ${s.streak?'alive':''}"><span aria-hidden="true">🔥</span><p><strong>${plural(s.streak,'day')} streak</strong> · ${esc(s.rank.name)}${s.rank.nextAt?` · ${s.rank.nextAt-s.rank.points} pts to ${esc(s.rank.nextName)}`:''}${r.mode==='daily'?`<br>Next daily flight in <b data-countdown>${countdown()}</b>`:''}</p></div>`:''}
 <div class="result-actions">${inTutorial?'<button class="primary" data-start="practice">Start a free flight ↗</button>':`<button class="primary" data-start="practice" ${busy?'disabled':''}>Fly another mystery ↗</button><button class="secondary" data-share>Share spoiler-free</button>`}<button class="secondary" data-home>Back to the launchpad</button></div>
 ${shareText?`<textarea class="share-copy" readonly aria-label="Copy your spoiler-free result">${esc(shareText)}</textarea>`:''}
 <p class="small">${inTutorial?'Just a teaching example. Tutorial points never enter your account history.':'A personal result, not a global rank. Different puzzles have different difficulty.'}</p>${!inTutorial?'<button class="text-button" data-report>Report a puzzle issue</button>':''}</section>`;
}
function play(r){
 const hint=hintBox(r)||{button:'',clue:''},ended=r.status!=='active';
 return `<div class="play-heading"><a href="#" data-home>← Launchpad</a><span class="eyebrow">${inTutorial?'GUIDED TUTORIAL':r.mode==='daily'?'YOUR PERSONAL DAILY':'FREE FLIGHT'} · UPDRAFT</span><span class="save-status ${busy&&!inTutorial?'saving':''}" role="status">${inTutorial?'Instant play':busy?'Saving…':'Progress saved'}</span></div>
 <div class="play-layout"><div class="play-main"><section class="puzzle-panel" data-tilt="soft"><div class="panel-cloud cloud-small" aria-hidden="true"></div>${balloon('flight-balloon')}
 <div class="puzzle-top"><div class="puzzle-question"><span class="puzzle-category">${esc(r.category)} <small>${r.lengths.join(' + ')} letters</small></span>${hint.button}</div><div class="top-stats"><div class="altimeter" title="Current flight altitude (10m per point)"><span class="alt-needle" aria-hidden="true">▲</span><span class="alt-val">${r.score*10}m</span><small>ALT</small><span class="alt-tier">${altitudeTier(r.score*10)}</span></div><span class="score-chip"><b class="score-value">${r.score}</b> <small>pts</small></span></div></div>
 ${mask(r)}${ended?'':hint.clue}
 <div class="puzzle-bottom"><span class="air" aria-label="${r.air} of 6 Fuel remaining">${Array.from({length:RULES.fuel},(_,i)=>`<i class="${i<r.air?'full':''}" aria-hidden="true"></i>`).join('')}<strong>${r.air}/6 Fuel</strong></span><span>${r.history.length}/5 rounds flown</span></div><div class="round-track" aria-hidden="true">${Array.from({length:RULES.rounds},(_,i)=>`<i class="${i<r.history.length?'used':''}"></i>`).join('')}</div></section>
 ${inTutorial?`<div class="tutorial-guide" role="note"><span aria-hidden="true">✦</span><div><strong>Your flying lesson</strong><p>${esc(tutorialTip(r,selected))}</p></div></div>`:''}${errorBox()}${r.status==='active'?`<section class="panel action-panel" data-key="${r.id}-${r.phase}-${r.round}">${panel(r)}</section>`:result(r)}</div>
 <aside><div class="flight-notes"><span class="eyebrow">YOUR FLIGHT LOG</span><h2>A little curiosity.<br><em>A lot of altitude.</em></h2><p class="small">${r.tested.length?'Tested letters: '+r.tested.join(' · '):'Your discoveries will land here.'}</p>
 <ol>${r.history.map((row,i)=>`<li data-key="log-${i}-${row.result}"><span class="log-number">${i+1}</span><div><strong>${esc(row.answer||'Skipped round')}</strong><small>${row.points} pts${row.quick?` +${row.quick} quick`:''}${row.bonus?` +${row.bonus} hit`:''}${row.tier?' · '+esc(row.tier):''}</small></div><span class="log-result ${row.result}">${row.letter?esc(row.letter)+' · ':''}${row.result==='pending'?'Choose letter':esc(row.result)}</span></li>`).join('')||'<li class="empty-log">One answer. One letter. A whole new perspective.</li>'}</ol></div>
 ${instructions()}<p class="small resume-note">${inTutorial?'Tutorial progress stays in this browser tab.':r.status==='active'?`Saved after each move. Resume until ${esc(new Date(r.expires).toLocaleString([], {dateStyle:'medium',timeStyle:'short'}))}.`:esc(r.puzzleId||'')}${r.mode==='daily'&&data?`<br>Next daily flight: ${esc(new Date(data.resetAt).toLocaleString([],{dateStyle:'medium',timeStyle:'short'}))}.`:''}</p>
 ${r.status==='active'?'<details class="leave"><summary>Land this flight early</summary><p>This reveals the answer and keeps your banked points. This puzzle will count as seen.</p><button class="text-button" data-move="abandon">End & reveal</button></details>':''}</aside></div>`;
}
function render(){
 const run=inGame?activeRun():null;trackQuick(run);
 root.setAttribute('aria-busy',String(busy&&!inTutorial));patchHTML(root,run?play(run):welcome());
 document.querySelector('#account-open').textContent=data?.signedIn?'Your account':'Sign in';syncCinema(run);
 // A change of screen (launchpad, flight, result) gets one entrance; steps inside a flight are handled by feedback().
 const next=run?(run.status==='active'?'play:'+run.id:'result:'+run.id):'welcome';if(next!==stage){const first=!stage;stage=next;if(!first)stageEnter(root,next.split(':')[0]);}
}
function disarmHint(){clearTimeout(hintTimer);hintArmed=false;}
async function load(){
 if(mode==='daily'&&!accountHeaders()['X-Account-Token'])mode='practice';const epoch=++requestEpoch;busy=true;if(!inTutorial)error='';render();
 try{const result=await api('state');if(epoch===requestEpoch)data=result;}catch(e){if(epoch===requestEpoch&&!inTutorial)error=e.message;}finally{if(epoch===requestEpoch){busy=false;render();}}
}
function rememberView(){try{sessionStorage.setItem('hd-view',inTutorial?'tutorial':mode);if(inTutorial)sessionStorage.setItem('updraft-tutorial',JSON.stringify(tutorial));}catch{}}
function focusStep(){const heading=root.querySelector('.action-panel h2,.result h2');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}}
async function perform(route,body={},retry=false){
 if(busy)return;if(route==='start'&&!body.requestId)body.requestId=uid();const epoch=++requestEpoch,before=data?.run,snapshot=data;let optimistic=false;
 busy=true;error='';disarmHint();if(!retry)pending={route,body:{...body}};
 // Only the already-published prompt titles are predicted. Points, probes, hints and
 // guesses ALWAYS wait for the server. Typing can begin while Next is saved.
 if(route==='move'&&body.action==='next'&&before?.nextPrompts?.length){optimistic=true;data={...data,run:{...before,phase:'answer',round:before.round+1,prompts:before.nextPrompts,nextPrompts:[],lastGuess:null}};selected='';trackQuick(data.run,true);}
 render();if(optimistic)feedback(before,data.run,'next');
 try{
  const result=await api(route,body);if(epoch!==requestEpoch)return;data=result;pending=null;if(!optimistic)selected='';shareText='';inGame=true;rememberView();
 }catch(e){if(epoch!==requestEpoch)return;if(optimistic){data=snapshot;selected='';}error=e.message;if(e.status){pending=null;if(e.status===409){try{data=await api('state');selected='';}catch{}}}else error='Connection interrupted. Retry to confirm and safely save the same move.';}
 finally{if(epoch===requestEpoch){busy=false;render();if(error)invalid();else{feedback(before?.id===data?.run?.id?before:null,data?.run,body.action);if(!optimistic)focusStep();}}}
}
function startTutorial(){if(busy&&inGame&&!inTutorial)return;inTutorial=true;tutorial=createTutorial();selected='';pending=null;error='';shareText='';inGame=true;disarmHint();rememberView();render();focusStep();}
function move(action,extra={}){
 if(inTutorial){const before=tutorial;disarmHint();try{tutorial=tutorialMove(tutorial,action,extra.value,extra.prompt);error='';selected='';rememberView();render();feedback(before,tutorial,action);if(action!=='hint')focusStep();}catch(e){error=e.message;render();invalid();}return;}
 if(locked())return;return perform('move',{action,...extra,runId:data.run.id,revision:data.run.revision,requestId:uid()});
}
async function account(){
 document.querySelector('#account-content').innerHTML=`<h2 id="account-title">${data?.signedIn?'Your discoveries, saved.':'Keep your discoveries.'}</h2>${!capabilities.accounts?'<p>Account syncing is not connected in this preview. You can still play free as a guest.</p>':data?.signedIn?'<p>Your streak, rank, seen puzzles and daily assignment follow this account across devices.</p><button class="secondary" data-signout>Sign out</button>':`<p>Play free. Save your streak and history, avoid repeat puzzles across devices, and get a personal daily flight.</p><form id="account-form"><label for="account-email">Email</label><input id="account-email" name="email" type="email" autocomplete="email" required maxlength="254"><label for="account-password">Password</label><input id="account-password" name="password" type="password" autocomplete="current-password" required minlength="8" maxlength="256"><p class="form-error" role="alert"></p><div class="result-actions"><button class="primary" name="intent" value="signin">Sign in</button><button class="secondary" name="intent" value="signup">Create account</button></div></form><p class="small">New accounts may need email confirmation. Signing in claims guest progress once. An existing account’s active flight takes priority.</p>`}`;document.querySelector('#account-dialog').showModal();
}
// Registered before the first render so a launched letter never also toggles the visual director (D).
document.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||e.repeat||e.target.closest('input,textarea,select,dialog,[contenteditable="true"]'))return;
 const run=inGame&&activeRun(),letter=e.key.length===1?e.key.toUpperCase():'';
 if(!run||run.phase!=='probe'||!run.available?.includes(letter))return;
 const button=root.querySelector(`[data-probe="${letter}"]:not(:disabled)`);if(button){e.preventDefault();e.stopImmediatePropagation();button.click();}
});
document.addEventListener('input',e=>{if(['trivia-answer','solve-answer'].includes(e.target.id)&&activeRun())drafts.set(draftKey(activeRun()),e.target.value);});
document.addEventListener('click',async e=>{
 const el=e.target.closest('button,a[data-home]');if(!el)return;
 if(el.hasAttribute('data-close')){el.closest('dialog').close();return;}
 if(el.id==='account-open'||el.hasAttribute('data-account'))return account();
 if(el.dataset.hint==='arm'){hintArmed=true;clearTimeout(hintTimer);hintTimer=setTimeout(()=>{hintArmed=false;render();},5000);render();root.querySelector('[data-hint="confirm"]')?.focus({preventScroll:true});return;}
 if(el.dataset.hint==='confirm'){press(el);return move('hint');}
 if(hintArmed){disarmHint();render();}
 if(el.hasAttribute('data-home')){e.preventDefault();if(busy&&!inTutorial&&inGame)return;inGame=false;inTutorial=false;try{sessionStorage.removeItem('hd-view');}catch{}error='';render();return;}
 if(el.hasAttribute('data-tutorial'))return startTutorial();
 if(el.hasAttribute('data-refresh'))return load();
 if(el.hasAttribute('data-retry')&&pending)return perform(pending.route,pending.body,true);
 if(el.dataset.start){if(busy)return;inTutorial=false;mode=el.dataset.start;selected='';pending=null;press(el);return perform('start');}
 if(el.dataset.prompt){selected=el.dataset.prompt;render();selectPrompt(root.querySelector(`[data-prompt="${selected}"]`));document.querySelector('#trivia-answer').focus();return;}
 if(el.dataset.probe){launchLetter(el);sending(el);return move('probe',{value:el.dataset.probe});}
 if(el.dataset.move){press(el);return move(el.dataset.move);}
 if(el.hasAttribute('data-report')){document.querySelector('#report-dialog').showModal();return;}
 if(el.hasAttribute('data-share')){
  const r=activeRun(),rated=r.rating?.stars??0;shareText=`Updraft · ${r.mode==='daily'?'Personal daily':'Free flight'}\n${'★'.repeat(rated)}${'☆'.repeat(5-rated)} ${r.status==='solved'?`Solved in ${r.history.length}`:'Flight complete'} | Fuel ${r.air}/6 | ${r.score} points\n${r.history.map(h=>({hit:'✦',miss:'○',echo:'↻',skipped:'–'}[h.result]||'–')).join(' ')}${data?.stats?.streak?`\n🔥 ${plural(data.stats.streak,'day')} streak`:''}\n${location.origin}/updraft`;
  try{await navigator.clipboard.writeText(shareText);toast('Spoiler-free result copied.');shareText='';}catch{toast('Copy your result from the box below.');}render();return;
 }
 if(el.hasAttribute('data-signout')){try{await accountAction('account-signout',el,{redraw:()=>{},toast});document.querySelector('#account-dialog').close();inGame=false;inTutorial=false;mode='practice';await load();}catch(e){toast(e.message);}}
});
document.addEventListener('submit',async e=>{
 e.preventDefault();const form=e.target;if(form.id==='answer-form'){sending(e.submitter);return move('answer',{prompt:selected,value:new FormData(form).get('answer')});}
 if(form.id==='solve-form'){sending(e.submitter);return move('solve',{value:new FormData(form).get('answer')});}
 const buttons=[...form.querySelectorAll('button')];buttons.forEach(b=>b.disabled=true);
 try{
  if(form.id==='account-form'){const message=await signInAccount(e.submitter?.value,Object.fromEntries(new FormData(form)));toast(message);document.querySelector('#account-dialog').close();await load();}
  if(form.id==='report-form'){await api('report',{runId:data.run.id,text:new FormData(form).get('text')});form.reset();document.querySelector('#report-dialog').close();toast('Report saved for review. Thank you.');}
 }catch(e){form.querySelector('.form-error').textContent=e.message;}finally{buttons.forEach(b=>b.disabled=false);}
});
render();armDepth(root);
// Paint first; the tutorial is usable while cloud/account requests are pending.
initAccount().then(features=>{capabilities=features||{};}).catch(()=>{});
load();
document.addEventListener('visibilitychange',async()=>{if(document.hidden||busy||inTutorial||pending||!data)return;const epoch=requestEpoch;try{const fresh=await api('state');if(epoch!==requestEpoch||inTutorial||busy)return;if(fresh.run?.revision!==data.run?.revision||fresh.run?.id!==data.run?.id){data=fresh;selected='';render();toast('Loaded your latest saved progress.');}else{data=fresh;render();}}catch{}});
