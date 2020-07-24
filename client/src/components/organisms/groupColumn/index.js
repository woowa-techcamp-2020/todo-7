import element from '../../../utils/element';
import card from '../../molecules/card';
import header from '../../molecules/header';
import counter from '../../atoms/counter';
import icon from '../../atoms/icon';

import './styles.css';

export default ({ className, data }) =>
  element({
    className,
    id: `${className}-${data?.id}`,
    child: [
      header({
        className: `${className}-header`,
        leading: counter({
          className: `${className}-header-counter`,
          count: data.notes ? data.notes.length : 0,
        }),
        title: element({
          className: `${className}-header-title`,
          child: data.title,
        }),
        actions: element({
          className: `${className}-header-actions`,
          child: [
            icon({ className: `${className}-header-edit-icon`, type: 'fa fa-pencil', areaHidden: true }),
            icon({ className: `${className}-header-add-icon`, type: 'fa fa-plus', areaHidden: true }),
            icon({ className: `${className}-header-delete-icon`, type: 'fa fa-trash-o', areaHidden: true }),
          ],
        }),
      }),
      element({
        className: `${className}-body`,
        child: data.notes
          ? [
              card({
                className: `${className}-form-card`,
              }),

              ...data.notes.map((note) =>
                card({
                  className: `${className}-card`,
                  data: note,
                }),
              ),
            ]
          : [
              card({
                className: `${className}-form-card`,
              }),
            ],
      }),
    ],
  });
