export default class CreatePageController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init(root) {
    const status = await this.model.init();
    if (status != 200) location.hash = '#login';
    this.view.init(root, this.model.getData());
    this.addEventHandlers();
  }

  addEventHandlers() {
    this.view.projectCardClickEvent.addListener((id) => (location.hash = `#project-${id}`));
  }
}
