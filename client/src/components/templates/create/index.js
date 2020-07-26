import element from '../../../utils/element';
import button from '../../atoms/button';
import header from '../../molecules/header';
import column from '../../organisms/column';

import './styles.css';
import labelInput from '../../molecules/labelInput';
import label from '../../atoms/label';

export default (data) => {
  console.log(data);
  return element({
    className: 'create-page',
    child: [
      header({
        className: 'create-page-header page-header',
        title: `${data.nickname}'s new Project`,
      }),
      element({
        className: 'create-page-body',
        child: [
          element({
            className: 'create-page-body-title',
            child: 'Create a new Project',
          }),
          labelInput({
            className: 'create-page-project-name-label-input',
            text: 'Project Name',
          }),
          label({
            className: 'create-page-project-title',
            text: 'Manage Access',
          }),
          column({
            className: 'create-page-column',
            data: data.users,
            title: ' ',
          }),
          button({
            className: 'create-project-button primary',
            text: 'Create Project',
            disabled: true,
          }),
        ],
      }),
    ],
  });
};
