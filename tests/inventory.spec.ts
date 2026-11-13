import { test, expect } from '@playwright/test';

test.describe('Inventory', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('sort by price low to high', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('Price (low to high)');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$7.99');
    const prices = await page.locator('.inventory_item_price').allInnerTexts();
    const numbers = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(numbers).toEqual(sorted);
  });

  test('sort by price high to low', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('Price (high to low)');
    await expect(page.locator('.inventory_item_price').first()).toHaveText('$49.99');
    const prices = await page.locator('.inventory_item_price').allInnerTexts();
    const numbers = prices.map(p => parseFloat(p.replace('$', '')));
    const sorted = [...numbers].sort((a, b) => b - a);
    expect(numbers).toEqual(sorted);
  });

  test('sort alphabetically by Name Z to A', async ({ page }) => {
    await page.locator('[data-test="product-sort-container"]').selectOption('Name (Z to A)');
    await expect(page.locator('.inventory_item_name').first()).toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

});