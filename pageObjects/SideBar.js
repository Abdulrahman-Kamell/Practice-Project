export class SideBar {
  constructor(page) {
    this.page = page;
    this.homeButton = page.getByRole("button", { name: "HOME" });
    this.ordersButton = page.getByRole("button", { name: "ORDERS" });
    this.cartButton = page.locator('button[routerlink="/dashboard/cart"]');
    this.signOutButton = page.getByRole("button", { name: "Sign Out" });
    // Assertion: cart badge label showing item count (rendered as a <label> inside the cart button)
    this.cartItemCount = page.locator(
      'button[routerlink="/dashboard/cart"] label',
    );
    // Destination readiness locators
    this.homeReadyMarker = page.locator(".card-body").first();
    this.ordersReadyMarker = page.locator("tr").first();
    this.cartReadyMarker = page.locator("div li").first();
  }

  async navigateToHomePage() {
    await this.navigateAndWait(this.homeButton, this.homeReadyMarker);
  }

  async navigateToOrderPage() {
    await this.navigateAndWait(this.ordersButton, this.ordersReadyMarker);
  }

  async navigateToCartPage() {
    await this.navigateAndWait(this.cartButton, this.cartReadyMarker);
  }

  // Shared navigation helper: click a button and wait for a stable ready-marker.
  async navigateAndWait(button, readyMarker) {
    await button.click();
    await readyMarker.waitFor();
  }

  async signOut() {
    await this.signOutButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
