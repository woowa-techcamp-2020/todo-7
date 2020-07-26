import element from '../../../utils/element';
import select from '../../atoms/select';
import label from '../../atoms/label';
import button from '../../atoms/button';
import textarea from '../../atoms/textarea';
import icon from '../../atoms/icon';
import header from '../header';
import { getCurrentDateTime } from '../../../utils/helper';

import './styles.css';

const projectColumnCard = (className, data) => [
  header({
    className: `${className}-header card-header`,
    leading: element({
      className: `${className}-header-text`,
      child: data.title,
    }),
    actions: element({
      className: `${className}-header-actions`,
      child: [
        icon({ className: `${className}-header-edit-icon`, type: 'fa fa-pencil', areaHidden: true }),
        icon({ className: `${className}-header-delete-icon`, type: 'fa fa-trash-o', areaHidden: true }),
      ],
    }),
  }),
  element({
    className: `${className}-body card-body`,
    child: ' ',
  }),
  element({
    className: `${className}-footer card-footer`,
    child: [
      getCurrentDateTime(data.createdAt),
      element({
        className: `${className}-footer-writer`,
        child: ` `,
      }),
    ],
  }),
];

const projectColumnNewCard = (className) => [
  textarea({
    className: `${className}-textarea`,
    name: 'note',
  }),
  element({
    className: `${className}-footer card-footer`,
    child: [
      button({
        className: `${className}-add-button primary`,
        text: 'Add',
        disabled: true,
      }),
      button({
        className: `${className}-cancel-button dismiss`,
        text: 'Cancel',
      }),
    ],
  }),
];

const projectEventColumnCard = (className, data) => [
  header({
    className: `${className}-header card-header`,
    leading: element({
      className: `${className}-header-text`,
      child: data.title,
    }),
  }),
  element({
    className: `${className}-footer card-footer`,
    child: getCurrentDateTime(data.createdAt),
  }),
];

const projectColumnCreateCard = (className) => [
  element({
    className: `${className}-container`,
    child: [
      icon({ className: `${className}-header-add-icon`, type: 'fa fa-plus', areaHidden: true }),
      element({
        className: `${className}-body`,
        child: [`Add new column`],
      }),
    ],
  }),
];

const mypageColumnCard = (className, data) => {
  console.log(data);
  return [
    header({
      className: `${className}-header card-header`,
      leading: element({
        className: `${className}-header-text`,
        child: data.title,
      }),
    }),
    element({
      className: `${className}-footer card-footer`,
      child: getCurrentDateTime(data.createdAt),
    }),
  ];
};

const userColumnCard = (className, data) => {
  console.log(data);
  return [
    header({
      className: `${className}-header card-header`,
      leading: element({
        className: `${className}-header-text`,
        child: data.nickname,
      }),
    }),
    label({
      className: `${className}-select`,
      text: 'Role',
    }),
    select({
      className: `${className}-select`,
      name: 'authority',
      options: ['admin', 'read-only'],
    }),
    icon({
      className: `${className}-delete-icon`,
      type: 'fa fa-times',
      areaHidden: true,
    }),
  ];
};

const getCardByClassName = (className, data) => {
  switch (className) {
    case 'mypage-column-card':
      return mypageColumnCard(className, data);
    case 'create-page-column-card':
      return userColumnCard(className, data);
    case 'project-column-form-card':
      return projectColumnNewCard(className);
    case 'project-column-card':
      return projectColumnCard(className, data);
    case 'project-event-column-card':
      return projectEventColumnCard(className, data);
    case 'project-column-create-card':
      return projectColumnCreateCard(className);
  }
};

export default ({ className, data }) =>
  element({
    className: `${className} card`,
    id: `${className}-${data?.id}`,
    child: getCardByClassName(className, data),
  });
