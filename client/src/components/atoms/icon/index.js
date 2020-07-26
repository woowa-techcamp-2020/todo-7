import element from '../../../utils/element';

import './styles.css';

export default ({ className = 'default', type = 'primary', areaHidden = false }) => {
  return `<i class='${className} ${type} icon' ${areaHidden ? "area-hidden='true'" : ''}'></i>`;
};
