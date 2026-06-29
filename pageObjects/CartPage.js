import { SideBar } from './SideBar';

export class CartPage {

    constructor(page) {

        this.page = page;
        this.sideBar = new SideBar(page);
        this.checkoutButton = page.locator('text=Checkout');
        this.cartItems = page.locator('li.items');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });

    }

    // Optimization: centralize product-to-cart-item lookup to avoid duplicated locator chains.
    getCartItem(productName) {

        return this.cartItems.filter({ hasText: productName }).first();

    }

    async checkout() {

        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle');

    }

    async buyProduct(productName) {

        // Optimization: reuse the cart item helper for cleaner and more maintainable selectors.
        await this.getCartItem(productName).getByRole('button', { name: 'Buy Now' }).click();
        await this.page.waitForLoadState('networkidle');

    }

    async deleteProductFromCart(productName) {

        // Optimization: wait for the cart row to disappear after delete for better stability.
        const cartItem = this.getCartItem(productName);
        await cartItem.getByRole('button', { name: 'Delete' }).click();
        await cartItem.waitFor({ state: 'detached' });

    }

    async continueShopping() {

        await this.continueShoppingButton.click();
        await this.page.waitForLoadState('networkidle');

    }

}
