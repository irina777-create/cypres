// @ts-check
import { defineConfig, devices } from '@playwright/test';
const dotenv = require('dotenv');
const { configValues } = require('./playwright.config.helper');

// Завантаження змінних середовища з потрібного файлу
dotenv.config({ path: `.env.${process.env.TEST_ENV || 'test'}` });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

  module.exports = defineConfig({
   testDir: './tests-qaauto',
   fullyParallel: true,
   forbidOnly: !!process.env.CI,
   retries: process.env.CI ? 2 : 0,
   workers: process.env.CI ? 1 : 2,
   reporter: 'html',

   expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 10,
    },
   },
      httpCredentials: {
          username: process.env.HTTP_USERNAME,
          password: process.env.HTTP_PASSWORD,
      },


// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

    /**
     * Read environment variables from file.
     * https://github.com/motdotla/dotenv
     */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

    /**
     * @see https://playwright.dev/docs/test-configuration
     */
    use: {
      baseURL: configValues.baseURL,
      testIdAttribute: 'data-testid',
      actionTimeout: 4000,
      headless: true,
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      video: 'on-first-retry',
      trace: 'on-first-retry',
      httpCredentials: {
        username: configValues.httpUsername,
        password: configValues.httpPassword,
      },
    },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

