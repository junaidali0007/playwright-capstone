import { test, expect } from '../fixtures/pages';

test.describe('Logout', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('user can log out', { tag: '@smoke' }, async ({ page, inventoryPage, loginPage }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});