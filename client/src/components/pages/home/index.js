
import Header from '../../organisms/header/index.js';
import Column from '../../organisms/column/index.js';
import Element from '../../element.js';
import './template.css';

export default (project) => Element('home', `
    ${Header()}
    ${Element(
        'project-columns', 
        project.groups.reduce((columns, column) => (columns + Column('project', column.title, column.notes)), '')
    )}
`);
