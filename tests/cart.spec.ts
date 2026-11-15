import { test, expect } from '../fixtures/pages';
test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Cart', () => {
  
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('add a product to the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText('Sauce Labs Backpack');
  });

  test('remove a product from the cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.removeProductFromCart('Sauce Labs Backpack');
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});