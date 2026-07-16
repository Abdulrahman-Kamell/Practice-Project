/**
 * Represents the immediate post-checkout "Thankyou for the order" page.
 * This is a DIFFERENT page/template from the order detail page reached
 * via Orders -> View (see OrderViewPage.js) — billing/delivery address
 * only exists on that other page, not here.
 */
export class OrderDetailsPage {
  constructor(page) {
    this.page = page;

    // Assertion: confirmation message displayed after a successful order placement
    this.thankYouMessage = page.getByText("THANKYOU FOR THE ORDER.");

    // Assertion: the placed order ID
    this.orderIdText = page.locator("td.em-spacer-1 label").last();

    // Action: navigate back to the orders list from the confirmation page
    this.viewOrdersButton = page.locator(
      'div[routerlink="/dashboard/myorders"]',
    );
  }

  // The confirmation table nests several <td> wrappers around each product
  // (content-wrap > order-summary-box > line-item), and hasText matches
  // ancestors as well as the element that actually contains the text — so
  // filtering by "Qty:" alone matched all three nested levels at once
  // (strict mode violation). ".line-item.product-info-column" is the real,
  // specific class on the innermost cell, confirmed from the actual DOM.
  getProductNameCell(productName) {
    return this.page
      .locator("td.line-item.product-info-column")
      .filter({ hasText: productName });
  }

  async getOrderId() {
    await this.orderIdText.waitFor();
    const raw = await this.orderIdText.textContent();
    return raw.replace(/\|/g, "").trim();
  }
}
