import element from '../../../utils/element';
import button from '../../atoms/button';
import textarea from '../../atoms/textarea';
import icon from '../../atoms/icon';
import header from '../header';

import './styles.css';
import select from '../../atoms/select';
import label from '../../atoms/label';

const projectColumnCard = (className, data) => [
  header({
    className: `${className}-header card-header`,
    leading: element({
      className: `${className}-header-text`,
      child: data.title,
    }),
    actions: icon({}),
  }),
  element({
    className: `${className}-body card-body`,
    child: data.description,
  }),
  element({
    className: `${className}-footer card-footer`,
    child: [
      `Added by`,
      element({
        className: `${className}-footer-writer`,
        child: data.writer,
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
    child: `5 hours ago`,
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
      child: `5 hours ago`,
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
  }
};

export default ({ className, data }) =>
  element({
    className: `${className} card`,
    id: `${className}-${data?.id}`,
    child: getCardByClassName(className, data),
  });
