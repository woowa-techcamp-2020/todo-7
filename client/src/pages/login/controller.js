export default class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init(root) {
    this.model.init();
    this.view.init(root);
  }
}
