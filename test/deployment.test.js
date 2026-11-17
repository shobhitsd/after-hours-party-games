import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import {readFile,readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {resolvePublicOrigin} from '../lib/origin.js';

test('Optional origin configuration cannot crash startup',()=>{
 assert.equal(resolvePublicOrigin({PUBLIC_ORIGIN:'after-hours-party-games.vercel.app'}),'https://after-hours-party-games.vercel.app');
 assert.equal(resolvePublicOrigin({PUBLIC_ORIGIN:'https://',VERCEL_URL:'preview.vercel.app'}),'https://preview.vercel.app');
 assert.equal(resolvePublicOrigin({PUBLIC_ORIGIN:'https://',VERCEL_URL:'https://'}),null);
 assert.equal(resolvePublicOrigin({PUBLIC_ORIGIN:'javascript:alert(1)'}),null);
});

test('Packaged Vercel function boots, preserves rewritten routes and refuses volatile multiplayer',async()=>{
 execFileSync(process.execPath,['scripts/build-vercel.mjs']);
 const config=JSON.parse(await readFile('.vercel/output/config.json','utf8'));
 assert.equal(config.routes.find(r=>r.src==='/').dest,'/index.html');
 assert.equal((await readFile('.vercel/output/static/index.html','utf8')).includes('/app.js'),true);
 assert.equal(config.routes.find(r=>r.src==='/updraft/?').dest,'/hidden-depths.html');
 assert.equal(config.routes.find(r=>r.headers?.Location==='/updraft').status,308);
 assert.match(await readFile('.vercel/output/static/hidden-depths.html','utf8'),/updraft.js/);
 const publicFiles=await readdir('.vercel/output/static',{recursive:true});assert(!publicFiles.some(n=>/hidden-(content|engine|service|store)/.test(n)));
 const fn='.vercel/output/functions/api/index.func';
 const files=await readdir(fn,{recursive:true});assert.equal(files.some(n=>n.includes('.env')||n.includes('node_modules')),false);
 const settings=JSON.parse(await readFile(fn+'/.vc-config.json','utf8'));assert.equal(settings.handler,'api/index.js');assert.equal(settings.shouldAddHelpers,false);
 const {default:handler}=await import('../.vercel/output/functions/api/index.func/api/index.js');
 const server=http.createServer(handler);await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const base='http://127.0.0.1:'+server.address().port;
 try{
  for(const route of ['health','games','options','capabilities']){const r=await fetch(base+'/api/index?__route='+route,{headers:{'x-matched-path':'/api/index'}});assert.equal(r.status,200,route);assert.match(r.headers.get('content-type'),/json/);const body=await r.json();if(route==='games')assert.equal(Object.keys(body).length,6);}
  const create=await fetch(base+'/api/index?__route=create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Host',game:'packed'})});assert.equal(create.status,503);assert.match((await create.json()).error,/Upstash/);
  const solo=await fetch(base+'/api/index?__route=hidden/start',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({requestId:'deployment-test-start'})});assert.equal(solo.status,503);assert.match((await solo.json()).error,/database/);
 }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
