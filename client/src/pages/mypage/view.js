import Event from '../../utils/event';
import myPage from '../../components/templates/mypage';
import { getNumber } from '../../utils/helper';

export default class MyPageView {
  init(app, data) {
    this.app = app;
    this.render(data);
    this.createEvents();
    this.addEventListeners();
  }

  createEvents() {
    this.projectCardClickEvent = new Event();
    this.newProjectButtonClickEvent = new Event();
  }

  addEventListeners() {
    const projectCards = this.app.querySelectorAll('.mypage-column-card');
    projectCards.forEach((card) =>
      card.addEventListener('click', (event) => {
        this.projectCardClickEvent.trigger(getNumber(card.id));
      }),
    );
    const createButton = this.app.querySelector('.mypage-project-create-button');
    createButton.addEventListener('click', (event) => {
      this.newProjectButtonClickEvent.trigger();
    });
  }

  render(data) {
    this.app.innerHTML = myPage(data);
  }
}
