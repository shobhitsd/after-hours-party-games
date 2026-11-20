"""Real browser scene checks for Chapter VI: director state, sky depth and a11y fallback."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/'updraft-play.html').read_text(encoding='utf8')
OUT=ROOT/'screenshots'

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage'])
  errors=[]
  ctx=await browser.new_context(viewport={'width':1440,'height':900},device_scale_factor=1)
  page=await ctx.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
  await page.set_content(HTML,wait_until='load')
  assert await page.locator('#world').get_attribute('data-shot')=='still'
  await page.locator('#debug-toggle').click()
  await page.locator('#debug-alt').fill('840')
  kite=float(await page.locator('#sky-visitor').evaluate('(e)=>getComputedStyle(e).opacity'))
  assert kite>.9,kite
  await page.locator('#debug-close').click()
  await page.screenshot(path=str(OUT/'chapter6-kite-desktop.png'))
  await page.locator('#start-button').click()
  q=await page.evaluate('UpdraftLogic.deckFor(UpdraftLogic.dailySeed())')
  await page.locator('.answer-choice').nth(q[0]['correct']).click()
  assert await page.locator('#world').get_attribute('data-shot')=='rise'
  assert await page.locator('#watching-beat').is_visible()
  assert await page.locator('#result-fact').get_attribute('aria-hidden')=='true'
  assert await page.locator('.wind-ribbons').evaluate('(e)=>getComputedStyle(e).animationName')=='windRush'
  await page.wait_for_timeout(730)
  await page.screenshot(path=str(OUT/'chapter6-correct-desktop.png'))
  await page.locator('#world').click(position={'x':5,'y':400})
  await page.wait_for_timeout(100)
  # A new sky may follow the correct beat; skipping commits it too.
  if await page.locator('#world').get_attribute('data-shot')=='reveal':
   await page.locator('#world').click(position={'x':5,'y':400})
  await page.wait_for_timeout(100)
  assert await page.locator('#world').get_attribute('data-shot')=='still'
  assert await page.locator('#watching-beat').is_hidden()
  assert await page.locator('#result-fact').get_attribute('aria-hidden') is None
  assert await page.evaluate('document.querySelector("#debug-event").textContent')=='IDLE'
  await page.locator('#skip-button').click()
  await page.locator('.answer-choice').nth((q[1]['correct']+1)%3).click()
  assert await page.locator('#world').get_attribute('data-shot')=='dip'
  await page.wait_for_timeout(640)
  await page.screenshot(path=str(OUT/'chapter6-wrong-desktop.png'))
  await page.locator('#world').click(position={'x':5,'y':400})
  await page.wait_for_timeout(100)
  assert await page.locator('#world').get_attribute('data-shot')=='still'
  assert await page.locator('#fuel-numeric').inner_text()=='4 / 6'
  # Still get an answer explanation after skipping the camera.
  assert await page.locator('#result-view').is_visible()
  assert await page.locator('#result-fact').inner_text()
  mctx=await browser.new_context(viewport={'width':390,'height':844},device_scale_factor=1,is_mobile=True,has_touch=True,reduced_motion='reduce')
  mob=await mctx.new_page();mob.on('pageerror',lambda e:errors.append('mobile: '+str(e)))
  await mob.set_content(HTML,wait_until='load')
  await mob.locator('#start-button').tap()
  q2=await mob.evaluate('UpdraftLogic.deckFor(UpdraftLogic.dailySeed())')
  await mob.locator('.answer-choice').nth(q2[0]['correct']).tap()
  assert await mob.locator('#world').get_attribute('data-shot') in ('rise','reveal','still') # reduced beat may already have ended
  assert await mob.locator('#result-view').is_visible()
  assert await mob.locator('.wind-ribbons').evaluate('(e)=>getComputedStyle(e).animationName')=='none'
  assert await mob.evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth+1')
  await mob.screenshot(path=str(OUT/'chapter6-mobile-reduced.png'))
  assert not errors,errors
  print('CHAPTER VI PASS: sky visitor, rising and dipping camera, skip cleanup, fuel unchanged, 390px reduced-motion, no JS errors')
  await browser.close()

if __name__=='__main__':asyncio.run(main())
