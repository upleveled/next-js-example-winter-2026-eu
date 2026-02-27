import { expect, test } from '@playwright/test';

test.describe('GenerateButton', () => {
  test('generates random colors', async ({ page }) => {
    await page.goto('/');

    // // Using the page.getByRole()
    // const generateButton = page.getByRole('button', { name: 'generate' });

    // // Error: strict mode violation: <locator> resolved to 4 elements
    // await page.locator('h2').click();

    // Solution: locate only 1 element
    await page.locator('h2:has-text("Generate Button")').click();

    const generateButton = page.getByTestId('generate-button');

    await expect(generateButton).toBeVisible();

    const firstColor = await generateButton.getAttribute('style');
    expect(firstColor).toMatch(/^background-color:rgb\(/);

    await generateButton.click();

    const secondColor = await generateButton.getAttribute('style');
    console.log(secondColor);
    expect(secondColor).toMatch(/^background-color: rgb\(/);
    expect(secondColor).not.toBe(firstColor);
  });
});
