import element from '../../../utils/element';
import button from '../../atoms/button';
import header from '../../molecules/header';
import column from '../../organisms/column';

import './styles.css';

export default (data) => {
  console.log(data);
  return element({
    className: 'mypage',
    child: [
      element({
        className: 'mypage-header page-header',
        child: `${data.nickname}'s Projects`,
      }),
      element({
        className: 'mypage-body',
        child: [
          header({
            className: `mypage-body-header`,
            actions: button({
              className: 'mypage-project-create-button primary',
              text: 'New project',
            }),
          }),
          column({
            className: 'mypage-column',
            data: data.projects,
            title: 'Projects',
          }),
        ],
      }),
    ],
  });
};
