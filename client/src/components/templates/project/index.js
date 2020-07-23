import element from '../../../utils/element';
import icon from '../../atoms/icon';
import column from '../../organisms/column';
import eventColumn from '../../organisms/eventColumn';
import header from '../../molecules/header';
import card from '../../molecules/card';
import './styles.css';

export default (project) =>
  element({
    className: 'project',
    id: project.id,
    child: [
      header({
        className: 'project-header',
        title: element({
          className: 'project-header-title',
          child: 'Todo-7',
        }),
        actions: icon({
          className: 'project-header-menu-icon',
        }),
      }),
      element({
        className: 'project-columns',
        child: [
          ...project.groups.map((group) =>
            column({
              className: 'project-column',
              data: group,
            }),
          ),
          card({
            className: 'project-column-create-card',
          }),
        ],
      }),
      eventColumn({
        className: 'project-event-column',
        data: project.events,
      }),
    ],
  });
