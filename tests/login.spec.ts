import { test, expect } from '../fixtures/pages';

test.describe('Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('valid user can log in', { tag: '@smoke' }, async ({ loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(loginPage.page).toHaveURL(/inventory/);
  });

  test('locked out user sees an error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('locked out');
  });


  test('wrong password shows an error', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'secret_sauce999');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service');
  });


  test('empty username shows an error', async ({ loginPage }) => {
    await loginPage.login('', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('empty password shows an error', async ({ loginPage }) => {
    await loginPage.login('standard_user', '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

});
