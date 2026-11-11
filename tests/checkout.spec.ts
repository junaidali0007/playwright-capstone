import { test, expect } from '@playwright/test';

test.describe('Checkout', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('user can buy a product', { tag: '@smoke' }, async ({ page }) => {
    let productName = '';
    let productPrice = '';

    await test.step('Add a product and open the cart', async () => {
    const firstProduct = page.locator('.inventory_item').first();
    productName = await firstProduct.locator('.inventory_item_name').innerText();
    productPrice = await firstProduct.locator('.inventory_item_price').innerText();

    await firstProduct.getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(productName);
  });

  await test.step('Fill in the checkout details', async () => {
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('First Name').fill('Junaid');
    await page.getByPlaceholder('Last Name').fill('Ali');
    await page.getByPlaceholder('Zip/Postal Code').fill('54000');
    await page.getByRole('button', { name: 'Continue' }).click();
  });

  await test.step('Verify Product on Summary Page', async () => {
    await expect(page.locator('.cart_item .inventory_item_name')).toHaveText(productName);
    await expect(page.locator('.cart_item .inventory_item_price')).toHaveText(productPrice);
  });

  await test.step('Finish the order', async () => {
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
  });

  });

});