import { SideBar } from "./SideBar";

export class Dashboard {

    constructor(page) {

        this.page = page;
        this.sideBar = new SideBar(page);
        this.products = page.locator('.card-body');
        this.productTitle = page.locator('.card-body b');
        this.continueShoppingButton = page.getByRole('link', { name: 'Continue Shopping' });

    }

    async addProductToCart(productName) {

        const count = await this.products.count();
        await this.products
            .filter({ hasText: productName })
            .getByRole('button', { name: 'Add To Cart' })
            .click();
        await this.page.waitForLoadState('networkidle');

    }

    async viewProductDetails(productName) {

        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            const product = this.products.nth(i);
            const title = await product.locator('b').textContent();

            if (title.trim() === productName) {
                await product.locator('text= View').click();
                break;
            }
        }
        await this.page.waitForLoadState('networkidle');

    }

    async continueShopping() {

        await this.continueShoppingButton.click();
        await this.products.first().waitFor();

    }

}
