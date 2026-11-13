import { test, expect } from '@playwright/test';

test.describe('Login', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('valid user can log in', { tag: '@smoke' }, async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
  });

  // 2. locked_out_user sees an error message
  test('locked out user sees an error', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('[data-test="error"]')).toContainText('locked out');
});
  // 3. wrong password shows an error message
  test('Wrong password shows an error', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce999');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});
  // 4. empty username shows "Username is required"
    test('Empty user shows an error', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('');
  await page.getByPlaceholder('Password').fill('secret_sauce999');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('[data-test="error"]')).toContainText('Username is required')
  });

});
