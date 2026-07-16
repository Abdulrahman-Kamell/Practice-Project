import { RegisterationPage } from "./RegisterationPage.js";
import { LoginPage } from "./LoginPage.js";
import { DashboardPage } from "./DashboardPage.js";
import { CartPage } from "./CartPage.js";
import { CheckoutPage } from "./CheckoutPage.js";
import { OrdersPage } from "./OrdersPage.js";
import { OrderDetailsPage } from "./OrderDetailsPage.js";
import { OrderViewPage } from "./OrderViewPage.js";
import { SideBar } from "./SideBar.js";

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

  getDashboardPage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.dashboardPage) {
      this.pageObjects.dashboardPage = new DashboardPage(this.page);
    }
    return this.pageObjects.dashboardPage;
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

  getOrderViewPage() {
    // Lazily initialize and reuse the same page object instance.
    if (!this.pageObjects.orderViewPage) {
      this.pageObjects.orderViewPage = new OrderViewPage(this.page);
    }
    return this.pageObjects.orderViewPage;
  }
}
