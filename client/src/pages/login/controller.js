export default class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init(root) {
    this.model.init();
    this.view.init(root);
    this.addEventHandlers();
  }

  addEventHandlers() {
    this.view.loginEvent.addListener((data) => this.model.login(data));
    this.model.loginEvent.addListener((data) => this.view.login(data));
  }
}
