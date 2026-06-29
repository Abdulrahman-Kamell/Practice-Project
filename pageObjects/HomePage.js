import { SideBar } from "./SideBar";

export class Dashboard {

    constructor(page) {

        this.page = page;
        this.sideBar = new SideBar(page);
        this.products = page.locator('.card-body');
        this.continueShoppingButton = page.getByRole('link', { name: 'Continue Shopping' });

    }

    // Optimization: expose a shared product-card locator to reduce repetition.
    getProductCard(productName) {

        return this.products.filter({ hasText: productName }).first();

    }

    async addProductToCart(productName) {

        // Optimization: remove unused counting and use the shared product-card helper.
        await this.getProductCard(productName)
            .getByRole('button', { name: 'Add To Cart' })
            .click();
        await this.page.waitForLoadState('networkidle');

    }

    async viewProductDetails(productName) {

        // Optimization: use direct filtering instead of a full manual scan loop.
        await this.getProductCard(productName).getByRole('button', { name: 'View' }).click();
        await this.page.waitForLoadState('networkidle');

    }

    async continueShopping() {

        await this.continueShoppingButton.click();
        await this.products.first().waitFor();

    }

}
