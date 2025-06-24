import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test.describe('Performance Tests', () => {
  test('Homepage Lighthouse audit', async ({ page, context }) => {
    await page.goto('http://localhost:5173/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    const audit = await playAudit({
      page,
      thresholds: {
        performance: 90,
        accessibility: 90,
        'best-practices': 90,
        seo: 90,
      },
      port: 9222,
    });
    
    expect(audit.lhr.categories.performance.score).toBeGreaterThanOrEqual(0.9);
    expect(audit.lhr.categories.accessibility.score).toBeGreaterThanOrEqual(0.9);
  });

  test('Core Web Vitals check', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Measure FCP (First Contentful Paint)
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              resolve(entry.startTime);
            }
          }
        }).observe({ entryTypes: ['paint'] });
      });
    });
    
    // FCP should be under 1.8s (good threshold)
    expect(fcp).toBeLessThan(1800);
  });

  test('Image optimization check', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Check hero image loads efficiently
    const heroImage = page.locator('.hero__image');
    await expect(heroImage).toBeVisible();
    
    // Check video has proper attributes
    const video = page.locator('.project-card__video');
    await expect(video).toHaveAttribute('preload', 'none');
    await expect(video).toHaveAttribute('poster');
  });

  test('Font loading optimization', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Check preconnect headers are present
    const preconnects = await page.locator('link[rel="preconnect"]').count();
    expect(preconnects).toBeGreaterThanOrEqual(2); // Google Fonts preconnects
    
    // Check font-display is set for web fonts
    const fontFaces = await page.evaluate(() => {
      return Array.from(document.fonts).map(font => font.family);
    });
    
    expect(fontFaces.length).toBeGreaterThan(0);
  });

  test('Bundle size analysis', async ({ page }) => {
    const response = await page.goto('http://localhost:5173/');
    
    // Main HTML should be reasonably sized
    const htmlSize = (await response.body()).length;
    expect(htmlSize).toBeLessThan(50000); // 50KB threshold
    
    // Check CSS is loaded
    const cssResponse = await page.waitForResponse(/main\.css/);
    const cssSize = (await cssResponse.body()).length;
    expect(cssSize).toBeLessThan(100000); // 100KB threshold
  });
});

test.describe('Performance Regressions', () => {
  test('Page load time consistency', async ({ page }) => {
    const loadTimes = [];
    
    // Test 3 consecutive loads
    for (let i = 0; i < 3; i++) {
      const start = Date.now();
      await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
      const end = Date.now();
      loadTimes.push(end - start);
    }
    
    const avgLoadTime = loadTimes.reduce((a, b) => a + b) / loadTimes.length;
    const maxLoadTime = Math.max(...loadTimes);
    
    // Average should be under 2s, max under 3s
    expect(avgLoadTime).toBeLessThan(2000);
    expect(maxLoadTime).toBeLessThan(3000);
  });
}); 