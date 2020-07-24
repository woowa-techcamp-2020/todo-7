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
    this.updateGroupEvent = new Event();
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

  async createGroup({ title }) {
    const { group, event } = await apis.createGroup({
      projectId: this.project.id,
      title,
    });
    this.project.groups.unshift(group);
    this.createGroupEvent.trigger({ group, event });
  }

  async moveGroup({ id, targetId }) {
    const event = await apis.moveGroup({
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

  async updateNote({ id, title }) {
    const event = await apis.updateNote({
      projectId: this.project.id,
      id,
      title,
    });
    // TODO: this.project 업데이트
    this.updateNoteEvent.trigger({
      id,
      title,
      event,
    });
  }

  async updateGroup({ id, title }) {
    const event = await apis.updateGroup({
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

  async deleteGroup({ id }) {
    const event = await apis.deleteGroup({
      projectId: this.project.id,
      id,
    });
    const groupArrIdx = this.project.groups.findIndex((group) => group.id === id);
    const title = this.project.groups[groupArrIdx].title;
    this.deleteGroupEvent.trigger({
      id,
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
