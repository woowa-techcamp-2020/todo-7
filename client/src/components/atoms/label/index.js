import element from '../../../utils/element';

import './styles.css';

export default ({ className = 'default', text = '', f = ''}) => element({
    className: `${className} label`, 
    child: `<label for='${f}'>${text}</label>`
});
