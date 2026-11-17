import {mkdir,cp,readdir,readFile,writeFile,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=path.resolve(root,'.vercel/output');
// Only remove this generated directory, never the project link or environment files.
if(path.dirname(output)!==path.join(root,'.vercel'))throw new Error('Unexpected build output path');
await rm(output,{recursive:true,force:true});
const fn=path.join(output,'functions/api/index.func');
await mkdir(fn,{recursive:true});
await cp(path.join(root,'public'),path.join(output,'static'),{recursive:true});
// The backend uses only built-ins. Copy an explicit source allowlist, never .env or credentials.
for(const file of ['server.js','engine.js','data.js','bots.js','variety.js','packed.js','packed-content.js','api/index.js','public/packed-proof.js',...(await readdir(path.join(root,'lib'))).filter(n=>n.endsWith('.js')).map(n=>'lib/'+n)]){
 const target=path.join(fn,file);await mkdir(path.dirname(target),{recursive:true});await cp(path.join(root,file),target);
}
await writeFile(path.join(fn,'package.json'),JSON.stringify({type:'module',private:true}));
await writeFile(path.join(fn,'.vc-config.json'),JSON.stringify({runtime:'nodejs24.x',handler:'api/index.js',launcherType:'Nodejs',shouldAddHelpers:false},null,2));
const projectConfig=JSON.parse(await readFile(path.join(root,'vercel.json'),'utf8'));
await writeFile(path.join(output,'config.json'),JSON.stringify({version:3,routes:[
 ...(projectConfig.headers||[]).map(rule=>({src:rule.source,headers:Object.fromEntries(rule.headers.map(h=>[h.key,h.value])),continue:true})),
 {src:'/api(?:/.*)?',headers:{'Cache-Control':'no-store'},continue:true},
 {src:'/',dest:'/index.html'},
 {src:'/hidden-depths/?',dest:'/hidden-depths.html'},
 {src:'/api/(.*)',dest:'/api/index?__route=$1'},
 {handle:'filesystem'}
]},null,2));
console.log('Vercel artifact built: static homepage/assets + one Node 24 API function (raw request bodies).');
