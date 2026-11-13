import {test,expect,webkit,firefox} from '@playwright/test';
import {createRoom,startGame,tick,act,view} from '../../engine.js';
const sizes=[[320,740],[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1180,820],[1280,720],[1440,900],[1920,1080]];
const headers=a=>({Authorization:'Bearer '+a.token,'X-Room-Code':a.code});
async function state(request,a){const response=await request.get('/api/state',{headers:headers(a)});expect(response.ok()).toBeTruthy();return (await response.json()).state;}
async function command(request,a,s,action,value){const response=await request.post('/api/action',{headers:headers(a),data:{game:s.game,round:s.round,stage:s.stage,phaseId:s.phaseId,action,value}});expect(response.ok(),JSON.stringify(await response.json())).toBeTruthy();return (await response.json()).state;}
async function mount(page,a){await page.goto('/');await page.evaluate(a=>sessionStorage.setItem('afterhours-session',JSON.stringify({code:a.code,token:a.token})),a);await page.reload();await expect(page.locator('.play-heading')).toContainText('Trust Issues');}
async function widths(page){for(const [width,height]of sizes){await page.setViewportSize({width,height});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);}}
async function nextDemo(page){await expect(page.getByRole('button',{name:'Continue demo'})).toBeEnabled();await page.getByRole('button',{name:'Continue demo'}).click();}

test('Trust Issues: full mobile practice, Spy Card, final awards, reload and rematch',async({page,request})=>{
 test.setTimeout(180000);const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});
 await page.goto('/');await page.locator('.art-button[data-game="lone"]').click();await expect(page.locator('[data-option="loneRankSeconds"]')).toHaveValue('30');await page.locator('[data-option="loneUnderdogChance"]').selectOption('100');await page.getByRole('button',{name:'Try with practice bots'}).click();await expect(page.locator('.play-heading')).toContainText('Trust Issues');
 const a=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('afterhours-session')));let sawSpy=false,sawFinal=false;
 for(let guard=0;guard<70;guard++){
  const s=await state(request,a);if(s.status==='finished')break;
  if(s.stage==='rank'){
   if(s.canAct){await page.locator('[data-rank-move="0"][data-direction="1"]').click();const order=await page.locator('.rank-list strong').allTextContents();await page.reload();await expect(page.locator('.rank-list strong')).toHaveText(order);await page.getByRole('button',{name:'Lock my ranking'}).click();}
   await nextDemo(page);
  }else if(s.stage==='talk'){
   if(s.me===s.leader){await page.locator('#claim-first').selectOption('0');await page.locator('#claim-message').fill('Trust me <script>not code</script>');await page.getByRole('button',{name:'Record my claim'}).click();await expect(page.locator('.lone-claim')).toContainText('<script>not code</script>');}
   else await expect(page.locator('.lone-claim strong')).toBeVisible();
   if(s.round===1){await page.locator('.spy-panel summary').click();await page.locator('#spy-target').selectOption(s.players.find(p=>p.id!==s.me).id);await page.getByRole('button',{name:'Play Spy Card'}).click();await expect(page.locator('.spy-panel')).toContainText('Watching');await page.getByRole('button',{name:'Reveal my target'}).click();await expect(page.locator('.spy-announcements')).toContainText('watching');}
   await page.getByRole('button',{name:'Everyone ready? Open picks'}).click();
  }else if(['pick','spy'].includes(s.stage)){
   if(s.stage==='spy'){sawSpy=true;await expect(page.locator('.phase-bar')).toContainText('Spy Window');}
   if(s.canAct){await page.locator('[data-choice="0"]').click();const node=await page.locator('[data-choice="0"]').elementHandle();await page.locator('[data-choice="1"]').click();expect(await node.evaluate(el=>el.isConnected)).toBe(true);if(await page.locator('[data-belief="doubt"]').count())await page.locator('[data-belief="doubt"]').click();await page.getByRole('button',{name:'Lock my lone pick'}).click();}
   await nextDemo(page);
  }else if(s.stage==='reveal'){
   await expect(page.locator('.lone-option-reveal')).toHaveCount(s.round===6?7:5);await expect(page.locator('.lone-truth')).toBeVisible();await expect(page.locator('.reveal-rows')).not.toContainText('undefined');
   if(s.round===1){await widths(page);await page.setViewportSize({width:390,height:844});await page.screenshot({path:'test-results/lone-phone-reveal.png',fullPage:true});}
   if(s.round===6){sawFinal=true;await expect(page.locator('.lone-truth')).toContainText('Base values doubled');}
   await page.getByRole('button',{name:s.round===6?'See the final scores':'One more round'}).click();
  }
 }
 await expect(page.locator('.final-scores')).toBeVisible();await expect(page.locator('.lone-awards article')).toHaveCount(6);expect(sawSpy).toBe(true);expect(sawFinal).toBe(true);await page.screenshot({path:'test-results/lone-awards.png',fullPage:true});await page.getByRole('button',{name:'Play again'}).click();await expect(page.locator('.round-status')).toContainText('1');expect(errors).toEqual([]);
});

