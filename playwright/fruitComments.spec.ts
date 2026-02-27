import { expect, test } from '@playwright/test';

test.describe('Fruit comments', () => {
  test('can be created by users', async ({ page }) => {
    await page.goto('/fruits');

    // Or loop over the animal link texts
    const animalLinkTexts = [
      '🍎 Apple',
      '🍌 Banana',
      '🍊 Orange',
      '🍓 Strawberry',
      '🍇 Grapes',
      '🍉 Watermelon',
      '🍍 Pineapple',
      '🍑 Peach',
    ];
    for (const animalLinkText of animalLinkTexts) {
      await expect(
        page.getByRole('link', { name: animalLinkText }),
      ).toBeVisible();
    }

    await page.locator('a:has-text("🍎 Apple")').click();
    await expect(page.locator('h1')).toContainText('🍎 Apple');

    await expect(page.locator('textarea')).toBeEmpty();

    await page.locator('textarea').fill('Delicious');
    await page.locator('button:has-text("Update")').click();

    // Wait for network idle (for the fruit comment
    // to be added)
    await page.waitForLoadState('networkidle');

    // Alternative
    // // Wait for HTTP response
    // await page.waitForResponse('/1');

    await page.reload();

    await expect(page.locator('textarea')).toContainText('Delicious');

    // Ensure comments are isolated per fruit
    await page.goto('/fruits');
    await page.locator('a:has-text("🍌 Banana")').click();
    await expect(page.locator('h1')).toContainText('🍌 Banana');
    await expect(page.locator('textarea')).toBeEmpty();
  });
});
