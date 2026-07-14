import { chromium } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { ROUTES } from "../constants/routes.js";
import { LoginPage } from "../pageObjects/LoginePage.js";
import { RegisterationPage } from "../pageObjects/RegisterationPage.js";
import { CartPage } from "../pageObjects/CartPage.js";
import { OrdersPage } from "../pageObjects/OrdersPage.js";
import { generateRegistrationData } from "../utils/testData.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://rahulshettyacademy.com/client/";

async function registerWithRetry(
  loginPage,
  registerationPage,
  workerIndex,
  attempts = 3,
) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const user = generateRegistrationData();
    user.email = user.email.replace(
      "@test.com",
      `.w${workerIndex}.a${attempt}@test.com`,
    );

    try {
      await registerationPage.register(
        user.firstName,
        user.lastName,
        user.email,
        user.phone,
        user.occupation,
        user.gender,
        user.password,
      );
      return user;
    } catch (error) {
      if (attempt === attempts) throw error;
      console.log(
        `Registration attempt ${attempt} failed, retrying with a new account...`,
      );
    }
  }
}

/**
 * Registers and logs in one isolated account per Playwright worker, all
 * upfront before any test starts. Each worker writes its own
 * .auth/worker-N.json file, so parallel workers never share cart or order
 * state — eliminating the cross-worker race conditions that come from a
 * single shared account.
 */
export default async function globalSetup(config) {
  const workerCount = config.workers;
  const browser = await chromium.launch();

  for (let workerIndex = 0; workerIndex < workerCount; workerIndex++) {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const registerationPage = new RegisterationPage(page);

    await page.goto(BASE_URL + ROUTES.login, {
      waitUntil: "domcontentloaded",
    });
    await loginPage.navigateToRegisteration();
    const user = await registerWithRetry(
      loginPage,
      registerationPage,
      workerIndex,
    );
    await loginPage.login(user.email, user.password);

    await page.waitForURL("**/dashboard/dash**");
    await page.locator(".card-body").first().waitFor();

    // Safety net: clear any data the site might seed for new accounts.
    await page.goto(BASE_URL + ROUTES.cart, {
      waitUntil: "domcontentloaded",
    });
    await new CartPage(page).clearCart();
    await page.goto(BASE_URL + ROUTES.orders, {
      waitUntil: "domcontentloaded",
    });
    await new OrdersPage(page).clearOrders();

    await page.context().storageState({
      path: path.join(__dirname, `../.auth/worker-${workerIndex}.json`),
    });

    await page.close();
  }

  await browser.close();
}
