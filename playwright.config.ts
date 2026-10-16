import { defineConfig, devices } from '@playwright/test';

/**
 * DEC-01: solo móvil. Probamos en Chromium (Android) y WebKit (iPhone),
 * que es el navegador que de verdad usarán las usuarias del piloto.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: process.env['CI'] ? 'github' : 'list',

  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'android', use: { ...devices['Pixel 5'] } },
    { name: 'iphone', use: { ...devices['iPhone 12'] } },
  ],

  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
});
