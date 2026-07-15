import { expect, request, test } from "@playwright/test";
import dotenv from "dotenv";
import { API_Utils } from "../../utils/API_Utils";

dotenv.config();

const loginPayLoad = {
  userEmail: process.env.SECURITY_TEST_EMAIL,
  userPassword: process.env.SECURITY_TEST_PASSWORD,
};
const createOrderPayload = {
  orders: [
    { country: "Antarctica", productOrderedId: "6960eae1c941646b7a8b3ed3" },
  ],
};

let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
  const api = new API_Utils(apiContext, loginPayLoad);

  // Create a real order first so there's an actual "View" button to click —
  // its ID isn't needed directly since the route interception below swaps
  // the request to a DIFFERENT (foreign) order ID regardless.
  await api.createOrder(createOrderPayload);
  token = await api.getToken();
});

test("user cannot view another account's order details via a tampered request", async ({
  page,
}) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client/");

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "ORDERS" })
    .click();

  // Intercept the "get order details" request and redirect it to a
  // different (foreign) order ID — this simulates a user tampering with
  // the request to try to view an order that isn't theirs.
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b7",
      }),
  );

  await page.locator("button").filter({ hasText: "View" }).first().click();

  await expect(page.locator("p.blink_me")).toHaveText(
    "You are not authorize to view this order",
  );
});
