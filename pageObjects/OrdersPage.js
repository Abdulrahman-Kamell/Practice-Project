import { SideBar } from './SideBar';

export class OrdersPage {

    constructor(page) {

        this.page = page;
        this.sideBar = new SideBar(page);
        this.orders = page.locator('tbody').locator('tr');
        this.goBackToShopButton = page.getByRole('Button', { name: 'Go Back To Shop' });
        this.goBackToCartButton = page.getByRole('Button', { name: 'Go Back To Cart' });

    }

    async viewOrderDetails(orderId) {

        const row = this.orders.filter({ hasText: orderId });
        await row.getByRole('button', { name: 'View' }).click();

    }

    async deleteOrder(orderId) {

        const row = this.orders.filter({ hasText: orderId });
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