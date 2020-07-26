import Event from '../../utils/event';
import projectPage from '../../components/templates/project';
import card from '../../components/molecules/card';
import modal from '../../components/molecules/modal';
import column from '../../components/organisms/groupColumn';
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
    this.updateGroupEvent = new Event();
    this.moveNoteEvent = new Event();
    this.moveGroupEvent = new Event();
  }

  addEventListeners() {
    const self = this;
    this.app.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      return false;
    });
    this.app.addEventListener('mousedown', (event) => this.onAppClickHandler(event, this));
    this.app.addEventListener('keyup', (event) => this.onFormCardTypeHandler(event, this));
    new DragAndDrop({
      container: this.app,
      parentSelector: '.project-column-body',
      childSelector: '.project-column-card',
      onDragEnd: (card) => self.onCardDragEndHandler(card),
    });

    new DragAndDrop({
      container: this.app,
      parentSelector: '.project-existing-columns',
      childSelector: '.project-column',
      onDragEnd: (column) => self.onColumnDragEndHandler(column),
    });
  }

  onAppClickHandler(event, self) {
    let foundHandler = true;
    const classList = event.target.classList;
    if (classList.contains('project-header-menu-icon')) {
      self.onEventColumnToggler(event, true);
    } else if (classList.contains('project-event-column-close-icon')) {
      self.onEventColumnToggler(event, false);
    } else if (classList.contains('modal-close')) {
      self.onModalCloseClickHandler(event);
    } else if (classList.contains('modal')) {
      self.onModalCloseClickHandler(event);
    } else if (classList.contains('project-column-create-card')) {
      self.onCreateColumnCardClickHandler(event);
    } else if (classList.contains('project-column-create-modal-create-button')) {
      self.onCreateColumnModalButtonClickHandler(event);
    } else if (classList.contains('project-column-edit-modal-update-button')) {
      self.onEditColumnModalUpdateClickHandler(event);
    } else if (classList.contains('project-column-card-edit-modal-update-button')) {
      self.onEditCardModalUpdateClickHandler(event);
    } else if (classList.contains('modal-confirm')) {
      self.onDeleteModalConfirmClickHandler(event);
    } else if (classList.contains('project-column-header-add-icon')) {
      self.onNoteAddIconCickHandler(event);
    } else if (classList.contains('project-column-header-edit-icon')) {
      self.onGroupEditIconClickHandler(event);
    } else if (classList.contains('project-column-header-delete-icon')) {
      self.onGroupDeleteIconClickHandler(event);
    } else if (classList.contains('project-column-form-card-add-button')) {
      self.onFormCardButtonClickHandler(event, true);
    } else if (classList.contains('project-column-form-card-cancel-button')) {
      self.onFormCardButtonClickHandler(event, false);
    } else if (classList.contains('project-column-card-header-edit-icon')) {
      self.onNoteEditIconClickHandler(event);
    } else if (classList.contains('project-column-card-header-delete-icon')) {
      self.onNoteDeleteIconClickHandler(event);
    } else if (classList.contains('project-column-form-card-textarea')) {
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

  updateCard({ id, title }) {
    this.app
      .querySelector(`#project-column-card-${id}`)
      .querySelector('.project-column-card-header-text').innerText = title;
  }

  deleteCard({ id }) {
    this.app.querySelector(`#project-column-card-${id}`).remove();
  }

  createColumn({ group }) {
    this.app.querySelector(`.project-existing-columns`).insertAdjacentHTML(
      'beforeend',
      column({
        className: 'project-column',
        data: group,
      }),
    );
  }

  updateColumn({ id, title }) {
    this.app.querySelector(`#project-column-${id}`).querySelector(`.project-column-header-title`).innerText = title;
  }

  deleteColumn({ id }) {
    this.app.querySelector(`#project-column-${id}`).remove();
  }

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
    const column = event.target.closest('.project-column');
    const formCard = column.querySelector('.project-column-form-card');
    this.toggleFormCard(formCard);
  }

  onNoteEditIconClickHandler(event) {
    const groupId = event.target.closest('.project-column').id;
    const card = event.target.closest('.project-column-card');
    const cardTitle = card.querySelector('.project-column-card-header-text').innerText;
    this.app.querySelector(`.project`).insertAdjacentHTML(
      'beforeend',
      modal({
        className: `project-column-card-edit-modal`,
        data: { id: getNumber(card.id), title: cardTitle, groupId: getNumber(groupId) },
      }),
    );
  }

  onNoteDeleteIconClickHandler(event) {
    const card = event.target.closest('.project-column-card');
    this.app.querySelector(`.project`).insertAdjacentHTML(
      'beforeend',
      modal({
        className: `project-delete-modal`,
        data: { id: getNumber(card.id), type: 'Note' },
      }),
    );
  }

  onGroupEditIconClickHandler(event) {
    const column = event.target.closest('.project-column');
    const headerTitle = column.querySelector('.project-column-header-title');
    this.app.querySelector(`.project`).insertAdjacentHTML(
      'beforeend',
      modal({
        className: `project-column-edit-modal`,
        data: { id: getNumber(column.id), title: headerTitle.innerText },
      }),
    );
  }

  onGroupDeleteIconClickHandler(event) {
    const column = event.target.closest('.project-column');
    this.app.querySelector(`.project`).insertAdjacentHTML(
      'beforeend',
      modal({
        className: `project-delete-modal`,
        data: { id: getNumber(column.id), type: 'Column' },
      }),
    );
  }

  onModalCloseClickHandler(event) {
    const modal = event.target.closest('.modal');
    modal.remove();
  }

  onCreateColumnCardClickHandler(event) {
    this.app.querySelector(`.project`).insertAdjacentHTML(
      'beforeend',
      modal({
        className: `project-column-create-modal`,
      }),
    );
  }

  onCreateColumnModalButtonClickHandler(event) {
    const modal = event.target.closest('.modal');
    this.createGroupEvent.trigger({
      title: modal.querySelector('.modal-input').value,
    });
    modal.remove();
  }
  onEditColumnModalUpdateClickHandler(event) {
    const modal = event.target.closest('.modal');
    this.updateGroupEvent.trigger({
      id: getNumber(modal.id),
      title: modal.querySelector('.modal-input').value,
    });
    modal.remove();
  }

  onEditCardModalUpdateClickHandler(event) {
    const modal = event.target.closest('.modal');
    this.updateNoteEvent.trigger({
      id: getNumber(modal.id),
      title: modal.querySelector('.modal-textarea').innerText,
    });
    modal.remove();
  }

  onDeleteModalConfirmClickHandler(event) {
    const modal = event.target.closest('.modal');
    const type = modal.querySelector('.modal-description > b').innerText;
    if (type === 'Column') {
      this.deleteGroupEvent.trigger({
        id: getNumber(modal.id),
      });
    } else if (type === 'Note') {
      this.deleteNoteEvent.trigger({
        id: getNumber(modal.id),
      });
    }
    modal.remove();
  }

  onFormCardButtonClickHandler(event, isAdd) {
    const column = event.target.closest('.project-column');
    const formCard = column.querySelector('.project-column-form-card');
    if (isAdd) {
      this.createNoteEvent.trigger({
        title: formCard.firstElementChild.innerHTML,
        groupId: getNumber(formCard.closest('.project-column').id),
      });
    }
    this.toggleFormCard(formCard, isAdd);
  }

  onFormCardTypeHandler(event) {
    const column = event.target.closest('.project-column');
    if (event.target.className == 'project-column-form-card-textarea textarea') {
      const addButton = column.querySelector('.project-column-form-card-add-button');
      addButton.disabled = event.target.innerHTML.length == 0;
    }
  }
}
