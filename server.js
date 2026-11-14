import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import { networkInterfaces } from 'node:os';
import { randomInt, createHmac } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createRoom, joinRoom, startGame, configureRoom, act, view, tick, setPresence, takeSeat, validateOptions } from './engine.js';
import { games } from './data.js';
import { defaultOptions } from './variety.js';
import { isSupabaseConfigured, checkHostSubscription, recordRoomSession, recordTelemetry } from './lib/supabase.js';

export const rooms=new Map(), streams=new Map(), limits=new Map();
const activity=new Map();
function seen(room,p){activity.set(room.code+':'+p.id,Date.now());if(setPresence(room,p.id,true))broadcast(room);}
export function sweepPresence(now=Date.now()){
 for(const room of rooms.values())if(room.game==='packed'&&room.status==='playing')for(const p of room.players)if(!p.bot&&p.connected!==false&&now-(activity.get(room.code+':'+p.id)||room.created)>15000){if(setPresence(room,p.id,false,now))broadcast(room);}
}
const port=Number(process.env.PORT||3000);
const publicOrigin=process.env.PUBLIC_ORIGIN?new URL(process.env.PUBLIC_ORIGIN).origin:process.env.VERCEL_URL?`https://${process.env.VERCEL_URL}`:null;
const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const code=()=>Array.from({length:5},()=>alphabet[randomInt(alphabet.length)]).join('');
export function broadcast(room){room.updated=Date.now();for(const s of streams.get(room.code)||[]){try{s.res.write(`data: ${JSON.stringify(view(room,s.id))}\n\n`);}catch{}}}
function authenticate(req){
 const token=req.headers.authorization?.replace(/^Bearer /,'');
 const room=rooms.get(req.headers['x-room-code']);if(!room)throw new Error('Room not found. It may have expired.');
 const p=[...room.players,...(room.spectators||[])].find(p=>p.token===token);if(!p)throw new Error('Your session is invalid. Please rejoin.');return {room,p};
}
async function body(req){
 if(req.body&&typeof req.body==='object')return req.body;
 if(typeof req.body==='string')return JSON.parse(req.body||'{}');
 let s='';for await(const chunk of req){s+=chunk;if(s.length>24576)throw new Error('Request too large.');}
 return JSON.parse(s||'{}');
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
   for(const room of rooms.values()){if(tick(room))broadcast(room);}
   let url=new URL(req.url,'http://localhost');
   if(url.searchParams.has('__route')){
     const route=url.searchParams.get('__route');
     url=new URL(route.startsWith('/')?route:'/api/'+route,'http://localhost');
   } else if(req.headers&&req.headers['x-matched-path']){
     url=new URL(req.headers['x-matched-path'],'http://localhost');
   }
   if(req.method==='GET'&&(url.pathname==='/api/health'||url.pathname==='/api/ping'))return json(res,{application:'after-hours-party-games',version:'1.0.0'});
   if(req.method==='GET'&&url.pathname==='/api/games')return json(res,games);
   if(req.method==='GET'&&url.pathname==='/api/options')return json(res,{defaults:defaultOptions,packs:[]});
   if(req.method==='GET'&&url.pathname==='/api/network'){
     const addresses=publicOrigin?[publicOrigin]:Object.values(networkInterfaces()).flat().filter(n=>n.family==='IPv4'&&!n.internal).map(n=>`http://${n.address}:${port}`);return json(res,{addresses});
   }
   if(req.method==='POST'&&url.pathname.startsWith('/api/')){
     // Same-origin JSON requests only; browsers cannot submit cross-origin forms to the API.
     if(!req.headers['content-type']?.includes('application/json'))return json(res,{error:'JSON required.'},415);
     if(req.headers.origin&&![publicOrigin,`http://${req.headers.host}`,`https://${req.headers.host}`].includes(req.headers.origin))return json(res,{error:'Origin not allowed.'},403);
     const ip=(req.headers['x-forwarded-for']||'').split(',')[0].trim()||req.socket?.remoteAddress||'127.0.0.1';const rateKey=req.headers.authorization?`${ip}:${req.headers.authorization}`:ip;const rate=limits.get(rateKey)||{n:0,at:Date.now()};if(Date.now()-rate.at>60000){rate.n=0;rate.at=Date.now();}rate.n++;limits.set(rateKey,rate);if(rate.n>240)return json(res,{error:'Please slow down and try again shortly.'},429);
     const b=await body(req);
     if(!b||typeof b!=='object'||Array.isArray(b))throw new Error('Send a JSON object.');
     if(url.pathname==='/api/validate-options')return json(res,{options:validateOptions(b.options)});
     if(url.pathname==='/api/create'){
       if(rooms.size>=1000)throw new Error('Server is full. Try again later.');
       if(b.practice!==undefined&&typeof b.practice!=='boolean')throw new Error('Practice must be true or false.');
       let c=code();while(rooms.has(c))c=code();const {room,host}=createRoom(c,b.name,!!b.practice);
       if(b.game)configureRoom(room,host.id,b.game,b.options||defaultOptions);
       if(b.practice&&b.game)startGame(room,host.id,b.game);
       rooms.set(c,room);seen(room,host);
       return json(res,{code:c,token:host.token,state:view(room,host.id)});
     }
     if(url.pathname==='/api/join'){
       const room=rooms.get(String(b.code).trim().toUpperCase());if(!room)throw new Error('No room with that code. Check it and try again.');const p=joinRoom(room,b.name);seen(room,p);broadcast(room);return json(res,{code:room.code,token:p.token,state:view(room,p.id)});
     }
     if(url.pathname==='/api/subscribe/create-order'){
       const keyId=process.env.RAZORPAY_KEY_ID||'rzp_test_placeholder';
       const planId=process.env.RAZORPAY_PLAN_ID||'plan_afterhours_vip_99';
       const hostId=b.hostId||'guest_host';
       return json(res,{
         provider:'razorpay',
         keyId,
         planId,
         amount:9900,
         currency:'INR',
         name:'After Hours VIP Host Pass',
         description:'Unlimited 8-player rooms, 100+ deep scenarios & custom packs for 1 month',
         hostId
       });
     }
     if(url.pathname==='/api/webhooks/razorpay'){
       const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
       const sig=req.headers['x-razorpay-signature'];
       if(secret&&sig){
         const expected=createHmac('sha256',secret).update(JSON.stringify(b)).digest('hex');
         if(expected!==sig)return json(res,{error:'Invalid webhook signature'},401);
       }
       return json(res,{received:true,event:b.event||'ping'});
     }
     if(url.pathname==='/api/user/subscription'){
       const userId=b.userId||req.headers['x-user-id'];
       const isVip=userId?await checkHostSubscription(userId):false;
       return json(res,{isVip,tier:isVip?'host_pass':'free',priceMonthly:'₹99'});
     }
     const {room,p}=authenticate(req);
     if(url.pathname==='/api/presence'){seen(room,p);return json(res,{ok:true});}
     seen(room,p);
     if(url.pathname==='/api/start')startGame(room,p.id,b.game,b.options||room.options);
     else if(url.pathname==='/api/take-seat')takeSeat(room,p.id);
     else if(url.pathname==='/api/configure')configureRoom(room,p.id,b.game,b.options||room.options);
     else if(url.pathname==='/api/action'){
       if(b.action!=='lobby'&&(b.round!==room.round||b.stage!==room.stage||b.game!==room.game||b.phaseId!==room.phaseId))throw new Error('The game has moved on. Please use the current screen.');
       act(room,p.id,b.action,b.value,b.requestId);
       if(room.stage==='finished'){
         recordRoomSession({code:room.code,game:room.game,hostId:room.host,players:room.players,round:room.round}).catch(()=>{});
       }
     }
     else if(url.pathname==='/api/leave'){
       if(room.status!=='lobby'&&room.game==='packed'){if(room.spectators.some(x=>x.id===p.id))room.spectators=room.spectators.filter(x=>x.id!==p.id);else setPresence(room,p.id,false);activity.delete(room.code+':'+p.id);broadcast(room);return json(res,{ok:true});}
       if(room.status!=='lobby')throw new Error('Return to the lounge before leaving the room.');
       room.spectators=room.spectators.filter(x=>x.id!==p.id);
       room.players=room.players.filter(x=>x.id!==p.id);room.revision++;if(room.host===p.id)room.host=room.players.find(x=>!x.bot)?.id;broadcast(room);return json(res,{ok:true});
     }else return json(res,{error:'Unknown endpoint.'},404);
     broadcast(room);return json(res,{state:view(room,p.id)});
   }
   if(req.method==='GET'&&url.pathname==='/api/state'){const {room,p}=authenticate(req);seen(room,p);return json(res,{state:view(room,p.id)});}
   if(req.method==='GET'&&url.pathname==='/api/events'){
     // Fetch-based SSE keeps session tokens out of URLs and server access logs.
     const {room,p}=authenticate(req);seen(room,p);res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive','X-Accel-Buffering':'no'});
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
     '/dom.js':'public/dom.js',
     '/packed-ui.js':'public/packed-ui.js',
     '/packed-proof.js':'public/packed-proof.js',
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
       else if(url.pathname==='/favicon.svg') data=fallbackFaviconSvg;
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
     'Content-Security-Policy':"default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'; script-src 'self'; font-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'"
   });
   res.end(data);
 }catch(e){if(!res.headersSent)json(res,{error:e.message||'Something went wrong.'},400);else res.end();}
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
 ticker=setInterval(()=>{sweepPresence();for(const room of rooms.values())if(tick(room))broadcast(room);},500);
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
