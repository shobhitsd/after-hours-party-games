import {test,expect} from '@playwright/test';
const common={fruit:'Papaya',animal:'Elephant',bird:'Hornbill',vegetable:'Cucumber',country:'Chile',instrument:'Guitar',flower:'Marigold',food:'Biryani',sport:'Cricket',color:'Purple'};

for(const [width,height] of [[320,740],[390,844],[768,1024],[1024,768],[1440,1000]])test(`Hidden Depths: welcome, complete five rounds and reveal at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/hidden-depths');await expect(page.getByRole('button',{name:/Take a free dive/})).toBeEnabled();await page.screenshot({path:`test-results/hidden-welcome-${width}.png`,fullPage:true});
 await page.getByRole('button',{name:/Take a free dive/}).click();await expect(page.locator('.action-panel')).toBeVisible();
 for(let i=0;i<5;i++){
  const prompt=page.locator('[data-prompt]').first();const id=await prompt.getAttribute('data-prompt');await prompt.click();await page.getByLabel(/^Name a /).fill(common[id]);
  await page.getByRole('button',{name:'Use answer'}).click();await expect(page.locator('.probe-letters')).toBeVisible();await page.locator('[data-probe]').first().click();await expect(page.locator('#solve-form')).toBeVisible();
  if(i===0){const mask=await page.locator('.hidden-words').textContent();await page.reload();await expect(page.locator('#solve-form')).toBeVisible();expect(await page.locator('.hidden-words').textContent()).toBe(mask);await page.screenshot({path:`test-results/hidden-play-${width}.png`,fullPage:true});}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(i<4)await page.getByRole('button',{name:'Next round'}).click();else await page.getByRole('button',{name:'Finish & reveal'}).click();
 }
 await expect(page.locator('.answer-reveal')).toBeVisible();await expect(page.getByText('No solve bonus this dive')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`test-results/hidden-result-${width}.png`,fullPage:true});expect(errors).toEqual([]);
});
test('Hidden Depths: invalid answers preserve input, prompts do not flicker, same-context tabs share a dive',async({page,context})=>{
 await page.goto('/hidden-depths');await page.getByRole('button',{name:/Take a free dive/}).click();await page.locator('[data-prompt]').first().click();
 await page.locator('#trivia-answer').fill('gibberishzzzz');await page.getByRole('button',{name:'Use answer'}).click();await expect(page.getByRole('alert')).toContainText('starter dictionary');await expect(page.locator('#trivia-answer')).toHaveValue('gibberishzzzz');
 const prompt=await page.locator('.prompt.chosen').getAttribute('data-prompt');await page.locator('#trivia-answer').fill(common[prompt]);await page.getByRole('button',{name:'Use answer'}).click();await expect(page.locator('.probe-letters')).toBeVisible();
 const second=await context.newPage();await second.goto('/hidden-depths');await second.getByRole('button',{name:/Resume your dive/}).click();await expect(second.locator('.probe-letters')).toBeVisible();
 await page.locator('[data-probe]').first().click();await second.locator('[data-probe]').first().click();await expect(second.locator('#solve-form')).toBeVisible();
 expect(await page.locator('.score-chip').textContent()).toBe(await second.locator('.score-chip').textContent());
 await page.getByLabel('End this dive early',{exact:false}).count();
});
test('homepage exposes solo game without mixing it into the multiplayer catalogue',async({page})=>{
 await page.goto('/');await expect(page.locator('.solo-discovery')).toBeVisible();await expect(page.locator('.game-card')).toHaveCount(6);await page.getByRole('link',{name:/Play solo for free/}).click();await expect(page).toHaveURL(/hidden-depths/);await expect(page.locator('h1')).toContainText('Hidden');
});
