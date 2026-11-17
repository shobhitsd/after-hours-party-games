import {test,expect} from '@playwright/test';
const common={fruit:'Papaya',animal:'Elephant',bird:'Hornbill',vegetable:'Cucumber',country:'Chile',instrument:'Guitar',flower:'Marigold',food:'Biryani',sport:'Cricket',color:'Purple'};

for(const [width,height] of [[320,740],[390,844],[768,1024],[1024,768],[1440,1000]])test(`Updraft: welcome, complete five rounds and reveal at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/updraft');await expect(page.getByRole('button',{name:/Start a free flight/})).toBeEnabled();await page.screenshot({path:`test-results/hidden-welcome-${width}.png`,fullPage:true,animations:'disabled'});
 await page.getByRole('button',{name:/Start a free flight/}).click();await expect(page.locator('.action-panel')).toBeVisible();
 for(let i=0;i<5;i++){
  const prompt=page.locator('[data-prompt]').first();const id=await prompt.getAttribute('data-prompt');await prompt.click();await page.getByLabel(/^Name a /).fill(common[id]);
  await page.getByRole('button',{name:'Use answer'}).click();await expect(page.locator('.probe-letters')).toBeVisible();await page.locator('[data-probe]').first().click();await expect(page.locator('#solve-form')).toBeVisible();
  if(i===0){const mask=await page.locator('.hidden-words').textContent();await page.reload();await expect(page.locator('#solve-form')).toBeVisible();expect(await page.locator('.hidden-words').textContent()).toBe(mask);await page.screenshot({path:`test-results/hidden-play-${width}.png`,fullPage:true,animations:'disabled'});}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(i<4)await page.getByRole('button',{name:'Next round'}).click();else await page.getByRole('button',{name:'Finish & reveal'}).click();
 }
 await expect(page.locator('.answer-reveal')).toBeVisible();await expect(page.getByText('No solve bonus this flight')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`test-results/hidden-result-${width}.png`,fullPage:true,animations:'disabled'});expect(errors).toEqual([]);
});
test('Updraft: invalid answers preserve input, prompts do not flicker, same-context tabs share a dive',async({page,context})=>{
 await page.goto('/updraft');await page.getByRole('button',{name:/Start a free flight/}).click();await page.locator('[data-prompt]').first().click();
 await page.locator('#trivia-answer').fill('gibberishzzzz');await page.getByRole('button',{name:'Use answer'}).click();await expect(page.getByRole('alert')).toContainText('starter dictionary');await expect(page.locator('#trivia-answer')).toHaveValue('gibberishzzzz');
 const prompt=await page.locator('.prompt.chosen').getAttribute('data-prompt');await page.locator('#trivia-answer').fill(common[prompt]);await page.getByRole('button',{name:'Use answer'}).click();await expect(page.locator('.probe-letters')).toBeVisible();
 const second=await context.newPage();await second.goto('/updraft');await second.getByRole('button',{name:/Resume your flight/}).click();await expect(second.locator('.probe-letters')).toBeVisible();
 await page.locator('[data-probe]').first().click();await second.locator('[data-probe]').first().click();await expect(second.locator('#solve-form')).toBeVisible();
 expect(await page.locator('.score-chip').textContent()).toBe(await second.locator('.score-chip').textContent());
 await expect(page.locator('#notice')).toHaveText('',{timeout:7000});
});
test('homepage exposes solo game without mixing it into the multiplayer catalogue',async({page})=>{
 await page.goto('/');await expect(page.locator('.solo-discovery')).toBeVisible();await expect(page.locator('.game-card')).toHaveCount(6);await page.getByRole('link',{name:/Play solo for free/}).click();await expect(page).toHaveURL(/updraft/);await expect(page.locator('h1')).toContainText('Updraft');
});
test('Updraft tutorial works offline, advances immediately and keeps real history untouched',async({page,context})=>{
 let moves=0;page.on('request',r=>{if(r.url().includes('/api/hidden/move'))moves++;});
 await page.goto('/updraft');await page.getByRole('button',{name:'Show me how'}).click();await context.setOffline(true);
 await page.locator('[data-prompt="fruit"]').click();await page.locator('#trivia-answer').fill('Papaya');
 const answerMs=await page.evaluate(()=>{const start=performance.now();document.querySelector('#answer-form').requestSubmit();if(!document.querySelector('[data-probe]'))throw new Error('Tutorial waited for network');return performance.now()-start;});expect(answerMs).toBeLessThan(100);
 await page.getByRole('button',{name:'Test letter P',exact:true}).click();await expect(page.locator('.letter-tile.revealed')).toHaveCount(3);
 const nextMs=await page.evaluate(()=>{const start=performance.now();document.querySelector('[data-move="next"]').click();if(!document.querySelector('[data-prompt]'))throw new Error('Tutorial waited for network');return performance.now()-start;});expect(nextMs).toBeLessThan(100);
 await page.locator('[data-prompt="instrument"]').click();await page.locator('#trivia-answer').fill('Piano');await page.getByRole('button',{name:'Use answer'}).click();await page.getByRole('button',{name:'Test letter I',exact:true}).click();await expect(page.locator('.air')).toContainText('5/6 Fuel');
 await page.locator('#solve-answer').fill('Paper plane');await page.getByRole('button',{name:'Try to solve'}).click();await expect(page.locator('.answer-reveal')).toHaveText('PAPER PLANE');await expect(page.locator('.total')).toContainText('365');expect(moves).toBe(0);
 await context.setOffline(false);await page.reload();await expect(page.locator('.answer-reveal')).toHaveText('PAPER PLANE');
 const real=await page.request.post('/api/hidden/state',{data:{}});expect((await real.json()).run).toBeNull();
 await page.screenshot({path:'test-results/updraft-tutorial-result.png',fullPage:true,animations:'disabled'});
});
test('Updraft next round opens before a delayed save; draft survives confirmation',async({page})=>{
 await page.goto('/updraft');await page.getByRole('button',{name:/Start a free flight/}).click();await page.getByRole('button',{name:/Skip this round/}).click();
 await expect(page.getByRole('button',{name:'Next round'})).toBeEnabled();
 let release;const gate=new Promise(r=>release=r);await page.route('**/api/hidden/move',async route=>{if(route.request().postDataJSON().action==='next')await gate;await route.continue();});
 try{
  const elapsed=await page.evaluate(()=>{const t=performance.now();document.querySelector('[data-move="next"]').click();if(!document.querySelector('[data-prompt]'))throw new Error('Waited for save before rendering');return performance.now()-t;});expect(elapsed).toBeLessThan(100);
  const option=page.locator('[data-prompt]').first();await option.click();await page.locator('#trivia-answer').fill('My draft');await expect(page.getByRole('button',{name:'Use answer'})).toBeDisabled();release();await expect(page.getByRole('button',{name:'Use answer'})).toBeEnabled();await expect(page.locator('#trivia-answer')).toHaveValue('My draft');
 }finally{release();}
});
test('Updraft failed next-round save rolls back; safe retry resumes without losing the draft',async({page})=>{
 await page.goto('/updraft');await page.getByRole('button',{name:/Start a free flight/}).click();await page.getByRole('button',{name:/Skip this round/}).click();let fail=true;
 await page.route('**/api/hidden/move',async route=>{if(fail&&route.request().postDataJSON().action==='next'){fail=false;await route.abort();}else await route.continue();});
 await page.getByRole('button',{name:'Next round'}).click();await expect(page.getByRole('button',{name:'Retry this move'})).toBeVisible();await expect(page.locator('#solve-form')).toBeVisible();await page.getByRole('button',{name:'Retry this move'}).click();await expect(page.locator('[data-prompt]')).toHaveCount(2);await expect(page.locator('.action-panel .eyebrow')).toContainText('ROUND 2');
});
test('Updraft animations run, then clean up; reduced-motion disables decorative motion',async({page})=>{
 await page.goto('/updraft');await expect(page.locator('.hero-balloon')).toBeVisible();expect(await page.locator('.hero-balloon').evaluate(el=>el.getAnimations().length)).toBeGreaterThan(0);
 await page.getByRole('button',{name:'Show me how'}).click();await page.locator('[data-prompt="fruit"]').click();await expect(page.locator('.sky-spark').first()).toBeVisible();await page.locator('#trivia-answer').fill('Papaya');await page.getByRole('button',{name:'Use answer'}).click();await page.getByRole('button',{name:'Test letter P',exact:true}).click();await expect(page.locator('.sky-spark')).toHaveCount(0,{timeout:3000});
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-home]').first().click();await page.getByRole('button',{name:'Show me how'}).click();await page.locator('[data-prompt="fruit"]').click();expect(await page.locator('.sky-spark').count()).toBe(0);expect(await page.locator('.flight-balloon').evaluate(el=>el.getAnimations().length)).toBe(0);
});
