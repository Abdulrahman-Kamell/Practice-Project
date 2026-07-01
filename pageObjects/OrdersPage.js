import { SideBar } from "./SideBar";

export class OrdersPage {
  constructor(page) {
    this.page = page;
    this.sideBar = new SideBar(page);
    this.orders = page.locator("tbody").locator("tr");
    this.goBackToShopButton = page.getByRole("button", {
      name: "Go Back To Shop",
    });
    this.goBackToCartButton = page.getByRole("button", {
      name: "Go Back To Cart",
    });
    // Assertion: orders page heading
    this.pageHeading = page.getByRole("heading", { name: "Your Orders" });
  }

  // Centralize order-row resolution to avoid duplicated filters.
  getOrderRow(orderId) {
    return this.orders.filter({ hasText: orderId }).first();
  }

  // Assertion: returns the product name, price, and date for a specific order row.
  async getOrderDetails(orderId) {
    const row = this.getOrderRow(orderId);
    return {
      productName: await row.locator("td").nth(1).textContent(),
      price: await row.locator("td").nth(2).textContent(),
      date: await row.locator("td").nth(3).textContent(),
    };
  }

  async viewOrderDetails(orderId) {
    // Use shared row helper for consistent targeting.
    const row = this.getOrderRow(orderId);
    await row.getByRole("button", { name: "View" }).click();
  }

  async deleteOrder(orderId) {
    // Use shared row helper for consistent targeting.
    const row = this.getOrderRow(orderId);
    await row.getByRole("button", { name: "Delete" }).click();
    await this.page.waitForLoadState("networkidle");
  }

  async goBackToShop() {
    await this.goBackToShopButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async goBackToCart() {
    await this.goBackToCartButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
