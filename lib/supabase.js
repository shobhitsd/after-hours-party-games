import {packedQuestions,packedDefaults} from '../packed-content.js';
import {validatePackedOptions} from '../packed.js';
import {DEFAULT_PLANS,resolveEntitlements} from './permissions.js';

export const serviceError=(message,status=503)=>Object.assign(new Error(message),{status});
export function createDatabase({env=process.env,fetchImpl=fetch,now=Date.now}={}){
 const base=(env.SUPABASE_URL||'').replace(/\/$/,''),publicKey=env.SUPABASE_PUBLISHABLE_KEY||env.SUPABASE_ANON_KEY,secret=env.SUPABASE_SECRET_KEY||env.SUPABASE_SERVICE_ROLE_KEY;
 const contentCache=new Map(),vipCache=new Map(),entitlementsCache=new Map();
 const configured=()=>Boolean(base&&publicKey&&secret);
 async function request(endpoint,{method='GET',body,token,auth=false,merge=false}={}){
  if(!configured())throw serviceError('Cloud accounts are not configured on this server.');
  const key=auth||token?publicKey:secret;
  let response;
  try{response=await fetchImpl(base+(auth?'/auth/v1/':'/rest/v1/')+endpoint,{method,headers:{apikey:key,...(token?{Authorization:`Bearer ${token}`}:key.startsWith('sb_')?{}:{Authorization:`Bearer ${key}`}), 'Content-Type':'application/json',Prefer:'return=representation'+(merge?',resolution=merge-duplicates':'')},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(8000)});}catch{throw serviceError('Account service is temporarily unavailable. Please retry.');}
  if(!response.ok){const detail=await response.text();if(/pack limit/i.test(detail))throw serviceError('Free accounts can save 3 packs. Update or delete an existing pack, or get Host Pass.',403);throw serviceError(auth?'Sign-in failed. Check your details and email confirmation.':'Account service could not complete this request.',auth?401:503);}
  return response.status===204?null:response.json();
 }
 async function verifyUser(token){if(typeof token!=='string'||token.length<20||token.length>8192)throw serviceError('Sign in to your host account first.',401);const user=await request('user',{auth:true,token});if(!user?.id)throw serviceError('Please sign in again.',401);return {id:user.id,email:user.email};}
 async function auth(action,data){
  if(action==='refresh'){if(typeof data.refresh_token!=='string'||data.refresh_token.length>8192)throw serviceError('Please sign in again.',401);return request('token?grant_type=refresh_token',{auth:true,method:'POST',body:{refresh_token:data.refresh_token}});}
  if(!['signup','signin'].includes(action)||typeof data.email!=='string'||!/^\S+@\S+\.\S+$/.test(data.email)||data.email.length>254||typeof data.password!=='string'||data.password.length<8||data.password.length>256)throw serviceError('Use a valid email and a password of 8–256 characters.',400);
  return request(action==='signup'?'signup':'token?grant_type=password',{auth:true,method:'POST',body:{email:data.email.trim(),password:data.password}});
 }
 async function checkHostSubscription(id,{fresh=false}={}){
  if(!configured()||!id)return false;
  const cached=vipCache.get(id);if(!fresh&&cached?.until>now())return cached.vip;
  const rows=await request(`subscriptions?user_id=eq.${encodeURIComponent(id)}&status=eq.active&valid_until=gt.${encodeURIComponent(new Date(now()).toISOString())}&select=valid_until&order=valid_until.desc&limit=1`);
  const expiry=Date.parse(rows[0]?.valid_until),vip=expiry>now();vipCache.set(id,{vip,until:Math.min(now()+300000,vip?expiry:Infinity)});return vip;
 }
 async function getHostEntitlements(id,{fresh=false}={}){
  if(!id)return resolveEntitlements({planId:'free'});
  const cached=entitlementsCache.get(id);if(!fresh&&cached?.until>now())return structuredClone(cached.entitlements);
  if(!configured())return resolveEntitlements({planId:'free'});
  try{
   const rpcRes=await request('rpc/get_user_entitlements',{method:'POST',body:{p_user_id:id}}).catch(()=>null);
   if(rpcRes&&typeof rpcRes==='object'&&rpcRes.plan_id){
    entitlementsCache.set(id,{entitlements:rpcRes,until:now()+300000});
    return structuredClone(rpcRes);
   }
   const vip=await checkHostSubscription(id,{fresh});
   const ent=resolveEntitlements({planId:vip?'host_pass':'free',subscription:vip?{status:'active'}:null});
   entitlementsCache.set(id,{entitlements:ent,until:now()+300000});
   return structuredClone(ent);
  }catch{
   return resolveEntitlements({planId:'free'});
  }
 }
 async function getSubscriptionPlans(){
  if(!configured())return Object.values(DEFAULT_PLANS);
  try{
   const rows=await request('subscription_plans?is_active=eq.true&order=price_paise.asc');
   return rows&&rows.length?rows:Object.values(DEFAULT_PLANS);
  }catch{return Object.values(DEFAULT_PLANS);}
 }
 async function getPackedQuestions({vip=false}={}){
  if(!configured())return structuredClone(packedQuestions);
  const key=vip?'vip':'free',cached=contentCache.get(key);if(cached?.until>now())return structuredClone(cached.questions);
  try{
   const rows=await request(`packed_questions?select=question,packed_options(text,image_url,order_index)&is_active=eq.true${vip?'':'&is_vip=eq.false'}&order=id`);
   const questions=rows.map(q=>[q.question,q.packed_options.sort((a,b)=>a.order_index-b.order_index).map(o=>({text:o.text,image:o.image_url}))]);
   if(questions.length<10||new Set(questions.map(q=>q[0])).size!==questions.length||questions.some(([q,opts])=>typeof q!=='string'||!q.trim()||q.length>240||opts.length!==6||new Set(opts.map(o=>o.text)).size!==6||opts.some(o=>typeof o.text!=='string'||!o.text.trim()||o.text.length>160||(o.image&&!/^https:\/\//.test(o.image)))))throw new Error('Invalid content');
   contentCache.set(key,{questions,until:now()+3600000});return structuredClone(questions);
  }catch{return structuredClone(packedQuestions);}
 }
 async function saveCustomPack(token,data){
  if(typeof data.title!=='string'||!data.title.trim()||data.title.length>80||!Array.isArray(data.questions)||data.questions.length<5)throw serviceError('Give your pack a title and 5–30 questions.',400);
  validatePackedOptions({...packedDefaults,packedPack:'custom',packedCustom:data.questions});
  if(data.id&&!/^[0-9a-f-]{36}$/i.test(data.id))throw serviceError('Invalid pack ID.',400);
  return request('rpc/save_custom_pack',{method:'POST',token,body:{p_id:data.id||null,p_title:data.title.trim(),p_questions:data.questions,p_public:data.is_public===true}});
 }
 async function recordRoomSession(room){
  if(!configured()||!room.gameId||!room.game)return false;
  const rounds=(room.history||[]).flatMap((h,i)=>h.packed?[{round_number:i+1,round_id:h.packed.proof.roundId,commitment:h.commitment,proof:h.packed.proof,points:h.points}]:[]);
  await request('rpc/archive_game',{method:'POST',body:{p_session:{id:room.gameId,room_code:room.code,game_slug:room.game,host_id:room.ownerAccountId||null,seated_count:room.players.length,total_rounds:room.history.length,finished:room.status==='finished',final_scores:Object.fromEntries(room.players.map(p=>[p.id,p.score]))},p_rounds:rounds}});return true;
 }
 return {configured,request,verifyUser,auth,checkHostSubscription,getHostEntitlements,getSubscriptionPlans,getPackedQuestions,saveCustomPack,recordRoomSession,invalidateSubscription:id=>{vipCache.delete(id);entitlementsCache.delete(id);}};
}
export const database=createDatabase();
