
import header from '../../organisms/header';
import column from '../../organisms/column';
import element from '../../element';
import './template.css';

export default (project) => element('project', `
    ${header()}
    ${element(
        'project-columns', 
        project.groups.reduce((columns, group) => (columns + column('project', group.title, group.notes)), '')
    )}
`);
