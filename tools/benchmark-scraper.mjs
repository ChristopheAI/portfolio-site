#!/usr/bin/env node
import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const listUrl = new URL('./sites.txt', import.meta.url);
const urls = (await fs.readFile(listUrl, 'utf8'))
  .split(/\r?\n/)
  .map(u => u.trim())
  .filter(Boolean)
  .map(u => (u.startsWith('http') ? u : `https://${u}`));

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ locale: 'nl-BE' });

const results = [];

for (const url of urls) {
  const page = await context.newPage();
  try {
    await page.goto(url, { timeout: 45000, waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    // Capture above-the-fold screenshot for visual reference
    const host = new URL(page.url()).hostname.replace(/[^a-z0-9.-]/gi, '_');
    await page.screenshot({ path: `screens/${host}.png`, fullPage: false });
    const data = await page.evaluate(() => {
      const getText = (el) => (el ? el.textContent.trim() : '');
      let hero = getText(document.querySelector('h1'));
      if (!hero) hero = getText(document.querySelector('h2'));
      if (!hero) hero = getText(document.querySelector('[class*="hero" i] h1')) || getText(document.querySelector('[class*="hero" i] h2'));
      // CTA detection: first link/button with common verbs
      const ctaSelectors = 'a,button';
      const verbs = ['plan', 'boek', 'neem', 'contact', 'kennismaking', 'talk', 'work', 'get in touch', 'hire', 'mail'];
      let cta = '';
      for (const el of document.querySelectorAll(ctaSelectors)) {
        const txt = el.textContent.trim().toLowerCase();
        if (verbs.some(v => txt.includes(v))) { cta = txt; break; }
      }
      // KPI lines: look for % or euro or ms
      let kpi = '';
      const bodyText = document.body.innerText.split('\n').map(t => t.trim());
      for (const line of bodyText) {
        if (/\d+\s?(%|€|ms|s)/.test(line)) { kpi = line; break; }
      }
      // Trust: look for elements containing 'testimonial' keyword or img alt 'logo'
      const trust = !!document.querySelector('[class*="testimonial" i], img[alt*="logo" i]');
      return { hero, cta, kpi, trust };
    });
    results.push({ url, ...data });
  } catch (err) {
    results.push({ url, hero: 'ERROR', cta: '', kpi: '', trust: false });
  } finally {
    await page.close();
  }
}

await browser.close();

// Output CSV
console.log('url,hero,cta,kpi,trust');
for (const r of results) {
  const row = [r.url, r.hero, r.cta, r.kpi, String(r.trust)].map(v => `"${v.replace(/"/g, '""')}"`).join(',');
  console.log(row);
} 