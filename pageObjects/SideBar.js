import { ROUTES } from "../constants/routes.js";

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
  }

  async navigateToHomePage() {
    await this.navigateAndWait(this.homeButton, ROUTES.home);
  }

  async navigateToOrderPage() {
    await this.navigateAndWait(this.ordersButton, ROUTES.orders);
  }

  async navigateToCartPage() {
    await this.navigateAndWait(this.cartButton, ROUTES.cart);
  }

  // Shared navigation helper: click a button and wait until the URL contains
  // the expected route fragment. This is state-independent — it confirms the
  // navigation completed without assuming any data is present on the page.
  async navigateAndWait(button, routeFragment) {
    await button.click();
    await this.page.waitForURL((url) => url.href.includes(routeFragment));
  }

  async signOut() {
    await this.signOutButton.click();
    await this.page.waitForURL((url) => url.href.includes("/auth/login"));
  }
}
