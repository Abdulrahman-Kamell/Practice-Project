import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator("text=Checkout");
    this.cartItems = page.locator("li.items");
    this.continueShoppingButton = page.getByRole("button", {
      name: "Continue Shopping",
    });

    // Assertion: cart page title
    this.cartHeading = page.getByRole("heading", { name: "My Cart" });
    // Assertion: stock status text inside a cart item (e.g. "In Stock")
    this.stockStatus = page.locator(".stockStatus");
    // Assertion: subtotal and total price labels in the summary section
    this.subtotalPrice = page
      .locator(".subtotal .totalRow")
      .nth(0)
      .locator(".value");
    this.totalPrice = page
      .locator(".subtotal .totalRow")
      .nth(1)
      .locator(".value");
  }

  // Centralized product-to-cart-item lookup to avoid duplicated locator chains.
  getCartItem(productName) {
    return this.cartItems.filter({ hasText: productName }).first();
  }

  async checkout() {
    await this.checkoutButton.click();
    await this.page.locator("a.action__submit").waitFor();
  }

  async buyProduct(productName) {
    // Reuse the cart item helper for cleaner and more maintainable selectors.
    await this.getCartItem(productName)
      .getByRole("button", { name: "Buy Now" })
      .click();
    await this.page.waitForURL((url) => !url.href.includes("/dashboard/cart"));
  }

  async deleteProductFromCart(productName) {
    const cartItem = this.getCartItem(productName);
    await cartItem.locator("button.btn-danger").click();
    await cartItem.waitFor({ state: "detached" });
  }

  // Removes all items from the cart. Safe to call on an already-empty cart.
  async clearCart() {
    while ((await this.cartItems.count()) > 0) {
      const countBefore = await this.cartItems.count();
      await this.cartItems.first().locator("button.btn-danger").click();
      await expect(this.cartItems).toHaveCount(countBefore - 1);
    }
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await this.page.locator(".card-body").first().waitFor();
  }
}
