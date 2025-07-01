import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173');
  // wait for kpi grid
  await page.waitForSelector('#kpi-grid');
  // screenshot for demo
  await page.screenshot({ path: 'kpi-grid-demo.png', fullPage: false });
  console.log('KPI grid found and screenshot saved.');
  await browser.close();
})(); 