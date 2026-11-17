import { patchHTML } from './dom.js';
import {accountButton,accountHeaders,ensureAccount,initAccount,refreshAccount,accountMarkup,accountSubmit,accountAction} from './account-ui.js';
import {packedContent,packedReveal,packedOptions,observePackedCommitment} from './packed-ui.js';
let loneLocal={claimFirst:'',message:'',belief:'unsure',spyTarget:''};
const packedHelpers=()=>({esc,button,intro,cards,lock,waiting,nameOf});
const app=document.querySelector('#app'), modalRoot=document.querySelector('#modal-root');
const esc=s=>{if(typeof s==='object'&&s!==null)s=s.text??s.label??String(s);return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));};
const icons={arrow:'↗',right:'→',close:'×',star:'✳',check:'✓'};
let games={},state=null,session=null,streamController=null,reconnectTimer=null,lastKey='',selected=[],draft='',modal=null,filter='all',chosen='signals',sound=localStorage.getItem('afterhours-sound')==='true',audioContext,network=[];
try{session=JSON.parse(sessionStorage.getItem('afterhours-session'));}catch{}
let currentRender='',clockOffset=0,pendingPhase=null,packedOwn=null;
let optionCatalog={defaults:{},packs:[]},gameOptions={signalCards:9};
const phaseKey=s=>s?`${s.code}:${s.phaseId}`:'home';
const $=s=>document.querySelector(s);
const nameOf=id=>state?.players.find(p=>p.id===id)?.name||'Player';
const avatar=(p,i=0)=>`<span class="avatar avatar-${i%6}" aria-hidden="true">${esc(Array.from(p.name)[0].toUpperCase())}</span>`;
const button=(label,action,cls='primary',attrs='')=>`<button class="btn ${cls}" data-action="${action}" ${attrs}>${label}</button>`;
const art=(id,large=false)=>`<div class="game-art art-${id} ${large?'large':''}" aria-hidden="true"><div class="orbit orbit-a"></div><div class="orbit orbit-b"></div>${{
 packed:'<div class="packed-art-building"><span>PACKED HOUSE</span><div><i></i><i></i><i></i><i></i><i></i><i></i></div><b>12</b></div><span class="packed-art-sign">ROOM FOR YOU?</span>',
 signals:'<div class="signal-tile tile-one">✳</div><div class="signal-line">· · ·</div><div class="signal-tile tile-two">✦</div><span class="art-spark">✦</span>',
 decoy:'<div class="file-card file-back"></div><div class="file-card file-front"><span class="eye"></span><span class="eye"></span><span class="sneaky-smile"></span></div><span class="mini-sticker">?</span>',
 crowd:'<div class="vote-bubble vote-yes">YES<span>✓</span></div><div class="vote-bubble vote-no">NO<span>×</span></div><span class="art-spark">✳</span>',
 twins:'<div class="twin twin-one"><i></i><i></i><b></b></div><div class="twin twin-two"><i></i><i></i><b></b></div><span class="twin-heart">♡</span>',
 borrowed:'<div class="word-piece word-one">SKY</div><div class="word-piece word-two">LATE</div><div class="word-piece word-three">?</div><span class="art-spark">✦</span>'
 }[id]}</div>`;
