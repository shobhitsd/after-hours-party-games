import {test,expect,webkit,firefox} from '@playwright/test';
const screens=[[320,740],[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1180,820],[1280,720],[1440,900],[1920,1080]];
async function start(page,id,options={}){await page.goto('/');await page.locator(`.art-button[data-game="${id}"]`).click();for(const [key,value]of Object.entries(options))await page.locator(`[data-option="${key}"]`).selectOption(String(value));await page.getByRole('button',{name:'Try with practice bots'}).click();await expect(page.locator('.play-heading')).toBeVisible();}
async function next(page){await expect(page.getByRole('button',{name:'Continue demo'})).toBeEnabled();await page.getByRole('button',{name:'Continue demo'}).click();}
async function checkWidths(page,label){for(const [width,height]of screens){await page.setViewportSize({width,height});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),{message:`${label} at ${width}x${height}`}).toBeLessThanOrEqual(1);}}

for(const game of ['signals','decoy','crowd','twins','borrowed'])test(`${game}: phone, landscape, iPad and desktop layouts`,async({page})=>{
 test.setTimeout(60000);await page.emulateMedia({reducedMotion:'reduce'});await start(page,game,game==='signals'?{signalCards:12}:{});
 await checkWidths(page,game);
 if(game==='borrowed'){
  for(const i of [0,4,8])await page.locator(`[data-choice="${i}"]`).click();await page.locator('[data-action="lock"]').click();await expect(page.locator('.waiting-box')).toContainText('Both clue-givers have finished removing 3 cards each.');await expect(page.locator('.waiting-box')).not.toContainText('2 of 2 choices');await next(page);await expect(page.locator('.clue-tray')).toBeVisible();await expect(page.locator('.team-hand')).toHaveCount(2);await checkWidths(page,'both hands');
  await page.setViewportSize({width:820,height:1180});await page.screenshot({path:'test-results/borrowed-ipad.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/borrowed-phone.png',fullPage:true});
 }
});

test('Signal Bridge size selection, shared lobby settings, and live boards agree',async({page,request})=>{
 await page.goto('/');await page.locator('.art-button[data-game="signals"]').click();await page.locator('[data-option="signalCards"]').selectOption('12');await page.getByRole('button',{name:'Host this game'}).click();await page.locator('#player-name').fill('Host');await page.getByRole('button',{name:'Create my room'}).click();await expect(page.locator('[data-option="signalCards"]')).toHaveValue('12');
 const auth=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('afterhours-session')));let guest;
 for(let i=0;i<3;i++)guest=await(await request.post('/api/join',{data:{name:`Guest ${i}`,code:auth.code}})).json();
 await page.locator('[data-option="signalCards"]').selectOption('9');await expect(page.locator('[data-option="signalCards"]')).toHaveValue('9');
 const state=await(await request.get('/api/state',{headers:{Authorization:'Bearer '+guest.token,'X-Room-Code':auth.code}})).json();expect(state.state.options.signalCards).toBe(9);
 await page.locator('[data-action="start"]').click();await expect(page.locator('.receiver-board')).toHaveCount(3);await expect(page.locator('.receiver-board').first().locator('.word-card')).toHaveCount(9);
});

for(const [name,engine]of [['WebKit',webkit],['Firefox',firefox]])test(`${name}: tablet rendering and live card selection`,async({baseURL})=>{
 test.setTimeout(60000);const browser=await engine.launch({headless:true,channel:''});try{const page=await browser.newPage({viewport:{width:820,height:1180},baseURL});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.emulateMedia({reducedMotion:'reduce'});await start(page,'borrowed');const first=await page.locator('.word-card').first().elementHandle();
  for(const i of [1,4,7])await page.locator(`[data-choice="${i}"]`).click();expect(await first.evaluate(node=>node.isConnected)).toBe(true);await page.locator('[data-action="lock"]').click();await next(page);await expect(page.locator('.clue-tray')).toBeVisible();await checkWidths(page,name);expect(errors).toEqual([]);
 }finally{await browser.close();}
});
