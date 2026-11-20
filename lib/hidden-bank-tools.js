// Shared, dependency-free helpers for the Updraft answer bank. Server-only.
// `normalize` is the single definition of answer identity: case, accents, spaces and
// punctuation never matter; "&" and a free-standing "+" read as "and"; digits are kept so
// "3 Idiots" ≠ "Idiots". A "+" or "#" attached to a word is spoken, so C++, C# and Disney+
// equal "C plus plus", "C sharp" and "Disney plus" instead of collapsing to "C" and "Disney".
export const normalize = value => String(value).normalize('NFD').replace(/[̀-ͯ]/g,'')
 .replace(/([A-Za-z0-9])\+\+/g,'$1 plus plus ').replace(/([A-Za-z0-9])\+/g,'$1 plus ').replace(/([A-Za-z0-9])#/g,'$1 sharp ')
 .replace(/[&+]/g,' and ').toUpperCase().replace(/[^A-Z0-9]/g,'');
export const TIERS = [['common','Common',5],['uncommon','Uncommon',10],['rare','Rare',20],['deep','Deep cut',40]];
// Answers need two characters (digit-only titles such as "1917" are fine); an alias may be one letter ("R" for R language) — it is only
// ever matched exactly, because typo-tolerance starts at five letters.
export const KEY_MIN = 2, KEY_MAX = 30, ALIAS_MIN = 1;
const list = text => String(text||'').split('|').map(word=>word.replace(/\s+/g,' ').trim()).filter(Boolean);

// Turns one authored category file into the runtime prompt. Authoring mistakes are
// collected in `issues` (never thrown) so the linter can report all of them at once;
// the runtime keeps the first, most common spelling of any duplicate.
export function compileCategory(def){
 const issues=[],answers=[],byKey=new Map();
 if(!def||typeof def.id!=='string'||!/^[a-z][a-z0-9_]{1,31}$/.test(def.id))issues.push('id must be lowercase snake_case');
 if(typeof def?.title!=='string'||def.title.length<6||def.title.length>70)issues.push('title must be 6–70 characters');
 if(typeof def?.icon!=='string'||!def.icon)issues.push('icon (one emoji) is required');
 for(const [field,tier,points] of TIERS){
  for(const word of list(def?.[field])){
   const key=normalize(word);
   if(key.length<KEY_MIN||key.length>KEY_MAX){issues.push(`${field}: "${word}" must have ${KEY_MIN}–${KEY_MAX} letters/digits`);continue;}
   if(word.length>44){issues.push(`${field}: "${word}" is too long to display`);continue;}
   if(byKey.has(key)){issues.push(`${field}: "${word}" duplicates "${byKey.get(key).word}" (${byKey.get(key).tier})`);continue;}
   const answer={word,key,points,tier,aliases:[]};answers.push(answer);byKey.set(key,answer);
  }
 }
 const aliasOwner=new Map();
 const addAlias=(text,answer,report)=>{
  const key=normalize(text);
  // A one-character alias must be a letter ("R"); digit-only aliases need two ("1984", "24").
  if(key.length<ALIAS_MIN||key.length>KEY_MAX||(key.length<2&&!/[A-Z]/.test(key))){if(report)issues.push(`alias "${text}" has an invalid length`);return;}
  if(key===answer.key||answer.aliases.includes(key))return;
  if(byKey.has(key)){if(report)issues.push(`alias "${text}" is already the answer "${byKey.get(key).word}"`);return;}
  if(aliasOwner.has(key)){if(report)issues.push(`alias "${text}" points at both "${aliasOwner.get(key).word}" and "${answer.word}"`);return;}
  aliasOwner.set(key,answer);answer.aliases.push(key);
 };
 for(const [text,target] of Object.entries(def?.aliases||{})){
  const answer=byKey.get(normalize(target));
  if(!answer){issues.push(`alias "${text}" points at "${target}", which is not an answer`);continue;}
  addAlias(text,answer,true);
 }
 // Automatic, collision-free conveniences: a dropped leading "The", and — for people —
 // a surname on its own when exactly one listed person has it.
 for(const answer of answers)if(answer.key.startsWith('THE')&&answer.key.length>=6)addAlias(answer.key.slice(3),answer,false);
 if(def?.people){
  const surnames=new Map();
  for(const answer of answers){const parts=answer.word.split(' ');if(parts.length<2)continue;const last=normalize(parts.at(-1));if(last.length<4)continue;surnames.set(last,surnames.has(last)?null:answer);}
  for(const [last,answer] of surnames)if(answer)addAlias(last,answer,false);
 }
 return {prompt:{id:def?.id,title:def?.title,icon:def?.icon,note:def?.note||'',answers},issues};
}
