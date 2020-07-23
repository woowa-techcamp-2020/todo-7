export default class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init(id, root) {
    const status = await this.model.init(id);
    if (status != 200) location.hash = '#login';
    this.view.init(this.model.getProject(1), root);
    this.addEventListener();
  }

  addEventListener() {
    this.createNoteHandler();
    this.moveNoteHandler();
    this.moveGroupHandler();

    this.view.updateNoteEvent.addListener((data) => this.model.updateNote(data));
    this.view.deleteNoteEvent.addListener((data) => this.model.deleteNote(data));

    this.view.createGroupEvent.addListener((data) => this.model.createGroup(data));
    this.view.deleteGroupEvent.addListener((data) => this.model.deleteGroup(data));

    this.model.deleteNoteEvent.addListener((data) => this.view.deleteCard(data));
    this.model.createGroupEvent.addListener((data) => this.view.createColumn(data));
    this.model.deleteGroupEvent.addListener((data) => this.view.deleteColumn(data));
  }

  createNoteHandler() {
    this.view.createNoteEvent.addListener((data) => this.model.createNote(data));
    this.model.createNoteEvent.addListener((data) => [
      this.view.createNoteCard(data.note),
      this.view.createEventCard(data.event),
      this.view.updateColumnCounter(data.note.groupId),
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
  }
}
