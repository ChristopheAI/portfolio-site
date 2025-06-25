import { test, expect } from '@playwright/test';

/**
 * QA Test – About Section Clarity & Length
 * Fails until heading ≤ 7 words and body ≤ 400 words.
 */

test.describe('About Section Standards', () => {
  const PAGE_URL = 'http://localhost:5173/';

  test('About heading should have 7 words or less', async ({ page }) => {
    await page.goto(PAGE_URL);
    const headingText = await page.locator('#about .about__title').innerText();
    const wordCount = headingText.split(/\s+/).filter(Boolean).length;
    expect(wordCount).toBeLessThanOrEqual(7);
  });

  test('About body should be 400 words or less', async ({ page }) => {
    await page.goto(PAGE_URL);
    const bodyText = await page.locator('#about .about__text').innerText();
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
    expect(wordCount).toBeLessThanOrEqual(400);
  });
}); 