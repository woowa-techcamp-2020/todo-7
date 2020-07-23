import Event from '../../utils/event';
import projectPage from '../../components/templates/project';
import card from '../../components/molecules/card';
import DragAndDrop from '../../utils/dragndrop';
import { getNumber } from '../../utils/helper';

export default class ProjectView {
  init(project, app, isAdmin) {
    this.project = project;
    this.app = app;
    this.render();
    this.createEvents();
    if (isAdmin) this.addEventListeners();
  }

  createEvents() {
    this.createNoteEvent = new Event();
    this.updateNoteEvent = new Event();
    this.deleteNoteEvent = new Event();
    this.createGroupEvent = new Event();
    this.deleteGroupEvent = new Event();
    this.moveNoteEvent = new Event();
    this.moveGroupEvent = new Event();
  }

  addEventListeners() {
    const self = this;
    this.app.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      return false;
    });
    this.app.addEventListener('click', (event) => this.onAppClickHandler(event, this));

    new DragAndDrop({
      container: this.app.querySelector('.project'),
      parentSelector: '.project-column-body',
      childSelector: '.project-column-card',
      onDragEnd: (card) => self.onCardDragEndHandler(card),
    });

    new DragAndDrop({
      container: this.app.querySelector('.project'),
      parentSelector: '.project-columns',
      childSelector: '.project-column',
      onDragEnd: (column) => self.onColumnDragEndHandler(column),
    });

    const columns = document.querySelectorAll('.project-column');
    columns.forEach((column) => {
      column.addEventListener('mousedown', (event) => this.onColumnClickHandler(event, this));
      column.addEventListener('keyup', (event) => this.onFormCardTypeHandler(event, this));
    });
  }

  onAppClickHandler(event, self) {
    const classList = event.target.classList;
    if (classList.contains('project-header-menu-icon')) {
      self.onEventColumnToggler(event, true);
    } else if (classList.contains('project-event-column-close-icon')) {
      self.onEventColumnToggler(event, false);
    }
  }

  onColumnClickHandler(event, self) {
    let foundHandler = true;
    const classList = event.target.classList;

    if (classList.contains('project-column-header-add-icon')) {
      self.onNoteAddIconCickHandler(event);
    } else if (classList.contains('project-column-form-card-add-button')) {
      self.onFormCardButtonClickHandler(event, true);
    } else if (classList.contains('project-column-form-card-cancel-button')) {
      self.onFormCardButtonClickHandler(event, false);
    } else if (classList.contains('project-column-form-card-textarea')) {
      //found handler
    } else {
      foundHandler = false;
    }

    if (foundHandler) event.stopImmediatePropagation();
  }
  onCardDragEndHandler(card) {
    this.moveNoteEvent.trigger({
      id: getNumber(card.id),
      targetId: getNumber(card.previousElementSibling.id),
      groupId: getNumber(card.closest('.project-column').id),
    });
  }

  onColumnDragEndHandler(column) {
    this.moveGroupEvent.trigger({
      id: getNumber(column.id),
      targetId: getNumber(column.previousElementSibling?.id) ?? 0,
    });
  }

  render() {
    this.app.innerHTML = projectPage(this.project);
  }

  createNoteCard(note) {
    this.app
      .querySelector(`#project-column-${note.groupId}`)
      .querySelector(`.project-column-body`)
      .firstElementChild.insertAdjacentHTML(
        'afterend',
        card({
          className: `project-column-card`,
          data: note,
        }),
      );
  }

  createEventCard(event) {
    console.log(event);
    this.app.querySelector(`.project-event-column-body`).insertAdjacentHTML(
      'afterbegin',
      card({
        className: `project-event-column-card`,
        data: event,
      }),
    );
  }

  updateColumnCounter(columnId) {
    const column = this.app.querySelector(`#project-column-${columnId}`);
    const count = column.querySelector('.project-column-body').childElementCount;
    column.querySelector('.project-column-header-counter').innerHTML = count - 1;
  }

  updateCard(data) {}

  createColumn(data) {}
  deleteColumn(data) {}

  toggleFormCard(formCard, clear = false) {
    formCard.style.display = formCard.style.display == 'block' ? null : 'block';
    if (clear) formCard.firstElementChild.innerHTML = '';
  }

  onEventColumnToggler(event, open) {
    const eventColumn = event.currentTarget.querySelector('.project-event-column');
    if (open) eventColumn.style.transform = 'translateX(-360px)';
    else eventColumn.style.transform = 'translateX(360px)';
  }

  onNoteAddIconCickHandler(event) {
    const formCard = event.currentTarget.querySelector('.project-column-form-card');
    this.toggleFormCard(formCard);
  }

  onFormCardButtonClickHandler(event, isAdd) {
    const formCard = event.currentTarget.querySelector('.project-column-form-card');
    if (isAdd) {
      this.createNoteEvent.trigger({
        title: formCard.firstElementChild.innerHTML,
        groupId: getNumber(formCard.closest('.project-column').id),
      });
    }
    this.toggleFormCard(formCard, isAdd);
  }

  onFormCardTypeHandler(event) {
    const { target, currentTarget } = event;
    if (target.className == 'project-column-form-card-textarea textarea') {
      const addButton = currentTarget.querySelector('.project-column-form-card-add-button');
      addButton.disabled = target.innerHTML.length == 0;
    }
  }
}
