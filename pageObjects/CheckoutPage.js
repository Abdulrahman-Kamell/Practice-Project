import { SideBar } from './SideBar';

export class CheckoutPage {

    constructor(page) {

        this.page = page;
        this.sideBar = new SideBar(page);

        this.creditCardInput = page.locator('.field')
            .filter({ hasText: 'Credit Card Number' })
            .locator('input');

        this.cvvInput = page.locator('.field')
            .filter({ hasText: 'CVV' })
            .locator('input');

        this.nameOnCardInput = page.locator('.field')
            .filter({ hasText: 'Name on Card' })
            .locator('input');

        this.applyCouponInput = page.locator('.field')
            .filter({ hasText: 'Apply Coupon' })
            .locator('input');

        this.monthDropdown = page.locator('select').first();
        this.yearDropdown = page.locator('select').nth(1);
        this.countryInput = page.getByPlaceholder('Select Country');
        this.applyCouponButton = page.locator('text=Apply Coupon');
        this.placeOrderButton = page.locator('text=PLACE ORDER');
        this.orderIdLabel = page.locator('tbody tr label').last();

    }

    async fillCreditCardDetails(cardNumber, month, year, cvv, nameOnCard) {

        await this.creditCardInput.fill(cardNumber);
        await this.monthDropdown.selectOption(month);
        await this.yearDropdown.selectOption(year);
        await this.cvvInput.fill(cvv);
        await this.nameOnCardInput.fill(nameOnCard);

    }

    async selectCountry(countryName) {

        await this.countryInput.pressSequentially(countryName);
        const dropdown = await this.page.locator('.ta-results');
        await dropdown.waitFor();

        await dropdown
            .getByRole('button')
            .filter({ hasText: countryName })
            .click();

    }

    async placeOrder() {

        await this.placeOrderButton.click();
        const orderId = await this.orderIdLabel.textContent();
        return orderId.replace(/\|/g, '').trim();

    }

}