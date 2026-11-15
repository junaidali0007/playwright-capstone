import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('add a product to the cart', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText('Sauce Labs Backpack');
  });

  test('remove a product from the cart', async () => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.removeProductFromCart('Sauce Labs Backpack');
    await expect(cartPage.cartItems).toHaveCount(0);
  });
});