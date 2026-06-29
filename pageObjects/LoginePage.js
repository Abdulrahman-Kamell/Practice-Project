export class LoginPage {

    constructor(page) {

        this.page = page;
        this.backgroundTitle = page.getByText('Rahul Shetty Academy');
        this.userNameInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        // Optimization: use consistent naming for the register link locator.
        this.registerLink = page.getByRole('link', { name: 'Register' });

    }

    async login(userName, password) {

        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        // Optimization: wait for dashboard content instead of relying on implicit timing.
        await this.page.locator('.card-body').first().waitFor();

    }

    async navigateToRegisteration() {

        await this.registerLink.click();
        // Optimization: wait for registration form to be visible after navigation.
        await this.page.getByRole('button', { name: 'Register' }).waitFor();

    }

}