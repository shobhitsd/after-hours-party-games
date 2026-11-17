// Deliberately public teaching example. Never submitted to account/scoring APIs.
const target='PAPER PLANE',normalize=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z]/g,'');
const pairs=[
 [['fruit','Name a fruit','Papaya|Apple|Banana|Pear|Grape'],['animal','Name a mammal','Panda|Elephant|Cat|Dog|Rabbit']],
 [['instrument','Name a musical instrument','Piano|Guitar|Flute|Harp'],['country','Name a country','India|Japan|Nepal|France']],
 [['flower','Name a flowering plant','Rose|Lily|Daisy|Tulip'],['bird','Name a bird','Raven|Parrot|Owl|Eagle']],
 [['vegetable','Name a culinary vegetable','Pea|Carrot|Potato|Onion'],['food','Name a prepared food','Pancake|Pizza|Bread|Pasta']],
 [['color','Name a colour','Purple|Blue|Red|Green'],['sport','Name a sport','Tennis|Cricket|Golf|Football']]
];
const promptViews=index=>(pairs[index]||[]).map(([id,title,words])=>({id,title,sample:words.split('|')[0]}));
export function createTutorial(){return update({id:'tutorial-'+Date.now(),mode:'tutorial',day:'Tutorial',revision:0,status:'active',phase:'answer',expires:Date.now()+86400000,air:6,wrong:0,rarity:0,bonus:0,history:[],tested:[],lastGuess:null});}
function update(r){
 const ended=r.status!=='active';r.score=r.rarity+r.bonus;r.category='Something that flies';r.lengths=[5,5];r.round=Math.min(5,r.history.length+(r.phase==='answer'?1:0));
 r.mask=[...target].map(c=>c===' '||r.tested.includes(c)||ended?c:'_').join('');r.prompts=r.phase==='answer'?promptViews(r.history.length):[];r.nextPrompts=r.phase==='decision'&&r.history.length<5?promptViews(r.history.length):[];
 r.available=r.phase==='probe'?[...new Set(normalize(r.history.at(-1).answer))].filter(c=>!r.tested.includes(c)):[];
 if(ended){r.answer=target;r.explanation='A paper plane! Fold a sheet, give it a little lift, and see how far it goes.';r.puzzleId='tutorial-example';}
 return r;
}
export function tutorialMove(previous,action,value,prompt){
 const r=structuredClone(previous);if(r.status!=='active')throw new Error('This tutorial flight has finished. Start another from the launchpad.');
 const phase=expected=>{if(r.phase!==expected)throw new Error('Finish this step first.');};
 const end=status=>{r.status=status;r.phase='finished';};
 if(action==='answer'){
  phase('answer');const p=pairs[r.history.length].find(p=>p[0]===prompt);if(!p)throw new Error('Choose a prompt first.');
  const word=p[2].split('|').find(w=>normalize(w)===normalize(value));if(!word)throw new Error('For this guided example, try '+p[2].split('|').slice(0,3).join(', ')+'.');
  if(r.history.some(h=>normalize(h.answer)===normalize(word)))throw new Error('Try a word you have not used yet.');
  const points=word==='Papaya'?10:5,available=[...new Set(normalize(word))].filter(l=>!r.tested.includes(l));
  r.rarity+=points;r.history.push({prompt:p[1],answer:word,points,tier:points===10?'Uncommon':'Common',letter:null,result:available.length?'pending':'echo'});r.phase=available.length?'probe':'decision';
 }else if(action==='probe'){
  phase('probe');if(!r.available.includes(value))throw new Error('Choose an unused letter from your answer.');r.tested.push(value);const h=r.history.at(-1);h.letter=value;h.result=target.includes(value)?'hit':'miss';if(h.result==='miss')r.air--;r.phase='decision';if(!r.air)end('bust');
 }else if(action==='skip-probe'){phase('probe');r.history.at(-1).result='skipped';r.phase='decision';}
 else if(action==='skip-answer'){phase('answer');r.history.push({prompt:'Round skipped',answer:null,points:0,letter:null,result:'skipped'});r.phase='decision';}
 else if(action==='next'){phase('decision');if(r.history.length>=5)throw new Error('All rounds are complete.');r.phase='answer';r.lastGuess=null;}
 else if(action==='solve'){
  phase('decision');if(r.wrong>=3)throw new Error('All guesses have been used.');if(!normalize(value))throw new Error('Type your guess first.');
  if(normalize(value).replace(/^THE/,'')===normalize(target)){r.bonus=100+20*r.air+50*(5-r.history.length);end('solved');}else{r.wrong++;r.air=Math.max(0,r.air-2);r.lastGuess=String(value).slice(0,100);if(!r.air)end('bust');else if(r.history.length===5&&r.wrong===3)end('unsolved');}
 }else if(action==='finish'){phase('decision');if(r.history.length!==5)throw new Error('Complete the five rounds first.');end('unsolved');}
 else if(action==='abandon')end('abandoned');else throw new Error('Unknown tutorial action.');
 r.revision++;return update(r);
}
export function tutorialTip(r,selected){
 if(r.status!=='active')return 'Ready for takeoff? Start a free flight with a fresh mystery. Tutorial points stay in this example.';
 if(r.phase==='answer'){const p=r.prompts.find(p=>p.id===selected)||r.prompts[0];return `Try “${p.sample}” for “${p.title}”. Your answer gives you letters to launch at the mystery.`;}
 if(r.phase==='probe')return r.history.length===1?'Launch P to reveal every P. Each letter you uncover helps the mystery take shape.':'Choose any unused letter. A miss costs one Fuel; a hit reveals every copy.';
 return r.history.length===1?'Three Ps, one little flying object. You can guess now, or select Next round to collect more letters.':r.history.length===5?'Here is your final nudge: fold a sheet of paper and send it flying. Try “paper plane”.':'Ready to guess? You can try the full answer, or keep collecting letters in the next round.';
}
export function restoreTutorial(raw){try{const r=JSON.parse(raw);if(r?.mode!=='tutorial'||!Array.isArray(r.history)||r.history.length>5||!Array.isArray(r.tested)||!['answer','probe','decision','finished'].includes(r.phase)||!Number.isFinite(r.air))return null;return update(r);}catch{return null;}}
