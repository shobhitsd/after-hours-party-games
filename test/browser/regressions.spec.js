import { test, expect } from '@playwright/test';
import { chooseBotAction } from '../../bots.js';

async function credentials(page){return page.evaluate(()=>JSON.parse(sessionStorage.getItem('afterhours-session')));}
async function snapshot(page){const auth=await credentials(page);return (await (await page.request.get('/api/state',{headers:{Authorization:'Bearer '+auth.token,'X-Room-Code':auth.code}})).json()).state;}
async function begin(page,game='borrowed'){
 await page.goto('/');await page.locator(`.art-button[data-game="${game}"]`).click();await page.getByRole('button',{name:'Try with practice bots'}).click();await expect(page.locator('.play-heading')).toBeVisible();
}
async function advanceDemo(page){const before=await page.locator('#stage-content').getAttribute('data-key');const next=page.getByRole('button',{name:'Continue demo'});await expect(next).toBeEnabled();await next.click();await expect(page.locator('#stage-content')).not.toHaveAttribute('data-key',before);}
async function humanChoice(page,s){
 const answer=chooseBotAction(s);
 if((s.stage==='clue'&&['signals','decoy','twins'].includes(s.game))||s.stage==='tune'){
  await page.locator('#answer-input').fill(answer);await page.getByRole('button',{name:'Send it'}).click();
 }else{
  if(s.game==='crowd')await page.locator(`[data-vote="${answer}"]`).click();
  else if(s.game==='twins')await page.locator(`[data-partner="${answer}"]`).click();
  else for(const index of Array.isArray(answer)?answer:[answer])await page.locator(`[data-choice="${index}"]`).click();
  await page.locator('[data-action="lock"]').click();
 }
}

test('rapid card selection preserves nodes, focus, scroll, animations, order, and the bot update',async({page})=>{
 await page.setViewportSize({width:390,height:844});await begin(page);await page.locator('.word-card').first().scrollIntoViewIfNeeded();
 const first=await page.locator('.word-card').first().elementHandle();const stage=await page.locator('#stage-content').elementHandle();
 await expect(page.locator('#stage-content')).toHaveCSS('opacity','1');
 await page.evaluate(()=>{window.phaseAnimationStarts=0;document.querySelector('#stage-content').addEventListener('animationstart',e=>{if(e.target.id==='stage-content')window.phaseAnimationStarts++;});});
 await page.locator('.word-card').nth(2).click();await page.locator('.word-card').nth(5).click();await page.locator('.word-card').nth(9).click();
 await page.locator('.word-card').nth(10).click();await expect(page.locator('.word-card.picked')).toHaveCount(3);await expect(page.locator('[data-action="lock"]')).toBeEnabled();
 await page.locator('.word-card').nth(5).click();await page.locator('.word-card').nth(4).click();
 await expect(page.locator('.word-card[data-choice="2"] .selection-number')).toHaveText('1');await expect(page.locator('.word-card[data-choice="9"] .selection-number')).toHaveText('2');await expect(page.locator('.word-card[data-choice="4"] .selection-number')).toHaveText('3');
 const timing=await page.evaluate(()=>{const target=document.querySelector('[data-choice="4"]'),initialY=scrollY,start=performance.now();target.focus({preventScroll:true});for(let i=0;i<50;i++)target.click();return {elapsed:performance.now()-start,scrollDelta:Math.abs(scrollY-initialY),focused:document.activeElement===target};});
 expect(await first.evaluate(node=>node.isConnected)).toBe(true);expect(await stage.evaluate(node=>node.isConnected)).toBe(true);expect(timing.focused).toBe(true);expect(timing.scrollDelta).toBeLessThan(3);expect(await page.evaluate(()=>window.phaseAnimationStarts)).toBe(0);
 // The bot's live submission must not recreate the human's board either.
 await expect.poll(async()=> (await snapshot(page)).submitted.length).toBe(1);expect(await first.evaluate(node=>node.isConnected)).toBe(true);await expect(page.locator('.word-card.picked')).toHaveCount(3);
 await page.screenshot({path:'test-results/borrowed-selection-mobile.png',fullPage:true});
 await page.reload();await expect(page.locator('.word-card.picked')).toHaveCount(3);await expect(page.locator('[data-choice="4"] .selection-number')).toHaveText('3');
});

