import './styles.css';
import element from '../../../utils/element';
import header from '../../organisms/header';
import column from '../../organisms/column';

export default (project) => element({
    className: 'project', 
    id: project.id,
    child: [ 
        header(),
        element({
            className: 'project-columns', 
            child: project.groups.map(group => column({
                className: 'project-column', 
                data: group
            }))
        }),
    ]  
});
