// tests/screenshots/local.spec.js
const { test, expect } = require('@playwright/test');

test('Перевірка змін сторінки за скриншотом', async ({ page }) => {
  await page.goto('http://localhost:3000');
  expect(await page.screenshot()).toMatchSnapshot('screenshots/local-page/index-page.png');
});

test('Порівняння скриншота елемента', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const element = await page.locator('h1');
  expect(await element.screenshot()).toMatchSnapshot('screenshots/local-page/index-page-element-h1.png');
});

test('Скріншот головної сторінки', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('screenshots/local-page/main.png');
});

test('Скріншот заголовка h1', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const title = await page.locator('h1');
  await expect(title).toHaveScreenshot('screenshots/local-page/h1-title.png');
});

test('Скріншот кнопки входу', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const button = await page.locator('#loginButton');
  await expect(button).toHaveScreenshot('screenshots/local-page/login-button.png');
});

test('Скріншот панелі користувача після входу', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'test_user');
  await page.fill('#password', 'password123');
  await page.click('#loginButton');
  const panel = await page.locator('#userPanel');
  await expect(panel).toHaveScreenshot('screenshots/local-page/user-panel.png');
});