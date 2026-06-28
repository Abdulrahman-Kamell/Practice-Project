import { SideBar } from './SideBar';

export class CartPage {

    constructor(page) {

        this.page = page;
        this.sideBar = new SideBar(page);
        this.checkoutButton = page.locator('text=Checkout');
        this.cartItems = page.locator('li.items');
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });

    }

    async checkout() {

        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle');

    }

    async buyProduct(productName) {

        await this.cartItems.filter({ hasText: productName }).getByRole('button', { name: 'Buy Now' }).click();
        await this.page.waitForLoadState('networkidle');

    }

    async deleteProductFromCart(productName) {

        await this.cartItems.filter({ hasText: productName }).getByRole('button', { name: 'Delete' }).click();

    }

    async continueShopping() {

        await this.continueShoppingButton.click();
        await this.page.waitForLoadState('networkidle');

    }

}
