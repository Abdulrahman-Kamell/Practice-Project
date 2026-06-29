export class SideBar {

    constructor(page) {

        this.page = page;
        this.homeButton = page.getByRole('button', { name: 'HOME' });
        this.ordersButton = page.getByRole('button', { name: 'ORDERS' });
        this.cartButton = page.locator('button[routerlink="/dashboard/cart"]');
        this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
        // Optimization: keep destination readiness locators in one place.
        this.homeReadyMarker = page.locator('.card-body').first();
        this.ordersReadyMarker = page.locator('tr').first();
        this.cartReadyMarker = page.locator('div li').first();

    }

    // Optimization: extract repeated click-and-wait behavior into a shared helper.
    async navigateAndWait(button, readyMarker) {

        await button.click();
        await readyMarker.waitFor();

    }

    async navigateToHomePage() {

        // Optimization: use the shared navigation helper with targeted page readiness.
        await this.navigateAndWait(this.homeButton, this.homeReadyMarker);

    }

    async navigateToOrderPage() {

        // Optimization: use the shared navigation helper with targeted page readiness.
        await this.navigateAndWait(this.ordersButton, this.ordersReadyMarker);

    }

    async navigateToCartPage() {

        // Optimization: use the shared navigation helper with targeted page readiness.
        await this.navigateAndWait(this.cartButton, this.cartReadyMarker);

    }

    async signOut() {

        await this.signOutButton.click();
        await this.page.waitForLoadState('networkidle');

    }

}