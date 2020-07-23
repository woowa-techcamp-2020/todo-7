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
    this.view.createProjectEvent.addListener((data) => this.model.createProject(data));
    this.model.createProjectEvent.addListener((id) => (location.hash = `#project-${id}`));
  }
}
