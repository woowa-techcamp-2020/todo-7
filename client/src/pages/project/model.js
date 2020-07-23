import Event from '../../utils/event';
import apis from '../../apis';

export default class ProjectModel {
  async init(id) {
    const res = await apis.getProject(id);
    if (res.status == 200) {
      this.project = await res.json();
      this.createEvents();
      return this.project.authority;
    } else return;
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

  getProject() {
    return this.project;
  }

  async createNote({ title, groupId }) {
    const { note, event } = await apis.createNote({
      projectId: this.project.id,
      groupId,
      title,
    });
    this.project.groups.find((group) => group.id === groupId).notes.push(note);
    this.createNoteEvent.trigger({ note, event });
  }

  async moveGroup({ id, targetId }) {
    const { event } = await apis.moveGroup({
      id,
      targetId,
      projectId: this.project.id,
    });
    this.moveGroupEvent.trigger(event);
  }

  async moveNote({ id, targetId, groupId }) {
    const beforeGroup = this.findGroupByNote(id);
    const afterGroup = this.project.groups.find((group) => group.id === groupId);

    const event = await apis.moveNote({
      id,
      targetId,
      projectId: this.project.id,
      groupId: afterGroup.id,
      groupTitle: afterGroup.title,
    });

    this.moveNoteEvent.trigger({
      event,
      beforeColumnId: beforeGroup.id,
      afterColumnId: afterGroup.id,
    });
  }

  findGroupByNote(id) {
    let _group;
    this.project.groups.forEach((group) =>
      group.notes.forEach((note) => {
        if (note.id == id) return (_group = group);
      }),
    );
    return _group;
  }
}
