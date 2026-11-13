import { test, expect } from '@playwright/test';

const titles={signals:'Signal Bridge',decoy:'Decoy Department',crowd:'Crowd Control',seat:'Last Seat',twins:'Almost Twins',borrowed:'Borrowed Words'};
async function practice(page,id){
 await page.goto('/');await page.locator(`.art-button[data-game="${id}"]`).click();await page.getByRole('button',{name:'Try with practice bots'}).click();await expect(page.locator('.play-heading h1')).toContainText(titles[id]);
}
async function continueDemo(page){const before=await page.locator('#stage-content').getAttribute('data-key');const button=page.getByRole('button',{name:'Continue demo'});await expect(button).toBeEnabled();await button.click();await expect(page.locator('#stage-content')).not.toHaveAttribute('data-key',before);}
async function submitText(page,value){await page.locator('#answer-input').fill(value);await page.getByRole('button',{name:'Send it'}).click();}

test('lounge, filters, instructions, keyboard dialog, and mobile layout',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.locator('.game-card')).toHaveCount(6);await page.screenshot({path:'test-results/lounge-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Wordplay'}).click();await expect(page.locator('.game-card')).toHaveCount(3);
 await page.getByRole('button',{name:'Social & bluffing'}).click();await expect(page.locator('.game-card')).toHaveCount(3);
 await page.getByRole('button',{name:'All games'}).click();await page.locator('[data-game="signals"]').first().click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.locator('.rule-list li')).toHaveCount(3);await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/lounge-mobile.png',fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('button',{name:'Join a room'}).click();await page.locator('#player-name').fill('Tester');await page.locator('#room-code').fill('XXXXX');await page.getByRole('button',{name:'Join the room'}).click();await expect(page.locator('.form-error')).toContainText('No room');
 expect(errors).toEqual([]);
});

for(const id of Object.keys(titles))test(`${titles[id]}: interactive practice through reveal on mobile`,async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:390,height:844});await practice(page,id);
 if(id==='signals'||id==='decoy'){await submitText(page,'Together');await continueDemo(page);if(id==='decoy')await continueDemo(page);}
 if(id==='crowd'){await submitText(page,'10000');await continueDemo(page);}
 if(id==='seat'){await page.getByRole('button',{name:'Everyone ready?'}).click();await page.locator('.destination').nth(3).click();await page.getByRole('button',{name:'Lock my choice'}).click();}
 if(id==='twins'){await submitText(page,'Familiar');await continueDemo(page);await expect(page.locator('.partner-card')).toHaveCount(5);await page.locator('.partner-card').first().click();await page.getByRole('button',{name:'Found my person'}).click();}
 if(id==='borrowed'){
  for(let i=0;i<3;i++)await page.locator('.word-card').nth(i).click();await page.getByRole('button',{name:'Remove 3/3 words'}).click();await continueDemo(page);
  await expect(page.locator('.clue-tray')).toBeVisible();for(let i=0;i<3;i++)await page.locator('.word-card:not([disabled])').nth(i).click();await page.getByRole('button',{name:'Send this clue'}).click();await continueDemo(page);
 }
 await continueDemo(page);await expect(page.locator('.reveal-rows')).toBeVisible();await page.screenshot({path:`test-results/${id}-mobile.png`,fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('button',{name:'One more round'}).click();await expect(page.locator('.round-status')).toContainText('2');
 // A reload restores this player and does not reset the round.
 await page.reload();await expect(page.locator('.round-status')).toContainText('2');expect(errors).toEqual([]);
});

