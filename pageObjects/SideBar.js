export class SideBar {

    constructor(page) {

        this.page = page;
        this.homeButton = page.getByRole('button', { name: 'HOME' });
        this.ordersButton = page.getByRole('button', { name: 'ORDERS' });
        this.cartButton = page.locator('button[routerlink="/dashboard/cart"]');
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });

    }

    async navigateToHomePage() {

        await this.homeButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('.card-body').first().waitFor();

    }

    async navigateToOrderPage() {

        await this.ordersButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('tr').first().waitFor();

    }

    async navigateToCartPage() {

        await this.cartButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator("div li").first().waitFor();

    }

    async signOut() {

        await this.signOutButton.click();
        await this.page.waitForLoadState('networkidle');

    }

}