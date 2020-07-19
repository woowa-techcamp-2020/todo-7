import { getProject } from "../../../apis/project";

export default class ProjectModel {
    constructor (id){
        this.store = getProject(id);
    }
}