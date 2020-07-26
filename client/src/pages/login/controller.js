export default class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init(root) {
    const status = await this.model.init();
    if (status == 200) location.hash = '#mypage';
    this.view.init(root);
    this.addEventHandlers();
  }

  addEventHandlers() {
    this.view.loginEvent.addListener((data) => this.model.login(data));
    this.model.loginEvent.addListener((data) => this.view.login(data));
  }
}
