import { expect, test } from '@playwright/test';

test('allows navigation to home page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Widgets Anonymous' }),
  ).toBeVisible();

  // Partial match of text
  await expect(page.locator('h1')).toContainText('Widgetssssss');
  // More strict, will match text exactly
  await expect(page.locator('h1')).toHaveText('Widgets Anonymous');
});
