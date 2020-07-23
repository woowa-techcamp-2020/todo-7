import Event from '../../utils/event';
import api from '../../apis/project';

export default class ProjectModel {
  async init(id) {
    this.project = await api.getProject(id);
    this.createEvents();
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

  getProject() {
    return this.project;
  }

  async createNote({ title, groupId }) {
    const { note, event } = await api.createNote({
      projectId: this.project.id,
      groupId,
      title,
    });
    this.project.groups.find((group) => group.id === groupId).notes.push(note);
    this.createNoteEvent.trigger({ note, event });
  }

  async moveGroup({ id, targetId }) {
    const { event } = await api.moveGroup({
      id,
      targetId,
      projectId: this.project.id,
    });
    this.moveGroupEvent.trigger(event);
  }

  async moveNote({ id, targetId, groupId }) {
    const beforeGroup = this.findGroupByNote(id);
    const afterGroup = this.project.groups.find((group) => group.id === groupId);

    const event = await api.moveNote({
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

  async updateGroup({ id, title }) {
    const { event } = await api.updateColumn({
      projectId: this.project.id,
      id,
      title,
    });
    const groupArrIdx = this.project.groups.findIndex((group) => group.id === id);
    this.project.groups[groupArrIdx].title = title;
    this.updateGroupEvent.trigger({
      id,
      title,
      event,
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
