import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./test/browser',
  timeout:45000,
  expect:{timeout:10000},
  workers:1,
  reporter:'list',
  use:{baseURL:'http://127.0.0.1:3100',channel:'chrome',headless:true,viewport:{width:1440,height:1000},screenshot:'only-on-failure'},
  webServer:{command:'node server.js',env:{PORT:'3100'},url:'http://127.0.0.1:3100',reuseExistingServer:false,timeout:15000}
});
