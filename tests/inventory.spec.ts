import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Inventory', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('sort by price low to high', async ({ page }) => {
    await inventoryPage.sortBy('Price (low to high)');
    await expect(inventoryPage.itemPrices.first()).toHaveText('$7.99');
  });

  // update your other sorting tests the same way
  test('sort by price high to low', async ({ page }) => {
    await inventoryPage.sortBy('Price (high to low)');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$49.99');
  });
  test ('sort by Name (A to Z)', async ({ page }) => {
    await inventoryPage.sortBy('Name (A to Z)');
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
  });
  test ('sort by Name (Z to A)', async ({ page }) => {
    await inventoryPage.sortBy('Name (Z to A)');
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

});

test.describe('Logout', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('user can log out', { tag: '@smoke' }, async ({ page }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });
});