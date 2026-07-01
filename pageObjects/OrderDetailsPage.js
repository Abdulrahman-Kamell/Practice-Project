import { SideBar } from "./SideBar";

export class OrderDetailsPage {
  constructor(page) {
    this.page = page;
    this.sideBar = new SideBar(page);

    // Assertion: confirmation message displayed after a successful order placement
    this.thankYouMessage = page.getByText("Thank you for Shopping With Us");

    // Product summary section
    this.productCard = page.locator(".artwork-card");
    // Assertion: the placed order ID
    this.orderIdText = page.locator(".col-text");
    // Assertion: product details shown in the order summary
    this.orderedProductName = this.productCard.locator(".title");
    this.orderedProductPrice = this.productCard.locator(".price");
    // Assertion: billing and delivery address sections
    this.billingSection = page.locator(".address").filter({
      has: page.getByText("Billing Address"),
    });
    this.deliverySection = page.locator(".address").filter({
      has: page.getByText("Delivery Address"),
    });
    // Action: navigate back to the orders list from the confirmation page
    this.viewOrdersButton = page.locator(
      'div[routerlink="/dashboard/myorders"]',
    );
  }

  async getOrderId() {
    await this.orderIdText.waitFor();
    const raw = await this.orderIdText.textContent();
    return (raw ?? "").trim();
  }

  async getBillingDetails() {
    const [email, country] = await this.billingSection
      .locator("p")
      .allTextContents();

    return {
      email: email.trim(),
      country: country.replace("Country - ", "").trim(),
    };
  }

  async getDeliveryDetails() {
    const [email, country] = await this.deliverySection
      .locator("p")
      .allTextContents();

    return {
      email: email.trim(),
      country: country.replace("Country - ", "").trim(),
    };
  }

  async goToOrders() {
    await this.viewOrdersButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
