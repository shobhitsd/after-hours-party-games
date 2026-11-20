// Usage: node scripts/lint-updraft-bank.mjs [category_id ...]   (no ids = every file)
// Reports authoring problems in lib/updraft-bank/*.js. Exit code 1 if any file has issues.
import {readdir} from 'node:fs/promises';
import {pathToFileURL,fileURLToPath} from 'node:url';
import path from 'node:path';
import {compileCategory} from '../lib/hidden-bank-tools.js';
const dir=fileURLToPath(new URL('../lib/updraft-bank/',import.meta.url));
const wanted=process.argv.slice(2).filter(a=>!a.startsWith('--'));const quiet=process.argv.includes('--quiet');
const files=(await readdir(dir)).filter(n=>n.endsWith('.js')&&n!=='index.js'&&(!wanted.length||wanted.includes(n.slice(0,-3)))).sort();
for(const id of wanted)if(!files.includes(id+'.js'))console.log(`MISSING  ${id}.js`);
let bad=wanted.filter(id=>!files.includes(id+'.js')).length,total=0;
for(const file of files){
 let def;try{def=(await import(pathToFileURL(path.join(dir,file)).href+'?t='+Date.now())).default;}catch(e){console.log(`BROKEN   ${file}: ${e.message}`);bad++;continue;}
 const {prompt,issues}=compileCategory(def);
 if(def?.id!==file.slice(0,-3))issues.push(`id "${def?.id}" must match the file name`);
 const count=tier=>prompt.answers.filter(a=>a.tier===tier).length;total+=prompt.answers.length;
 console.log(`${issues.length?'ISSUES ':'ok     '}  ${file.padEnd(26)} ${String(prompt.answers.length).padStart(4)} answers  (common ${count('Common')}, uncommon ${count('Uncommon')}, rare ${count('Rare')}, deep ${count('Deep cut')})  aliases ${prompt.answers.reduce((n,a)=>n+a.aliases.length,0)}`);
 if(issues.length){bad++;if(!quiet)for(const issue of issues)console.log('   - '+issue);}
}
console.log(`${files.length} categories, ${total} answers, ${bad} with problems.`);
process.exit(bad?1:0);
