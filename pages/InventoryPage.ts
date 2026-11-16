import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly itemNames: Locator;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;
    readonly cartLink: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;
    readonly itemPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.itemPrices = page.locator('.inventory_item_price');
    }
    async addProductToCart(productName: string) {
        const product = this.page.locator('.inventory_item').filter({ hasText: productName });
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async sortBy(option: string) {
        const sortSelect = this.page.locator('.product_sort_container');
        await sortSelect.selectOption({ label: option });
    }

    async removeProductFromCart(productName: string) {
        const item = this.cartItems.filter({ hasText: productName });
        await item.getByRole('button', { name: 'Remove' }).click();
    }
    async openCart() {
        await this.cartLink.click();
    }
    async goto() {
        await this.page.goto('/inventory.html');
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}