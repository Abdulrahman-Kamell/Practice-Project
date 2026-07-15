export class API_Utils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayLoad },
    );
    const loginResponseJson = await loginResponse.json();
    return loginResponseJson.token;
  }

  async createOrder(createOrderPayload) {
    const createOrderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: createOrderPayload,
        headers: {
          Authorization: await this.getToken(),
          "content-type": "application/json",
        },
      },
    );
    const createOrderResponseJson = await createOrderResponse.json();
    return createOrderResponseJson.orders[0];
  }
}
