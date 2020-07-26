import element from '../../../utils/element';
import icon from '../../atoms/icon';
import groupColumn from '../../organisms/groupColumn';
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
        className: 'project-header page-header',
        title: element({
          className: 'project-header-title',
          child: project.title,
        }),
        actions: icon({
          className: 'project-header-menu-icon',
          type: 'fa fa-bars',
          areaHidden: true,
        }),
      }),
      element({
        className: 'project-columns',
        child: [
          element({
            className: 'project-existing-columns',
            child: [
              ...project.groups.map((group) =>
                groupColumn({
                  className: 'project-column',
                  data: group,
                }),
              ),
            ],
          }),
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
