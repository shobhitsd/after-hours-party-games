import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { networkInterfaces } from 'node:os';
import { randomInt, createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRoom, joinRoom, startGame, configureRoom, act, view, tick, setPresence, takeSeat, validateOptions } from './engine.js';
import { games } from './data.js';
import { defaultOptions } from './variety.js';
import {database,serviceError} from './lib/supabase.js';
import {createRoomStore} from './lib/redis.js';
import {createBilling} from './lib/billing.js';
import {handleCloudPost} from './lib/cloud-routes.js';
import {evaluateGameAccess} from './lib/permissions.js';
import {resolvePublicOrigin} from './lib/origin.js';
import {createHiddenStore} from './lib/hidden-store.js';
import {createHiddenService} from './lib/hidden-service.js';
const hiddenStore=createHiddenStore({database});
const hiddenService=createHiddenService({database,store:hiddenStore});

export const rooms=new Map(), streams=new Map(), limits=new Map();
export const roomStore=createRoomStore({rooms});
const billing=createBilling({db:database});
function seen(room,p){if(!p.lastSeen||Date.now()-p.lastSeen>5000)p.lastSeen=Date.now();setPresence(room,p.id,true);}
function sweepRoom(room,now=Date.now()){
 if(room.game==='packed'&&room.status==='playing')for(const p of room.players)if(!p.bot&&p.connected!==false&&now-(p.lastSeen||room.created)>15000)setPresence(room,p.id,false,now);
}
export function sweepPresence(now=Date.now()){
 for(const room of rooms.values())sweepRoom(room,now);
}
const archiveJobs=new Map();
function queueArchive(room){
 if(!database.configured()||!room.gameId||!room.game||!(room.history?.length||room.status==='finished'))return;
 const stamp=room.gameId+':'+room.history.length+':'+room.status;
 if(room.archivedStamp===stamp)return;
 room.archivePending??={};room.archivePending[room.gameId]={stamp,room:structuredClone({gameId:room.gameId,game:room.game,code:room.code,ownerAccountId:room.ownerAccountId,history:room.history,status:room.status,players:room.players.map(({id,score})=>({id,score}))})};
}
async function archive(room){
 if(!database.configured()||(archiveJobs.get(room.code)||0)>Date.now())return;
 archiveJobs.set(room.code,Date.now()+30000);
 try{for(const [id,entry] of Object.entries(room.archivePending||{})){
  await database.recordRoomSession(entry.room);
  await roomStore.transaction(room.code,current=>{if(current.archivePending?.[id]?.stamp===entry.stamp){delete current.archivePending[id];current.archivedStamp=entry.stamp;}});
 }archiveJobs.delete(room.code);}catch{console.warn('Session archive queued in the room; will retry after 30 seconds.');}
 if(archiveJobs.size>1000)for(const [key,until]of archiveJobs)if(until<Date.now())archiveJobs.delete(key);
}
const port=Number(process.env.PORT||3000);
const publicOrigin=resolvePublicOrigin();
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const code=()=>Array.from({length:5},()=>alphabet[randomInt(alphabet.length)]).join('');
export function broadcast(room){room.updated=Date.now();for(const s of streams.get(room.code)||[]){try{s.res.write(`data: ${JSON.stringify(view(room,s.id))}\n\n`);}catch{}}}
function authenticate(req,room){
 const token=req.headers.authorization?.replace(/^Bearer /,'');
 if(!room)throw new Error('Room not found. It may have expired.');
 const p=[...room.players,...(room.spectators||[])].find(p=>p.token===token);if(!p)throw new Error('Your session is invalid. Please rejoin.');return {room,p};
}
async function rawBody(req){
 if(Buffer.isBuffer(req.body)){if(req.body.length>65536)throw serviceError('Request too large.',413);return req.body;}
 if(typeof req.body==='string'){if(Buffer.byteLength(req.body)>65536)throw serviceError('Request too large.',413);return Buffer.from(req.body);}
 if(req.body&&typeof req.body==='object')throw serviceError('This endpoint requires the original request bytes.',400);
 const chunks=[];let size=0;for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>65536)throw serviceError('Request too large.',413);chunks.push(Buffer.from(chunk));}return Buffer.concat(chunks);
}
async function body(req){if(req.body&&typeof req.body==='object'&&!Buffer.isBuffer(req.body)){if(Buffer.byteLength(JSON.stringify(req.body))>65536)throw serviceError('Request too large.',413);return req.body;}return JSON.parse((await rawBody(req)).toString('utf8')||'{}');}
async function account(req,required=true){const token=req.headers['x-account-token'];if(!token&&!required)return null;return database.verifyUser(token);}
async function prepareContent(room,user){room.ownerAccountId=user?.id||null;if(room.selectedGame==='packed'||room.game==='packed')room.contentQuestions=await database.getPackedQuestions({vip:user?await database.checkHostSubscription(user.id):false});}
async function roomRequest(req,operation){
 const result=await roomStore.transaction(req.headers['x-room-code'],async room=>{const {p}=authenticate(req,room);seen(room,p);sweepRoom(room);tick(room);queueArchive(room);const result=await operation(room,p);queueArchive(room);return result;});
 broadcast(result.room);await archive(result.room);return result;
}
function json(res,data,status=200){res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));}

const fallbackIndexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f5ee">
  <meta name="description" content="Six little games. Big group chat energy. Gather your friends for an After Hours game night.">
  <title>After Hours — Good friends. Questionable decisions.</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/gameplay.css">
  <link rel="stylesheet" href="/packed.css">
  <script type="module" src="/app.js"></script>
</head>
<body>
  <div id="app"></div>
  <div id="modal-root"></div>
  <div id="toast" role="status" aria-live="polite"></div>
  <div id="confetti" aria-hidden="true"></div>
</body>
</html>`;

const fallbackFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="19" fill="#c9b6f5"/><path d="M32 12v40M12 32h40M18 18l28 28M18 46l28-28" stroke="#252623" stroke-width="7"/></svg>`;

export async function handleRequest(req,res){
 try{
   if(!roomStore.shared)for(const room of rooms.values()){if(tick(room)){queueArchive(room);broadcast(room);}}
   let url=new URL(req.url,'http://localhost');
   if(url.searchParams.has('__route')){
     const route=url.searchParams.get('__route');
     url=new URL(route.startsWith('/')?route:'/api/'+route,'http://localhost');
   }
   if(req.method==='GET'&&['/hidden-depths','/hidden-depths/','/hidden-depths.html'].includes(url.pathname)){res.writeHead(308,{Location:'/updraft'});return res.end();}
   if(req.method==='GET'&&(url.pathname==='/api/health'||url.pathname==='/api/ping'))return json(res,{application:'after-hours-party-games',version:'1.0.0'});
   if(req.method==='GET'&&url.pathname==='/api/games')return json(res,games);
   if(req.method==='GET'&&url.pathname==='/api/plans')return json(res,await database.getSubscriptionPlans());
   if(req.method==='GET'&&url.pathname==='/api/options')return json(res,{defaults:defaultOptions,packs:[]});
   if(req.method==='GET'&&url.pathname==='/api/capabilities')return json(res,{accounts:database.configured(),payments:billing.configured(),transport:roomStore.shared?'poll':'sse'});
   if(req.method==='POST'&&url.pathname==='/api/webhooks/razorpay')return json(res,await billing.webhook(await rawBody(req),req.headers['x-razorpay-signature']));
   if(req.method==='GET'&&url.pathname==='/api/network'){
     const addresses=publicOrigin?[publicOrigin]:Object.values(networkInterfaces()).flat().filter(n=>n.family==='IPv4'&&!n.internal).map(n=>`http://${n.address}:${port}`);return json(res,{addresses});
   }
   if(req.method==='POST'&&url.pathname.startsWith('/api/')){
     // Same-origin JSON requests only; browsers cannot submit cross-origin forms to the API.
     if(!req.headers['content-type']?.includes('application/json'))return json(res,{error:'JSON required.'},415);
     if(req.headers.origin&&![publicOrigin,`http://${req.headers.host}`,`https://${req.headers.host}`].includes(req.headers.origin))return json(res,{error:'Origin not allowed.'},403);
     const ip=process.env.VERCEL?(req.headers['x-forwarded-for']||'').split(',')[0].trim():req.socket?.remoteAddress||'local';const rateKey=createHash('sha256').update(ip+':'+(req.headers.authorization||'')).digest('hex'),max=url.pathname.startsWith('/api/account/')?20:240;
     if(roomStore.shared){if(!await roomStore.rateLimit(rateKey,max))throw serviceError('Please slow down and try again shortly.',429);}else{const rate=limits.get(rateKey)||{n:0,at:Date.now()};if(Date.now()-rate.at>60000){rate.n=0;rate.at=Date.now();}rate.n++;limits.set(rateKey,rate);if(rate.n>max)throw serviceError('Please slow down and try again shortly.',429);}
     const b=await body(req);
     if(!b||typeof b!=='object'||Array.isArray(b))throw new Error('Send a JSON object.');
     if(url.pathname.startsWith('/api/hidden/'))return json(res,await hiddenService(url.pathname,req,res,b));
     if(url.pathname==='/api/validate-options')return json(res,{options:validateOptions(b.options)});
     const cloud=await handleCloudPost(url.pathname,req,b,{database,billing,account});if(cloud!==undefined)return json(res,cloud);
     if(url.pathname==='/api/create'){
       if(req.serverless&&!roomStore.shared)throw serviceError('Configure Upstash before hosting multiplayer on Vercel.');
       if(!roomStore.shared&&rooms.size>=1000)throw new Error('Server is full. Try again later.');
       if(b.practice!==undefined&&typeof b.practice!=='boolean')throw new Error('Practice must be true or false.');
       const user=await account(req,false);
       if(b.game){const entitlements=await database.getHostEntitlements(user?.id);const access=evaluateGameAccess(entitlements,{gameSlug:b.game});if(!access.allowed)throw serviceError(access.reason,403);}
       for(let attempt=0;attempt<20;attempt++){
       const {room,host}=createRoom(code(),b.name,!!b.practice);
       if(b.game)configureRoom(room,host.id,b.game,b.options||defaultOptions);
       await prepareContent(room,user);
       if(b.practice&&b.game)startGame(room,host.id,b.game);
       seen(room,host);if(!await roomStore.create(room))continue;
       return json(res,{code:room.code,token:host.token,state:view(room,host.id)});
       }throw serviceError('Could not allocate a room. Please retry.');
     }
     if(url.pathname==='/api/join'){
       let joined;try{joined=await roomStore.transaction(String(b.code).trim().toUpperCase(),room=>{const p=joinRoom(room,b.name);seen(room,p);return p;});}catch(e){if(e.status===404)throw serviceError('No room with that code. Check it and try again.',404);throw e;}const {room,result:p}=joined;broadcast(room);return json(res,{code:room.code,token:p.token,state:view(room,p.id)});
     }
     const user=url.pathname==='/api/start'?await account(req,false):null;
     const {result}=await roomRequest(req,async(room,p)=>{
     if(url.pathname==='/api/presence')return {ok:true};
     if(url.pathname==='/api/start'){if(room.host!==p.id)throw new Error('Only the host can start the game.');const entitlements=await database.getHostEntitlements(user?.id);const access=evaluateGameAccess(entitlements,{gameSlug:b.game,playerCount:room.players.length});if(!access.allowed)throw serviceError(access.reason,403);room.selectedGame=b.game;await prepareContent(room,user);startGame(room,p.id,b.game,b.options||room.options);}
     else if(url.pathname==='/api/take-seat')takeSeat(room,p.id);
     else if(url.pathname==='/api/configure'){if(b.game){const entitlements=await database.getHostEntitlements(user?.id);const access=evaluateGameAccess(entitlements,{gameSlug:b.game});if(!access.allowed)throw serviceError(access.reason,403);}configureRoom(room,p.id,b.game,b.options||room.options);}
     else if(url.pathname==='/api/action'){
       if(b.action!=='lobby'&&(b.round!==room.round||b.stage!==room.stage||b.game!==room.game||b.phaseId!==room.phaseId))throw new Error('The game has moved on. Please use the current screen.');
       act(room,p.id,b.action,b.value,b.requestId);

     }
     else if(url.pathname==='/api/leave'){
       if(room.status!=='lobby'&&room.game==='packed'){if(room.spectators.some(x=>x.id===p.id))room.spectators=room.spectators.filter(x=>x.id!==p.id);else{setPresence(room,p.id,false);p.lastSeen=1;}return {ok:true};}
       if(room.status!=='lobby')throw new Error('Return to the lounge before leaving the room.');
       room.spectators=room.spectators.filter(x=>x.id!==p.id);
       room.players=room.players.filter(x=>x.id!==p.id);room.revision++;if(room.host===p.id)room.host=room.players.find(x=>!x.bot)?.id;return {ok:true};
     }else throw serviceError('Unknown endpoint.',404);
     return {state:view(room,p.id)};
     });return json(res,result);
   }
   if(req.method==='GET'&&url.pathname==='/api/state'){const {result}=await roomRequest(req,(room,p)=>({state:view(room,p.id)}));return json(res,result);}
   if(req.method==='GET'&&url.pathname==='/api/events'){
     // Fetch-based SSE keeps session tokens out of URLs and server access logs.
     const {room,result:p}=await roomRequest(req,(room,p)=>p);if(roomStore.shared||req.serverless)return json(res,{transport:'poll',interval:1500});res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive','X-Accel-Buffering':'no'});
     const list=streams.get(room.code)||new Set();streams.set(room.code,list);
     // A duplicated browser tab may share this session. Both can watch without
     // repeatedly disconnecting each other; submissions remain single-use.
     const existing=[...list].filter(s=>s.id===p.id);if(existing.length>=8){existing[0].res.end();list.delete(existing[0]);}
     const entry={id:p.id,res};list.add(entry);res.write(`data: ${JSON.stringify(view(room,p.id))}\n\n`);
     const heartbeat=setInterval(()=>res.write(': heartbeat\n\n'),15000);req.on('close',()=>{clearInterval(heartbeat);list.delete(entry);});return;
   }
   const files={
     '/':'public/index.html',
     '/index.html':'public/index.html',
     '/app.js':'public/app.js',
     '/account-ui.js':'public/account-ui.js',
     '/dom.js':'public/dom.js',
     '/packed-ui.js':'public/packed-ui.js',
     '/packed-proof.js':'public/packed-proof.js',
     '/updraft':'public/hidden-depths.html',
     '/updraft/':'public/hidden-depths.html',
     '/updraft.js':'public/updraft.js',
     '/updraft.css':'public/updraft.css',
     '/updraft-tutorial.js':'public/updraft-tutorial.js',
     '/updraft-rules.js':'public/updraft-rules.js',
     '/updraft-motion.js':'public/updraft-motion.js',
     '/hidden-depths':'public/hidden-depths.html',
     '/hidden-depths.html':'public/hidden-depths.html',
     '/hidden-depths.js':'public/hidden-depths.js',
     '/hidden-depths.css':'public/hidden-depths.css',
     '/styles.css':'public/styles.css',
     '/gameplay.css':'public/gameplay.css',
     '/packed.css':'public/packed.css',
     '/favicon.svg':'public/favicon.svg',
     '/favicon.ico':'public/favicon.ico'
   };
   const file=files[url.pathname];
   if(!file){res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found');}
   let data;
   try {
     data=await readFile(new URL(file,import.meta.url));
   } catch {
     try {
       data=await readFile(path.join(process.cwd(),file));
     } catch {
       if(url.pathname==='/'||url.pathname==='/index.html') data=fallbackIndexHtml;
       else if(url.pathname==='/favicon.svg'||url.pathname==='/favicon.ico') data=fallbackFaviconSvg;
       else {
         res.writeHead(404,{'Content-Type':'text/plain'});return res.end('Not found');
       }
     }
   }
   const ext=file.split('.').pop();
   res.writeHead(200,{
     'Content-Type':({html:'text/html; charset=utf-8',js:'text/javascript; charset=utf-8',css:'text/css; charset=utf-8',svg:'image/svg+xml',ico:'image/x-icon'})[ext]||'application/octet-stream',
     'Cache-Control':'no-cache',
     'X-Content-Type-Options':'nosniff',
     'Referrer-Policy':'same-origin',
     'Content-Security-Policy':"default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https: wss:; script-src 'self' 'unsafe-inline' https:; font-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"
   });
   res.end(data);
 }catch(e){if(!res.headersSent)json(res,{error:e.message||'Something went wrong.'},e.status||400);else res.end();}
}

export default handleRequest;

export let server=null;
let ticker, cleanup;

const isDirectRun = Boolean(
  process.argv[1] &&
  !process.env.VERCEL &&
  !process.env.VERCEL_ENV &&
  !process.env.AWS_LAMBDA_FUNCTION_NAME &&
  (path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url)))
);