test('Trust Issues: real multiplayer ranking, private spy peek, full pick timer and responsive controls',async({page,browser,request})=>{
 test.setTimeout(90000);const host=await(await request.post('/api/create',{data:{name:'Host'}})).json(),people=[host];
 for(let i=1;i<6;i++)people.push(await(await request.post('/api/join',{data:{code:host.code,name:`Player ${i}`}})).json());
 const started=await request.post('/api/start',{headers:headers(host),data:{game:'lone',options:{loneRankSeconds:120,loneTalkSeconds:120,lonePickSeconds:10,loneSpySeconds:30}}});let s=(await started.json()).state;
 const ranker=people.find(a=>a.state.me===s.leader),spy=people.find(a=>a.state.me!==s.leader),target=people.find(a=>a!==ranker&&a!==spy);const context=await browser.newContext();const spyPage=await context.newPage();
 try{
  await mount(page,ranker);await page.emulateMedia({reducedMotion:'reduce'});await widths(page);await page.setViewportSize({width:820,height:1180});await page.screenshot({path:'test-results/lone-ipad-rank.png',fullPage:true});const first=await page.locator('.rank-list li').first().elementHandle();const before=await page.locator('.rank-list strong').allTextContents();await page.getByRole('button',{name:`Move ${before[0]} down`,exact:true}).click();expect(await first.evaluate(el=>el.isConnected)).toBe(true);await expect(page.locator('.rank-list strong').nth(1)).toHaveText(before[0]);await page.getByRole('button',{name:'Lock my ranking'}).click();
  await page.locator('#claim-first').selectOption('0');await page.locator('#claim-message').fill('A deliberate bluff.');await page.getByRole('button',{name:'Record my claim'}).click();await expect(page.locator('.lone-claim')).toContainText('A deliberate bluff.');
  await mount(spyPage,spy);await spyPage.locator('.spy-panel summary').click();await spyPage.locator('#spy-target').selectOption(target.state.me);await spyPage.getByRole('button',{name:'Play Spy Card'}).click();await expect(spyPage.locator('.spy-panel')).toContainText('Watching');await spyPage.reload();await expect(spyPage.locator('.spy-panel')).toContainText('Watching');
  const targetView=await state(request,target);expect(targetView.ranking).toBeUndefined();expect(targetView.spyPlayers[0].target).toBeUndefined();expect(targetView.spy).toBeNull();
  s=await command(request,host,await state(request,host),'skipTalk');for(const a of people.filter(a=>a!==spy))await command(request,a,s,'submit',2);
  expect((await state(request,host)).stage).toBe('pick');await expect(spyPage.getByRole('button',{name:'Lock my lone pick'})).toHaveCount(0);
  await expect(spyPage.locator('.spy-panel')).toContainText('Their final pick:',{timeout:18000});const peek=await state(request,spy);expect(peek.spy.peek).toBe(2);expect((await state(request,target)).ownAnswer).toBeUndefined();await widths(spyPage);await spyPage.setViewportSize({width:390,height:844});await spyPage.screenshot({path:'test-results/lone-phone-spy.png',fullPage:true});await spyPage.locator('[data-choice="3"]').click();await spyPage.getByRole('button',{name:'Lock my lone pick'}).click();await expect(page.locator('.lone-truth')).toContainText('False claim');await expect(page.locator('.lone-option-reveal')).toHaveCount(5);
 }finally{await context.close();}
});

for(const [name,engine]of [['WebKit',webkit],['Firefox',firefox]])test(`Trust Issues ${name}: rank controls and narrow screens`,async({request,baseURL})=>{
 test.setTimeout(60000);const host=await(await request.post('/api/create',{data:{name:'Host'}})).json(),people=[host];for(let i=1;i<4;i++)people.push(await(await request.post('/api/join',{data:{code:host.code,name:'Player '+i}})).json());
 const response=await request.post('/api/start',{headers:headers(host),data:{game:'lone',options:{loneRankSeconds:120}}});const s=(await response.json()).state,ranker=people.find(a=>a.state.me===s.leader);const browser=await engine.launch({headless:true,channel:''});try{const page=await browser.newPage({baseURL});await mount(page,ranker);await widths(page);await page.getByRole('button',{name:'Lock my ranking'}).click();await expect(page.locator('#lone-claim-form')).toBeVisible();}finally{await browser.close();}
});

test('Trust Issues: tied scores use unique picks, with shared wins when both are tied',async({page})=>{
 const {room:r,host}=createRoom('TIEDX','First player',true);r.practice=false;startGame(r,host.id,'lone');
 while(r.status==='playing'){while(r.stage!=='reveal')tick(r,r.deadline+1);act(r,r.host,'next');}
 const [a,b]=r.players;r.players.forEach(p=>p.score=0);a.score=20;b.score=20;r.lone.stats[a.id].unique=2;r.lone.stats[b.id].unique=4;
 let snapshot=view(r,a.id);
 await page.route('**/api/state',route=>route.fulfill({json:{state:snapshot}}));await page.route('**/api/events',route=>route.fulfill({status:200,contentType:'text/event-stream',body:''}));
 await mount(page,{code:r.code,token:a.token});await expect(page.locator('.final-score.winner')).toHaveCount(1);await expect(page.locator('.final-score.winner')).toContainText(b.name);await expect(page.locator('.final-score.winner')).toContainText('4 unique picks');
 r.lone.stats[a.id].unique=4;snapshot=view(r,a.id);await page.reload();await expect(page.locator('.final-score.winner')).toHaveCount(2);await expect(page.locator('.stage-intro')).toContainText('Shared glory');
});
