import { RegisterationPage } from "./RegisterationPage";
import { LoginPage } from "./LoginePage";
import { Dashboard } from "./HomePage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrdersPage } from "./OrdersPage";
import { OrderDetailsPage } from "./OrderDetailsPage";
import { SideBar } from "./SideBar";

export class POManager {
  constructor(page) {
    this.page = page;
    // Cache page object instances to avoid unnecessary re-instantiation.
    this.pageObjects = {};
  }

  getRegisterationPage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.registerationPage) {
      this.pageObjects.registerationPage = new RegisterationPage(this.page);
    }
    return this.pageObjects.registerationPage;
  }

  getLoginPage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.loginPage) {
      this.pageObjects.loginPage = new LoginPage(this.page);
    }
    return this.pageObjects.loginPage;
  }

  getHomePage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.homePage) {
      this.pageObjects.homePage = new Dashboard(this.page);
    }
    return this.pageObjects.homePage;
  }

  getCartPage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.cartPage) {
      this.pageObjects.cartPage = new CartPage(this.page);
    }
    return this.pageObjects.cartPage;
  }

  getCheckoutPage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.checkoutPage) {
      this.pageObjects.checkoutPage = new CheckoutPage(this.page);
    }
    return this.pageObjects.checkoutPage;
  }

  getOrdersPage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.ordersPage) {
      this.pageObjects.ordersPage = new OrdersPage(this.page);
    }
    return this.pageObjects.ordersPage;
  }

  getSideBar() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.sideBar) {
      this.pageObjects.sideBar = new SideBar(this.page);
    }
    return this.pageObjects.sideBar;
  }

  getOrderDetailsPage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.orderDetailsPage) {
      this.pageObjects.orderDetailsPage = new OrderDetailsPage(this.page);
    }
    return this.pageObjects.orderDetailsPage;
  }
}
