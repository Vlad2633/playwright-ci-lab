// tests/e2e/local.test.js
const { test, expect } = require('@playwright/test');

test('Перевірка форми входу', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'test_user');
  await page.fill('#password', 'password123');
  await page.click('#loginButton');
  await expect(page.locator('#successMessage')).toBeVisible();
});

test('Перевірка заголовка сторінки', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/Локальна сторінка/);
});

test('Валідація обов’язкових полів форми', async ({ page }) => {
await page.goto('http://localhost:3000');
  await page.click('#loginButton');
  const error = await page.evaluate(() => document.querySelector(':invalid'));
  expect(error).not.toBeNull();
});

test('Перевірка заголовка сайту', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('Перевірка наявності меню навігації', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const nav = await page.locator('nav');
  await expect(nav).toBeVisible();
});

test('Перевірка перехід за посиланням', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.click('text=Get started');
  await expect(page).toHaveURL(/docs\/intro/);
});

test('Після натискання кнопки Login зʼявляється панель користувача', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'user');
  await page.fill('#password', '123456');
  await page.click('#loginButton');
  await expect(page.locator('#userPanel')).toBeVisible();
});

test('Перевірка наявності футера на сторінці', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
});

test('Валідація короткого пароля', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'test_user');
  await page.fill('#password', '1');
  await page.click('#loginButton');
  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toContainText(/пароль занадто короткий|invalid/i);
});


test('У верхньому меню Playwright є Documentation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14
  await page.goto('https://playwright.dev/', { waitUntil: 'domcontentloaded' });

  const burger = page.locator('button[aria-label="Toggle navigation"]');
  if (await burger.isVisible()) {
    await burger.click({ force: true }); // примусово клікаємо
    // чекаємо, поки посилання з'явиться
    const docLink = page.getByRole('link', { name: /Documentation/i });
    await docLink.waitFor({ state: 'visible', timeout: 5000 });
    await expect(docLink).toBeVisible();
  } else {
    console.log('Бургер-меню не знайдено, можливо десктоп версія');
  }
});


test('Скріншот головної сторінки', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveScreenshot('playwright-home.png');
});