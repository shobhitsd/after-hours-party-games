"""Browser smoke tests + visual snapshots. Requires Python Playwright and Chromium."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'updraft-play.html').read_text()
OUT=ROOT/'screenshots';OUT.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  errors=[]
  page=await b.new_page(viewport={'width':1440,'height':900},device_scale_factor=1)
  page.on('pageerror',lambda exc:errors.append(str(exc)))
  await page.set_content(HTML,wait_until='load')
  await page.wait_for_timeout(250)
  await page.screenshot(path=str(OUT/'desktop-intro.png'),full_page=True)
  assert await page.locator('#fuel-capsules .fuel-cell').count()==6
  assert await page.locator('#start-button').is_visible()
  await page.click('#start-button');await page.wait_for_timeout(150)
  assert await page.locator('.answer-choice').count()==3
  await page.screenshot(path=str(OUT/'desktop-question.png'),full_page=True)
  # A correct answer gives lift and unlocks the new sky.
  idx=await page.evaluate('window.UpdraftLogic.deckFor(window.UpdraftLogic.dailySeed())[0].correct')
  await page.locator('.answer-choice').nth(idx).click()
  assert await page.locator('#result-view').is_visible()
  assert await page.locator('#result-fact').inner_text()!=''
  await page.wait_for_timeout(450)
  await page.screenshot(path=str(OUT/'desktop-correct.png'),full_page=True)
  await page.click('#skip-button');await page.wait_for_timeout(120)
  assert await page.locator('#debug-event').inner_text() in ['TIER_CHANGE','IDLE']
  await page.screenshot(path=str(OUT/'desktop-tier.png'),full_page=True)
  await page.keyboard.press('Space')
  await page.wait_for_timeout(110)
  await page.locator('#skip-button').evaluate('(el)=>el.click()')
  await page.wait_for_timeout(80)
  assert await page.locator('#question-counter').inner_text()=='WONDER 02 / 05'
  # Wrong answer on second question reduces fuel.
  correct2=await page.evaluate("window.UpdraftLogic.deckFor(window.UpdraftLogic.dailySeed())[1].correct")
  await page.locator('.answer-choice').nth((correct2+1)%3).click()
  assert await page.locator('#fuel-capsules .fuel-cell.empty').count()==2
  await page.wait_for_timeout(400)
  await page.screenshot(path=str(OUT/'desktop-wrong.png'),full_page=True)
  # Debug altitude enables night sky independently of question logic.
  await page.click('#debug-toggle')
  await page.locator('#debug-alt').fill('1700')
  await page.wait_for_timeout(150)
  await page.screenshot(path=str(OUT/'desktop-night.png'),full_page=True)
  assert await page.locator('#tier-name').inner_text()=='NIGHT ORCHARD'
  await page.click('#debug-close')
  # Return to finished state by starting over, making 3 deliberate mistakes.
  await page.evaluate("document.querySelector('#debug-alt').value='0'; document.querySelector('#debug-alt').dispatchEvent(new Event('input',{bubbles:true}))")
  # Reset by reloading inline content.
  await page.set_content(HTML,wait_until='load')
  await page.click('#start-button')
  for attempt in range(3):
   print('landing attempt',attempt,flush=True)
   idx=await page.evaluate('i => window.UpdraftLogic.deckFor(window.UpdraftLogic.dailySeed())[i].correct',attempt)
   print('guess',idx,flush=True)
   await page.locator('.answer-choice').nth((idx+1)%3).click(timeout=5000)
   print('skip',flush=True)
   await page.locator('#skip-button').evaluate('(el) => el.click()')
   await page.locator('#skip-button').evaluate('(el) => el.click()')
   # If we crossed no altitude tier, immediately see next question or landing.
   await page.wait_for_timeout(50)
  assert await page.locator('#debug-event').inner_text()=='OUT_OF_FUEL'
  await page.wait_for_timeout(400)
  await page.screenshot(path=str(OUT/'desktop-landing.png'),full_page=True)
  await page.keyboard.press('Space')
  await page.wait_for_timeout(90)
  assert await page.locator('#end-view').is_visible()
  assert await page.locator('#end-correct').inner_text()=='0/5'
  await page.screenshot(path=str(OUT/'desktop-flightlog.png'),full_page=True)
  print('DESKTOP: intro, question, answer, tier, wrong, night, landing, journal passed')
  # Mobile checks.
  m=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True)
  m.on('pageerror',lambda exc:errors.append('MOBILE '+str(exc)))
  await m.set_content(HTML,wait_until='load');await m.wait_for_timeout(120)
  await m.screenshot(path=str(OUT/'mobile-intro.png'),full_page=True)
  await m.locator('#start-button').click();await m.wait_for_timeout(120)
  await m.screenshot(path=str(OUT/'mobile-question.png'),full_page=True)
  dimensions=await m.evaluate('({scroll:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth})')
  print('MOBILE DIMENSIONS',dimensions)
  assert dimensions['scroll']<=dimensions['viewport']+1,'mobile horizontal overflow'
  idx=await m.evaluate('window.UpdraftLogic.deckFor(window.UpdraftLogic.dailySeed())[0].correct')
  await m.locator('.answer-choice').nth(idx).tap();await m.wait_for_timeout(300)
  await m.screenshot(path=str(OUT/'mobile-answer.png'),full_page=True)
  assert await m.locator('#result-view').is_visible()
  assert not errors,errors
  print('MOBILE: intro, answer, no horizontal overflow, no JS errors passed')
  print('BROWSER JS ERRORS:',errors)
  await b.close()
if __name__=='__main__':asyncio.run(main())
