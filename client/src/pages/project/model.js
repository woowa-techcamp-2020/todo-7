import Event from '../../utils/event';
import { getProject } from '../../apis/project';

export default class ProjectModel {
    async init(id) {
        this.store = await getProject(id);
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
        return this.store;
    }

    async createNote({title, columnId}){
        
        // const { card, event } = await apis.createCard(data);\
        const note = { id : 2, title : title };
        this.store.groups.find(group => group.id === columnId).notes.unshift(note);
        this.createNoteEvent.trigger({ note, columnId });
    }
}