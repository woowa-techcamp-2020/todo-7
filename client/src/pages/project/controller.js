export default class ProjectController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init(id, root) {
    await this.model.init(id);
    this.view.init(this.model.getProject(1), root);
    this.addEventListener();
  }

  addEventListener() {
    this.view.createNoteEvent.addListener((data) => this.model.createNote(data));
    this.view.updateNoteEvent.addListener((data) => this.model.updateNote(data));
    this.view.deleteNoteEvent.addListener((data) => this.model.deleteNote(data));
    this.view.moveNoteEvent.addListener((data) => this.model.moveNote(data));

    this.view.createGroupEvent.addListener((data) => this.model.createGroup(data));
    this.view.deleteGroupEvent.addListener((data) => this.model.deleteGroup(data));
    this.view.moveGroupEvent.addListener((data) => this.model.moveGroup(data));

    this.model.createNoteEvent.addListener((data) => [this.view.createNoteCard(data.note), this.view.createEventCard(data.event), this.view.updateColumnCounter(data.note.groupId)]);
    this.model.moveNoteEvent.addListener((data) => [this.view.createEventCard(data.event), this.view.updateColumnCounter(data.beforeColumnId), this.view.updateColumnCounter(data.afterColumnId)]);
    this.model.deleteNoteEvent.addListener((data) => this.view.deleteCard(data));
    this.model.createGroupEvent.addListener((data) => this.view.createColumn(data));
    this.model.deleteGroupEvent.addListener((data) => this.view.deleteColumn(data));
  }
}
