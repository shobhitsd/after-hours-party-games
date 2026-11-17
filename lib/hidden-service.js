import {randomBytes,createHash,randomInt} from 'node:crypto';
import {puzzles} from './hidden-content.js';
import {newRun,expire,applyMove,publicRun,summary,mergeGuest,fail} from './hidden-engine.js';

export function createHiddenService({store,database,now=Date.now,choose=n=>randomInt(n),library=puzzles}){
 const cookieName='hd_guest';
 function guestCookie(req,res){
  const value=String(req.headers.cookie||'').split(';').map(v=>v.trim()).find(v=>v.startsWith(cookieName+'='))?.slice(cookieName.length+1);
  if(value&&/^[a-f0-9]{64}$/.test(value))return value;
  return issueCookie(req,res);
 }
 function issueCookie(req,res){const token=randomBytes(32).toString('hex');res.setHeader('Set-Cookie',`${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${req.serverless||req.headers['x-forwarded-proto']==='https' || process.env.VERCEL?'; Secure':''}`);return token;}
 async function identity(req,res){
  let guest='g:'+createHash('sha256').update(guestCookie(req,res)).digest('hex');
  let user=null;if(req.headers['x-account-token'])user=await database.verifyUser(req.headers['x-account-token']);
  if(!user){const row=await store.read(guest);if(row.state.claim)guest='g:'+createHash('sha256').update(issueCookie(req,res)).digest('hex');return {key:guest,signedIn:false};}
  const key='a:'+user.id;
  for(let i=0;i<12;i++){
   const g=await store.read(guest);if(g.state.claim)break;
   const a=await store.read(key);const merged=mergeGuest(a.state,g.state);
   if(await store.claim(guest,key,g.revision,a.revision,merged))break;
   if(i===11)fail('Progress is being updated. Please retry.',409);
  }
  return {key,signedIn:true};
 }
 function view(state,who,mode='practice'){
  const day=new Date(now()).toISOString().slice(0,10);
  return {signedIn:who.signedIn,storage:store.local?'local':'cloud',librarySize:library.length,remaining:library.filter(p=>!state.seen.includes(p.canonical)).length,day,
   resetAt:Date.parse(day+'T00:00:00Z')+86400000,run:publicRun(state.runs[mode]),history:state.history.slice(-20).reverse(),
   modes:Object.fromEntries(Object.entries(state.runs).map(([k,r])=>[k,summary(r)]))};
 }
 return async function handle(path,req,res,b){
  const route=path.slice('/api/hidden/'.length);if(!['state','start','move','report'].includes(route))fail('Unknown Hidden Depths endpoint.',404);
  if(req.serverless&&store.local)fail('Configure the hosted Hidden Depths database before playing.',503);
  const who=await identity(req,res);const mode=b.mode||'practice';if(!['daily','practice'].includes(mode))fail('Choose daily or practice.');if(mode==='daily'&&!who.signedIn)fail('Sign in for your personal daily dive. Guest practice is free.',401);
  for(let retry=0;retry<12;retry++){
   const row=await store.read(who.key);const state=row.state;
   // A sign-in in another tab may have claimed this guest between identity and CAS.
   if(state.claim)fail('Your guest progress was moved to an account. Refresh this page.',409);
   for(const run of Object.values(state.runs))expire(run,now());
   const day=new Date(now()).toISOString().slice(0,10);let run=state.runs[mode];
   if(route==='start'){
    if(typeof b.requestId!=='string'||!/^[\w-]{12,80}$/.test(b.requestId))fail('A valid request ID is required.');
    state.starts??=[];const receipt=state.starts.find(s=>s.id===b.requestId);
    if(receipt&&(receipt.runId!==run?.id||receipt.mode!==mode))fail('That start request belongs to a previous dive. Your current progress has been loaded.',409);
    if(run?.status==='active'||(mode==='daily'&&state.daily[day])){/* Resume; never reroll an assigned daily. */}
    else if(!receipt){
     const candidates=library.filter(p=>!state.seen.includes(p.canonical));if(!candidates.length)fail('You have explored every starter puzzle. More puzzles are coming; your history is still available.',409);
     run=newRun(candidates[choose(candidates.length)],mode,now());state.runs[mode]=run;state.seen.push(run.puzzle.canonical);if(mode==='daily')state.daily[day]=run.id;
     state.daily=Object.fromEntries(Object.entries(state.daily).filter(([d])=>d>=new Date(now()-40*86400000).toISOString().slice(0,10)));
    }
    if(!receipt)state.starts.push({id:b.requestId,runId:run.id,mode});state.starts=state.starts.slice(-100);
   }
   if(route==='move'){if(!run)fail('Start a dive first.',409);applyMove(run,b,now());}
   if(route==='report'){
    if(!run||b.runId!==run.id||typeof b.text!=='string'||!b.text.trim()||b.text.length>300)fail('Write a short report (1–300 characters) for this dive.');
    if(state.reports.filter(r=>r.runId===run.id).length>=3)fail('You have already sent three reports for this dive.');
    state.reports.push({runId:run.id,puzzleId:run.puzzle.id,text:b.text.trim(),at:now()});state.reports=state.reports.slice(-100);
   }
   for(const r of Object.values(state.runs))if(r.status!=='active'&&!state.history.some(h=>h.id===r.id))state.history.push(summary(r));state.history=state.history.slice(-100);
   if(await store.cas(who.key,row.revision,state))return view(state,who,mode);
  }
  fail('Another request is updating your dive. Please retry.',409);
 };
}