test('opponent hand, own hand, exact removed words, and intentional redraw remain auditable',async({page})=>{
 await begin(page);const original=await snapshot(page),opponent=[...original.hand];
 for(const i of [2,5,9])await page.locator(`[data-choice="${i}"]`).click();await page.locator('[data-action="lock"]').click();
 await expect(page.getByRole('button',{name:'Continue demo'})).toBeEnabled();expect((await snapshot(page)).stage).toBe('sabotage');await advanceDemo(page);
 await expect(page.locator('.hand-label.own')).toContainText('Team Peach');const own=await snapshot(page);expect(own.opponentHand.cards).toEqual(opponent);expect(own.opponentHand.removed).toEqual([2,5,9]);
 await expect(page.locator('.team-hand.passive-hand')).toBeVisible();await expect(page.locator('.audit-card.removed')).toHaveCount(3);for(const word of [opponent[2],opponent[5],opponent[9]])await expect(page.locator('.audit-card.removed').filter({hasText:word})).toHaveCount(1);
 await expect(page.locator('.word-card.removed')).toHaveCount(3);await page.locator('[data-action="confirm-redraw"]').click();await page.getByRole('button',{name:'Keep these words'}).click();expect((await snapshot(page)).hand).toEqual(own.hand);
 await page.locator('[data-action="confirm-redraw"]').click();await page.getByRole('button',{name:'Use my redraw'}).click();await expect(page.locator('.hand-change-note')).toContainText('You used your redraw');
 const redrawn=await snapshot(page);expect(new Set(redrawn.hand).size).toBe(12);for(const i of redrawn.removed)expect(redrawn.hand[i]).toBe(own.hand[i]);expect(redrawn.opponentHand.cards).toEqual(opponent);await expect(page.locator('.team-hand.passive-hand')).toBeVisible();
 await page.screenshot({path:'test-results/borrowed-hands-desktop.png',fullPage:true});
});

for(const game of ['signals','decoy','crowd','twins','borrowed'])test(`${game}: full practice game through every human role, every round, final scores, and rematch`,async({page})=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',error=>errors.push(error.message));await begin(page,game);const roles=new Set();let steps=0;
 while(steps++<80){
  const s=await snapshot(page);roles.add(s.role);
  if(s.status==='finished')break;
  if(s.stage==='reveal'){await page.locator('[data-action="next"]').click();await expect(page.locator('#stage-content')).not.toHaveAttribute('data-key',`phase-${s.phaseId}`);continue;}
  if(s.stage==='talk'){await page.locator('[data-action="skipTalk"]').click();continue;}
  if(s.canAct)await humanChoice(page,s);
  await advanceDemo(page);
 }
 await expect(page.locator('.final-scores')).toBeVisible();expect((await snapshot(page)).status).toBe('finished');expect(errors).toEqual([]);
 if(game==='decoy')expect([...roles]).toEqual(expect.arrayContaining(['Guide','Guesser','Saboteur']));
 if(game==='borrowed')expect([...roles]).toEqual(expect.arrayContaining(['Clue-giver','Guesser']));
 if(game==='signals')expect([...roles]).toEqual(expect.arrayContaining(['Signal sender','Receiver']));
 await page.locator('[data-action="rematch"]').click();await expect(page.locator('.round-status')).toContainText('1');expect((await snapshot(page)).players.every(p=>p.score===0)).toBe(true);
});

test('small screens, Unicode names, and typing survive live bot updates and refresh',async({page})=>{
 await page.setViewportSize({width:320,height:740});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.evaluate(()=>localStorage.setItem('afterhours-name','🎉ABCDEFGHIJKLMNOPQ'));
 await begin(page,'twins');await page.locator('#answer-input').fill('A thoughtful hint');const input=await page.locator('#answer-input').elementHandle();
 await page.locator('#answer-input').evaluate(node=>{node.focus();node.setSelectionRange(3,7);});
 await expect.poll(async()=> (await snapshot(page)).submitted.length).toBe(5);
 expect(await input.evaluate(node=>node.isConnected&&document.activeElement===node)).toBe(true);expect(await input.evaluate(node=>[node.selectionStart,node.selectionEnd])).toEqual([3,7]);
 await expect(page.locator('#answer-input')).toHaveValue('A thoughtful hint');await expect(page.locator('.players .avatar').first()).toHaveText('🎉');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.reload();await expect(page.locator('#answer-input')).toHaveValue('A thoughtful hint');await expect(page.locator('.demo-guide')).toContainText('No countdown');
});
