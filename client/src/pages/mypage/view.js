import Event from '../../utils/event';
import myPage from '../../components/templates/mypage';
import { getNumber } from '../../utils/helper';

export default class MyPageView {
  init(app, data) {
    this.app = app;
    this.render(data);
    this.createEvents();
    const projectCards = app.querySelectorAll('.mypage-column-card');
    projectCards.forEach((card) =>
      card.addEventListener('click', (event) => {
        this.projectCardClickEvent.trigger(getNumber(card.id));
      }),
    );
  }

  createEvents() {
    this.projectCardClickEvent = new Event();
  }

  render(data) {
    this.app.innerHTML = myPage(data);
  }
}
