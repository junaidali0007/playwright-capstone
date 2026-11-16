import { test, expect } from '../fixtures/pages';
import { users } from '../test-data/users';

test.describe('Logout', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('user can log out', { tag: '@smoke' }, async ({ page, inventoryPage, loginPage }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});