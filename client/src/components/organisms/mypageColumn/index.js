import element from '../../../utils/element';
import header from '../../molecules/header';
import card from '../../molecules/card';

import './styles.css';

export default ({ className, data }) =>
  element({
    className,
    child: [
      header({
        className: `${className}-header`,
        title: element({
          className: `${className}-header-title`,
          child: 'Projects',
        }),
      }),

      ...data.map((project) =>
        card({
          className: `${className}-card`,
          data: project,
        }),
      ),
    ],
  });
