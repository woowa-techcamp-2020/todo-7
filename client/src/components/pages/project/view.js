
import header from '../../organisms/header';
import column from '../../organisms/column';
import element from '../../element';
import './template.css';

export default class ProjectView { 
    constructor(project){
        this.project = project;
    }

    init(project, app) {
        this.project = project;
        app.innerHTML = this.render();
    }
    
    render(){
        return element('project', `
            ${header()}
            ${element(
                'project-columns', 
                this.project.groups.reduce((columns, group) => (columns + column('project', group.title, group.notes)), '')
            )}
        `);
    } 
    
}