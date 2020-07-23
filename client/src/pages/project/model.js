import Event from '../../utils/event';
import { getProject, createCard } from '../../apis/project';

export default class ProjectModel {
  async init(id) {
    this.project = await getProject(id);
    this.createEvents();
  }

  createEvents() {
    this.createNoteEvent = new Event();
    this.updateNoteEvent = new Event();
    this.deleteNoteEvent = new Event();
    this.createGroupEvent = new Event();
    this.deleteGroupEvent = new Event();
  }

  getProject() {
    return this.project;
  }

  async createNote({ title, groupId }) {
    const { note, event } = await createCard({
      projectId: this.project.id,
      groupId,
      title,
    });
    const groupArrIdx = this.project.groups.findIndex((group) => group.id === groupId);
    this.project.groups[groupArrIdx].notes.unshift(note);
    this.createNoteEvent.trigger({
      note,
      event,
      noteCount: this.project.groups[groupArrIdx].notes.length,
    });
  }
}
