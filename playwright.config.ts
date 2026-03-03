import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  reporter: [
    ['list'],
    ['html'],
    ['junit', { outputFile: 'test-results/junit-report.xml' }],
    ['playwright-qase-reporter',
      {
        mode: 'testops',
        debug: true,
        testops: {
          api: {
            token: process.env.QASE_TESTOPS_API_TOKEN,
          },
          project: process.env.QASE_TESTOPS_PROJECT || 'DEMO',
          uploadAttachments: true,
          run: {
            id: process.env.QASE_TESTOPS_RUN_ID ? Number(process.env.QASE_TESTOPS_RUN_ID) : undefined,
            complete: true,
          },
        },
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://stratpoint.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'GChrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    {
      name: 'smoke',
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});