import { test, expect, Page } from '@playwright/test';
const remainingProduct = 'Sauce Labs Onesie';
async function addProductToCart(page: Page, productName: string) {
  const product = page.locator('.inventory_item').filter({ hasText: productName });
  await product.getByRole('button', { name: 'Add to cart' }).click();
};

test.describe('Cart', () => {

  test.beforeEach(async ({ page }) => {
        // your login steps (unchanged)
      await page.goto('https://www.saucedemo.com');
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page).toHaveURL(/inventory/);
  });

  test('login shows products', async ({ page }) => {
    // your code (unchanged)
      await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
  });

  test('add product to cart', { tag: '@smoke' }, async ({ page }) => {
    await test.step('Add the first product', async () => {
      // cart starts empty: the badge doesn't exist
      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
      await page.getByRole('button', { name: 'Add to cart' }).first().click();
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

    await test.step('Check the cart has 1 item', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page.locator('.cart_item')).toHaveCount(1);
  });

    await test.step('Add a second product', async () => {
      await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
      await page.getByRole('button', { name: 'Continue Shopping' }).click();
      await expect(page.getByText('Products')).toBeVisible();
      await addProductToCart(page, remainingProduct);
  });

    await test.step('Check the cart has 2 items', async () => {
      await page.locator('[data-test="shopping-cart-link"]').click();
      await expect(page.locator('.cart_item')).toHaveCount(2);
      await expect(page.locator('.cart_item').nth(1).locator('.inventory_item_name')).toHaveText(remainingProduct);
  });

    await test.step('Remove the first product', async () => {
      await page.getByRole('button', { name: 'Remove' }).first().click();
      await expect(page.locator('.cart_item')).toHaveCount(1);
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
      await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(remainingProduct);
});

    await test.step('Remove the last product', async () => {
      await page.getByRole('button', { name: 'Remove' }).click();
      await expect(page.locator('.cart_item')).toHaveCount(0);
      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});

});

});