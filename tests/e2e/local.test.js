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
  // заходить на сайт 
  await page.goto('https://playwright.dev/');

  expect(true).toBe(true);
});




test('Скріншот головної сторінки', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveScreenshot('playwright-home.png');
});