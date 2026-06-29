import { SideBar } from './SideBar';

export class CheckoutPage {

    constructor(page) {

        this.page = page;
        this.sideBar = new SideBar(page);

        // Optimization: use one reusable resolver for similar field locators.
        this.creditCardInput = this.getInputField('Credit Card Number');
        this.cvvInput = this.getInputField('CVV');
        this.nameOnCardInput = this.getInputField('Name on Card');
        this.applyCouponInput = this.getInputField('Apply Coupon');

        this.monthDropdown = page.locator('select').first();
        this.yearDropdown = page.locator('select').nth(1);
        this.countryInput = page.getByPlaceholder('Select Country');
        this.applyCouponButton = page.locator('text=Apply Coupon');
        this.placeOrderButton = page.locator('text=PLACE ORDER');
        this.orderIdLabel = page.locator('tbody tr label').last();

    }

    // Optimization: keep field selector logic in one place to simplify maintenance.
    getInputField(fieldLabel) {

        return this.page.locator('.field')
            .filter({ hasText: fieldLabel })
            .locator('input');

    }

    async fillCreditCardDetails(cardNumber, month, year, cvv, nameOnCard) {

        await this.creditCardInput.fill(cardNumber);
        await this.monthDropdown.selectOption(month);
        await this.yearDropdown.selectOption(year);
        await this.cvvInput.fill(cvv);
        await this.nameOnCardInput.fill(nameOnCard);

    }

    async selectCountry(countryName) {

        // Optimization: remove unnecessary await when creating a locator object.
        await this.countryInput.pressSequentially(countryName);
        const dropdown = this.page.locator('.ta-results');
        await dropdown.waitFor();

        await dropdown
            .getByRole('button')
            .filter({ hasText: countryName })
            .click();

    }

    async placeOrder() {

        await this.placeOrderButton.click();
        // Optimization: guard against null textContent to avoid runtime failures.
        const orderId = await this.orderIdLabel.textContent();
        return (orderId ?? '').replace(/\|/g, '').trim();

    }

}