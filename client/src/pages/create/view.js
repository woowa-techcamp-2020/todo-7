import Event from '../../utils/event';
import createPage from '../../components/templates/create';
import { getNumber } from '../../utils/helper';

export default class CreatePageView {
  init(app, data) {
    this.app = app;
    this.render(data);
    this.createEvents();
    this.addEventListeners();
  }

  createEvents() {
    this.createProjectEvent = new Event();
  }

  addEventListeners() {
    this.titleInput = this.app.querySelector('.text-input');
    const createButton = this.app.querySelector('.create-project-button');
    const userCardDeleteIcons = this.app.querySelectorAll('.create-page-column-card-delete-icon');

    createButton.addEventListener('click', (event) => this.createProjectHandler(event));
    this.titleInput.addEventListener('keyup', (event) => {
      createButton.disabled = this.titleInput.value.length == 0;
    });
    userCardDeleteIcons.forEach((icon) =>
      icon.addEventListener('click', (event) => {
        icon.closest('.create-page-column-card').remove();
      }),
    );
  }

  createProjectHandler(event) {
    const cards = this.app.querySelectorAll('.create-page-column-card');
    this.createProjectEvent.trigger({
      title: this.titleInput.value,
      users: Array.from(cards).map((card) => ({
        id: getNumber(card.id),
        authority: card.querySelector('select').value,
      })),
    });
  }

  render(data) {
    this.app.innerHTML = createPage(data);
  }
}
