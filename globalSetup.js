import { chromium } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
    waitUntil: "domcontentloaded",
  });

  await page.locator("#userEmail").fill(process.env.LOGIN_USERNAME);
  await page.locator("#userPassword").fill(process.env.LOGIN_PASSWORD);
  await page.getByRole("button", { name: "Login" }).click();

  // Wait until the dashboard is loaded before saving state
  await page.waitForURL("**/dashboard/dash**");
  await page.locator(".card-body").first().waitFor();

  await page.context().storageState({
    path: path.join(__dirname, "storageState.json"),
  });

  await browser.close();
}
