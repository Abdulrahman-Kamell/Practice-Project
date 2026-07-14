import { SideBar } from "./SideBar";

/**
 * Represents the order detail page reached via Orders -> View. This is a
 * separate page/template from the immediate post-checkout thank-you page
 * (see OrderDetailsPage.js) — billing and delivery address only render
 * here, confirmed from the real DOM (not present on the thank-you page).
 */
export class OrderViewPage {
  constructor(page) {
    this.page = page;
    this.sideBar = new SideBar(page);

    // Assertion: billing and delivery address sections
    this.billingSection = page.locator(".address").filter({
      has: page.getByText("Billing Address"),
    });
    this.deliverySection = page.locator(".address").filter({
      has: page.getByText("Delivery Address"),
    });

    // Assertion: product summary — confirmed from the real DOM. Only one
    // product card renders on this page per order, so a direct class-based
    // locator is unambiguous here (unlike the thank-you page's nested
    // table structure, which needed hasText filtering to disambiguate).
    this.productCard = page.locator(".artwork-card");
    this.orderedProductName = this.productCard.locator(".title");
    this.orderedProductPrice = this.productCard.locator(".price");
  }

  async getBillingDetails() {
    await this.billingSection.waitFor();

    const [email, country] = await this.billingSection
      .locator("p")
      .allTextContents();

    return {
      email: email.trim(),
      country: country.replace("Country - ", "").trim(),
    };
  }

  async getDeliveryDetails() {
    await this.deliverySection.waitFor();

    const [email, country] = await this.deliverySection
      .locator("p")
      .allTextContents();

    return {
      email: email.trim(),
      country: country.replace("Country - ", "").trim(),
    };
  }
}