if(isDirectRun){
 server=http.createServer(handleRequest);
 if(!roomStore.shared)ticker=setInterval(()=>{sweepPresence();for(const room of rooms.values())if(tick(room)){queueArchive(room);broadcast(room);void archive(room);}},500);
 cleanup=setInterval(()=>{for(const [c,r]of rooms)if(Date.now()-r.updated>6*3600000){for(const s of streams.get(c)||[])s.res.end();streams.delete(c);rooms.delete(c);}for(const [ip,r]of limits)if(Date.now()-r.at>120000)limits.delete(ip);},60000);

 server.listen(port,'0.0.0.0',()=>{
  console.log(`\n  AFTER HOURS · Six games. One good night.\n\n  Local: http://localhost:${port}`);
  for(const n of Object.values(networkInterfaces()).flat())if(n.family==='IPv4'&&!n.internal)console.log(`  Same Wi-Fi: http://${n.address}:${port}`);
  console.log(`\n  Project: ${fileURLToPath(new URL('.',import.meta.url))}\n  Press Ctrl+C to stop.\n`);
 });
 server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`Port ${port} is busy. Close the other server or set PORT to a different number.`:e.message);process.exit(1);});

 let stopping=false;
 const shutdown=()=>{
  if(stopping)return;stopping=true;clearInterval(ticker);clearInterval(cleanup);
  for(const list of streams.values())for(const stream of list)stream.res.end();
  if(server)server.close(()=>process.exit(0));else process.exit(0);
  setTimeout(()=>process.exit(0),5000).unref();
 };
 process.on('SIGINT',shutdown);
 process.on('SIGTERM',shutdown);
}

export function shutdown(){
 clearInterval(ticker);clearInterval(cleanup);
 for(const list of streams.values())for(const stream of list)stream.res.end();
 if(server)server.close();
}
