import { test, expect, Page } from '@playwright/test';

/* 
test('login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
  });

  test('AddProductToCart', async ({ page }) => {
    // count items
  await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveCount(0);
  // first, last, nth
await page.locator('.inventory_item').first().click();
  
  }); */
async function addProductToCart(page: Page, productName: string) {
  const product = page.locator('.inventory_item').filter({ hasText: productName });
  await product.getByRole('button', { name: 'Add to cart' }).click();
};

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/inventory/);
});

test('login shows products', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
});

test('add product to cart', async ({ page }) => {
  // cart starts empty: the badge doesn't exist
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

  // add the first product
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // badge now shows 1
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // open the cart and verify the item is there
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('.cart_item')).toHaveCount(1);
  
  await expect(page.locator('[data-test="continue-shopping"]')).toBeVisible();
  await page.getByRole('button', { name: 'continue Shopping' }).click();
  await expect(page.getByText('Products')).toBeVisible();
  await addProductToCart(page, 'Sauce Labs Onesie');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('.cart_item')).toHaveCount(2);
  await expect(page.locator('.cart_item').nth(1).locator('.inventory_item_name')).toHaveText('Sauce Labs Onesie');

});
/* test('Add a specific product to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/cart.html');
}); */