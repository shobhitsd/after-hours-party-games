// Server-only Updraft library: the answer bank (lib/updraft-bank/, one file per prompt) and the
// hidden answers (lib/hidden-puzzles.js). Tiers are editorial, not measured frequencies.
import {randomInt} from 'node:crypto';
import bank from './updraft-bank/index.js';
import rows from './hidden-puzzles.js';
import {normalize,compileCategory} from './hidden-bank-tools.js';
export {normalize};

const compiled=bank.map(compileCategory);
export const prompts=compiled.map(c=>c.prompt);
const byId=new Map(prompts.map(p=>[p.id,p]));
export const promptById=id=>byId.get(id);
export const bankStats={categories:prompts.length,answers:prompts.reduce((n,p)=>n+p.answers.length,0)};

// Specialist prompts. Every round offers one of these beside one everyday prompt, so a player
// who has never watched basketball can always choose "Name a fruit" instead.
const TRIVIA=new Set(['nba_player','nba_team','cricketer','cricket_team','footballer','football_club','tennis_player','f1_driver','olympian','fighter','us_sports_team','martial_art',
 'bollywood_movie','bollywood_actor','hollywood_movie','hollywood_actor','tv_show','animated_movie','disney_character','cartoon_character','superhero','director','anime','pokemon','south_indian_movie',
 'band','singer','indian_singer','bollywood_song','composer','author','book','harry_potter','star_wars','mythology','indian_epic','shakespeare','musical',
 'scientist','world_leader','us_president','indian_leader','programming_language','car_model','video_game','element','space',
 'dog_breed','dinosaur','cheese','cocktail','pasta_noodle','airline','mountain','island','capital','us_state','indian_state','currency','mythical_creature','gem','metal',
 // Added 23 November 2026.
 'cricket_term','stadium','indian_athlete','golfer','nfl_player','mlb_player','chess',
 'south_indian_actor','indian_tv_show','tv_character','movie_character','tolkien','got','game_character','detective','villain',
 'english_song','kpop','comedian','painter','painting','museum','philosopher','font',
 'monarch','explorer','empire','battle','national_park','university','publication','business_leader',
 'cat_breed','horse_breed','collective_noun','compound','phobia']);
export const isTrivia=id=>TRIVIA.has(id);
const CLASSIC=['fruit','animal','country','instrument','bird','flower','vegetable','food','sport','color'];

// What a run stores about a prompt. The (large) answer list is looked up from the bank at move
// time; it is deliberately NOT copied into every player's saved flight.
export const promptRef=p=>({id:p.id,title:p.title,icon:p.icon,note:p.note});
export const roundsFrom=ids=>Array.from({length:5},(_,r)=>[promptRef(byId.get(ids[r*2])),promptRef(byId.get(ids[r*2+1]))]);
// Letters each prompt can supply without relying on a deep cut.
const reach=new Map(prompts.map(p=>[p.id,new Set(p.answers.filter(a=>a.points<40).flatMap(a=>[...a.key]))]));

export const puzzles=rows.map(([id,answer,category,explanation,hint,aliases=[]])=>({id,canonical:normalize(answer),answer,category,explanation,hint,version:2,aliases:aliases.map(a=>normalize(a).replace(/^THE/,''))}));
export const puzzleById=id=>puzzles.find(p=>p.id===id);

// Deals five rounds of (everyday, specialist) prompts for one flight. `choose(n)` returns an
// integer in [0,n); production uses a CSPRNG, tests inject a fixed chooser. Every letter of the
// hidden answer must be reachable from at least two of the ten prompts.
export function dealRounds(puzzle,choose=n=>randomInt(n)){
 const letters=[...new Set(puzzle.canonical)],everyday=prompts.filter(p=>!TRIVIA.has(p.id)),trivia=prompts.filter(p=>TRIVIA.has(p.id));
 if(everyday.length>=5&&trivia.length>=5)for(let attempt=0;attempt<24;attempt++){
  // Rotating the pool makes a retry differ even under a constant test chooser.
  const draw=pool=>{const rest=[...pool];rest.push(...rest.splice(0,(attempt*7)%rest.length));return Array.from({length:5},()=>rest.splice(choose(rest.length),1)[0]);};
  const a=draw(everyday),b=draw(trivia),dealt=[...a,...b];
  if(letters.every(l=>dealt.filter(p=>reach.get(p.id).has(l)).length>=2))return a.map((p,i)=>choose(2)?[promptRef(b[i]),promptRef(p)]:[promptRef(p),promptRef(b[i])]);
 }
 return roundsFrom(CLASSIC);
}

export function validateLibrary(library=puzzles){
 const errors=[],ids=new Set(),answers=new Set();
 for(const [i,c] of compiled.entries())for(const issue of c.issues)errors.push(`${bank[i]?.id}: ${issue}`);
 if(new Set(prompts.map(p=>p.id)).size!==prompts.length)errors.push('duplicate prompt id');
 for(const id of CLASSIC)if(!byId.has(id))errors.push(`missing classic prompt ${id}`);
 for(const id of TRIVIA)if(!byId.has(id))errors.push(`unknown specialist prompt ${id}`);
 if(prompts.filter(p=>TRIVIA.has(p.id)).length<5||prompts.filter(p=>!TRIVIA.has(p.id)).length<5)errors.push('need five everyday and five specialist prompts');
 for(const p of prompts){
  if(p.answers.length<30)errors.push(`${p.id}: only ${p.answers.length} answers`);
  if(!p.answers.some(a=>a.points===5))errors.push(`${p.id}: no common answers`);
  const keys=new Set();for(const a of p.answers)for(const key of [a.key,...a.aliases]){if(keys.has(key))errors.push(`${p.id}: ${key} is ambiguous`);keys.add(key);}
 }
 for(const p of library){
  const letters=new Set(p.canonical),words=p.answer.split(/[ -]/).map(normalize);
  if(ids.has(p.id)||answers.has(p.canonical))errors.push(`${p.id}: duplicate`);ids.add(p.id);answers.add(p.canonical);
  if(/[^A-Za-z -]/.test(p.answer))errors.push(`${p.id}: answer may only contain letters, spaces and hyphens`);
  if(p.canonical.length<7||p.canonical.length>16||letters.size<5||letters.size>12||words.some(w=>w.length>12))errors.push(`${p.id}: hidden length/distinct letters`);
  if(!p.category||!p.explanation||!p.hint)errors.push(`${p.id}: category, explanation and hint are required`);
  const clue=normalize(p.hint||'');for(const word of words)if(word.length>3&&clue.includes(word))errors.push(`${p.id}: hint gives away ${word}`);
  // Any deal must be able to satisfy coverage: plenty of prompts on both sides reach each letter.
  for(const letter of letters){const sources=prompts.filter(q=>reach.get(q.id).has(letter));if(sources.length<12)errors.push(`${p.id}: coverage ${letter}`);}
 }
 return errors;
}
