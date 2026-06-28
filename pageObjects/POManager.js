import { RegisterationPage } from './RegisterationPage';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { OrdersPage } from './OrdersPage';
import { SideBar } from './SideBar';

export class POManager {

    constructor(page) {
        this.page = page;
    }

    getRegisterationPage() {
        return new RegisterationPage(this.page);
    }

    getLoginPage() {
        return new LoginPage(this.page);
    }

    getHomePage() {
        return new Dashboard(this.page);
    }

    getCartPage() {
        return new CartPage(this.page);
    }

    getCheckoutPage() {
        return new CheckoutPage(this.page);
    }

    getOrdersPage() {
        return new OrdersPage(this.page);
    }

    getSideBar() {
        return new SideBar(this.page);
    }

}
