import element from '../../../utils/element';
import button from '../../atoms/button';
import textarea from '../../atoms/textarea';
import icon from '../../atoms/icon';
import input from '../../atoms/input';
import label from '../../atoms/label';
import header from '../header';
import './styles.css';

const projectColumnEditModal = (className, data) => [
  element({
    className: `${className} modal-content`,
    child: [
      header({
        className: `${className}-header modal-header`,
        leading: element({
          className: `${className}-header-text`,
          child: `Edit ${data.title}`,
        }),
        actions: element({
          className: `${className}-header-actions`,
          child: [icon({ className: `${className}-header-delete-icon` })],
        }),
      }),
      element({
        className: `${className}-body modal-body`,
        child: [
          label({
            className: 'modal-label',
            f: 'column-name',
            text: 'Column name',
          }),
          input({
            className: `${className}-body-input modal-input`,
            name: 'column-name',
            value: `${data.title}`,
          }),
          button({
            className: `${className}-update-button modal-button primary`,
            text: 'Update column',
          }),
        ],
      }),
    ],
  }),
];

const projectColumnCardEditModal = (className, data) => [
  element({
    className: `${className}-modal-content`,
    child: [
      header({
        className: `${className}-header modal-header`,
        leading: element({
          className: `${className}-header-text`,
          child: `Edit note`,
        }),
        actions: icon({ className: `${className}-header-delete-icon` }),
      }),
      element({
        className: `${className}-body modal-body`,
        child: [
          `Note`,
          textarea({
            className: `${className}-body-textarea`,
            value: `${data.title}`,
          }),
          button({
            className: `${className}-update-button primary`,
            text: 'Save note',
          }),
        ],
      }),
    ],
  }),
];

const getModalByClassName = (className, data) => {
  switch (className) {
    case 'project-column-edit-modal':
      return projectColumnEditModal(className, data);
    case 'project-column-card-edit-modal':
      return projectColumnCardEditModal(className, data);
  }
};

export default ({ className, data }) =>
  element({
    className: `${className} modal`,
    id: `${className}-${data?.id}`,
    child: getModalByClassName(className, data),
  });
