import {test,expect} from '@playwright/test';
import {promptById} from '../../lib/hidden-content.js';
import {matchAnswer} from '../../lib/hidden-engine.js';

const lesson=async page=>{await page.goto('/updraft');await page.getByRole('button',{name:'Show me how'}).click();};
const saved=page=>page.evaluate(()=>JSON.parse(sessionStorage.getItem('updraft-tutorial')));

test('live HTTP suggestions return only a candidate and award points only after confirmation',async({page})=>{
 await page.goto('/updraft');await page.getByRole('button',{name:/Start a free flight/}).click();
 await expect(page.locator('[data-prompt]')).toHaveCount(2);
 const before=await (await page.request.post('/api/hidden/state',{data:{}})).json();let candidate;
 for(const ref of before.run.prompts){
  const prompt=promptById(ref.id);
  for(const a of prompt.answers){
   if(a.word.length<5)continue;const typo=a.word.slice(0,1)+a.word.slice(2);
   try{matchAnswer(prompt,typo,{confirmTypos:true});}catch(e){if(e.code==='ANSWER_CONFIRMATION_REQUIRED'){candidate={prompt:ref.id,typo,word:e.suggestion.word};break;}}
  }
  if(candidate)break;
 }
 expect(candidate).toBeTruthy();await page.locator(`[data-prompt="${candidate.prompt}"]`).click();await page.locator('#trivia-answer').fill(candidate.typo);
 const response=page.waitForResponse(r=>r.url().endsWith('/api/hidden/move'));await page.locator('#answer-form button').click();const reply=await response;
 expect(reply.status()).toBe(422);expect(await reply.json()).toEqual({error:`Did you mean ${candidate.word}?`,code:'ANSWER_CONFIRMATION_REQUIRED',suggestion:{word:candidate.word}});
 await expect(page.locator('.answer-suggestion')).toContainText(`Did you mean ${candidate.word}?`);
 const unchanged=await (await page.request.post('/api/hidden/state',{data:{}})).json();expect(unchanged.run.revision).toBe(before.run.revision);expect(unchanged.run.score).toBe(0);expect(unchanged.run.history).toEqual([]);
 await page.locator('[data-confirm-answer]').click();await expect(page.locator('.answer-suggestion')).toHaveCount(0);
 await expect.poll(async()=>{const view=await (await page.request.post('/api/hidden/state',{data:{}})).json();return view.run.history[0]?.answer;}).toBe(candidate.word);
});

test('suggestions preserve the draft and score until Yes; No returns to editing; solves confirm too',async({page})=>{
 await lesson(page);await page.locator('[data-prompt="fruit"]').click();
 const initial=await saved(page);await page.locator('#trivia-answer').fill('Pappaya');await page.locator('#answer-form button').click();
 await expect(page.locator('.answer-suggestion')).toContainText('Did you mean Papaya?');expect(await saved(page)).toEqual(initial);
 await page.locator('[data-edit-answer]').click();await expect(page.locator('#trivia-answer')).toBeFocused();await expect(page.locator('#trivia-answer')).toHaveValue('Pappaya');
 await page.locator('#answer-form button').click();await page.locator('[data-confirm-answer]').click();await expect(page.locator('.probe-letters')).toBeVisible();expect((await saved(page)).history).toHaveLength(1);
 await page.locator('[data-probe="P"]').click();await expect(page.locator('[data-move="next"]')).toHaveCount(1);await expect(page.locator('.skip-guess')).toHaveCount(0);
 const decision=await saved(page);await page.locator('#solve-answer').fill('Paper plnae');await page.locator('#solve-form button').click();
 await expect(page.locator('.answer-suggestion')).toContainText('Did you mean Paper plane?');expect(await saved(page)).toEqual(decision);
 await page.locator('[data-confirm-answer]').click();await expect(page.locator('.answer-reveal')).toHaveText('PAPER PLANE');
});

