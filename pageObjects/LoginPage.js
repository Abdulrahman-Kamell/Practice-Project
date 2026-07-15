export class LoginPage {
  constructor(page) {
    this.page = page;
    this.backgroundTitle = page.getByText("Rahul Shetty Academy");
    this.userNameInput = page.locator("#userEmail");
    this.passwordInput = page.locator("#userPassword");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.forgotPasswordLink = page.getByRole("link", {
      name: "Forgot password?",
    });
    this.registerLink = page.getByRole("link", { name: "Register" });
  }

  async login(userName, password) {
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.locator(".card-body").first().waitFor();
  }

  async navigateToRegisteration() {
    await this.registerLink.click();
    await this.page.getByRole("button", { name: "Register" }).waitFor();
  }
}
