import {test,expect} from '@playwright/test';
const snapshot=page=>page.evaluate(()=>window.getState());
async function begin(page){await page.goto('/');await page.locator('.art-button[data-game="packed"]').click();await page.getByRole('button',{name:'Try with practice bots'}).click();await expect(page.locator('.rank-item')).toHaveCount(5);}

test('Question changes: confirmation, saved ranking reset, reload, shared budget, pick-phase removal and mobile layout',async({page})=>{
 await page.setViewportSize({width:360,height:800});await begin(page);
 const initial=await snapshot(page);await page.locator('[data-action="lock-rank"]').click();await expect.poll(async()=>(await snapshot(page)).ownAnswer).toBeDefined();
 await page.getByRole('button',{name:'Change question',exact:true}).click();await page.getByRole('button',{name:'Keep this question'}).click();expect((await snapshot(page)).question).toBe(initial.question);
 for(let i=0;i<3;i++){const before=await snapshot(page);await page.getByRole('button',{name:'Change question',exact:true}).click();await page.getByRole('button',{name:'Change for everyone'}).click();await expect.poll(async()=>(await snapshot(page)).phaseId).toBeGreaterThan(before.phaseId);expect((await snapshot(page)).question).not.toBe(before.question);expect((await snapshot(page)).ownAnswer).toBeUndefined();await expect(page.locator('.packed-change-question')).toContainText(`${2-i} of 3 changes left`);}
 await expect(page.getByRole('button',{name:'Change question',exact:true})).toBeDisabled();await page.reload();await expect(page.locator('.packed-change-question')).toContainText('0 of 3');
 for(const [width,height]of [[320,740],[390,844],[820,1180],[1440,900]]){await page.setViewportSize({width,height});expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);}
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/packed-question-changes-phone.png',fullPage:true,animations:'disabled'});
 await page.locator('[data-action="lock-rank"]').click();await expect(page.locator('[data-action="continuePractice"]')).toBeEnabled();await page.locator('[data-action="continuePractice"]').click();await expect(page.locator('.packed-room')).toHaveCount(5);await expect(page.locator('.packed-change-question')).toHaveCount(0);
});

test('Shared-storage polling transport receives another client update and reconnects after reload',async({page,request})=>{
 await page.route('**/api/events',r=>r.fulfill({contentType:'application/json',body:JSON.stringify({transport:'poll',interval:150})}));
 await begin(page);const initial=await snapshot(page),session=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('afterhours-session')));
 const response=await request.post('/api/action',{headers:{Authorization:'Bearer '+session.token,'X-Room-Code':session.code},data:{game:'packed',round:initial.round,stage:initial.stage,phaseId:initial.phaseId,action:'changeQuestion'}});expect(response.ok()).toBe(true);
 await expect.poll(async()=>(await snapshot(page)).questionChangesLeft).toBe(2);await page.reload();await expect(page.locator('.packed-change-question')).toContainText('2 of 3');await expect(page.locator('#connection-label')).toHaveText('Connected');
});

test('Host account sign-in, private saved packs, loading and sign-out on small screens (mock cloud)',async({page})=>{
 const questions=Array.from({length:5},(_,i)=>({question:'Your favourite '+i+'?',options:['A','B','C','D','E','F']}));let signed=false;
 await page.route('**/api/capabilities',r=>r.fulfill({json:{accounts:true,payments:true,transport:'sse'}}));
 await page.route('**/api/account/signin',async r=>{signed=true;await r.fulfill({json:{access_token:'mock-access-token-long',refresh_token:'mock-refresh-token',expires_at:Math.floor(Date.now()/1000)+3600}});});
 await page.route('**/api/account/me',r=>r.fulfill({json:{user:{id:'test-host',email:'host@example.com'},isVip:false}}));
 await page.route('**/api/account/signout',r=>r.fulfill({json:{ok:true}}));
 await page.route('**/api/account/packs',r=>r.fulfill({json:{packs:[{id:'11111111-1111-4111-8111-111111111111',title:'Vegetarian favourites',questions}]}}));
 await page.setViewportSize({width:360,height:800});await page.goto('/');await page.getByRole('button',{name:'Host account',exact:true}).click();await page.getByLabel('Email', {exact:true}).fill('host@example.com');await page.getByLabel('Password',{exact:true}).fill('test-password');await page.getByRole('button',{name:'Sign in',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('Vegetarian favourites');expect(signed).toBe(true);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);await page.screenshot({path:'test-results/host-account-phone.png',fullPage:true,animations:'disabled'});
 await page.getByRole('button',{name:'Use pack'}).click();await expect(page.getByRole('dialog')).toContainText('5 saved questions');await page.getByRole('button',{name:'Close dialog'}).click();await page.getByRole('button',{name:'Host account',exact:true}).click();await page.getByRole('button',{name:'Sign out',exact:true}).click();await expect(page.getByRole('button',{name:'Sign in',exact:true})).toBeVisible();expect(await page.evaluate(()=>sessionStorage.getItem('afterhours-account'))).toBeNull();
});
