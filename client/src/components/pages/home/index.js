
import header from '../../organisms/header/index.js';
import column from '../../organisms/column/index.js';
import element from '../../element.js';
import './template.css';

export default (project) => element('home', `
    ${header()}
    ${element(
        'project-columns', 
        project.groups.reduce((columns, group) => (columns + column('project', group.title, group.notes)), '')
    )}
`);
