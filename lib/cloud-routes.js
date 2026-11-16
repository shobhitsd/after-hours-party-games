export async function handleCloudPost(path,req,b,{database,billing,account}){
 if(['/api/account/signin','/api/account/signup','/api/account/refresh'].includes(path))return database.auth(path.split('/').pop(),b);
 if(path==='/api/account/signout'){await account(req);await database.request('logout',{method:'POST',auth:true,token:req.headers['x-account-token']});return {ok:true};}
 if(path==='/api/account/me'||path==='/api/user/subscription'){const user=await account(req);const entitlements=await database.getHostEntitlements(user.id,{fresh:true});return {user,isVip:Boolean(entitlements.is_active&&entitlements.vip_questions),plan:entitlements.plan_id,planName:entitlements.plan_name,permissions:entitlements};}
 if(path==='/api/account/plans')return {plans:await database.getSubscriptionPlans()};
 if(path==='/api/account/packs'){
  const user=await account(req),token=req.headers['x-account-token'];
  if(b.operation==='save')return database.saveCustomPack(token,b);
  if(b.operation==='delete'){if(typeof b.id!=='string'||!/^[0-9a-f-]{36}$/i.test(b.id))throw new Error('Invalid pack.');await database.request('custom_packs?id=eq.'+b.id,{method:'DELETE',token});return {ok:true};}
  return {packs:await database.request('custom_packs?host_id=eq.'+encodeURIComponent(user.id)+'&select=id,title,questions,is_public&order=updated_at.desc',{token})};
 }
 if(path==='/api/subscribe/create-order')return billing.create(await account(req));
 if(path==='/api/subscribe/cancel')return billing.cancel(await account(req));
}
