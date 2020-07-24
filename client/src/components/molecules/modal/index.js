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
          child: [icon({ className: `${className}-header-icon modal-close`, type: 'fa fa-times', areaHidden: true })],
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
    className: `${className} modal-content`,
    child: [
      header({
        className: `${className}-header modal-header`,
        leading: element({
          className: `${className}-header-text`,
          child: `Edit note`,
        }),
        actions: element({
          className: `${className}-header-actions`,
          child: [icon({ className: `${className}-header-icon modal-close`, type: 'fa fa-times', areaHidden: true })],
        }),
      }),
      element({
        className: `${className}-body modal-body`,
        child: [
          label({
            className: 'modal-label',
            f: 'Note',
            text: 'Note',
          }),
          textarea({
            className: `${className}-body-textarea modal-textarea`,
            value: `${data.title}`,
          }),
          button({
            className: `${className}-update-button modal-button primary`,
            text: 'Save note',
          }),
        ],
      }),
    ],
  }),
];

const deleteConfirmModal = (className, data) => [
  element({
    className: `${className} modal-content`,
    child: [
      element({
        className: `${className}-body modal-body`,
        child: [
          element({
            className: `${className} modal-description`,
            child: `선택한 <b>${data.type}</b>을 삭제하시겠습니까?`,
          }),
          element({
            className: `${className} modal-button-container`,
            child: [
              button({
                className: `${className}-button modal-confirm modal-button primary`,
                text: 'Confirm',
              }),
              button({
                className: `${className}-button modal-close modal-button dismiss`,
                text: 'Cancel',
              }),
            ],
          }),
        ],
      }),
    ],
  }),
];

const projectColumnCreateModal = (className) => [
  element({
    className: `${className} modal-content`,
    child: [
      header({
        className: `${className}-header modal-header`,
        leading: element({
          className: `${className}-header-text`,
          child: `Create column`,
        }),
        actions: element({
          className: `${className}-header-actions`,
          child: [icon({ className: `${className}-header-icon modal-close`, type: 'fa fa-times', areaHidden: true })],
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
          }),
          button({
            className: `${className}-create-button modal-button primary`,
            text: 'Create column',
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
    case 'project-delete-modal':
      return deleteConfirmModal(className, data);
    case 'project-column-card-edit-modal':
      return projectColumnCardEditModal(className, data);
    case 'project-column-create-modal':
      return projectColumnCreateModal(className);
  }
};

export default ({ className, data }) =>
  element({
    className: `${className} modal`,
    id: `${className}-${data?.id}`,
    child: getModalByClassName(className, data),
  });
