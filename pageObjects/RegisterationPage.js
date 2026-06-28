export class RegisterationPage {

    constructor(page) {

        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('email@example.com');
        this.phoneNumberInput = page.getByPlaceholder('enter your number');
        this.occupationDropDown = page.getByRole('combobox');
        this.passwordInput = page.getByPlaceholder('Passsword');
        this.confirmPasswordInput = page.getByPlaceholder('Confirm Passsword');
        this.ageConsent = page.getByRole('checkbox');
        this.registerButton = page.getByRole('button', { name: 'Register' });

    }

    async register(firstName, lastName, email, phone, occupation, gender, password) {

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.phoneNumberInput.fill(phone);
        await this.occupationDropDown.selectOption(occupation);
        await this.page.getByRole('radio', { name: gender, exact: true }).check();
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.ageConsent.check();
        await this.registerButton.click();

    }

}