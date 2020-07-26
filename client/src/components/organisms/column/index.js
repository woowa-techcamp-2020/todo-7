import element from '../../../utils/element';
import header from '../../molecules/header';
import card from '../../molecules/card';

import './styles.css';

export default ({ className, title, data }) =>
  element({
    className: `${className} column`,
    child: [
      title
        ? header({
            className: `${className}-header column-header`,
            title: element({
              className: `${className}-header-title`,
              child: title,
            }),
          })
        : '',
      ...data.map((item) =>
        card({
          className: `${className}-card`,
          data: item,
        }),
      ),
    ],
  });
