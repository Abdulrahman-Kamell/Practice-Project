export class RegisterationPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.emailInput = page.getByPlaceholder("email@example.com");
    this.phoneNumberInput = page.getByPlaceholder("enter your number");
    this.occupationDropDown = page.getByRole("combobox");
    this.passwordInput = page.getByPlaceholder("Passsword");
    this.confirmPasswordInput = page.getByPlaceholder("Confirm Passsword");
    this.ageConsent = page.getByRole("checkbox");
    this.registerButton = page.getByRole("button", { name: "Register" });
    // Assertion: "Login here" link shown after successful registration redirect
    this.loginHereLink = page.getByRole("link", { name: "Login here" });
  }

  async register(
    firstName,
    lastName,
    email,
    phone,
    occupation,
    gender,
    password,
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneNumberInput.fill(phone);
    await this.occupationDropDown.selectOption(occupation);
    // Create the gender locator once before interacting with it.
    const genderOption = this.page.getByRole("radio", {
      name: gender,
      exact: true,
    });
    await genderOption.check();
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.ageConsent.check();
    await this.registerButton.click();
    // Wait for login button as a post-submit readiness signal.
    await this.page.getByRole("button", { name: "Login" }).waitFor();
  }
}
