import { expect, test } from '@playwright/test';

test.describe('Animal pages', () => {
  test('show animal details', async ({ page }) => {
    await page.goto('/animals');

    // // You can do it manually like this
    // await expect(
    //   page.getByRole('link', { name: 'Dennis the goat, with their' }),
    // ).toBeVisible();
    // await expect(
    //   page.getByRole('link', { name: 'Monica the owl, with their' }),
    // ).toBeVisible();
    // await expect(
    //   page.getByRole('link', { name: 'Trevor the iguana, with their' }),
    // ).toBeVisible();
    // await expect(
    //   page.getByRole('link', { name: 'Sharon the seal, with their' }),
    // ).toBeVisible();
    // await expect(
    //   page.getByRole('link', { name: 'Paul the pigeon, with their' }),
    // ).toBeVisible();

    // Or loop over the animal link texts
    const animalLinkTexts = [
      'Dennis the goat, with their',
      'Monica the owl, with their',
      'Trevor the iguana, with their',
      'Sharon the seal, with their',
      'Paul the pigeon, with their',
    ];
    for (const animalLinkText of animalLinkTexts) {
      await expect(
        page.getByRole('link', { name: animalLinkText }),
      ).toBeVisible();
    }

    await page
      .getByRole('link', { name: 'Dennis the goat, with their' })
      .click();

    // // Avoid this: Sometimes Next.js will be too fast for the test
    // //
    // // "flaky test": tests which sometimes fail and sometimes succeed
    // await expect(page.locator('main')).toContainText('Loading animal...');

    await expect(page).toHaveTitle('Dennis - Widgets Anonymous');
    await expect(page.locator('main')).toContainText(
      'Dennis, born on 09/04/2015',
    );
  });
});
