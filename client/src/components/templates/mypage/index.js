import element from '../../../utils/element';
import button from '../../atoms/button';
import header from '../../molecules/header';
import mypageColumn from '../../organisms/mypageColumn';

import './styles.css';

export default (data) => {
  console.log(data);
  return element({
    className: 'mypage',
    child: [
      element({
        className: 'mypage-header',
        child: `${data.nickname}'s TODO`,
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
          ...mypageColumn({
            className: 'mypage-column',
            data: data.projects,
          }),
        ],
      }),
    ],
  });
};
