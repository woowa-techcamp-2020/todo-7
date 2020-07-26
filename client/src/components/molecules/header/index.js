import element from '../../../utils/element';

import './styles.css';

export default ({ className = '', leading = '', title = '', actions = '' }) =>
  element({
    className: `${className} header`,
    child: [
      leading != ''
        ? element({
            className: `header-leading`,
            child: leading,
          })
        : '',
      element({
        className: `header-title`,
        child: title,
      }),
      element({
        className: `header-actions`,
        child: actions,
      }),
    ],
  });
