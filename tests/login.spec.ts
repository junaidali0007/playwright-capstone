import { test, expect } from '../fixtures/pages';
import { users } from '../test-data/users';

test.describe('Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });
  const invalidLogins = [
    { name: 'locked out user', username: 'locked_out_user', password: 'secret_sauce', error: 'locked out' },
    { name: 'wrong password', username: 'standard_user', password: 'wrong_password', error: 'do not match any user' },
    { name: 'empty username', username: '', password: 'secret_sauce', error: 'Username is required' },
    { name: 'empty password', username: 'standard_user', password: '', error: 'Password is required' },
  ];

  test('valid user can log in', { tag: '@smoke' }, async ({ loginPage }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(loginPage.page).toHaveURL(/inventory/);
  });

  for (const data of invalidLogins) {
    test(`login fails: ${data.name}`, async ({ page, loginPage }) => {
      await loginPage.login(data.username, data.password);
      await expect(loginPage.errorMessage).toContainText(data.error);
      await expect(page).not.toHaveURL(/inventory/);
    });
  }

  /* test('locked out user sees an error', async ({ loginPage }) => {
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
  }); */

});
