import { test, expect } from '../fixtures/pages';
test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Inventory', () => {

   test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('sort by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('Price (low to high)');
    await expect(inventoryPage.itemPrices.first()).toHaveText('$7.99');
  });

  // update your other sorting tests the same way
  test('sort by price high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('Price (high to low)');
    await expect(inventoryPage.itemPrices.first()).toHaveText('$49.99');
  });

  test('sort by Name (A to Z)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('Name (A to Z)');
    await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Backpack');
  });
  test('sort by Name (Z to A)', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('Name (Z to A)');
    await expect(inventoryPage.itemNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

});

test.describe('Logout', () => {

   test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('user can log out', { tag: '@smoke' }, async ({ inventoryPage, loginPage }) => {
    await inventoryPage.logout();
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});