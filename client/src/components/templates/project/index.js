import element from '../../../utils/element';
import icon from '../../atoms/icon';
import groupColumn from '../../organisms/groupColumn';
import eventColumn from '../../organisms/eventColumn';
import header from '../../molecules/header';

import './styles.css';

export default (project) =>
  element({
    className: 'project',
    id: project.id,
    child: [
      header({
        className: 'project-header page-header',
        title: element({
          className: 'project-header-title',
          child: project.title,
        }),
        actions: icon({
          className: 'project-header-menu-icon',
        }),
      }),
      element({
        className: 'project-columns',
        child: project.groups.map((group) =>
          groupColumn({
            className: 'project-column',
            data: group,
          }),
        ),
      }),
      eventColumn({
        className: 'project-event-column',
        data: project.groups[0],
      }),
    ],
  });