function header(){return `<header class="header"><a href="/" class="brand" data-action="home"><span class="brand-icon">✳</span><span>after hours<span class="brand-dot">™</span></span></a><nav aria-label="Main navigation">${accountButton()}${!state?'<a href="#collection" class="nav-link">The games</a>':''}<button class="nav-link" data-action="how">How it works</button><button class="sound-button ${sound?'enabled':''}" data-action="sound" aria-label="${sound?'Mute':'Enable'} game sounds" title="${sound?'Mute':'Enable'} sound">${sound?'♫':'♪'}<span>${sound?'Sound on':'Sound off'}</span></button>${state?`<span class="connection"><i></i><span id="connection-label">Connected</span></span>`:button('Host a game <span>↗</span>','host','dark small')}</nav></header>`;}
function home(){
 return `${header()}<main class="home"><section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="tiny-star">✳</span> LESS SCROLLING. MORE CONNECTING.</div><h1>Good friends.<br>Questionable<br><span class="serif">decisions.</span><svg class="scribble" viewBox="0 0 390 20" aria-hidden="true"><path d="M5 14 Q190 -4 380 8 M38 19 Q210 6 354 14"/></svg></h1><p>Six little games. Big group chat energy.<br>Get your people together. We’ll handle the fun.</p><div class="hero-actions">${button('Find your next game <span>↘</span>','browse')}${button('Join a room','join','outline')}</div><div class="hero-proof"><div class="avatar-stack"><span>✿</span><span>☺</span><span>✦</span><span>☻</span></div><span>4–10 friends <b>·</b> No downloads <b>·</b> Just play</span></div></div><div class="hero-visual" aria-label="Playful three-dimensional game pieces on a peach game board"><span class="visual-label">THE GOOD KIND OF CHAOS</span><div class="hero-ring"></div><div class="hero-ring ring-two"></div><div class="tabletop"></div><div class="hero-cube"><div class="cube-front"><i></i><i></i><i></i><i></i></div><div class="cube-top"></div><div class="cube-side"></div></div><div class="hero-ball"><span class="ball-eye"></span><span class="ball-eye"></span><span class="ball-smile"></span></div><div class="hero-pawn"><div class="pawn-top"></div><div class="pawn-body"></div><div class="pawn-base"></div></div><div class="hero-card"><span>ONE MORE</span><strong>ROUND?</strong><b>✳</b></div><div class="floating-label label-fun">serious about unserious.</div><div class="floating-label label-turn"><span>↖</span> your turn!</div><span class="hero-spark spark-one">✧</span><span class="hero-spark spark-two">✳</span><span class="visual-caption">BEST PLAYED WITH YOUR FAVOURITE HUMANS</span></div></section><div class="benefit-strip"><span><b>✦</b> Learn in a minute</span><span><b>◷</b> A whole night of “one more”</span><span><b>♧</b> Every friend has a part to play</span><span><b>♡</b> Zero awkward icebreakers</span></div><section class="solo-discovery" aria-label="Solo game"><div><span class="eyebrow">NEW &middot; A LITTLE TIME FOR YOURSELF</span><h2>Hidden Depths</h2><p>Answer trivia. Earn letters. Uncover a hidden answer in five rounds.</p></div><a href="/hidden-depths" class="btn dark">Play solo for free &darr;</a></section><section class="collection" id="collection"><div class="collection-heading"><div><div class="eyebrow">PICK YOUR KIND OF CHAOS</div><h2>The night starts here<span class="serif">.</span></h2></div><span class="collection-count">06 games. Endless inside jokes.</span></div><div class="filter-row"><div class="filters" role="group" aria-label="Filter games">${[['all','All games','06'],['words','Wordplay','03'],['social','Social & bluffing','03']].map(([id,label,count])=>`<button class="filter ${filter===id?'active':''}" data-filter="${id}" aria-pressed="${filter===id}">${label}<span>${count}</span></button>`).join('')}</div><span class="little-note">A little friendly competition never hurt. <span>↙</span></span></div><div class="game-grid">${Object.entries(games).filter(([id])=>filter==='all'||(filter==='words'?['signals','decoy','borrowed']:['crowd','packed','twins']).includes(id)).map(([id,g],i)=>`<article class="game-card ${g.color}" style="--order:${i}"><button class="art-button" data-game="${id}" aria-label="Explore ${g.name}">${art(id)}<span class="art-number">0${Object.keys(games).indexOf(id)+1}</span><span class="art-tag">${g.category}</span></button><div class="game-card-body"><div class="card-title"><h3>${g.name}</h3><span>↗</span></div><p>${g.description}</p><div class="card-bottom"><span>♧ ${id==='twins'?'6 or 8':`${g.min}–${g.max}`} players <b>·</b> ◷ ${g.duration}</span><button data-game="${id}" class="circle-button" aria-label="Play ${g.name}">→</button></div></div></article>`).join('')}</div></section><section class="join-banner"><div class="join-star">✳</div><div><h2>Your people are already here?</h2><p>Grab the room code. Make an entrance.</p></div><form id="quick-join" class="inline-form"><label class="sr-only" for="quick-code">Room code</label><input id="quick-code" name="code" placeholder="ROOM CODE" maxlength="5" minlength="5" required autocomplete="off" pattern="[A-Za-z2-9]{5}">${button('Join the fun ↗','noop','dark','type="submit"')}</form></section></main><footer><a href="/" class="brand footer-brand"><span class="brand-icon">✳</span>after hours</a><span>Made for the moments between everything else.</span><span>Good company required. Skills optional.</span></footer>`;
}
function roomBanner(){return `<div class="room-banner"><span><i class="live-dot"></i>${state.practice?'PRACTICE ROOM · SIMULATED PLAYERS':'YOUR PRIVATE GAME ROOM'}</span><button data-action="invite">Room <b>${state.code}</b><span>⌁ Invite friends</span></button></div>`;}
function playerList(showScore=true){return state.players.map((p,i)=>`<div class="player-row">${avatar(p,i)}<div><strong>${esc(p.name)} ${p.id===state.me?'<small>(you)</small>':''}</strong><span>${p.connected===false?'Away':p.id===state.host?'Host':p.bot?'Practice bot':'Ready to play'}${state.givers?.includes(p.id)?' · Clue-giver':''}</span></div>${showScore?`<b class="score">${p.score}<small>pts</small></b>`:'<span class="ready-dot">✓</span>'}</div>`).join('');}
function lobby(){const g=games[chosen];const host=state.host===state.me;return `${header()}<main class="room-page">${roomBanner()}<div class="lobby-title"><div class="eyebrow">GOOD COMPANY, GREAT NIGHT</div><h1>The gang’s getting together<span class="serif">.</span></h1><p>Share the room link. Pick a game. Let the questionable decisions begin.</p></div><div class="lobby-layout"><section class="panel lounge-picker"><div class="section-label">01 <span>PICK A GAME</span></div><div class="lobby-games">${Object.entries(games).map(([id,g])=>`<button class="lobby-game ${id===chosen?'selected':''}" data-select-game="${id}" ${host?'':'disabled'}><span class="mini-art ${g.color}">${{packed:'⌂',signals:'✳',decoy:'▱',crowd:'◉',seat:'♜',twins:'☻',borrowed:'▤'}[id]}</span><span><strong>${g.name}</strong><small>${g.min}–${g.max} players · ${g.duration}</small></span><span class="radio-dot"></span></button>`).join('')}</div><div class="lobby-game-info"><h3>${g.tagline}</h3><p>${g.rules[0]}</p><button class="text-button" data-rules="${chosen}">Read the quick rules ↗</button></div>${optionsUI(chosen,!host)}${host?button(`Let’s play ${g.name} <span>→</span>`,'start','primary full'): '<div class="waiting-box"><span class="loader"></span> Your host will start the game.</div>'}<p class="micro-note">${chosen==='twins'?'Almost Twins needs 6 or 8 players.':chosen==='borrowed'?'Borrowed Words needs 4, 6, or 8 players.':`You need at least ${g.min} people to start.`} Everyone plays on their own screen.</p></section><aside class="panel"><div class="section-label">02 <span>YOUR PEOPLE</span><b>${state.players.length}/${chosen==='packed'?10:8}</b></div><div class="players">${playerList(false)}</div>${button('Copy invite link ↗','copy','outline full')}<div class="room-code-card"><span>OR JOIN WITH CODE</span><strong>${state.code}</strong></div><p class="micro-note">Share the invite link. On a hosted site, friends can join from anywhere; a local server needs the same Wi-Fi.</p>${state.spectators?.length?`<p class="micro-note">Watching: ${state.spectators.map(p=>esc(p.name)).join(', ')}</p>`:''}${state.spectator?button('Take an available seat','take-seat','outline full'):''}${button('Leave room','leave','text-button full')}</aside></div></main>`;}
const stageLabels={question:'Meet the options',rank:'Rank your favourites',tiers:'The rooms you built',clue:'Make a connection',guess:'Trust your instincts',sabotage:'A little mischief',tune:'Read the room',vote:'Your honest answer',talk:'Talk a good game',pick:'Discuss & choose',match:'Find your person',reveal:'The big reveal',finished:'That’s a wrap'};
function gameScreen(){const g=games[state.game];return `${header()}<main class="room-page">${roomBanner()}<div class="play-heading"><div><div class="eyebrow">${g.category.toUpperCase()} <span> / </span> ${state.practice?'PRACTICE MODE':'GAME NIGHT'}</div><h1>${g.name}<button class="info-button" data-rules="${state.game}" aria-label="Game rules">?</button></h1></div><div class="round-status"><span>ROUND <b>${state.round}</b> / ${state.total}</span>${state.deadline?'<div class="timer" id="timer" aria-label="Time remaining"></div>':''}</div></div><div class="play-layout"><section class="panel play-panel ${g.color}"><div class="phase-bar"><span><i class="live-dot"></i>${state.game==='packed'&&state.stage==='pick'?'Make your secret pick':stageLabels[state.stage]}</span><span>${esc(state.role||'Player')}${state.game==='borrowed'?` · Team ${state.team===0?'Peach':'Violet'}`:''}</span></div><div class="stage-content" id="stage-content" data-key="phase-${state.phaseId}">${demoGuide()}${state.paused?playContent():state.stage==='finished'?finish():state.stage==='reveal'?revealScreen():playContent()}${demoContinue()}</div></section><aside class="game-sidebar"><section class="panel"><div class="section-label"><span>${state.game==='signals'?'YOUR CREW':'THE SCOREBOARD'}</span><b>${state.players.length}</b></div><div class="players">${playerList()}</div>${state.game==='signals'?'<p class="micro-note">One crew, one shared score. You win together.</p>':''}</section><section class="tip-card"><span>✦</span><h3>${state.practice?'A little practice, a lot of possibility.':'The house rules'}</h3><p>${state.practice&&state.game==='packed'?'Bots rank and choose using only public room information. They cannot see the hidden seats. Continue at your own pace.':state.practice?'Bots use simple word associations and can misunderstand a clue. They only see information their role allows. Continue each step when you are ready.':games[state.game].tagline+' Keep your screen to yourself. Save the explanations for the reveal.'}</p><button class="text-button" data-rules="${state.game}">How to play ↗</button></section>${state.host===state.me?button('Back to the lounge','return','outline full'):''}${state.game==='packed'?`<details class="packed-proof"><summary>Keep your seat link</summary><p>Save this private link to return on this or another device. It signs in as you; do not share it with other players.</p><input aria-label="Your private seat link" readonly value="${esc(location.origin+'/#seat='+session.code+'.'+session.token)}"></details>`+button('Leave game','leave','text-button full'):''}</aside></div></main>`;}
function intro(title,text){return `<div class="stage-intro"><h2>${title}</h2><p>${text}</p></div>`;}
function textForm(label,placeholder,max=30){return `<form id="answer-form" class="answer-form"><label for="answer-input">${label}</label><div class="answer-input-row"><input id="answer-input" name="answer" placeholder="${placeholder}" maxlength="${max}" value="${esc(draft)}" required autocomplete="off">${button('Send it →','noop','primary','type="submit"')}</div></form>`;}
function cards(items,options={}){const hasImages=items.some(word=>typeof word==='object'&&word&&word.image);return `<div class="word-grid ${options.compact?'compact':''} ${hasImages?'has-images':''}">${items.map((word,i)=>{const text=typeof word==='object'&&word?(word.text||word.label||''):word;const img=typeof word==='object'&&word?word.image:null;const isPicked=selected.includes(i);return `<button type="button" class="word-card ${img?'has-img':''} ${isPicked?'picked':''} ${options.target===i?'target':''} ${options.removed?.includes(i)?'removed':''}" ${options.disabled||options.removed?.includes(i)?'disabled':''} data-key="card-${i}" data-choice="${i}" aria-label="${esc(text)}" aria-pressed="${isPicked}">${isPicked&&options.multi?`<span class="selection-number" aria-hidden="true">${selected.indexOf(i)+1}</span>`:''}<span class="word-label">${esc(text)}</span>${img?`<span class="card-img-wrap"><img src="${esc(img)}" class="card-option-img" alt="${esc(text)}" loading="lazy">${isPicked?`<span class="selection-badge" aria-hidden="true">✓</span>`:''}</span>`:''}${options.target===i?'<small>SECRET TARGET</small>':''}${options.removed?.includes(i)?'<small>REMOVED</small>':''}</button>`;}).join('')}</div>`;}
function lock(label='Lock it in',valid=selected.length>0){const note=state.game==='borrowed'&&state.stage==='sabotage'?'The other team sees the removals after both teams lock in.':state.game==='borrowed'&&state.stage==='clue'?'Your teammates see this clue in the next step.':'Your choice stays private until the reveal.';return `<div class="lock-row">${button(`${label} <span>→</span>`,'lock','primary',valid?'':'disabled')}<span>${note}</span></div>`;}
function waiting(text='Your answer is locked in.'){
 const ready=state.practiceReady,count=state.submitted.length,total=state.expectedCount;
 if(state.game==='lone'&&state.stage==='pick'&&!state.practice)return `<div class="waiting-box" data-key="waiting"><span class="loader"></span><div><strong>${text}</strong><span>${count} of ${total} picks saved. You can update your choice until the timer ends.</span></div></div>`;
 let progress=total?`${count} of ${total} players have submitted. `:'';
 if(state.game==='borrowed'&&['sabotage','clue'].includes(state.stage)){
  const teams=state.givers.map((id,i)=>({name:teamName(i),done:state.submitted.includes(id)}));
  progress=count===2?(state.stage==='sabotage'?'Both clue-givers have finished removing 3 cards each. ':'Both clue-givers have sent their clues. '):`${teams.filter(t=>t.done).map(t=>t.name).join(' and ')||'Neither team'} ${count?'is ready. ': 'is ready yet. '}Waiting for ${teams.filter(t=>!t.done).map(t=>t.name).join(' and ')}. `;
 }
 return `<div class="waiting-box" data-key="waiting"><span class="${ready?'ready-check':'loader'}" aria-hidden="true">${ready?'✓':''}</span><div><strong>${text}</strong><span>${progress}${ready?'Continue when you are ready.':state.practice?'Bots are choosing. You control the next step.':'The next phase starts when everyone is ready.'}</span></div></div>`;
}
function optionsUI(game,disabled=false){
 const select=(key,label,values)=>{
  const currentEntry=values.find(([v])=>String(v)===String(gameOptions[key]))||values[0];
  const currentText=currentEntry?currentEntry[1]:'';
  return `<label for="option-${key}">${label}</label>
  <div class="custom-select ${disabled?'disabled':''}">
   <select id="option-${key}" data-option="${key}" class="custom-select-native" tabindex="-1" aria-hidden="true" ${disabled?'disabled':''}>
    ${values.map(([value,name])=>`<option value="${value}" ${String(gameOptions[key])===String(value)?'selected':''}>${esc(name)}</option>`).join('')}
   </select>
   <button type="button" class="custom-select-trigger" data-toggle-dropdown aria-haspopup="listbox" aria-expanded="false" ${disabled?'disabled':''}>
    <span class="custom-select-label"><span class="select-text">${esc(currentText)}</span></span>
    <span class="custom-select-arrow" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></span>
   </button>
   <div class="custom-select-menu" role="listbox">
    ${values.map(([value,name])=>{
      const sel=String(gameOptions[key])===String(value);
      return `<div class="custom-select-option ${sel?'selected':''}" role="option" data-select-dropdown="option-${key}" data-value="${value}" aria-selected="${sel}">
       <span class="select-option-text">${esc(name)}</span>${sel?'<span class="select-check" aria-hidden="true">✓</span>' : ''}
      </div>`;
    }).join('')}
   </div>
  </div>`;
 };
 if(game==='packed')return packedOptions(gameOptions,disabled,esc);
 if(game!=='signals')return '';
 return '<div class="game-options" data-key="game-options"><h3>Make it your kind of game</h3>'+select('signalCards','Cards per receiver',[[6,'6 cards'],[9,'9 cards'],[12,'12 cards']])+'</div>';
}

