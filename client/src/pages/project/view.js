import Event from '../../utils/event';
import projectPage from '../../components/templates/project';
import card from '../../components/molecules/card';
import modal from '../../components/molecules/modal';
import DragAndDrop from '../../utils/dragndrop';
import { getNumber } from '../../utils/helper';

export default class ProjectView {
  init(project, app) {
    this.project = project;
    this.app = app;
    this.render();
    this.createEvents();
    this.addUserEventListener();
  }

  createEvents() {
    this.createNoteEvent = new Event();
    this.updateNoteEvent = new Event();
    this.deleteNoteEvent = new Event();
    this.createGroupEvent = new Event();
    this.deleteGroupEvent = new Event();
    this.updateGroupEvent = new Event();
  }

  addUserEventListener() {
    this.app.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      return false;
    });
    this.app.addEventListener('click', (event) => this.onAppClickHandler(event, this));
    new DragAndDrop(this.app.querySelector('.project'), '.project-column-body', '.project-column-card');
    new DragAndDrop(this.app.querySelector('.project'), '.project-columns', '.project-column');
    const columns = document.querySelectorAll('.project-column');
    columns.forEach((column) => {
      column.addEventListener('mousedown', (event) => this.onColumnClickHandler(event, this));
      column.addEventListener('keyup', (event) => this.onFormCardTypeHandler(event, this));
    });
  }

  onAppClickHandler(event, self) {
    let foundHandler = true;
    const classList = event.target.classList;

    if (classList.contains('project-header-menu-icon')) {
      self.onEventColumnToggler(event, true);
    } else if (classList.contains('project-event-column-close-icon')) {
      self.onEventColumnToggler(event, false);
    } else if (classList.contains('project-column-edit-modal-header-delete-icon')) {
      self.onModalCloseClickHandler(event);
    } else if (classList.contains('project-column-edit-modal')) {
      self.onModalCloseClickHandler(event);
    } else if (classList.contains('project-column-edit-modal-update-button')) {
      self.onModalUpdateClickHandler(event);
    } else {
      foundHandler = false;
    }

    if (foundHandler) event.stopImmediatePropagation();
  }

  onColumnClickHandler(event, self) {
    let foundHandler = true;
    const classList = event.target.classList;

    if (classList.contains('project-column-header-add-icon')) {
      self.onNoteAddIconCickHandler(event);
    } else if (classList.contains('project-column-header-edit-icon')) {
      self.onGroupEditIconClickHandler(event);
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

  updateColumnCounter({ note, noteCount }) {
    const columnId = note.groupId;
    const column = this.app.querySelector(`#project-column-${columnId}`);
    column.querySelector('.project-column-header-counter').innerHTML = noteCount;
  }

  updateCard(data) {}

  createColumn(data) {}
  deleteColumn(data) {}
  updateColumn(data) {}

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

  onGroupEditIconClickHandler(event) {
    const headerTitle = event.currentTarget.querySelector('.project-column-header-title');
    this.app.querySelector(`.project`).insertAdjacentHTML(
      'beforeend',
      modal({
        className: `project-column-edit-modal`,
        data: { id: getNumber(event.currentTarget.id), title: headerTitle.innerText },
      }),
    );
  }

  onModalCloseClickHandler(event) {
    const modal = event.currentTarget.querySelector('.project-column-edit-modal');
    modal.remove();
  }

  onModalUpdateClickHandler(event) {
    const modal = event.currentTarget.querySelector('.project-column-edit-modal');
    this.updateGroupEvent.trigger({
      id: getNumber(modal.id),
      title: modal.querySelector('.project-column-edit-modal-body-input').value,
    });
    modal.remove();
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
