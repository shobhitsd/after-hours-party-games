let authSession=null,profile=null,packs=[],features={accounts:false,payments:false},refreshing;
try{authSession=JSON.parse(sessionStorage.getItem('afterhours-account'));}catch{}
const persist=value=>{if(value&&!value.expires_at)value.expires_at=Math.floor(Date.now()/1000)+(value.expires_in||3600);authSession=value;if(value)sessionStorage.setItem('afterhours-account',JSON.stringify(value));else sessionStorage.removeItem('afterhours-account');};
async function request(path,data,authenticated=true){
 const r=await fetch('/api/'+path,{method:'POST',headers:{'Content-Type':'application/json',...(authenticated?accountHeaders():{})},body:JSON.stringify(data)}),result=await r.json();if(!r.ok)throw new Error(result.error||'Account request failed.');return result;
}
export const accountHeaders=()=>authSession?.access_token?{'X-Account-Token':authSession.access_token}:{};
export const accountButton=()=>features.accounts?'<button class="nav-link account-access" data-action="account">Host account</button>':'';
export async function ensureAccount(){
 if(!authSession||authSession.expires_at*1000>Date.now()+60000)return;
 refreshing??=request('account/refresh',{refresh_token:authSession.refresh_token},false).then(persist).catch(e=>{persist(null);profile=null;throw e;}).finally(()=>refreshing=null);await refreshing;
}
export async function initAccount(){try{features=await (await fetch('/api/capabilities')).json();if(features.accounts)await ensureAccount();}catch{} }
export async function refreshAccount(){await ensureAccount();if(!authSession)return;profile=await request('account/me',{});packs=(await request('account/packs',{})).packs;}
export const getAccountProfile=()=>profile;
export function accountMarkup(esc,currentQuestions=[]){
 if(!authSession)return `<h2>Your host account</h2><p>Guests can play without an account. Sign in to save packs across devices.</p><form id="account-form"><label for="account-email">Email</label><input id="account-email" name="email" type="email" required autocomplete="email" maxlength="254"><label for="account-password">Password</label><input id="account-password" name="password" type="password" required minlength="8" maxlength="256" autocomplete="current-password"><div class="form-error" role="alert"></div><div class="modal-actions"><button class="btn primary" type="submit" name="intent" value="signin">Sign in</button><button class="btn outline" type="submit" name="intent" value="signup">Create account</button></div></form><p class="micro-note">New accounts may need email confirmation before sign-in.</p>`;
 const perms=profile?.permissions||{allowed_games:['*'],max_players:10,custom_packs_limit:3,vip_questions:false};
 const gamesCount=perms.allowed_games?.includes('*')?'All Games':`${perms.allowed_games?.length||6} Games`;
 return `<h2>Your host account</h2>
 <div class="account-plan-badge"><strong>${esc(profile?.planName||(profile?.isVip?'Host Pass':'Free Account'))}</strong><span>${esc(profile?.user?.email||'Signed in')}</span></div>
 <div class="account-perks-grid">
  <div class="perk-card"><span class="perk-icon">🎮</span><strong>${gamesCount}</strong><small>Included in your plan</small></div>
  <div class="perk-card"><span class="perk-icon">👥</span><strong>Up to ${perms.max_players||10}</strong><small>Players per room</small></div>
  <div class="perk-card"><span class="perk-icon">📦</span><strong>${perms.custom_packs_limit||3} Packs</strong><small>Custom pack limit</small></div>
  <div class="perk-card"><span class="perk-icon">💎</span><strong>${perms.vip_questions?'Unlocked':'Standard'}</strong><small>VIP Question Decks</small></div>
 </div>
 ${features.payments?`<div class="subscription-card"><h3>${profile?.isVip?'Subscription Active':'Upgrade to Host Pass'}</h3><p>${profile?.isVip?'Your Host Pass renewal is active. You can cancel future renewals at any time while keeping full access until the cycle ends.':'Host Pass gives you unlimited custom packs, expanded 20-player rooms, and upcoming VIP game features for ₹99/month.'}</p><div class="modal-actions">${profile?.isVip?'<button class="btn outline" data-action="account-cancel">Cancel future renewals</button>':'<button class="btn primary" data-action="account-upgrade">Open secure checkout (₹99/mo)</button>'}<button class="btn outline" data-action="account-refresh">Refresh membership</button></div><div id="checkout-link"></div></div>`:''}
 <h3>Your saved packs</h3><p>Choose custom questions in the Packed House settings, then save them here. Saved packs are private.</p><form id="save-pack-form"><label for="pack-title">Pack name</label><input id="pack-title" name="title" maxlength="80" required><div class="form-error" role="alert"></div><button type="submit" class="btn primary" ${currentQuestions.length>=5?'':'disabled'}>Save current ${currentQuestions.length} questions</button></form><div class="account-packs">${packs.map(p=>`<article><strong>${esc(p.title)}</strong><small>${p.questions.length} questions</small><button class="btn outline small" data-action="account-load" data-pack-id="${p.id}">Use pack</button><button class="btn outline small" data-action="account-delete" data-pack-id="${p.id}">Delete</button></article>`).join('')||'<p>No saved packs yet.</p>'}</div><button class="btn outline" data-action="account-signout">Sign out</button>`;
}
export async function accountSubmit(form,submitter,currentQuestions){
 if(form.id==='account-form'){const data=Object.fromEntries(new FormData(form)),result=await request('account/'+(submitter?.value==='signup'?'signup':'signin'),data,false);if(!result.access_token)return 'Check your email to confirm your account, then sign in.';persist(result);await refreshAccount();return 'Signed in.';}
 if(form.id==='save-pack-form'){await ensureAccount();await request('account/packs',{operation:'save',title:new FormData(form).get('title'),questions:currentQuestions});await refreshAccount();return 'Pack saved to your account.';}
}
export async function accountAction(action,el,{usePack,redraw,toast}){
 if(!action?.startsWith('account-'))return false;
 el.disabled=true;try{
  await ensureAccount();
  if(action==='account-signout'){await request('account/signout',{});persist(null);profile=null;packs=[];redraw();}
  if(action==='account-refresh'){await refreshAccount();redraw();}
  if(action==='account-upgrade'){const result=await request('subscribe/create-order',{});const u=new URL(result.url);if(u.protocol!=='https:'||!(u.hostname==='rzp.io'||u.hostname==='razorpay.com'||u.hostname.endsWith('.razorpay.com')))throw new Error('Invalid checkout address.');const link=document.createElement('a');link.href=u.href;link.target='_blank';link.rel='noopener noreferrer';link.className='btn primary';link.textContent='Continue to Razorpay';document.querySelector('#checkout-link').replaceChildren(link);}
  if(action==='account-cancel'){await request('subscribe/cancel',{});toast('Future renewals canceled. Access lasts through the paid period.');await refreshAccount();redraw();}
  if(action==='account-load'){const pack=packs.find(p=>p.id===el.dataset.packId);if(pack)await usePack(pack.questions);}
  if(action==='account-delete'){await request('account/packs',{operation:'delete',id:el.dataset.packId});await refreshAccount();redraw();}
 }finally{el.disabled=false;}return true;
}
