import { test as base, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";
import { POManager } from "../pageObjects/POManager";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Custom test object that extends Playwright's base `test`.
 * Each key below becomes a fixture you can destructure directly in a test:
 *
 *   test('...', async ({ loginPage, homePage }) => { ... })
 *
 * Every fixture here pulls from the SAME POManager instance for a given test,
 * so page objects stay cached/shared exactly like your POManager already does.
 */
export const test = base.extend({
  // Overrides Playwright's built-in storageState option to route each test to
  // the per-worker account file created by globalSetup.js. No account setup
  // happens here — the expensive registration already ran once upfront.
  storageState: async ({}, use, testInfo) => {
    await use(
      path.join(__dirname, `../.auth/worker-${testInfo.parallelIndex}.json`),
    );
  },

  // One shared POManager per test, built from the built-in `page` fixture.
  poManager: async ({ page }, use) => {
    const poManager = new POManager(page);
    await use(poManager);
  },

  loginPage: async ({ poManager }, use) => {
    await use(poManager.getLoginPage());
  },

  registerationPage: async ({ poManager }, use) => {
    await use(poManager.getRegisterationPage());
  },

  homePage: async ({ poManager }, use) => {
    await use(poManager.getHomePage());
  },

  cartPage: async ({ poManager }, use) => {
    await use(poManager.getCartPage());
  },

  checkoutPage: async ({ poManager }, use) => {
    await use(poManager.getCheckoutPage());
  },

  ordersPage: async ({ poManager }, use) => {
    await use(poManager.getOrdersPage());
  },

  orderDetailsPage: async ({ poManager }, use) => {
    await use(poManager.getOrderDetailsPage());
  },

  sideBar: async ({ poManager }, use) => {
    await use(poManager.getSideBar());
  },
});

export { expect };
