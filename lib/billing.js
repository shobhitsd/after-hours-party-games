import {createHmac,createHash,timingSafeEqual} from 'node:crypto';
import {serviceError} from './supabase.js';
export function createBilling({db,env=process.env,fetchImpl=fetch}={}){
 const key=env.RAZORPAY_KEY_ID,secret=env.RAZORPAY_KEY_SECRET,plan=env.RAZORPAY_PLAN_ID,webhookSecret=env.RAZORPAY_WEBHOOK_SECRET;
 const configured=()=>Boolean(db.configured()&&key&&secret&&plan&&webhookSecret&&(key.startsWith('rzp_test_')||(env.PAYMENTS_MODE==='live'&&key.startsWith('rzp_live_'))));
 async function provider(endpoint,body){
  if(!configured())throw serviceError('Payments are not configured. No payment has been requested.');
  let response;try{response=await fetchImpl('https://api.razorpay.com/v1/'+endpoint,{method:body?'POST':'GET',headers:{Authorization:'Basic '+Buffer.from(key+':'+secret).toString('base64'),'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(10000)});}catch{throw serviceError('Payment provider did not respond. Check your membership before trying again.');}
  if(!response.ok)throw serviceError('Payment provider could not complete this request.');return response.json();
 }
 async function create(user){
  const pricing=await provider('plans/'+encodeURIComponent(plan));
  if(pricing.period!=='monthly'||pricing.interval!==1||pricing.item?.amount!==9900||pricing.item?.currency!=='INR')throw serviceError('The configured plan must be INR 99 per month.');
  const c=await db.request('rpc/reserve_checkout',{method:'POST',body:{p_user:user.id}});
  if(!c.created){if(c.short_url&&c.provider_sub_id){const existing=await provider('subscriptions/'+encodeURIComponent(c.provider_sub_id));if(['cancelled','completed','expired'].includes(existing.status)){if(await db.checkHostSubscription(user.id,{fresh:true}))throw serviceError('Your Host Pass is still active. Wait until the paid period ends to start a new subscription.',409);await db.request(`billing_checkouts?id=eq.${encodeURIComponent(c.id)}`,{method:'PATCH',body:{closed:true}});return create(user);}return {url:c.short_url,subscriptionId:c.provider_sub_id};}throw serviceError('A checkout is already being prepared. If it does not appear, contact the host administrator; do not start another payment.');}
  const subscription=await provider('subscriptions',{plan_id:plan,total_count:12,quantity:1,customer_notify:1,notes:{checkout_id:c.id}});
  if(!subscription.id||!safeCheckoutURL(subscription.short_url))throw serviceError('The provider returned an invalid checkout. Contact the host administrator.');
  await db.request(`billing_checkouts?id=eq.${encodeURIComponent(c.id)}`,{method:'PATCH',body:{provider_sub_id:subscription.id,short_url:subscription.short_url}});
  return {url:subscription.short_url,subscriptionId:subscription.id};
 }
 async function webhook(raw,signature){
  if(!configured())throw serviceError('Payment webhooks are not configured.');
  const expected=createHmac('sha256',webhookSecret).update(raw).digest();
  if(typeof signature!=='string'||!/^[0-9a-f]{64}$/i.test(signature)||!timingSafeEqual(expected,Buffer.from(signature,'hex')))throw serviceError('Invalid webhook signature.',401);
  let event;try{event=JSON.parse(raw.toString('utf8'));}catch{throw serviceError('Invalid webhook JSON.',400);}
  if(!['subscription.authenticated','subscription.activated','subscription.charged','subscription.pending','subscription.halted','subscription.cancelled','subscription.completed','subscription.paused','subscription.resumed','subscription.updated'].includes(event.event))return {received:true,ignored:true};
  const id=event.payload?.subscription?.entity?.id;if(typeof id!=='string'||!/^sub_[a-zA-Z0-9]+$/.test(id)||!Number.isSafeInteger(event.created_at))throw serviceError('Invalid subscription event.',400);
  // Read the provider's current state: delayed notifications must not restore a canceled subscription.
  const sub=await provider('subscriptions/'+id);if(sub.plan_id!==plan)throw serviceError('Unexpected subscription plan.',400);
  const checkoutId=sub.notes?.checkout_id;if(typeof checkoutId!=='string'||!/^[0-9a-f-]{36}$/i.test(checkoutId))return {received:true,ignored:true};
  const records=await db.request(`billing_checkouts?id=eq.${encodeURIComponent(checkoutId)}&select=user_id,provider_sub_id`),c=records[0];
  if(!c)return {received:true,ignored:true};
  if(c.provider_sub_id&&c.provider_sub_id!==id)throw serviceError('Subscription binding mismatch.',400);
  if(!c.provider_sub_id)await db.request(`billing_checkouts?id=eq.${encodeURIComponent(checkoutId)}&provider_sub_id=is.null`,{method:'PATCH',body:{provider_sub_id:id,short_url:safeCheckoutURL(sub.short_url)?sub.short_url:null}});
  const paid=Number.isInteger(sub.paid_count)&&sub.paid_count>0;
  const active=paid&&['active','completed'].includes(sub.status)&&Number.isSafeInteger(sub.current_end)&&sub.current_end*1000>Date.now();
  const status=active?'active':['cancelled','completed','expired'].includes(sub.status)?'canceled':'past_due';
  const applied=await db.request('rpc/apply_billing_event',{method:'POST',body:{p_event:createHash('sha256').update(raw).digest('hex'),p_time:event.created_at,p_user:c.user_id,p_sub:id,p_status:status,p_until:new Date((Number.isSafeInteger(sub.current_end)?sub.current_end:0)*1000).toISOString(),p_cancel:sub.has_scheduled_changes===true||sub.has_scheduled_changes===1}});
  db.invalidateSubscription(c.user_id);return {received:true,applied};
 }
 async function cancel(user){const rows=await db.request(`billing_checkouts?user_id=eq.${encodeURIComponent(user.id)}&closed=eq.false&select=provider_sub_id&order=created_at.desc&limit=1`);if(!rows[0]?.provider_sub_id)throw serviceError('No subscription to cancel.',400);const current=await provider('subscriptions/'+encodeURIComponent(rows[0].provider_sub_id));if(['cancelled','completed','expired'].includes(current.status))return {status:current.status,cancelScheduled:true};const sub=await provider('subscriptions/'+encodeURIComponent(rows[0].provider_sub_id)+'/cancel',{cancel_at_cycle_end:1});db.invalidateSubscription(user.id);return {status:sub.status,cancelScheduled:true};}
 return {configured,create,webhook,cancel};
}
export function safeCheckoutURL(value){try{const u=new URL(value);return u.protocol==='https:'&&(u.hostname==='rzp.io'||u.hostname==='razorpay.com'||u.hostname.endsWith('.razorpay.com'));}catch{return false;}}
