import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Де шукати файли з тестами
  testDir: 'tests',

  // Формат звіту
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: false,
	snapshotPathTemplate: '{testDir}/{testFileDir}/{testFileName}-snapshots/{testName}{ext}',
  },

  // Три конфігурації: Chrome, Firefox і iPhone 14 (мобільна версія)
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
      name: 'iphone-14',
      use: { ...devices['iPhone 14'], browserName: 'webkit' },
    },
  ],

  // Запуск локального сервера перед тестами
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
