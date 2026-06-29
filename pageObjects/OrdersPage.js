import { SideBar } from './SideBar';

export class OrdersPage {

    constructor(page) {

        this.page = page;
        this.sideBar = new SideBar(page);
        this.orders = page.locator('tbody').locator('tr');
        // Optimization: use valid ARIA role casing for robust role-based selectors.
        this.goBackToShopButton = page.getByRole('button', { name: 'Go Back To Shop' });
        this.goBackToCartButton = page.getByRole('button', { name: 'Go Back To Cart' });

    }

    // Optimization: centralize order-row resolution to avoid duplicated filters.
    getOrderRow(orderId) {

        return this.orders.filter({ hasText: orderId }).first();

    }

    async viewOrderDetails(orderId) {

        // Optimization: use shared row helper for consistent targeting.
        const row = this.getOrderRow(orderId);
        await row.getByRole('button', { name: 'View' }).click();

    }

    async deleteOrder(orderId) {

        // Optimization: use shared row helper for consistent targeting.
        const row = this.getOrderRow(orderId);
        await row.getByRole('button', { name: 'Delete' }).click();
        await this.page.waitForLoadState('networkidle');

    }

    async goBackToShop() {

        await this.goBackToShopButton.click();
        await this.page.waitForLoadState('networkidle');

    }

    async goBackToCart() {

        await this.goBackToCartButton.click();
        await this.page.waitForLoadState('networkidle');

    }

}