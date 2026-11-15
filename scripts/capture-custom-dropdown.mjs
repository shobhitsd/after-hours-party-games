import { chromium } from '@playwright/test';
import http from 'http';
import handleRequest from '../server.js';

async function capture() {
  const server = http.createServer(handleRequest);
  await new Promise(r => server.listen(3004, r));
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });
  
  await page.goto('http://localhost:3004');
  await page.click('button[data-action="host"]');
  await page.waitForSelector('#player-name');
  await page.fill('#player-name', 'Host');
  await page.click('#room-form button[type="submit"]');
  await page.waitForSelector('.lounge-picker');
  
  // Select packed house
  await page.click('[data-select-game="packed"]');
  await page.waitForTimeout(500);

  // Scroll to game options
  await page.locator('.game-options').scrollIntoViewIfNeeded();

  // Click custom select dropdown
  const trigger = page.locator('[data-toggle-dropdown]').first();
  await trigger.click();
  await page.waitForTimeout(400);

  const outPath = 'C:/Users/Shobhit Shah/.gemini/antigravity/brain/2e09bbb7-e261-41d3-931a-30cb71f7f340/custom-dropdown-open.png';
  await page.screenshot({ path: outPath });
  console.log('Dropdown screenshot captured successfully at:', outPath);

  await browser.close();
  server.close();
}
capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
