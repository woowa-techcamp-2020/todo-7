import './styles.css';
import element from '../../../utils/element';
export default ({ className, count = 0 }) => element({
    className: `${className} counter`, 
    child: count
});