const phasePlans={packed:[['rank','Rank'],['pick','Discuss & choose'],['reveal','Reveal']],signals:[['clue','Send a signal'],['guess','Choose cards'],['reveal','Reveal']],decoy:[['clue','Give a clue'],['sabotage','Plant decoys'],['guess','Guess'],['reveal','Reveal']],crowd:[['tune','Set a dilemma'],['vote','Vote'],['reveal','Reveal']],twins:[['clue','Share clues'],['match','Choose partners'],['reveal','Reveal']],borrowed:[['sabotage','Remove words'],['clue','Build clues'],['guess','Team guesses'],['reveal','Reveal']]};
function demoGuide(){if(!state.practice||state.stage==='finished')return '';const plan=phasePlans[state.game],index=plan.findIndex(([id])=>id===state.stage);return `<div class="demo-guide" data-key="demo-guide"><div><strong>AT YOUR PACE</strong><span>No countdown · Your role: ${esc(state.role)}</span></div><ol aria-label="Round progress">${plan.map(([id,title],i)=>`<li class="${i===index?'current':i<index?'done':''}" ${i===index?'aria-current="step"':''}><b>${i<index?'✓':i+1}</b><span>${title}</span></li>`).join('')}</ol></div>`;}
function demoContinue(){if(!state.practice||['reveal','finished','talk'].includes(state.stage))return '';const plan=phasePlans[state.game],index=plan.findIndex(([id])=>id===state.stage);return `<div class="demo-continue" data-key="demo-continue"><div aria-live="polite"><strong>${state.practiceReady?'This step is complete.':state.game==='packed'&&state.ownAnswer!==undefined?'Waiting for practice bots...':'Finish this step to continue.'}</strong><span>Next: ${plan[index+1]?.[1]||'the reveal'}</span></div>${button('Continue demo →','continuePractice','primary',state.practiceReady?'':'disabled')}</div>`;}
const teamName=t=>`Team ${t===0?'Peach':'Violet'}`;
function handLabel(team,opponent=false){return `<div class="hand-label ${opponent?'opponent':'own'}"><span>${opponent?'OPPONENT’S HAND':'YOUR TEAM’S HAND'}</span><strong>${teamName(team)}</strong></div>`;}
function opponentReview(){const hand=state.opponentHand;if(!hand)return '';return `<details class="hand-review" data-key="opponent-review"><summary>Review ${teamName(1-state.team)}’s hand & your removals</summary><p>${hand.redrawn?'Their clue-giver used a redraw. Your three removed cards stay removed.':'These are the same cards you saw during sabotage. Your removals stay in place.'}</p><div class="audit-grid">${hand.cards.map((word,i)=>`<span class="audit-card ${hand.removed.includes(i)?'removed':''}">${esc(word)}${hand.removed.includes(i)?'<small>YOU REMOVED</small>':''}</span>`).join('')}</div></details>`;}
function handWorkspace(){
 const s=state;return `<div class="team-workspace">${[s.team,1-s.team].map(team=>{
  const own=team===s.team,active=(s.stage==='clue')===own,hand=s.teamHands[team];
  const display=active?cards(s.hand,{multi:true,removed:own?s.removed:[],disabled:!s.canAct}):`<div class="audit-grid">${hand.cards.map((word,i)=>`<span class="audit-card ${hand.removed.includes(i)?'removed':''}">${esc(word)}${hand.removed.includes(i)?`<small>${own?'OPPONENT REMOVED':'YOU REMOVED'}</small>`:''}</span>`).join('')}</div>`;
  return `<section class="team-hand ${active?'active-hand':'passive-hand'}" data-key="team-hand-${team}">${handLabel(team,!own)}<p class="hand-purpose">${own?(s.stage==='sabotage'?'Your separate hand. The other clue-giver is choosing what to remove here.':`Your target: <strong>${esc(s.target)}</strong>. Build your clue from the available cards.`):(s.stage==='sabotage'?'Remove 3 cards here. These exact removals will affect the opponent’s clue.':'Same opponent hand as before. Your removals are shown below.')}</p>${active?'<span class="active-hand-label">YOUR ACTION IS HERE ↓</span>':''}${display}</section>`;
 }).join('')}</div>`;
}
function playContent(){const s=state,id=s.me,isLeader=s.leader===id;
 if(s.spectator&&s.game!=='packed')return intro('Watching this round.','The seated players are playing. You can see their results at the reveal, or take an available seat back in the lounge.');
 if(s.game==='packed')return packedContent(s,packedHelpers(),selected);
 if(s.game==='signals'){
   if(s.stage==='clue')return isLeader?intro('One word. All these connections.','Find one clue that points to the highlighted target on every board. No words already on a board!')+`<div class="receiver-boards">${Object.entries(s.boards).map(([pid,b])=>`<div class="receiver-board"><h4>${esc(nameOf(pid))}’s board</h4>${cards(b.cards,{target:b.target,disabled:true,compact:true})}</div>`).join('')}</div>`+(s.canAct?textForm('YOUR ONE-WORD SIGNAL','Think of a connection…'):waiting('Your signal is locked in.')):intro(`${esc(nameOf(s.leader))} is finding the words…`,'Your board is different from everyone else’s. The same clue will need to work for all of you.')+cards(s.board,{disabled:true})+waiting('Your signal sender is thinking.');
   return intro('What’s your connection?','Choose the card on your board that best matches the clue.')+`<div class="clue-display"><span>THE SIGNAL</span><strong>“${esc(s.clue)}”</strong></div>`+(isLeader?waiting('Your signal is out there. Let’s see where it lands.'):cards(s.board,{disabled:!s.canAct})+(s.canAct?lock():waiting()));
 }
 if(s.game==='decoy'){
   if(s.stage==='clue')return isLeader?intro('Make it clear. They’ll make it complicated.','Give one word that points to your secret target. Two saboteurs will add their decoys next.')+cards(s.board,{disabled:true,target:s.board.indexOf(s.target)})+(s.canAct?textForm('YOUR ONE-WORD CLUE','Your best clue…'):waiting('Your clue is locked in.')):intro('A perfectly good clue is on its way.',s.role==='Saboteur'?`The target is ${esc(s.target)}. You’ll choose a decoy after seeing the guide’s clue.`:'The guide is writing a clue. Watch out: two convincing decoys will join the board.')+art('decoy')+waiting('Waiting for the guide.');
   if(s.stage==='sabotage')return intro('Time to cause a little confusion.',`The clue is “${esc(s.clue)}”. ${s.role==='Saboteur'?`The real answer is ${esc(s.target)}. Choose the most convincing decoy.`:'The saboteurs are secretly adding two decoys.'}`)+(s.role==='Saboteur'?cards(s.hand,{disabled:!s.canAct})+(s.canAct?lock('Plant this decoy'):waiting('Your decoy is planted.')):art('decoy')+waiting('Mischief in progress.'));
   return intro('Which answer did the guide mean?','Two of these words are decoys. Trust the clue, question everything else.')+`<div class="clue-display"><span>THE CLUE</span><strong>“${esc(s.clue)}”</strong></div>`+cards(s.board,{disabled:!s.canAct})+(s.canAct?lock():waiting(s.role==='Guesser'?'Your guess is locked in.':'The guessers are choosing.'));
 }
 if(s.game==='crowd'){
   if(s.stage==='tune')return isLeader?intro('A very specific kind of persuasion.',`Your secret target: exactly <strong>${s.target} YES votes</strong> from ${s.players.length-1} friends. Fill the blank to make that happen.`)+`<div class="question-card">${esc(s.prompt)}</div>`+(s.canAct?textForm('FILL IN THE BLANK','An amount, number, or idea…',45):waiting('Your question is locked in.')):intro(`${esc(nameOf(s.leader))} has a question for you.`,'They’re trying to predict the room. Your only job is to answer honestly.')+art('crowd')+waiting('A dilemma is taking shape.');
   return intro('Be honest. Would you?',isLeader?`You’re hoping for exactly ${s.target} yes votes. Keep your target secret!`:'There’s no right answer. That’s exactly the problem.')+`<div class="question-card">${esc(s.question)}</div>`+(s.canAct?`<div class="vote-buttons"><button class="vote-choice yes ${selected[0]===true?'picked':''}" data-vote="true"><b>✓</b>Absolutely<span>Count me in</span></button><button class="vote-choice no ${selected[0]===false?'picked':''}" data-vote="false"><b>×</b>Nope<span>Not for me</span></button></div>`+lock('Lock my vote'):waiting(isLeader?'Let your friends surprise you.':'Your vote is in.'));
 }
 if(s.game==='twins'){
   if(s.stage==='clue')return intro('Somewhere in this room is your other half.','Give a short clue about your word. Don’t say the word itself; make your partner recognise you.')+`<div class="secret-word"><span>YOUR SECRET WORD · KEEP IT TO YOURSELF</span><strong>${esc(s.word)}</strong></div>`+(s.canAct?textForm('YOUR SHORT CLUE','A little hint…',35):waiting('Your clue is ready for the room.'));
   return intro('Who feels like your kind of person?',`Your word is <strong>${esc(s.word)}</strong>. Read the clues and choose the person with your related word.`)+`<div class="partner-grid">${s.players.filter(p=>p.id!==id).map((p,i)=>`<button class="partner-card ${selected[0]===p.id?'picked':''}" data-partner="${p.id}" ${!s.canAct?'disabled':''}>${avatar(p,i)}<strong>${esc(p.name)}</strong><q>${esc(s.clues[p.id]||'No clue submitted')}</q></button>`).join('')}</div>`+(s.canAct?lock('Found my person'):waiting('Your hunch is locked in.'));
 }
 if(s.game==='borrowed'){
   if(s.stage==='sabotage')return intro(`Disrupt ${teamName(1-s.team)}’s hand.`,s.role==='Clue-giver'?`There are two separate hands throughout this round. Remove three cards from <strong>${teamName(1-s.team)}</strong>. Their clue-giver is removing three from <strong>${teamName(s.team)}</strong>.`:'Your clue-giver is removing three cards from the other team. Each team has its own hand and secret target.')+(s.role==='Clue-giver'?handWorkspace()+(s.canAct?lock(`Remove ${selected.length}/3 words`,selected.length===3):waiting(`Your three removals for ${teamName(1-s.team)} are locked.`)):art('borrowed')+waiting('The clue-givers are choosing their removals.'));
   if(s.stage==='clue')return s.role==='Clue-giver'?intro(`Now build ${teamName(s.team)}’s clue.`,`Both hands remain below. Use <strong>your own team’s hand</strong> now: its crossed-out cards were removed by the opponent. Pick one to three remaining words in reading order.`)+`<div class="hand-change-note">${s.redrawn?'You used your redraw. Only your nine available words changed; removed cards stayed in their original slots.':`The ${teamName(1-s.team)} panel still shows the exact hand you sabotaged. No automatic replacement or shuffle has happened.`}</div>`+handWorkspace()+`<div class="clue-tray" aria-live="polite">${selected.length?selected.map(i=>esc(s.hand[i])).join(' <span>→</span> '):'Select cards to arrange your clue'}</div>`+(s.canAct?lock('Send this clue')+(!s.redrawn?'<button class="text-button redraw" data-action="confirm-redraw">Replace available cards (one redraw) ↻</button>':''):waiting('Your clue is locked in.')):intro('Your teammate is building a clue.',`You are on <strong>${teamName(s.team)}</strong>. ${esc(nameOf(s.givers[s.team]))} can use only the words the opponents left behind. These are your answer choices.`)+cards(s.board,{disabled:true})+waiting('Waiting for your team’s clue.');
   return intro('A few borrowed words. One answer.',`${teamName(s.team)}’s most-voted answer counts; ties use the leftmost card. ${s.role==='Clue-giver'?'Your teammates will guess from the clue you made.':'Choose the answer your clue-giver is describing.'}`)+`<div class="clue-display"><span>${teamName(s.team).toUpperCase()}’S CLUE</span><strong class="word-clue">${s.clue.length?s.clue.map(esc).join(' <em>→</em> '):'No clue submitted'}</strong></div>`+cards(s.board,{disabled:!s.canAct})+(s.canAct?lock('That’s our answer'):waiting(s.role==='Clue-giver'?'Your teammates are connecting the dots.':'Your team vote is in.'))+opponentReview();
 }
 return '';
}
function revealScreen(){const r=state.result;return `<div class="reveal-icon">${r.rows.some(x=>x.correct)?'✦':'◈'}</div>`+intro(esc(r.headline),esc(r.detail))+(state.game==='packed'?packedReveal(state,packedHelpers()):'')+`<div class="reveal-rows ${state.game==='packed'?'lone-score-reveal':''}" ${state.game==='packed'?`style="--reveal-delay:${r.packed.rooms.length*.18+.5}s"`:''}>${r.rows.map((row,i)=>`<div class="reveal-row ${row.correct?'correct':''}" style="--order:${i}"><div class="result-check">${row.correct?'✓':'↳'}</div><div><strong>${esc(row.label||nameOf(row.id))}</strong><span>${esc(row.answer)}${row.target?` <em>→</em> ${esc(row.target)}`:''}</span>${row.extra?`<small>${esc(row.extra)}</small>`:''}${row.removed?`<small>Removed: ${row.removed.map(esc).join(', ')}${row.redrawn?'; available cards redrawn':''}</small>`:''}</div><b>${state.result.points[row.id]?`+${state.result.points[row.id]}`:'—'}</b></div>`).join('')}</div><div class="reveal-bottom">${state.host===state.me?button(state.round>=state.total?'See the final scores ↗':'One more round →','next'):waiting('Your host will start the next round.')}<p class="micro-note">This is the part where you explain your extremely logical thinking.</p></div>`;}
function finish(){const uniques=p=>state.game==='packed'?(state.stats[p.id]?.scored||0):0;const sorted=state.game==='packed'?state.standings.map(id=>state.players.find(p=>p.id===id)):[...state.players].sort((a,b)=>b.score-a.score);const winners=state.game==='packed'?sorted.filter(p=>state.winners.includes(p.id)):sorted.filter(p=>p.score===sorted[0].score);return `<div class="final-trophy">🏆</div>`+intro(state.game==='signals'?'That’s a good connection.':winners.length===1?`${esc(winners[0].name)} takes the night!`:'Shared glory. Double the bragging rights.',state.game==='signals'?`Your crew earned ${sorted[0].score} points together. Same friends, stronger signals.`:'The scores are official. The excuses are just getting started.')+`<div class="final-scores">${sorted.map((p,i)=>`<div class="final-score ${winners.includes(p)?'winner':''}"><span class="rank">${winners.includes(p)?'✦':i+1}</span>${avatar(p,i)}<strong>${esc(p.name)} ${p.id===state.me?'<small>(you)</small>':''}${state.game==='packed'?`<small class="unique-total">${uniques(p)} scoring rounds · ${state.stats[p.id]?.zero||0} zero rounds</small>`:''}</strong><b>${p.score}<small>points</small></b></div>`).join('')}</div>`+(state.game==='packed'?`<p class="micro-note">${esc(state.endedEarly||'Completed all rounds.')} Ties use more scoring rounds, then fewer zero rounds; remaining ties share the win.</p>`:'')+(state.host===state.me?`<div class="final-actions">${button('Play again ↻','rematch')}${button('Try another game →','lobby','outline')}</div>`:waiting('Your host can start another game.'));}
function render(force=false){
 const key=phaseKey(state);if(key!==lastKey){selected=[];draft='';packedOwn=null;loneLocal={claimFirst:'',message:'',belief:'unsure',spyTarget:''};lastKey=key;try{const saved=JSON.parse(sessionStorage.getItem('afterhours-draft'));if(saved?.key===key){selected=saved.selected;draft=saved.draft;if(saved.loneLocal)loneLocal=saved.loneLocal;}}catch{} }
 if(state?.ownAnswer!==undefined&&(state.game!=='packed'||JSON.stringify(state.ownAnswer)!==packedOwn)){selected=Array.isArray(state.ownAnswer)?[...state.ownAnswer]:[state.ownAnswer];packedOwn=JSON.stringify(state.ownAnswer);}
 if(state?.game==='packed'&&state.stage==='rank'&&!state.spectator&&!selected.length)selected=state.board.map((_,i)=>i);
 const html=!state?home():state.status==='lobby'?lobby():gameScreen();
 if(force||html!==currentRender){patchHTML(app,html);currentRender=html;}
 if(pendingPhase===key)app.querySelectorAll('[data-rank-move],[data-belief],[data-action="lock-rank"],[data-action="play-spy"],[data-action="revealSpy"],#lone-claim-form button,[data-choice],[data-vote],[data-partner],[data-action="lock"],[data-action="continuePractice"],[data-action="next"],[data-action="redraw"],#answer-form button,#answer-input').forEach(el=>el.disabled=true);
 if(state)sessionStorage.setItem('afterhours-draft',JSON.stringify({key,selected,draft,loneLocal}));
 updateClock();
}
function setState(s){const previous=state;if(previous?.code===s.code&&s.revision<previous.revision)return;state=s;observePackedCommitment(s);if(s.options)gameOptions={...s.options};if(s.status==='lobby')chosen=s.selectedGame;clockOffset=s.serverTime-Date.now();render();if(previous&&phaseKey(previous)!==phaseKey(s)){tone(s.stage==='reveal'?660:440);if(['reveal','finished'].includes(s.stage))celebrate();if(s.status!=='lobby')$('#stage-content')?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}
window.setState=setState;window.getState=()=>state;window.render=render;
async function api(path,data){if(['create','start'].includes(path))await ensureAccount();const response=await fetch('/api/'+path,{method:data?'POST':'GET',headers:{...(['create','start'].includes(path)?accountHeaders():{}),...(data?{'Content-Type':'application/json'}:{}),...(session?{'Authorization':'Bearer '+session.token,'X-Room-Code':session.code}:{})},...(data?{body:JSON.stringify(data)}:{})});const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not connect. Try again.');return result;}
async function connect(){
 if(!session)return;streamController?.abort();streamController=new AbortController();const controller=streamController;
 try{const response=await fetch('/api/events',{headers:{Authorization:'Bearer '+session.token,'X-Room-Code':session.code},signal:controller.signal});if(!response.ok){const e=await response.json();throw new Error(e.error);}
  if(response.headers.get('content-type')?.includes('application/json')){
   const config=await response.json();if(config.transport!=='poll')throw new Error('Unknown transport.');
   while(session&&!controller.signal.aborted){const r=await fetch('/api/state',{headers:{Authorization:'Bearer '+session.token,'X-Room-Code':session.code},signal:controller.signal});const data=await r.json();if(!r.ok)throw new Error(data.error);setState(data.state);const label=$('#connection-label');if(label)label.textContent='Connected';await new Promise(resolve=>{const done=()=>{clearTimeout(timer);controller.signal.removeEventListener('abort',done);resolve();};const timer=setTimeout(done,config.interval||1500);controller.signal.addEventListener('abort',done,{once:true});});}return;
  }
  const label=$('#connection-label');if(label)label.textContent='Connected';const reader=response.body.getReader();const decoder=new TextDecoder();let buffer='';
  while(true){const {done,value}=await reader.read();if(done)break;buffer+=decoder.decode(value,{stream:true});let end;while((end=buffer.indexOf('\n\n'))>=0){const line=buffer.slice(0,end);buffer=buffer.slice(end+2);if(line.startsWith('data: '))setState(JSON.parse(line.slice(6)));}}
 }catch(e){if(e.name==='AbortError')return;}
 if(controller.signal.aborted||!session)return;const label=$('#connection-label');if(label)label.textContent='Reconnecting…';reconnectTimer=setTimeout(async()=>{try{const r=await api('state');setState(r.state);connect();}catch(e){if(/not found|invalid|expired/i.test(e.message)){clearSession();render();toast(e.message);}else connect();}},2500);
}
function saveSession(result){session={code:result.code,token:result.token};sessionStorage.setItem('afterhours-session',JSON.stringify(session));setState(result.state);closeModal();connect();window.scrollTo(0,0);}
function clearSession(){session=null;state=null;streamController?.abort();clearTimeout(reconnectTimer);sessionStorage.removeItem('afterhours-session');sessionStorage.removeItem('afterhours-draft');history.replaceState({},'',location.pathname);}
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>el.classList.remove('visible'),4500);}
function tone(freq=520){if(!sound)return;try{audioContext??=new (window.AudioContext||window.webkitAudioContext)();audioContext.resume();const o=audioContext.createOscillator(),g=audioContext.createGain();o.type='sine';o.frequency.setValueAtTime(freq,audioContext.currentTime);o.frequency.exponentialRampToValueAtTime(freq*1.5,audioContext.currentTime+.14);g.gain.setValueAtTime(.06,audioContext.currentTime);g.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.3);o.connect(g);g.connect(audioContext.destination);o.start();o.stop(audioContext.currentTime+.3);}catch{}}
function celebrate(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;$('#confetti').innerHTML=Array.from({length:26},(_,i)=>`<i style="--x:${Math.random()*100}%;--r:${Math.random()*720}deg;--delay:${Math.random()*.5}s;background:${['#bda4ed','#ef926c','#cadc82','#f1c953'][i%4]}"></i>`).join('');setTimeout(()=>$('#confetti').innerHTML='',3500);}
function updateClock(){const el=$('#timer');if(!el||!state?.deadline)return;const seconds=Math.max(0,Math.ceil((state.deadline-Date.now()-clockOffset)/1000));el.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;el.classList.toggle('urgent',seconds<=10);}
setInterval(updateClock,250);
let modalOpener=null;
function openModal(type,id){
 modalOpener=document.activeElement;modal={type,id,phaseId:state?.phaseId};let content='';
 if(type==='account')content=accountMarkup(esc,gameOptions.packedCustom||[]);
 if(type==='game'||type==='rules'){const g=games[id];content=`<div class="modal-art ${g.color}">${art(id)}</div><div class="eyebrow">${g.category} · ${g.duration}</div><h2>${g.name}</h2><p class="modal-tagline">${g.tagline}</p><ol class="rule-list">${g.rules.map((r,i)=>`<li><span>0${i+1}</span><p>${r}</p></li>`).join('')}</ol>${type==='game'?`${optionsUI(id)}<div class="modal-actions">${button('Host this game ↗','host-this','primary',`data-id="${id}"`)}${button('Try with practice bots','practice','outline',`data-id="${id}"`)}</div><p class="micro-note">${id==='twins'?'6 or 8':`${g.min}–${g.max}`} players · Own screens · No accounts</p>`:button('Got it. Let’s play.','close','primary full')}`;}
 else if(type==='host'||type==='join')content=`<span class="modal-symbol">${type==='host'?'✳':'↗'}</span><div class="eyebrow">${type==='host'?'YOU BRING THE PEOPLE':'MAKE YOUR ENTRANCE'}</div><h2>${type==='host'?'Start something fun.':'Your seat is waiting.'}</h2><p>${type==='host'?'Create a room and invite your favourite humans.':'Enter the code from your host to join the room.'}</p><form id="room-form"><label for="player-name">What should we call you?</label><input id="player-name" name="name" maxlength="20" placeholder="Your name" value="${esc(localStorage.getItem('afterhours-name')||'')}" required autocomplete="nickname">${type==='join'?`<label for="room-code">Room code</label><input id="room-code" name="code" maxlength="5" minlength="5" placeholder="ABCDE" value="${esc(id||'')}" required autocomplete="off">`:''}<div class="form-error" role="alert"></div>${button(type==='host'?'Create my room →':'Join the room →','noop','primary full','type="submit"')}</form><p class="micro-note">No account. No download. Just a good time.</p>`;
 else if(type==='how')content=`<span class="modal-symbol">☺</span><div class="eyebrow">FROM “HEY” TO “ONE MORE ROUND”</div><h2>Your next game night,<br>sorted.</h2><ol class="rule-list"><li><span>01</span><p><strong>Get your people.</strong> Host a room, then share its link or five-character code. Each person uses their own phone or laptop.</p></li><li><span>02</span><p><strong>Pick your kind of chaos.</strong> Six games, all explained in under a minute. Private clues and votes stay on your screen.</p></li><li><span>03</span><p><strong>Make a night of it.</strong> Talk in person or on your own voice call. We handle the timers, reveals, and scores.</p></li></ol><div class="info-note">Playing on this local server? Everyone should use the same Wi-Fi. The room’s invite link will use your computer’s network address.</div>${button('Let’s do this ↗','host','primary full')}`;
 else if(type==='invite'){content=`<span class="modal-symbol">↗</span><div class="eyebrow">GOOD NIGHTS START WITH A TEXT</div><h2>Bring your people.</h2><div class="room-code-card"><span>YOUR ROOM CODE</span><strong>${state.code}</strong></div><label for="invite-link">Share this link</label><input id="invite-link" readonly value="${esc(inviteLink())}">${button('Copy invite link ↗','copy','primary full')}<p class="micro-note">On a hosted site, friends can join from anywhere. If you are running locally, use the same Wi-Fi and keep the server running.</p>`;}
 else if(type==='redraw')content=`<span class="modal-symbol">↻</span><h2>Replace your available cards?</h2><p>This changes the nine remaining words in your own hand. The three removed cards stay crossed out in their original positions. You can do this once per round.</p><div class="modal-actions">${button('Use my redraw','redraw')}${button('Keep these words','close','outline')}</div>`;
 else if(type==='change-question')content=`<h2>Try a different question?</h2><p>This clears all saved rankings and restarts the ranking timer for everyone. It uses one of the group's three changes for this round.</p>${button('Change for everyone','changeQuestion')}${button('Keep this question','close','outline')}`;
 else if(type==='end-packed')content=`<h2>End with completed scores?</h2><p>The unfinished round will not be scored. Completed rounds stay on the scoreboard.</p>${button('End game','endPacked')}${button('Keep waiting','close','outline')}`;
 else if(type==='return')content=`<span class="modal-symbol">↩</span><h2>Head back to the lounge?</h2><p>This ends the current game for everyone. You can choose another game together.</p><div class="modal-actions">${button('Back to lounge','lobby')}${button('Keep playing','close','outline')}</div>`;
 modalRoot.innerHTML=`<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-label="${type==='game'||type==='rules'?games[id].name:'After Hours'}"><button class="modal-close" data-action="close" aria-label="Close dialog">×</button>${content}</section></div>`;
 document.body.classList.add('modal-open');setTimeout(()=>modalRoot.querySelector('input:not([readonly]), .modal-actions button, .modal-close')?.focus(),30);
}
function closeModal(){modal=null;modalRoot.innerHTML='';document.body.classList.remove('modal-open');modalOpener?.focus();}
function inviteLink(){const host=['localhost','127.0.0.1','0.0.0.0'].includes(location.hostname)?network[0]||location.origin:location.origin;return `${host}/?room=${state.code}`;}
async function copyInvite(){const link=inviteLink();try{if(!navigator.clipboard)throw new Error();await navigator.clipboard.writeText(link);toast('Invite link copied. Send it to your people!');}catch{openModal('invite');$('#invite-link').select();toast('Select and copy the invite link.');}}
async function action(name,value){if(pendingPhase)return;const snapshot=state;pendingPhase=phaseKey(snapshot);render();try{const r=await api('action',{action:name,value,requestId:crypto.randomUUID?crypto.randomUUID():String(Date.now())+Math.random().toString(36).slice(2),round:snapshot.round,stage:snapshot.stage,game:snapshot.game,phaseId:snapshot.phaseId});if(r.state)setState(r.state);}finally{pendingPhase=null;render(true);}}
document.addEventListener('input',e=>{if(e.target.dataset.loneField){loneLocal[e.target.dataset.loneField]=e.target.value;sessionStorage.setItem('afterhours-draft',JSON.stringify({key:phaseKey(state),selected,draft,loneLocal}));}if(e.target.id==='answer-input'){draft=e.target.value;sessionStorage.setItem('afterhours-draft',JSON.stringify({key:phaseKey(state),selected,draft,loneLocal}));}if(['room-code','quick-code'].includes(e.target.id))e.target.value=e.target.value.toUpperCase();});
document.addEventListener('change',async e=>{
 if(e.target.dataset.loneField){loneLocal[e.target.dataset.loneField]=e.target.value;render();return;}
 const key=e.target.dataset.option;if(!key)return;
 const previous={...gameOptions};gameOptions={...gameOptions,[key]:['packedAnonymous','packedSoftLanding'].includes(key)?e.target.value==='true':['packedPack'].includes(key)?e.target.value:Number(e.target.value)};
 try{if(state?.status==='lobby'){const result=await api('configure',{game:chosen,options:gameOptions});setState(result.state);}else if(modal?.type==='game'){const markup=document.createElement('template');markup.innerHTML=optionsUI(modal.id);patchHTML(modalRoot.querySelector('.game-options'),markup.content.firstElementChild.innerHTML);}}
 catch(error){gameOptions=previous;render(true);toast(error.message);}
});
document.addEventListener('click',async e=>{
 const dropdownToggle = e.target.closest('[data-toggle-dropdown]');
 if (dropdownToggle) {
  e.preventDefault();
  const dropdown = dropdownToggle.closest('.custom-select');
  const wasOpen = dropdown?.classList.contains('is-open');
  document.querySelectorAll('.custom-select.is-open').forEach(d => {
   d.classList.remove('is-open');
   d.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen && dropdown) {
   dropdown.classList.add('is-open');
   dropdownToggle.setAttribute('aria-expanded', 'true');
  }
  return;
 }
 const dropdownOpt = e.target.closest('[data-select-dropdown]');
 if (dropdownOpt) {
  e.preventDefault();
  const dropdownId = dropdownOpt.dataset.selectDropdown;
  const val = dropdownOpt.dataset.value;
  const dropdown = dropdownOpt.closest('.custom-select');
  if (dropdown) {
   dropdown.classList.remove('is-open');
   dropdown.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
  }
  const nativeSelect = document.getElementById(dropdownId);
  if (nativeSelect) {
   nativeSelect.value = val;
   if (nativeSelect.dataset.loneField) {
    loneLocal[nativeSelect.dataset.loneField] = val;
    sessionStorage.setItem('afterhours-draft', JSON.stringify({ key: phaseKey(state), selected, draft, loneLocal }));
   }
   nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
  }
  tone(480);
  render();
  return;
 }
 if (!e.target.closest('.custom-select')) {
  document.querySelectorAll('.custom-select.is-open').forEach(d => {
   d.classList.remove('is-open');
   d.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
  });
 }
 const target=e.target.closest('[data-rank-move],[data-belief],[data-action],[data-game],[data-filter],[data-rules],[data-choice],[data-vote],[data-partner],[data-select-game],[data-select-spy]');
 if(!target){if(e.target.classList.contains('modal-backdrop'))closeModal();return;}
 if(target.disabled)return;
 if(target.dataset.action==='noop')return;
 e.preventDefault();
 try{
  if('rankMove' in target.dataset){const from=Number(target.dataset.rankMove),to=from+Number(target.dataset.direction);[selected[from],selected[to]]=[selected[to],selected[from]];render();return;}
  if(target.dataset.selectSpy){loneLocal.spyTarget=target.dataset.selectSpy;render();return;}
  if(target.dataset.belief){loneLocal.belief=target.dataset.belief;render();return;}
  if(target.dataset.game){chosen=target.dataset.game;openModal('game',chosen);return;}
  if(target.dataset.rules){openModal('rules',target.dataset.rules);return;}
  if(target.dataset.filter){filter=target.dataset.filter;render();return;}
  if(target.dataset.selectGame){const result=await api('configure',{game:target.dataset.selectGame,options:gameOptions});setState(result.state);return;}
  if('choice' in target.dataset){const val=Number(target.dataset.choice);const multi=state.game==='borrowed'&&['sabotage','clue'].includes(state.stage);if(multi){if(selected.includes(val))selected=selected.filter(x=>x!==val);else if(selected.length<3)selected.push(val);else toast('Choose up to three cards. Tap a selected card to remove it.');}else selected=[val];tone(320);render();return;}
  if('vote' in target.dataset){selected=[target.dataset.vote==='true'];render();return;}
  if(target.dataset.partner){selected=[target.dataset.partner];render();return;}
  const a=target.dataset.action;
  if(a==='account'){await refreshAccount();openModal('account');return;}
  if(await accountAction(a,target,{redraw:()=>openModal('account'),toast,usePack:async questions=>{const next={...gameOptions,packedPack:'custom',packedCustom:questions,packedRounds:Math.min(gameOptions.packedRounds,questions.length)};if(state){if(state.status!=='lobby'||state.host!==state.me)throw new Error('Use saved packs in your lounge before starting a game.');const r=await api('configure',{game:'packed',options:next});setState(r.state);}gameOptions=next;chosen='packed';closeModal();if(!state)openModal('game','packed');else render();toast('Saved pack loaded.');}}))return;
  if(a==='reload')location.reload();
  else if(a==='home'){if(state){toast('You’re in a room. Use “Back to the lounge” or “Leave room” to finish.');return;}window.scrollTo({top:0,behavior:'smooth'});}
  else if(a==='browse')$('#collection').scrollIntoView({behavior:'smooth'});
  else if(a==='host'||a==='join'||a==='how'||a==='invite'||a==='return')openModal(a);
  else if(a==='close')closeModal();
  else if(a==='confirm-redraw')openModal('redraw');
  else if(a==='host-this'){chosen=target.dataset.id;openModal('host');}
  else if(a==='practice'){target.disabled=true;chosen=target.dataset.id;const result=await api('create',{name:localStorage.getItem('afterhours-name')||'You',practice:true,game:chosen,options:gameOptions});saveSession(result);tone();}
  else if(a==='start'||a==='rematch'){target.disabled=true;const result=await api('start',{game:a==='rematch'?state.game:chosen,options:gameOptions});setState(result.state);window.scrollTo(0,0);}
  else if(a==='lock-rank')await action('submit',selected);
  else if(a==='take-seat'){const result=await api('take-seat',{});setState(result.state);}
  else if(a==='confirm-change-question')openModal('change-question');
  else if(a==='changeQuestion'){if(modal?.phaseId!==state.phaseId)throw new Error('The question has already changed. Close this dialog.');closeModal();await action('changeQuestion');}
  else if(a==='confirm-end-packed')openModal('end-packed');
  else if(a==='endPacked'){closeModal();await action('endPacked');}
  else if(a==='save-packed-custom'){
   const questions=$('#packed-custom').value.split(/\r?\n/).filter(line=>line.trim()).map(line=>{const [question,...options]=line.split('|').map(s=>s.trim());return {question,options};});
   const proposed={...gameOptions,packedCustom:questions};
   const result=await api(state?.status==='lobby'?'configure':'validate-options',state?.status==='lobby'?{game:chosen,options:proposed}:{options:proposed});
   gameOptions=result.options||result.state.options;
   if(result.state)setState(result.state);else{const markup=document.createElement('template');markup.innerHTML=optionsUI(modal.id);patchHTML(modalRoot.querySelector('.game-options'),markup.content.firstElementChild.innerHTML);}
   toast('Questions saved.');
  }
  else if(a==='play-spy')await action('spyTarget',loneLocal.spyTarget);
  else if(a==='revealSpy')await action('revealSpy');
  else if(a==='lock'){target.disabled=true;const multi=state.game==='borrowed'&&['sabotage','clue'].includes(state.stage);await action('submit',multi?selected:selected[0]);tone();}
  else if(['next','skipTalk','redraw','continuePractice'].includes(a)){target.disabled=true;if(a==='redraw'){if(modal?.phaseId!==state.phaseId)throw new Error('The round has moved on. Close this dialog.');closeModal();selected=[];}await action(a);}
  else if(a==='lobby'){closeModal();await action('lobby');window.scrollTo(0,0);}
  else if(a==='leave'){await api('leave',{});clearSession();render();}
  else if(a==='copy')await copyInvite();
  else if(a==='sound'){sound=!sound;localStorage.setItem('afterhours-sound',String(sound));tone();render();}
 }catch(err){toast(err.message);target.disabled=false;}
});
document.addEventListener('submit',async e=>{
 e.preventDefault();const form=e.target,submit=form.querySelector('button[type="submit"]');const values=new FormData(form);
 try{
  if(['account-form','save-pack-form'].includes(form.id)){if(submit)submit.disabled=true;const message=await accountSubmit(form,e.submitter,gameOptions.packedCustom||[]);openModal('account');toast(message);return;}
  if(form.id==='quick-join'){openModal('join',values.get('code'));return;}
  if(submit)submit.disabled=true;
  if(form.id==='room-form'){const name=values.get('name').trim();const result=await api(modal.type==='join'?'join':'create',{name,code:values.get('code'),game:chosen,options:gameOptions});localStorage.setItem('afterhours-name',name);saveSession(result);}
  if(false&&form.id==='lone-claim-form'){if(values.get('first')==='')throw new Error('Choose an option for your claim.');await action('claim',{first:Number(values.get('first')),message:String(values.get('message')||'')});}
  if(form.id==='answer-form')await action('submit',values.get('answer'));
 }catch(err){const error=form.querySelector('.form-error');if(error)error.textContent=err.message;else toast(err.message);}finally{if(submit)submit.disabled=false;}
});
document.addEventListener('keydown',e=>{
 if (e.key === 'Escape') {
  document.querySelectorAll('.custom-select.is-open').forEach(d => {
   d.classList.remove('is-open');
   d.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
  });
 }
 if(!modal)return;if(e.key==='Escape')closeModal();if(e.key==='Tab'){const focusable=[...modalRoot.querySelectorAll('button:not([disabled]),input,select:not([disabled]),a[href]')];const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
// Drag & Drop Reordering for Ranking
let touchDrag = null;

function getRankItemUnderPointer(clientY) {
 const items = [...document.querySelectorAll('.rank-list .rank-item')];
 for (const it of items) {
  const rect = it.getBoundingClientRect();
  if (clientY >= rect.top && clientY <= rect.bottom) return it;
 }
 return null;
}

document.addEventListener('pointerdown', e => {
 const handle = e.target.closest('.rank-drag-handle');
 if (!handle) return;
 const item = handle.closest('.rank-item');
 if (!item || item.getAttribute('draggable') !== 'true') return;
 const fromPos = Number(item.dataset.rankPos);
 if (isNaN(fromPos)) return;

 touchDrag = { fromPos, itemEl: item, pointerId: e.pointerId };
 try { handle.setPointerCapture(e.pointerId); } catch {}
 item.classList.add('is-dragging');
});

document.addEventListener('pointermove', e => {
 if (!touchDrag || e.pointerId !== touchDrag.pointerId) return;
 const targetItem = getRankItemUnderPointer(e.clientY);
 
 document.querySelectorAll('.rank-item.drag-target').forEach(el => el.classList.remove('drag-target'));
 if (targetItem && targetItem !== touchDrag.itemEl) {
  targetItem.classList.add('drag-target');
 }
});

function endTouchDrag(e) {
 if(e.type==='pointercancel'){touchDrag?.itemEl.classList.remove('is-dragging');touchDrag=null;document.querySelectorAll('.drag-target').forEach(el=>el.classList.remove('drag-target'));return;}
 if (!touchDrag || e.pointerId !== touchDrag.pointerId) return;
 if(state?.game==='packed'&&(!state.canAct||state.stage!=='rank')){touchDrag=null;return;}
 const from = touchDrag.fromPos;
 touchDrag.itemEl.classList.remove('is-dragging');
 
 const targetItem = getRankItemUnderPointer(e.clientY);
 document.querySelectorAll('.rank-item.drag-target').forEach(el => el.classList.remove('drag-target'));
 
 const handle = touchDrag.itemEl.querySelector('.rank-drag-handle');
 try { handle?.releasePointerCapture(e.pointerId); } catch {}
 touchDrag = null;

 if (targetItem) {
  const to = Number(targetItem.dataset.rankPos);
  if (!isNaN(to) && from !== to && selected[from] !== undefined && selected[to] !== undefined) {
   const [moved] = selected.splice(from, 1);
   selected.splice(to, 0, moved);
   tone(400);
   render();
  }
 }
}

document.addEventListener('pointerup', endTouchDrag);
document.addEventListener('pointercancel', endTouchDrag);

let htmlDragFrom = null;

document.addEventListener('dragstart', e => {
 const item = e.target.closest('.rank-item');
 if (!item || item.getAttribute('draggable') !== 'true') return;
 htmlDragFrom = Number(item.dataset.rankPos);
 e.dataTransfer.setData('text/plain', String(htmlDragFrom));
 e.dataTransfer.effectAllowed = 'move';
 item.classList.add('is-dragging');
});

document.addEventListener('dragover', e => {
 if (htmlDragFrom === null) return;
 const targetItem = e.target.closest('.rank-item');
 if (!targetItem) return;
 e.preventDefault();
 e.dataTransfer.dropEffect = 'move';
 document.querySelectorAll('.rank-item.drag-target').forEach(el => el.classList.remove('drag-target'));
 if (Number(targetItem.dataset.rankPos) !== htmlDragFrom) {
  targetItem.classList.add('drag-target');
 }
});

document.addEventListener('dragleave', e => {
 const targetItem = e.target.closest('.rank-item');
 if (targetItem && !targetItem.contains(e.relatedTarget)) {
  targetItem.classList.remove('drag-target');
 }
});

document.addEventListener('drop', e => {
 if (htmlDragFrom === null) return;
 const targetItem = e.target.closest('.rank-item');
 document.querySelectorAll('.rank-item.drag-target').forEach(el => el.classList.remove('drag-target'));
 if (!targetItem) { htmlDragFrom = null; return; }
 e.preventDefault();
 
 const from = htmlDragFrom;
 const to = Number(targetItem.dataset.rankPos);
 htmlDragFrom = null;

 if (!isNaN(to) && from !== to && selected[from] !== undefined && selected[to] !== undefined) {
  const [moved] = selected.splice(from, 1);
  selected.splice(to, 0, moved);
  tone(400);
  render();
 }
});

document.addEventListener('dragend', () => {
 htmlDragFrom = null;
 document.querySelectorAll('.rank-item.is-dragging, .rank-item.drag-target').forEach(el => {
  el.classList.remove('is-dragging', 'drag-target');
 });
});

const seatLink=new URLSearchParams(location.hash.slice(1)).get('seat');
if(seatLink){const [code,token]=seatLink.split('.');if(/^[A-Z2-9]{5}$/.test(code)&&/^[a-f0-9-]{36}$/.test(token)){session={code,token};sessionStorage.setItem('afterhours-session',JSON.stringify(session));}history.replaceState({},'',location.pathname+location.search);}
setInterval(()=>{if(session&&state?.game==='packed')api('presence',{}).catch(()=>{});},5000);
async function init(){try{await initAccount();[games,{addresses:network},optionCatalog]=await Promise.all([api('games'),api('network'),api('options')]);gameOptions={...optionCatalog.defaults};if(session){try{const r=await api('state');setState(r.state);connect();}catch{clearSession();render();toast('Your previous room has ended. Start a fresh one.');}}else render();const room=new URLSearchParams(location.search).get('room');if(room&&!session)openModal('join',room.toUpperCase());}catch{app.innerHTML='<main class="offline"><h1>The lounge is taking a breather.</h1><p>Start the server with START GAMES.cmd, then refresh this page.</p><button data-action="reload">Try again</button></main>';}}
window.addEventListener('error', e => {
 if (e.target && e.target.tagName === 'IMG' && (e.target.classList.contains('card-option-img') || e.target.classList.contains('rank-thumb-img') || e.target.classList.contains('reveal-option-img') || e.target.classList.contains('claim-thumb-img') || e.target.classList.contains('private-rank-thumb'))) {
  if (e.target.parentElement) e.target.parentElement.style.display = 'none';
 }
}, true);
init();
