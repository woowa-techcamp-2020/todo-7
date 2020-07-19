import { getProject } from "../../../apis/project";
export default class ProjectModel {
    async init(id) {
        this.store = await getProject(id);
    }

    getProject() {
        return this.store;
    }

    async createNote(columnId, data){
        const note = await apis.createCard(data);
        this.store.columns
        .find(column => column.id === columnId)
        .notes
        .unshift(card);
        return note;
    }
}