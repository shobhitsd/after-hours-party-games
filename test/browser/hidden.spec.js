import {test,expect} from '@playwright/test';
import {prompts} from '../../lib/hidden-content.js';
// Any dealt prompt can be answered: take an everyday answer from the bank that this flight has not used.
const pick=(id,used=new Set())=>{const answer=prompts.find(p=>p.id===id).answers.find(a=>a.points<=10&&!used.has(a.key));used.add(answer.key);return answer.word;};

for(const [width,height] of [[320,740],[390,844],[768,1024],[1024,768],[1440,1000]])test(`Updraft: welcome, complete five rounds and reveal at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/updraft');await expect(page.getByRole('button',{name:/Start a free flight/})).toBeEnabled();await expect(page.locator('.pilot-streak')).toBeVisible();await page.screenshot({path:`test-results/hidden-welcome-${width}.png`,fullPage:true,animations:'disabled'});const used=new Set();
 await page.getByRole('button',{name:/Start a free flight/}).click();await expect(page.locator('.action-panel')).toBeVisible();
 for(let i=0;i<5;i++){
  const prompt=page.locator('[data-prompt]').first();const id=await prompt.getAttribute('data-prompt');await prompt.click();await page.locator('#trivia-answer').fill(pick(id,used));
  await page.getByRole('button',{name:'Use answer'}).click();await expect(page.locator('.probe-letters')).toBeVisible();await page.locator('[data-probe]').first().click();await expect(page.locator('#solve-form')).toBeVisible();
  if(i===0){const mask=await page.locator('.hidden-words').textContent();await page.reload();await expect(page.locator('#solve-form')).toBeVisible();expect(await page.locator('.hidden-words').textContent()).toBe(mask);await page.screenshot({path:`test-results/hidden-play-${width}.png`,fullPage:true,animations:'disabled'});}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(i<4)await page.getByRole('button',{name:'Next round'}).click();else await page.getByRole('button',{name:'Finish & reveal'}).click();
 }
 await expect(page.locator('.answer-reveal')).toBeVisible();await expect(page.getByText('No solve bonus this flight')).toBeVisible();await expect(page.locator('.rating .stars')).toBeVisible();await expect(page.getByRole('button',{name:/Fly another mystery/})).toBeEnabled();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`test-results/hidden-result-${width}.png`,fullPage:true,animations:'disabled'});expect(errors).toEqual([]);
});
test('Updraft: invalid answers preserve input, prompts do not flicker, same-context tabs share a dive',async({page,context})=>{
 await page.goto('/updraft');await page.getByRole('button',{name:/Start a free flight/}).click();await page.locator('[data-prompt]').first().click();
 await page.locator('#trivia-answer').fill('gibberishzzzz');await page.getByRole('button',{name:'Use answer'}).click();await expect(page.getByRole('alert')).toContainText('not in our dictionary');await expect(page.locator('#trivia-answer')).toHaveValue('gibberishzzzz');
 const prompt=await page.locator('.prompt.chosen').getAttribute('data-prompt');await page.locator('#trivia-answer').fill(pick(prompt));await page.getByRole('button',{name:'Use answer'}).click();await expect(page.locator('.probe-letters')).toBeVisible();
 const second=await context.newPage();await second.goto('/updraft');await second.getByRole('button',{name:/Resume your flight/}).click();await expect(second.locator('.probe-letters')).toBeVisible();
 await page.locator('[data-probe]').first().click();await second.locator('[data-probe]').first().click();await expect(second.locator('#solve-form')).toBeVisible();
 await expect(page.locator('.score-chip .score-value')).toHaveText(await second.locator('.score-chip .score-value').textContent());
 await expect(page.locator('#notice')).toHaveText('',{timeout:7000});
});
test('homepage exposes solo game without mixing it into the multiplayer catalogue',async({page})=>{
 await page.goto('/');await expect(page.locator('.solo-discovery')).toBeVisible();await expect(page.locator('.game-card')).toHaveCount(6);await page.getByRole('link',{name:/Play solo for free/}).click();await expect(page).toHaveURL(/updraft/);await expect(page.locator('h1')).toContainText('Updraft');
});
test('Updraft tutorial works offline, advances immediately and keeps real history untouched',async({page,context})=>{
 let moves=0;page.on('request',r=>{if(r.url().includes('/api/hidden/move'))moves++;});
 await page.goto('/updraft');await page.getByRole('button',{name:'Show me how'}).click();await context.setOffline(true);
 await page.locator('[data-prompt="fruit"]').click();await page.locator('#trivia-answer').fill('Papaya');
 const answerMs=await page.evaluate(()=>{const start=performance.now();document.querySelector('#answer-form').requestSubmit();if(!document.querySelector('[data-probe]'))throw new Error('Tutorial waited for network');return performance.now()-start;});expect(answerMs).toBeLessThan(300);
 await page.getByRole('button',{name:'Test letter P',exact:true}).click();await expect(page.locator('.letter-tile.revealed')).toHaveCount(3);
 const nextMs=await page.evaluate(()=>{const start=performance.now();document.querySelector('[data-move="next"]').click();if(!document.querySelector('[data-prompt]'))throw new Error('Tutorial waited for network');return performance.now()-start;});expect(nextMs).toBeLessThan(100);
 await page.locator('[data-prompt="instrument"]').click();await page.locator('#trivia-answer').fill('Piano');await page.getByRole('button',{name:'Use answer'}).click();await page.getByRole('button',{name:'Test letter I',exact:true}).click();await expect(page.locator('.air')).toContainText('5/6 Fuel');
 await page.locator('#solve-answer').fill('Paper plane');await page.getByRole('button',{name:'Try to solve'}).click();await expect(page.locator('.answer-reveal')).toHaveText('PAPER PLANE');await expect(page.locator('.total')).toContainText('425');expect(moves).toBe(0);
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
 await page.goto('/updraft');await expect(page.locator('.ud-balloon-drift')).toBeVisible();expect(await page.locator('.ud-balloon-drift').evaluate(el=>window.gsap.isTweening(el))).toBe(true);
 await page.getByRole('button',{name:'Show me how'}).click();await page.locator('[data-prompt="fruit"]').click();await expect(page.locator('.sky-spark').first()).toBeVisible();await page.locator('#trivia-answer').fill('Papaya');await page.getByRole('button',{name:'Use answer'}).click();await page.getByRole('button',{name:'Test letter P',exact:true}).click();await expect(page.locator('.sky-spark')).toHaveCount(0,{timeout:3000});
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-home]').first().click();await page.getByRole('button',{name:'Show me how'}).click();await page.locator('[data-prompt="fruit"]').click();expect(await page.locator('.sky-spark').count()).toBe(0);expect(await page.locator('.flight-balloon').evaluate(el=>el.getAnimations().length)).toBe(0);
});
test('Updraft hint: beside the mystery, confirmed before spending Fuel, clue then letter, server-priced',async({page})=>{
 await page.goto('/updraft');await page.getByRole('button',{name:/Start a free flight/}).click();await expect(page.locator('.action-panel')).toBeVisible();
 const hint=page.locator('.puzzle-question .hint-button');await expect(hint).toContainText('−1 Fuel');await expect(page.locator('.hint-card')).toHaveCount(0);
 let moves=0;page.on('request',r=>{if(r.url().includes('/api/hidden/move'))moves++;});
 await hint.click();await expect(hint).toContainText('Spend 1 Fuel?');await expect(page.locator('.air')).toContainText('6/6 Fuel');expect(moves).toBe(0);
 await hint.click();await expect(page.locator('.hint-card')).toBeVisible();await expect(page.locator('.air')).toContainText('5/6 Fuel');expect(moves).toBe(1);
 expect((await page.locator('.hint-card p').textContent()).length).toBeGreaterThan(20);await expect(page.locator('[data-prompt]')).toHaveCount(2);
 await expect(hint).toContainText('Reveal a letter');await expect(hint).toContainText('−2 Fuel');const before=await page.locator('.letter-tile.revealed').count();
 await hint.click();await hint.click();await expect(page.locator('.air')).toContainText('3/6 Fuel');await expect(page.locator('.hint-card em')).toContainText('Hint letter');
 expect(await page.locator('.letter-tile.revealed').count()).toBeGreaterThan(before);await expect(page.locator('.hint-button')).toHaveCount(0);
 // The revealed tile really is turned to its letter face in 3D.
 await expect.poll(()=>page.locator('.letter-tile.revealed .tile-inner').first().evaluate(el=>getComputedStyle(el).transform)).toMatch(/^matrix3d\(1, 0, 0, 0, 0, -1,/);
 await page.reload();await expect(page.locator('.hint-card')).toBeVisible();await expect(page.locator('.air')).toContainText('3/6 Fuel');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('Updraft scoring: quick bonus meter, keyboard launch, itemised result that adds up, streak and next flight',async({page})=>{
 await page.goto('/updraft');await page.getByRole('button',{name:/Start a free flight/}).click();
 await expect(page.locator('.quick-meter')).toContainText('+10 quick bonus');
 const option=page.locator('[data-prompt]').first(),id=await option.getAttribute('data-prompt');await option.click();await page.locator('#trivia-answer').fill(pick(id));await page.getByRole('button',{name:'Use answer'}).click();
 await expect(page.locator('.quick-chip')).toContainText('+10 quick');
 // Launch with the keyboard instead of the pointer; the visual director (D) must stay closed.
 const letter=await page.locator('[data-probe]').first().getAttribute('data-probe');await page.locator('.action-panel h2').focus();await page.keyboard.press(letter.toLowerCase());await expect(page.locator('#solve-form')).toBeVisible();await expect(page.locator('.ud-director')).toBeHidden();
 const view=await (await page.request.post('/api/hidden/state',{data:{}})).json();expect(view.run.score).toBe(view.run.rarity+view.run.quick+view.run.hitPoints);expect(view.run.quick).toBe(10);
 await page.locator('details.leave summary').click();await page.getByRole('button',{name:'End & reveal'}).click();await expect(page.locator('.answer-reveal')).toBeVisible();
 const rows=await page.locator('.score-breakdown>.score-row:not(.total) strong').allTextContents();const total=page.locator('.total [data-count]');
 await expect(total).toHaveText(String(rows.reduce((sum,value)=>sum+Number(value),0)));expect(Number(await total.textContent())).toBe(view.run.score);
 await expect(page.locator('.result-streak')).toBeVisible();await expect(page.locator('.flight-facts')).toContainText('letter accuracy');
 await page.getByRole('button',{name:/Fly another mystery/}).click();await expect(page.locator('.action-panel .eyebrow')).toContainText('ROUND 1');await expect(page.locator('.score-chip')).toContainText('0');
});
