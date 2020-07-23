import element from '../../../utils/element';

import './styles.css';

export default ({ className = 'default', type = 'primary' }) =>
  element({
    className: `${className} icon`,
    child: `<i class='${type}'></i>`,
  });
