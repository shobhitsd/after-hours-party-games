import {test,expect} from '@playwright/test';
import {prompts} from '../../lib/hidden-content.js';
const tutorial=async page=>{await page.goto('/updraft');await page.getByRole('button',{name:'Show me how'}).click();};
const answer=async page=>{await page.locator('[data-prompt="fruit"]').click();await page.locator('#trivia-answer').fill('Papaya');await page.getByRole('button',{name:'Use answer'}).click();};
const state=page=>page.evaluate(()=>{const r=JSON.parse(sessionStorage.getItem('updraft-tutorial'));delete r.id;delete r.expires;return r;});
test('GSAP fall owns squash, trails and particles; reset restores the SVG and leaves no shot',async({page})=>{
 await tutorial(page);await answer(page);await page.locator('[data-ud-skip]').click();
 const original=await page.locator('.ud-balloon-position .ropes path').first().getAttribute('d');
 await page.getByRole('button',{name:'Test letter Y',exact:true}).click();
 await expect(page.locator('.ud-afterimage')).toHaveCount(3);await expect(page.locator('.ud-dust')).toHaveCount(12);
 await expect.poll(()=>page.locator('.ud-balloon-position .envelope-body').evaluate(el=>Number(window.gsap.getProperty(el,'scaleY')))).toBeLessThan(.95);
 const arm=await page.locator('.ud-balloon-position .arm-right').boundingBox(),balloon=await page.locator('.ud-balloon-position').boundingBox();expect(arm.x).toBeGreaterThan(balloon.x);expect(arm.x+arm.width).toBeLessThan(balloon.x+balloon.width+25);
 const eyes=await page.locator('.ud-balloon-position .eyes').boundingBox(),face=await page.locator('.ud-balloon-position .head > ellipse[rx="45"]').boundingBox();expect(eyes.y+eyes.height/2).toBeGreaterThan(face.y+face.height*.35);expect(eyes.y+eyes.height/2).toBeLessThan(face.y+face.height*.8);
 await page.locator('[data-ud-skip]').click();await expect(page.locator('.ud-particle,.ud-afterimage')).toHaveCount(0);await expect(page.locator('.ud-balloon-position .ropes path').first()).toHaveAttribute('d',original);
 const info=await page.evaluate(async()=>(await import('/updraft-motion.js')).cinemaDiagnostics());expect(info.engine).toBe('3.13.0');expect(info.playing).toBe(false);expect(info.queue).toBe(0);
 await page.emulateMedia({reducedMotion:'reduce'});await expect.poll(()=>page.evaluate(()=>window.gsap.globalTimeline.getChildren(true,true,true).filter(t=>t.isActive()).length),{timeout:1500}).toBe(0);
});
test('solved flight reveals bright happy place and skipped finale settles identically',async({page})=>{
 await tutorial(page);await answer(page);await page.getByRole('button',{name:'Test letter P',exact:true}).click();await page.locator('#solve-answer').fill('Paper plane');await page.getByRole('button',{name:'Try to solve'}).click();
 await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','landing');await expect(page.locator('.answer-reveal')).toHaveText('PAPER PLANE');await page.locator('[data-ud-skip]').click();await expect(page.locator('.ud-happy-place')).toHaveCSS('opacity','1');await expect(page.locator('.ud-particle')).toHaveCount(0);
 await page.reload();await expect(page.locator('.ud-happy-place')).toHaveCSS('opacity','1');
});
test('step reactions and varied falling acting stay cosmetic and interruptible',async({page})=>{
 await tutorial(page);const initial=await state(page);
 await page.locator('[data-prompt="fruit"]').click();await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','consider');expect(await state(page)).toEqual(initial);
 await page.locator('#trivia-answer').fill('Papaya');await page.getByRole('button',{name:'Use answer'}).click();await page.getByRole('button',{name:'Test letter Y',exact:true}).click();
 await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','wrong');await expect(page.locator('.ud-scene')).toHaveAttribute('data-pose','awe');
 await expect(page.locator('#solve-answer')).toBeEnabled();await page.locator('[data-ud-skip]').click();
 const saved=await state(page);await page.locator('[data-ud-wave]').focus();await page.keyboard.press('d');
 const variants=[];for(let i=0;i<6;i++){await page.locator('[data-ud-demo="wrong"]').click();variants.push(await page.locator('.ud-scene').getAttribute('data-variant'));await page.locator('[data-ud-skip]').click();}
 expect(variants.every((v,i)=>!i||v!==variants[i-1])).toBe(true);expect(await state(page)).toEqual(saved);
 await page.locator('.ud-director').evaluate(el=>el.hidden=true);await page.getByRole('button',{name:'Next round'}).click();await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','ready');await expect(page.locator('[data-prompt]').first()).toBeEnabled();
});
test('real server-confirmed deep discovery triggers close-up then the next sky',async({page})=>{
 await page.goto('/updraft');await page.getByRole('button',{name:'Start a free flight'}).click();
 const option=page.locator('[data-prompt]').first(),id=await option.getAttribute('data-prompt');
 const discovery=prompts.find(p=>p.id===id).answers.find(a=>a.tier==='Deep cut');
 await option.click();await page.locator('#trivia-answer').fill(discovery.word);await page.getByRole('button',{name:'Use answer'}).click();
 await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','rare');await expect(page.locator('[data-probe]').first()).toBeEnabled();
 await page.waitForTimeout(800);await page.screenshot({path:'.local/cinema-evidence/rare-real.png'});
 await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','sky');await page.locator('[data-ud-skip]').click();await expect(page.locator('.ud-sky-name')).toHaveText('Cloud Sea');await expect(page.locator('.rarity-pts')).toContainText('+40 pts');
});
test('skipping a queued rare/sky sequence settles its final dialogue and palette',async({page})=>{
 await tutorial(page);
 await page.evaluate(async()=>{
  const {cinematicFeedback,syncCinema}=await import('/updraft-motion.js');
  const before=JSON.parse(sessionStorage.getItem('updraft-tutorial'));
  const after={...before,revision:before.revision+1,score:40,history:[{answer:'Visual fixture',tier:'Deep cut'}]};
  // Presentation fixture only: no game storage or engine calls.
  syncCinema(after);cinematicFeedback(before,after,'answer');
  document.querySelector('[data-ud-skip]').click();
 });
 await expect(page.locator('.ud-sky-name')).toHaveText('Cloud Sea');await expect(page.locator('.ud-line')).toHaveText('Look up for a moment. A whole new sky is opening.');
 expect((await state(page)).score).toBe(0);await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','still');
});
test('complete identical flight with cinema on/off, no network moves or animation gates',async({browser})=>{
 const results=[];
 for(const disabled of [false,true]){
  const page=await browser.newPage();const errors=[];let moves=0;page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().includes('/api/hidden/move'))moves++;});
  await page.goto('/updraft'+(disabled?'?cinema=off':''));await page.getByRole('button',{name:'Show me how'}).click();await answer(page);
  if(!disabled)await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','correct');
  await page.getByRole('button',{name:'Test letter P',exact:true}).click();await page.getByRole('button',{name:'Next round'}).click();
  await page.locator('[data-prompt="instrument"]').click();await page.locator('#trivia-answer').fill('Piano');await page.getByRole('button',{name:'Use answer'}).click();await page.getByRole('button',{name:'Test letter I',exact:true}).click();
  if(!disabled)await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','wrong');
  await page.locator('#solve-answer').fill('Paper plane');await page.getByRole('button',{name:'Try to solve'}).click();await expect(page.locator('.total')).toContainText('425');
  if(!disabled)await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','landing');
  results.push(await state(page));expect(moves).toBe(0);expect(errors).toEqual([]);await page.close();
 }
 expect(results[0]).toEqual(results[1]);
});
test('skip and completion settle identically; typing preserves the rig; navigation clears shots',async({page})=>{
 await tutorial(page);await page.evaluate(()=>window.originalRig=document.querySelector('.ud-balloon-position'));await answer(page);
 await page.locator('[data-ud-skip]').click();const skipped=await page.locator('.ud-scene').evaluate(el=>({pose:el.dataset.pose,sky:el.dataset.sky,stars:el.querySelectorAll('.ud-found').length}));
 const saved=await state(page);await page.keyboard.press('d');await page.locator('[data-ud-demo="correct"]').click();await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','still',{timeout:3500});
 expect(await page.locator('.ud-scene').evaluate(el=>({pose:el.dataset.pose,sky:el.dataset.sky,stars:el.querySelectorAll('.ud-found').length}))).toEqual(skipped);expect(await state(page)).toEqual(saved);
 expect(await page.evaluate(()=>window.originalRig===document.querySelector('.ud-balloon-position'))).toBe(true);
 await page.locator('[data-ud-demo="rare"]').click();await page.locator('[data-home]').click();await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','still');
 expect(await page.locator('.ud-scene').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.constructor.name==='Animation').length)).toBe(0);
});
test('reduced motion, user motion preference and rapid previews leave no live cinematic handles',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await tutorial(page);await answer(page);await expect(page.locator('[data-ud-skip]')).toBeHidden();expect(await page.locator('.ud-scene').evaluate(el=>el.getAnimations({subtree:true}).length)).toBe(0);
 await page.emulateMedia({reducedMotion:'no-preference'});await page.keyboard.press('Tab');await page.locator('[data-ud-wave]').focus();await page.keyboard.press('d');
 const saved=await state(page);
 await page.evaluate(()=>{for(let i=0;i<50;i++)document.querySelector(`[data-ud-demo="${i%2?'rare':'wrong'}"]`).click();document.querySelector('[data-ud-skip]').click();});
 await expect(page.locator('.ud-scene')).toHaveAttribute('data-shot','still');expect(await state(page)).toEqual(saved);
 await page.locator('[data-ud-motion]').click();expect(await page.locator('.ud-scene').evaluate(el=>el.getAnimations({subtree:true}).length)).toBe(0);
 await page.reload();await expect(page.locator('.ud-scene')).toHaveAttribute('data-motion','off');
});
for(const width of [320,390,768,1024,1440])test(`scene, full balloon and game controls fit at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await tutorial(page);await answer(page);
 await page.locator('[data-ud-skip]').click();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 const scene=await page.locator('.ud-scene').boundingBox(),art=await page.locator('.ud-balloon-position').boundingBox();expect(art.x).toBeGreaterThanOrEqual(scene.x);expect(art.x+art.width).toBeLessThanOrEqual(scene.x+scene.width+1);
 await page.screenshot({path:`.local/cinema-evidence/play-${width}.png`,fullPage:true});
 await page.getByRole('button',{name:'Test letter P',exact:true}).click();await expect(page.locator('#solve-form')).toBeVisible();
 await page.locator('#solve-answer').fill('Paper plane');await page.getByRole('button',{name:'Try to solve'}).click();await expect(page.locator('.answer-reveal')).toHaveText('PAPER PLANE');
});