for(const width of [320,390])test(`mobile ${width}: typing gives space to puzzle, choices and input`,async({page})=>{
 await page.setViewportSize({width,height:844});await lesson(page);
 await expect(page.locator('.ud-scene')).toHaveCSS('position','relative');await expect(page.locator('.ud-scene')).toHaveCSS('height','210px');
 await page.screenshot({path:`test-results/updraft-mobile-${width}.png`,fullPage:true});
 await page.locator('[data-prompt="fruit"]').click();await page.locator('#trivia-answer').fill('Pappaya');
 await expect(page.locator('.ud-scene')).toBeHidden();await expect(page.locator('#trivia-answer')).toHaveCSS('font-size','16px');
 // A reduced browser viewport exercises the space available above an on-screen keyboard.
 await page.setViewportSize({width,height:420});await page.locator('#trivia-answer').focus();
 const layout=await page.evaluate(()=>{const box=s=>document.querySelector(s).getBoundingClientRect();return {puzzle:box('.puzzle-panel').bottom,input:box('#trivia-answer').top,bottom:Math.max(box('#trivia-answer').bottom,box('#answer-form button').bottom),overflow:document.documentElement.scrollWidth>innerWidth};});
 expect(layout.overflow).toBe(false);expect(layout.puzzle).toBeLessThanOrEqual(layout.input);expect(layout.bottom).toBeLessThanOrEqual(420);
 await page.screenshot({path:`test-results/updraft-typing-${width}.png`});
 await page.locator('#answer-form button').click();await expect(page.locator('[data-confirm-answer]')).toBeInViewport();await page.locator('[data-edit-answer]').click();await expect(page.locator('#trivia-answer')).toHaveValue('Pappaya');
 await page.locator('#trivia-answer').fill('Papaya');await page.locator('#answer-form button').click();await page.setViewportSize({width,height:844});
 await expect(page.locator('.ud-scene')).toBeVisible();await page.locator('[data-probe="P"]').click();await page.locator('#solve-answer').fill('Paper');await expect(page.locator('.ud-scene')).toBeHidden();
});

for(const width of [390,1440])test(`prompt cards stay visible across a delayed save at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/updraft');await page.getByRole('button',{name:/Start a free flight/}).click();await page.locator('[data-move="skip-answer"]').click();
 let release;const gate=new Promise(r=>release=r);await page.route('**/api/hidden/move',async route=>{if(route.request().postDataJSON().action==='next')await gate;await route.continue();});
 try{
  await page.locator('[data-move="next"]').click();await expect(page.locator('[data-prompt]')).toHaveCount(2);
  await page.waitForTimeout(700);await page.evaluate(()=>{window.savedPanel=document.querySelector('.action-panel');window.savedPrompts=[...document.querySelectorAll('[data-prompt]')];window.promptSamples=[];window.sampleFrames=true;function sample(){const cards=[...document.querySelectorAll('[data-prompt]')];window.promptSamples.push(cards.length===2&&cards.every((el,i)=>el===window.savedPrompts[i]&&getComputedStyle(el).visibility==='visible'&&Number(getComputedStyle(el).opacity)>.99)&&Number(getComputedStyle(window.savedPanel).opacity)>.99);if(window.sampleFrames)requestAnimationFrame(sample);}sample();});
  release();await expect(page.locator('.save-status')).toHaveText('Progress saved');await page.waitForTimeout(650);
  const samples=await page.evaluate(()=>{window.sampleFrames=false;return window.promptSamples;});expect(samples.length).toBeGreaterThan(5);expect(samples.every(Boolean)).toBe(true);
  await page.locator('[data-prompt]').first().click();await page.locator('#trivia-answer').fill('My draft');await expect(page.locator('#trivia-answer')).toHaveValue('My draft');
 }finally{release();}
});

test('reduced motion keeps confirmations and all steps usable',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await lesson(page);
 for(let round=1;round<=5;round++){await page.locator('[data-move="skip-answer"]').click();await expect(page.locator('[data-move="next"],[data-move="finish"]')).toHaveCount(1);await page.locator(`[data-move="${round===5?'finish':'next'}"]`).click();}
 await expect(page.locator('.answer-reveal')).toBeVisible();
});

test.describe('touch controls',()=>{
 test.use({isMobile:true,hasTouch:true,viewport:{width:390,height:844}});
 test('a single tap submits and confirms without moving the target under the finger',async({page})=>{
  await lesson(page);await page.locator('[data-prompt="fruit"]').tap();await page.locator('#trivia-answer').fill('Pappaya');
  await page.locator('#answer-form button').tap();await expect(page.locator('[data-confirm-answer]')).toBeVisible();
  await page.locator('[data-confirm-answer]').tap();await expect(page.locator('.probe-letters')).toBeVisible();
  await page.locator('[data-probe="P"]').tap();await page.locator('#solve-answer').fill('Paper plane');await page.locator('#solve-form button').tap();
  await expect(page.locator('.answer-reveal')).toHaveText('PAPER PLANE');
 });
});
