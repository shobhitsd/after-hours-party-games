import test from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {createRoomStore,CAS_SCRIPT} from '../lib/redis.js';
import {createDatabase} from '../lib/supabase.js';
import {createBilling} from '../lib/billing.js';
import {packedQuestions} from '../packed-content.js';
import hosted from '../api/index.js';
const response=data=>new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':'application/json'}});
const cloudEnv={SUPABASE_URL:'https://example.supabase.co',SUPABASE_PUBLISHABLE_KEY:'sb_publishable_test',SUPABASE_SECRET_KEY:'sb_secret_test'};

test('Vercel Web adapter preserves routing and rejects unconfigured serverless rooms',async()=>{
 const health=await hosted.fetch(new Request('http://localhost/api/index.js?__route=health'));assert.equal(health.status,200);assert.equal((await health.json()).application,'after-hours-party-games');
 const create=await hosted.fetch(new Request('http://localhost/api/index.js?__route=create',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Host',game:'packed'})}));assert.equal(create.status,503);assert.match((await create.json()).error,/Upstash/);
 const webhook=await hosted.fetch(new Request('http://localhost/api/index.js?__route=webhooks/razorpay',{method:'POST',headers:{'Content-Type':'application/json'},body:'{ "event": "subscription.charged" }'}));assert.equal(webhook.status,503);assert.match((await webhook.json()).error,/not configured/);
});

test('Redis cold starts, atomic simultaneous updates, collisions, isolation and outage failure',async()=>{
 const memory=new Map();let fail=false,casConflicts=0;
 const fetchImpl=async(_,options)=>{if(fail)throw new Error('offline');const [cmd,...args]=JSON.parse(options.body);await new Promise(r=>setTimeout(r,1));let result;
  if(cmd==='GET')result=memory.get(args[0])||null;
  else if(cmd==='SET'){if(memory.has(args[0]))result=null;else{memory.set(args[0],args[1]);result='OK';}assert.equal(args[3],7200);}
  else if(cmd==='EVAL'){assert.equal(args[0],CAS_SCRIPT);const key=args[2];if(memory.get(key)!==args[3]){result=0;casConflicts++;}else{memory.set(key,args[4]);result=1;}}
  return response({result});
 };
 const env={UPSTASH_REDIS_REST_URL:'https://redis.test',UPSTASH_REDIS_REST_TOKEN:'secret'},stores=Array.from({length:4},()=>createRoomStore({env,fetchImpl}));
 assert.equal(await stores[0].create({code:'ABCDE',count:0,secret:'server-only',list:[]}),true);assert.equal(await stores[1].create({code:'ABCDE',count:999}),false);
 for(let batch=0;batch<30;batch++)await Promise.all(stores.map((s,i)=>s.transaction('ABCDE',r=>{r.count++;r.list.push(batch+':'+i);})));assert.ok(casConflicts>0);
 const cold=createRoomStore({env,fetchImpl});const {room}=await cold.transaction('ABCDE',r=>r.count);assert.equal(room.count,120);assert.equal(new Set(room.list).size,120);
 await assert.rejects(cold.transaction('ABCDE',r=>{r.count=0;throw new Error('Invalid');}));assert.equal((await cold.transaction('ABCDE',r=>r.count)).result,120);
 fail=true;await assert.rejects(cold.transaction('ABCDE',r=>r.count++),e=>e.status===503);assert.equal(cold.rooms.get('ABCDE').count,120);fail=false;
 assert.equal((await cold.transaction('ABCDE',r=>r.count)).result,120);
});

test('Supabase validates content, separates VIP cache, expires membership and never trusts client IDs',async()=>{
 let now=100000,calls=0,expiry=now+10000,fail=false;
 const fetchImpl=async(url,options)=>{calls++;assert.equal(options.headers.apikey.startsWith('sb_'),true);if(fail)throw new Error();if(url.includes('/auth/v1/user'))return response({id:'verified',email:'host@example.com'});if(url.includes('subscriptions?'))return response(expiry>now?[{valid_until:new Date(expiry).toISOString()}]:[]);return response(packedQuestions.map(([question,opts])=>({question,packed_options:opts.map((o,i)=>({text:o.text,image_url:o.image,order_index:i}))})));};
 const db=createDatabase({env:cloudEnv,fetchImpl,now:()=>now});
 assert.equal((await db.verifyUser('valid-token-1234567890')).id,'verified');await assert.rejects(db.verifyUser('fake'),e=>e.status===401);
 assert.equal(await db.checkHostSubscription('host'),true);const before=calls;assert.equal(await db.checkHostSubscription('host'),true);assert.equal(calls,before);now+=11000;assert.equal(await db.checkHostSubscription('host'),false);
 const hostEnt=await db.getHostEntitlements('host');assert.equal(typeof hostEnt,'object');assert.equal(Array.isArray(hostEnt.allowed_games),true);
 const plans=await db.getSubscriptionPlans();assert.equal(plans.length>=3,true);
 const content=await db.getPackedQuestions();assert.equal(content.length,60);const loaded=calls;content[0][0]='tampered';assert.notEqual((await db.getPackedQuestions())[0][0],'tampered');assert.equal(calls,loaded);await db.getPackedQuestions({vip:true});assert.equal(calls,loaded+1);
 fail=true;now+=3600001;assert.deepEqual(await db.getPackedQuestions(),packedQuestions);await assert.rejects(db.checkHostSubscription('new-host'),e=>e.status===503);
 const invalid=createDatabase({env:cloudEnv,fetchImpl:async()=>response([{question:'Malformed',packed_options:[]}])});assert.deepEqual(await invalid.getPackedQuestions(),packedQuestions);
});

test('Razorpay: original-byte signatures, disabled configuration, canonical state, duplicate identity and checkout ownership',async()=>{
 const checkout='11111111-1111-4111-8111-111111111111',events=new Set(),writes=[];let state='active',fetches=0;
 const db={configured:()=>true,invalidateSubscription:()=>{},request:async(path,opts)=>{if(path.startsWith('billing_checkouts?'))return [{user_id:'verified-user',provider_sub_id:'sub_test'}];if(path==='rpc/apply_billing_event'){writes.push(opts.body);if(events.has(opts.body.p_event))return false;events.add(opts.body.p_event);return true;}throw new Error(path);}};
 const env={RAZORPAY_KEY_ID:'rzp_test_example',RAZORPAY_KEY_SECRET:'secret',RAZORPAY_PLAN_ID:'plan_test',RAZORPAY_WEBHOOK_SECRET:'signing'};
 const billing=createBilling({db,env,fetchImpl:async()=>{fetches++;return response({id:'sub_test',plan_id:'plan_test',notes:{checkout_id:checkout},status:state,paid_count:1,current_end:Math.floor(Date.now()/1000)+3600});}});
 const raw=Buffer.from('{ "event": "subscription.charged", "created_at": 100, "payload": {"subscription":{"entity":{"id":"sub_test"}}}}');
 const sig=createHmac('sha256','signing').update(raw).digest('hex');
 await assert.rejects(billing.webhook(raw,undefined),e=>e.status===401);assert.equal(fetches,0);await assert.rejects(billing.webhook(Buffer.from(JSON.stringify(JSON.parse(raw))),sig),e=>e.status===401);
 assert.equal((await billing.webhook(raw,sig)).applied,true);assert.equal(writes[0].p_user,'verified-user');assert.equal(writes[0].p_status,'active');assert.equal((await billing.webhook(raw,sig)).applied,false);
 state='cancelled';const stale=Buffer.from(raw.toString().replace('100','99'));await billing.webhook(stale,createHmac('sha256','signing').update(stale).digest('hex'));assert.equal(writes.at(-1).p_status,'canceled');
 const off=createBilling({db,env:{}});assert.equal(off.configured(),false);await assert.rejects(off.webhook(raw,sig),e=>e.status===503);
 assert.equal(createBilling({db,env:{...env,RAZORPAY_KEY_ID:'rzp_live_example'}}).configured(),false);
});
