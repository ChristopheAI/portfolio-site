import { test, expect } from '@playwright/test';

/**
 * QA Test – B2B Content Clarity & Brevity
 * Fails until B2B section trimmed to ≤ 300 words and ≤ 5 bullets per card.
 */

test.describe('B2B Section Content Standards', () => {
  const PAGE_URL = 'http://localhost:5173/';

  test('B2B section word count should be 300 words or less', async ({ page }) => {
    await page.goto(PAGE_URL);
    const text = await page.locator('#multi-project').innerText();
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    expect(wordCount).toBeLessThanOrEqual(300);
  });

  test('Each B2B card should have max 5 bullet points', async ({ page }) => {
    await page.goto(PAGE_URL);
    const cards = page.locator('.multi-project__card');
    const cardCount = await cards.count();

    for (let i = 0; i < cardCount; i++) {
      const bulletCount = await cards.nth(i).locator('li').count();
      expect(bulletCount).toBeLessThanOrEqual(5);
    }
  });
}); 