test('six independent browser sessions join and play together, preserving private boards',async({browser})=>{
 const contexts=await Promise.all(Array.from({length:6},()=>browser.newContext()));const pages=await Promise.all(contexts.map(c=>c.newPage()));
 try{
  const host=pages[0];await host.goto('/');await host.getByRole('button',{name:'Host a game'}).click();await host.locator('#player-name').fill('Avery');await host.getByRole('button',{name:'Create my room'}).click();await expect(host.locator('.lobby-title')).toBeVisible();
  const session=await host.evaluate(()=>JSON.parse(sessionStorage.getItem('afterhours-session')));
  for(let i=1;i<6;i++){await pages[i].goto(`/?room=${session.code}`);await pages[i].locator('#player-name').fill('Friend '+i);await pages[i].getByRole('button',{name:'Join the room'}).click();await expect(pages[i].locator('.lobby-title')).toBeVisible();}
  await expect(host.locator('.players .player-row')).toHaveCount(6);await host.screenshot({path:'test-results/lobby.png',fullPage:true});await host.getByRole('button',{name:'Let’s play Signal Bridge'}).click();await expect(host.locator('.receiver-board')).toHaveCount(5);
  for(let i=1;i<6;i++){await expect(pages[i].locator('.word-card')).toHaveCount(9);await expect(pages[i].locator('.word-card.target')).toHaveCount(0);}
  await submitText(host,'Together');
  for(let i=1;i<6;i++){await expect(pages[i].locator('.clue-display')).toContainText('Together');await pages[i].locator('.word-card').first().click();await pages[i].getByRole('button',{name:'Lock it in'}).click();}
  for(const page of pages)await expect(page.locator('.reveal-rows')).toBeVisible();
  const scores=await host.locator('.score').allTextContents();expect(new Set(scores).size).toBe(1);
  await host.getByRole('button',{name:'One more round'}).click();await expect(pages[1].locator('.receiver-board')).toHaveCount(5);await expect(host.locator('.receiver-board')).toHaveCount(0);
 }finally{await Promise.all(contexts.map(c=>c.close()));}
});

test('Last Seat can be finished, rematched, and returned to the lounge',async({page})=>{
 await practice(page,'seat');
 for(let round=1;round<=6;round++){
  await page.getByRole('button',{name:'Everyone ready?'}).click();await page.locator('.destination').nth(3).click();await page.getByRole('button',{name:'Lock my choice'}).click();await continueDemo(page);await expect(page.locator('.reveal-rows')).toBeVisible();await page.getByRole('button',{name:round===6?'See the final scores':'One more round'}).click();
 }
 await expect(page.locator('.final-scores')).toBeVisible();await expect(page.locator('.final-score')).toHaveCount(6);await page.screenshot({path:'test-results/final-scores.png',fullPage:true});await page.getByRole('button',{name:'Play again'}).click();await expect(page.locator('.round-status')).toContainText('1');
 await page.getByRole('button',{name:'Back to the lounge'}).click();await page.getByRole('button',{name:'Back to lounge',exact:true}).click();await expect(page.locator('.lobby-title')).toBeVisible();await page.getByRole('button',{name:'Leave room',exact:true}).click();await expect(page.locator('.hero')).toBeVisible();
});

test('API rejects unauthorized and stale submissions',async({request})=>{
 const created=await request.post('/api/create',{data:{name:'API Host',practice:true,game:'seat'}});const {code,token,state}=await created.json();
 const headers={Authorization:'Bearer '+token,'X-Room-Code':code};
 expect((await request.get('/api/state',{headers:{...headers,Authorization:'Bearer invalid'}})).status()).toBe(400);
 const old={game:'seat',round:state.round,stage:'talk',phaseId:state.phaseId};
 expect((await request.post('/api/action',{headers,data:{...old,action:'skipTalk'}})).ok()).toBe(true);
 const stale=await request.post('/api/action',{headers,data:{...old,action:'submit',value:0}});expect(stale.status()).toBe(400);expect((await stale.json()).error).toContain('moved on');
 const crossOrigin=await request.post('/api/action',{headers:{...headers,Origin:'https://example.com'},data:{...old,action:'lobby'}});expect(crossOrigin.status()).toBe(403);
 const bad=await request.post('/api/action',{headers,data:{...old,stage:'pick',action:'submit',value:99}});expect(bad.status()).toBe(400);
});
