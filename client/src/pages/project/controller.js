export default class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init(id, root) {
    const authority = await this.model.init(id);
    if (!authority) location.hash = '#login';
    this.view.init(this.model.getProject(), root, authority == 'admin');
    this.addEventListener();
  }

  addEventListener() {
    this.createNoteHandler();
    this.createGroupHandler();
    this.moveNoteHandler();
    this.moveGroupHandler();
    this.updateNoteHandler();
    this.updateGroupHandler();
    this.deleteNoteHandler();
    this.deleteGroupHandler();
  }

  createNoteHandler() {
    this.view.createNoteEvent.addListener((data) => this.model.createNote(data));
    this.model.createNoteEvent.addListener((data) => [
      this.view.createNoteCard(data.note),
      this.view.createEventCard(data.event),
      this.view.updateColumnCounter(data.note.groupId),
    ]);
  }

  createGroupHandler() {
    this.view.createGroupEvent.addListener((data) => this.model.createGroup(data));
    this.model.createGroupEvent.addListener((data) => [
      this.view.createEventCard(data.event),
      this.view.createColumn(data),
    ]);
  }

  moveNoteHandler() {
    this.view.moveNoteEvent.addListener((data) => this.model.moveNote(data));
    this.model.moveNoteEvent.addListener((data) => [
      this.view.createEventCard(data.event),
      this.view.updateColumnCounter(data.beforeColumnId),
      this.view.updateColumnCounter(data.afterColumnId),
    ]);
  }

  moveGroupHandler() {
    this.view.moveGroupEvent.addListener((data) => this.model.moveGroup(data));
    this.model.moveGroupEvent.addListener((data) => this.view.createEventCard(data));
  }

  updateNoteHandler() {
    this.view.updateNoteEvent.addListener((data) => this.model.updateNote(data));
    this.model.updateNoteEvent.addListener((data) => [
      this.view.createEventCard(data.event),
      this.view.updateCard(data),
    ]);
  }

  updateGroupHandler() {
    this.view.updateGroupEvent.addListener((data) => this.model.updateGroup(data));
    this.model.updateGroupEvent.addListener((data) => [
      this.view.createEventCard(data.event),
      this.view.updateColumn(data),
    ]);
  }

  deleteNoteHandler() {
    this.view.deleteNoteEvent.addListener((data) => this.model.deleteNote(data));
    this.model.deleteNoteEvent.addListener((data) => [
      this.view.createEventCard(data.event),
      this.view.deleteCard(data),
    ]);
  }

  deleteGroupHandler() {
    this.view.deleteGroupEvent.addListener((data) => this.model.deleteGroup(data));
    this.model.deleteGroupEvent.addListener((data) => [
      this.view.createEventCard(data.event),
      this.view.deleteColumn(data),
    ]);
  }
}
