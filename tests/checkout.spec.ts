import { test, expect } from '../fixtures/pages';
test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Checkout', () => {
  
   test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('user can buy a product', { tag: '@smoke' }, async ({inventoryPage, cartPage, checkoutPage}) => {
    const productName = 'Sauce Labs Backpack';

    await test.step('Add a product and open the cart', async () => {
      await inventoryPage.addProductToCart(productName);
      await inventoryPage.openCart();
      await expect(cartPage.itemNames).toHaveText(productName);
    });

    await test.step('Fill in the checkout details', async () => {
      await cartPage.checkout();
      await checkoutPage.fillDetails('Junaid', 'Ali', '54000');
      await checkoutPage.continue();
    });

    await test.step('Check the order summary', async () => {
      await expect(checkoutPage.summaryItemNames).toHaveText(productName);
    });

    await test.step('Finish the order', async () => {
      await checkoutPage.finish();
      await expect(checkoutPage.confirmationHeader).toHaveText('Thank you for your order!');
    });
  });

  test.describe('Form validation', () => {
    test.beforeEach(async ({ inventoryPage, cartPage }) => {
      await inventoryPage.addProductToCart('Sauce Labs Backpack');
      await inventoryPage.openCart();
      await cartPage.checkout();
    });

    test('shows an error when First Name is empty', async ({ checkoutPage }) => {
      await checkoutPage.fillDetails('', 'Ali', '54000');
      await checkoutPage.continue();
      await expect(checkoutPage.errorMessage).toContainText('First Name is required');
    });

    test('shows an error when Last Name is empty', async ({ checkoutPage }) => {
      await checkoutPage.fillDetails('Junaid', '', '54000');
      await checkoutPage.continue();
      await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
    });

    test('shows an error when Postal Code is empty', async ({ checkoutPage }) => {
      await checkoutPage.fillDetails('Junaid', 'Ali', '');
      await checkoutPage.continue();
      await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
    });
  });
});