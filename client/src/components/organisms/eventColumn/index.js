import element from '../../../utils/element';
import card from '../../molecules/card';
import icon from '../../atoms/icon';
import header from '../../molecules/header';

import './styles.css';

export default ({ className, data }) =>
  element({
    className,
    id: `${className}-${data?.id}`,
    child: [
      header({
        className: `${className}-header`,
        title: element({
          className: `${className}-header-title`,
          child: 'Menu',
        }),
        actions: icon({ className: `${className}-close-icon`, type: 'fa fa-times', areaHidden: true }),
      }),
      header({
        className: `${className}-header`,
        title: element({
          className: `${className}-header-title`,
          child: 'Activity',
        }),
      }),
      element({
        className: `${className}-body`,
        child: [
          ...data.map((note) =>
            card({
              className: `${className}-card`,
              data: note,
            }),
          ),
        ],
      }),
    ],
  });
