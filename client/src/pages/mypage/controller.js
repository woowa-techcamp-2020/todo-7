export default class LoginController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init(root) {
    const status = await this.model.init();
    if (status != 200) location.hash = '#project';
    this.view.init(root);
    this.addEventHandlers();
  }

  addEventHandlers() {}
}
