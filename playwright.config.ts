import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  webServer: {
    // Double quotes for Windows
    command: '"./node_modules/.bin/next" start',

    // // Temporary workaround for running dev server
    // //
    // // Do not enable permanently, because there will
    // // be differences between dev and production
    // command: 'pnpm dev',

    port: 3000,
    stdout: 'pipe',
  },
  testDir: './playwright',
  // Fail tests if test.only() found on CI
  forbidOnly: !!process.env.CI,
  // Run tests in files also in parallel
  fullyParallel: true,
  // Disable all parallelization on CI
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? 'github'
    : [['html', { outputFolder: 'playwright/report/' }]],
  outputDir: 'playwright/test-results/',
  // Retry for generating trace
  // https://playwright.dev/docs/trace-viewer-intro#recording-a-trace
  retries: process.env.GITHUB_ACTIONS ? 1 : 0,
  use: {
    testIdAttribute: 'data-test-id',
    trace: 'on-first-retry',
  },
});
