const groups={Supabase:['SUPABASE_URL',process.env.SUPABASE_PUBLISHABLE_KEY?'SUPABASE_PUBLISHABLE_KEY':'SUPABASE_ANON_KEY',process.env.SUPABASE_SECRET_KEY?'SUPABASE_SECRET_KEY':'SUPABASE_SERVICE_ROLE_KEY'],Upstash:['UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN'],Razorpay:['RAZORPAY_KEY_ID','RAZORPAY_KEY_SECRET','RAZORPAY_PLAN_ID','RAZORPAY_WEBHOOK_SECRET']};
let missing=false;
for(const [service,keys]of Object.entries(groups)){const absent=keys.filter(k=>!process.env[k]);console.log(service+': '+(absent.length?'not connected; missing '+absent.join(', '):'settings present (credentials not verified)'));missing||=absent.length>0;}
console.log('Payment mode: '+(process.env.PAYMENTS_MODE==='live'?'LIVE':'test'));
console.log('Local play works without cloud services. Hosting on Vercel requires Upstash.');
if(process.argv.includes('--require-all')&&missing)process.exitCode=1;
