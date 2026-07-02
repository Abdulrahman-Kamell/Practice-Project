/**
 * Centralized route paths for the app under test.
 * Combined with `baseURL` in playwright.config.js via page.goto(ROUTES.x).
 *
 * Keeping these in one place means a route change only needs updating here,
 * not across every spec file that navigates to it.
 */
export const ROUTES = {
  login: "#/auth/login",
  register: "#/auth/register",
  home: "#/dashboard/dash",
  cart: "#/dashboard/cart",
  orders: "#/dashboard/myorders",
};
