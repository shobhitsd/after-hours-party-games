import {test,expect,webkit,firefox} from '@playwright/test';
// Known portrait/panorama fixtures make image geometry checks independent of CDN availability.
async function imageFixtures(page){await page.route('https://images.unsplash.com/**',route=>{const portrait=route.request().url().length%2===0,w=portrait?300:900,h=portrait?600:300;return route.fulfill({contentType:'image/svg+xml',body:`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="100%" height="100%" fill="#dbe6cf"/><rect x="3" y="3" width="${w-6}" height="${h-6}" fill="none" stroke="#425c39" stroke-width="6"/><circle cx="${w/2}" cy="${h/2}" r="100" fill="#e9c577"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="26" fill="#283520">Complete photo</text></svg>`});});}
test.beforeEach(async({page})=>imageFixtures(page));
const screens=[[320,740],[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1180,820],[1280,720],[1440,900],[1920,1080]];
const snap=page=>page.evaluate(()=>window.getState());
async function widths(page,label){for(const [width,height]of screens){await page.setViewportSize({width,height});expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),`${label} ${width}x${height}`).toBeLessThanOrEqual(1);}}
async function begin(page){await page.goto('/');await page.locator('.art-button[data-game="packed"]').click();await page.locator('[data-option="packedRounds"]').selectOption('5');await page.getByRole('button',{name:'Try with practice bots'}).click();await expect(page.locator('.play-heading h1')).toContainText('Packed House');}
async function next(page){const before=(await snap(page)).phaseId;await expect(page.locator('[data-action="continuePractice"]')).toBeEnabled();await page.locator('[data-action="continuePractice"]').click();await expect.poll(async()=>(await snap(page)).phaseId).toBeGreaterThan(before);}
async function toPick(page){await page.locator('[data-action="lock-rank"]').click();await next(page);await expect(page.locator('[data-action="lock"]')).toBeVisible();}
test('Packed House: all phases, replacements, verified reveals, 12 sizes, full game, reload and rematch',async({page})=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await begin(page);
 await widths(page,'Rank');await page.setViewportSize({width:390,height:844});
 for(let round=1;round<=5;round++){
  await expect(page.locator('.rank-item')).toHaveCount(5);
  if(round===1){await widths(page,'Rank');await page.setViewportSize({width:390,height:844});}
  await page.locator('[data-action="lock-rank"]').click();await expect.poll(async()=>(await snap(page))?.ownAnswer).toBeDefined();const before=(await snap(page))?.ownAnswer;
  await page.locator('[data-rank-move="0"][data-direction="1"]').click();await page.locator('[data-action="lock-rank"]').click();await expect.poll(async()=>(await snap(page))?.ownAnswer).toEqual([before[1],before[0],...before.slice(2)]);
  if(round===1){await page.reload();await expect(page.locator('[data-action="lock-rank"]')).toContainText('Update');}
  await next(page);await expect(page.locator('.packed-room')).toHaveCount(5);await expect(page.locator('.packed-explainer')).toBeVisible();
  await expect.poll(async()=>(await snap(page))?.stage).toBe('pick');const first=await page.locator('.packed-room').first().elementHandle();
  await page.locator('.packed-room').first().click();await page.locator('[data-action="lock"]').click();await expect.poll(async()=>(await snap(page))?.ownAnswer).toBeDefined();const old=(await snap(page))?.ownAnswer;
  await page.locator('.packed-room').nth(1).click();await page.locator('[data-action="lock"]').click();await expect.poll(async()=>(await snap(page))?.ownAnswer).not.toBe(old);expect(await first.evaluate(node=>node.isConnected)).toBe(true);
  if(round===1){await widths(page,'Pick');await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/packed-pick-phone.png',fullPage:true,animations:'disabled'});}
  await next(page);await expect(page.locator('.packed-verification.valid')).toContainText('Round verified');await expect(page.locator('.packed-result')).toHaveCount(5);
  if(round===1){await widths(page,'Reveal');await page.setViewportSize({width:820,height:1180});await page.screenshot({path:'test-results/packed-reveal-ipad.png',fullPage:true,animations:'disabled'});await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'test-results/packed-reveal-desktop.png',fullPage:true,animations:'disabled'});}
  const result=await snap(page);expect(result.result.packed.rooms.reduce((sum,r)=>sum+r.awarded,0)).toBe(Object.values(result.result.points).reduce((a,b)=>a+b,0));
  await page.locator('[data-action="next"]').click();
 }
 await expect(page.locator('.final-scores')).toBeVisible();await widths(page,'Final');expect((await snap(page)).players.every(p=>Number.isInteger(p.score))).toBe(true);expect(errors).toEqual([]);
 await page.locator('[data-action="rematch"]').click();await expect.poll(async()=>(await snap(page)).round).toBe(1);expect((await snap(page)).players.every(p=>p.score===0)).toBe(true);
});
test('Packed House: custom pack save, invalid inputs, text escaping and anonymous ballots',async({page})=>{
 await page.goto('/');await expect(page.locator('[data-game="lone"], [data-game="seat"]')).toHaveCount(0);await page.locator('.art-button[data-game="packed"]').click();await page.locator('[data-option="packedRounds"]').selectOption('5');await page.locator('[data-option="packedAnonymous"]').selectOption('true');await page.locator('[data-option="packedPack"]').selectOption('custom');
 await page.locator('#packed-custom').fill('Same? | A | a | B | C | D');await page.locator('[data-action="save-packed-custom"]').click();await expect(page.locator('#toast')).toContainText('distinct');
 const rows=Array.from({length:5},(_,i)=>`Pick <b>${i}</b>? | <img src=x> | Blue | Green | Red | Purple`);await page.locator('#packed-custom').fill(rows.join('\n'));await page.locator('[data-action="save-packed-custom"]').click();await expect(page.locator('.game-options')).toContainText('5 saved questions');
 await page.getByRole('button',{name:'Try with practice bots'}).click();await expect(page.locator('.stage-intro h2')).toContainText('<b>');await expect(page.locator('.packed-rank img')).toHaveCount(0);await toPick(page);await page.locator('.packed-room').first().click();await page.locator('[data-action="lock"]').click();await next(page);
 await page.locator('.packed-ballots summary').click();await expect(page.locator('.packed-ballot-list')).toContainText('Anonymous ballot');expect((await snap(page)).result.packed.rankings.every(r=>!r.id)).toBe(true);
 // A maliciously edited reveal must fail the client check against its earlier commitment.
 await page.evaluate(()=>{const s=structuredClone(window.getState());s.result.packed.proof.nonce='0'.repeat(64);s.revision++;window.setState(s);});await expect(page.locator('.packed-verification.invalid')).toContainText('Verification failed');
});
test('Packed House: delayed responses and duplicate tabs keep one identity and latest saved choice',async({page,context})=>{
 test.setTimeout(60000);await begin(page);await toPick(page);const auth=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('afterhours-session')));const second=await context.newPage();await second.goto(`/#seat=${auth.code}.${auth.token}`);await expect(second.locator('.packed-room')).toHaveCount(5);
 let delayed=false,release;const gate=new Promise(resolve=>release=resolve);await page.route('**/api/action',async route=>{const response=await route.fetch();if(!delayed&&route.request().postDataJSON().action==='submit'){delayed=true;await gate;}await route.fulfill({response});});
 await page.locator('.packed-room').nth(1).click();await page.locator('[data-action="lock"]').click();await expect.poll(async()=>(await snap(second)).ownAnswer).toBe(Number(await page.locator('.packed-room').nth(1).getAttribute('data-choice')));
 const final=Number(await second.locator('.packed-room').nth(2).getAttribute('data-choice'));
 await second.locator('.packed-room').nth(2).click();await second.locator('[data-action="lock"]').click();await expect.poll(async()=>(await snap(second))?.ownAnswer).toBe(final);await expect.poll(async()=>(await snap(page))?.ownAnswer).toBe(final);
 release();await expect(page.locator('[data-action="lock"]')).toBeEnabled();expect((await snap(page)).ownAnswer).toBe(final);
 await page.reload();await expect.poll(async()=>(await snap(page))?.ownAnswer).toBe(final);await second.close();await next(page);expect((await snap(page)).result.rows).toHaveLength(6);await expect(page.locator('.packed-verification.valid')).toBeVisible();
});
for(const [name,engine]of [['WebKit',webkit],['Firefox',firefox]])test(`Packed House ${name}: ranking, picks, proof and touch-size layout`,async({baseURL})=>{
 test.setTimeout(60000);const browser=await engine.launch({headless:true,channel:''});try{const page=await browser.newPage({baseURL,viewport:{width:390,height:844}});await imageFixtures(page);await begin(page);await toPick(page);await page.locator('.packed-room').first().click();await page.locator('[data-action="lock"]').click();await next(page);await expect(page.locator('.packed-verification.valid')).toBeVisible();await widths(page,name);}finally{await browser.close();}
});
test('Packed House: drag and touch pointer controls reorder once; cancelling preserves the order',async({page})=>{
 await begin(page);await page.locator('.rank-list').evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));const labels=await page.locator('.rank-item>strong').allTextContents();
 await page.locator('.rank-item').first().dragTo(page.locator('.rank-item').nth(2));await expect(page.locator('.rank-item>strong')).toHaveText([labels[1],labels[2],labels[0],...labels.slice(3)]);
 await page.setViewportSize({width:390,height:844});await page.locator('.rank-item').first().scrollIntoViewIfNeeded();
 const touch=async cancel=>page.evaluate(cancel=>{const first=document.querySelector('.rank-drag-handle'),rows=[...document.querySelectorAll('.rank-item')],a=rows[0].getBoundingClientRect(),b=rows[1].getBoundingClientRect(),details={bubbles:true,pointerType:'touch',pointerId:5,clientX:a.x+20,clientY:a.y+20};first.dispatchEvent(new PointerEvent('pointerdown',details));document.dispatchEvent(new PointerEvent('pointermove',{...details,clientY:b.y+20}));document.dispatchEvent(new PointerEvent(cancel?'pointercancel':'pointerup',{...details,clientY:b.y+20}));},cancel);
 await touch(true);await expect(page.locator('.rank-item>strong')).toHaveText([labels[1],labels[2],labels[0],...labels.slice(3)]);await touch(false);await expect(page.locator('.rank-item>strong')).toHaveText([labels[2],labels[1],labels[0],...labels.slice(3)]);
 await page.locator('[data-action="lock-rank"]').click();await expect.poll(async()=>(await snap(page))?.ownAnswer).toEqual([2,1,0,3,4]);
});
test('Packed House: complete photos, readable labels and no tier badges across devices',async({page})=>{
 test.setTimeout(60000);await begin(page);await expect(page.locator('.demo-guide li')).toHaveCount(3);await expect(page.locator('.rank-item')).toHaveCount(5);
 async function checkImages(selector){
  for(const [width,height]of screens){await page.setViewportSize({width,height});await page.locator(selector).first().scrollIntoViewIfNeeded();
   await expect.poll(()=>page.locator(selector).first().evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
   const images=await page.locator(selector).evaluateAll(items=>items.map(img=>({fit:getComputedStyle(img).objectFit,transform:getComputedStyle(img).transform,w:img.clientWidth,h:img.clientHeight,frameW:img.parentElement.clientWidth,frameH:img.parentElement.clientHeight})));
   for(const img of images){expect(img.fit).toBe('contain');expect(img.transform).toBe('none');expect(img.w).toBeGreaterThanOrEqual(110);expect(img.h).toBeGreaterThanOrEqual(85);expect(img.w).toBeLessThanOrEqual(img.frameW);expect(img.h).toBeLessThanOrEqual(img.frameH);}
   expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
   const labels=page.locator('.rank-label,.packed-room-title,.result-header-text strong');expect(await labels.evaluateAll(items=>items.every(el=>el.scrollWidth<=el.clientWidth+1))).toBe(true);
  }
 }
 await checkImages('.packed-rank img');await toPick(page);await expect(page.locator('.packed-tier,.packed-tier-badge,.room-door')).toHaveCount(0);await checkImages('.packed-room-img');
 await page.locator('.packed-room').first().hover();expect(await page.locator('.packed-room-img').first().evaluate(img=>getComputedStyle(img).transform)).toBe('none');
 await page.locator('.packed-room').first().click();await page.locator('[data-action="lock"]').click();await next(page);expect((await page.locator('.result-header-text').allTextContents()).join(' ')).not.toContain('TIER');await checkImages('.result-thumb-img');
});
test('Packed House: failed photo leaves a named, playable option',async({page})=>{
 await page.route('https://images.unsplash.com/**',route=>route.abort());await begin(page);await expect(page.locator('.packed-image-fallback').first()).toContainText('Photo unavailable');await expect(page.locator('.packed-image-fallback').first()).toBeVisible();await expect(page.locator('.rank-label').first()).not.toBeEmpty();await toPick(page);await expect(page.locator('.packed-image-fallback').first()).toContainText('Photo unavailable');await expect(page.locator('.packed-image-fallback').first()).toBeVisible();await page.locator('.packed-room').first().click();await page.locator('[data-action="lock"]').click();await expect.poll(async()=>(await snap(page))?.ownAnswer).toBeDefined();
});
test('Packed House live: ten players, six rooms, private picks, spectator, host migration, pause and early finish',async({browser,request})=>{
 test.setTimeout(90000);const headers=a=>({Authorization:'Bearer '+a.token,'X-Room-Code':a.code});
 const call=async(path,a,data)=>{const res=await request[data===undefined?'get':'post']('/api/'+path,{headers:headers(a),...(data===undefined?{}:{data})});expect(res.ok(),await res.text()).toBe(true);return res.json();};
 const host=await(await request.post('/api/create',{data:{name:'Host',game:'packed',options:{packedRounds:5,packedRankSeconds:10,packedPickSeconds:10}}})).json();const people=[host];
 for(let i=1;i<10;i++)people.push(await(await request.post('/api/join',{data:{code:host.code,name:'Friend '+i}})).json());
 const contexts=await Promise.all([browser.newContext(),browser.newContext(),browser.newContext()]);const [a,b,c]=await Promise.all(contexts.map(ctx=>ctx.newPage()));let timer;const away=new Set();
 try{
  await a.goto(`/#seat=${host.code}.${host.token}`);await b.goto(`/#seat=${host.code}.${people[1].token}`);
  timer=setInterval(()=>Promise.allSettled(people.filter(p=>!away.has(p.token)).map(p=>call('presence',p,{}))),3000);
  await a.locator('[data-action="start"]').click();await expect.poll(async()=>(await snap(a))?.stage).toBe('rank');await expect(a.locator('.rank-item')).toHaveCount(6);
  const s=await snap(a),packet={game:'packed',round:s.round,stage:s.stage,phaseId:s.phaseId,action:'submit',value:[0,1,2,3,4,5]};await Promise.all(people.map(p=>call('action',p,packet)));expect((await call('state',host)).state.stage).toBe('rank');
  const watcher=await(await request.post('/api/join',{data:{code:host.code,name:'Watcher'}})).json();expect(watcher.state.spectator).toBe(true);await c.goto(`/#seat=${host.code}.${watcher.token}`);await expect(c.locator('.packed-meta')).toContainText('Watching');
  await expect.poll(async()=>(await snap(a))?.stage,{timeout:16000}).toBe('pick');await expect(a.locator('.packed-room')).toHaveCount(6);
  const pick=await snap(a);await Promise.all(people.map((p,i)=>call('action',p,{game:'packed',round:pick.round,stage:pick.stage,phaseId:pick.phaseId,action:'submit',value:i%6})));expect((await call('state',host)).state.stage).toBe('pick');
  const watching=(await call('state',watcher)).state;expect(watching.ownAnswer).toBeUndefined();expect(watching.tiers.every(t=>t.capacity===undefined)).toBe(true);await expect(a.locator('.packed-verification.valid')).toBeVisible({timeout:15000});await expect(c.locator('.packed-result')).toHaveCount(6);
  await a.locator('[data-action="next"]').click();await expect.poll(async()=>(await snap(a))?.round).toBe(2);
  for(const p of people.slice(3)){away.add(p.token);await call('leave',p,{});}await expect(a.locator('.packed-pause')).toContainText('3 connected');await expect(a.locator('[data-action="confirm-end-packed"]')).toBeVisible();
  away.add(host.token);await a.locator('[data-action="leave"]').click();await expect(b.locator('[data-action="confirm-end-packed"]')).toBeVisible();expect((await snap(b)).host).toBe(people[1].state.me);
  await b.locator('[data-action="confirm-end-packed"]').click();await b.getByRole('button',{name:'End game',exact:true}).click();await expect(b.locator('.final-scores')).toBeVisible();await expect(b.locator('.micro-note').filter({hasText:'unfinished'})).toHaveCount(0);expect((await snap(b)).players.map(p=>p.score)).toEqual((await call('state',people[2])).state.players.map(p=>p.score));
 }finally{clearInterval(timer);await Promise.all(contexts.map(ctx=>ctx.close()));}
});
