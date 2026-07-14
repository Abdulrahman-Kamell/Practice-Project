import { expect } from "@playwright/test";
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
    // Wait for the row to actually render before counting — goToOrders()
    // only waits for the URL to change, not for the app to finish fetching
    // and rendering the orders table afterward. Counting too early can
    // see a still-empty table and capture the wrong baseline.
    await row.waitFor({ state: "visible" });
    const countBefore = await this.orders.count();
    await row.getByRole("button", { name: "Delete" }).click();
    await expect(this.orders).toHaveCount(countBefore - 1);
  }

  // Removes all orders from the list. Safe to call on an already-empty list.
  async clearOrders() {
    while ((await this.orders.count()) > 0) {
      const countBefore = await this.orders.count();
      await this.orders.first().getByRole("button", { name: "Delete" }).click();
      await expect(this.orders).toHaveCount(countBefore - 1);
    }
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
