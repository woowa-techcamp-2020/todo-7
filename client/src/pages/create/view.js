import Event from '../../utils/event';
import createPage from '../../components/templates/create';
import { getNumber } from '../../utils/helper';

export default class CreatePageView {
  init(app, data) {
    this.app = app;
    this.render(data);
    this.createEvents();
  }

  createEvents() {
    this.projectCardClickEvent = new Event();
  }

  render(data) {
    this.app.innerHTML = createPage(data);
  }
}
