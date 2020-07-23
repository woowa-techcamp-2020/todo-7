import element from '../../../utils/element';
import label from '../../atoms/label';
import input from '../../atoms/input';

import './styles.css';

export default ({ className = '', type = 'text', text = '', name = '' }) =>
  element({
    className,
    child: [label({ f: name, text }), input({ className: `input`, type, name })],
  });
