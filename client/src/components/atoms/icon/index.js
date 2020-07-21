import './styles.css';
import element from '../../../utils/element';
export default ({ className = 'default', type = 'primary' }) => element({
    className: `${className} icon`, 
    child: `<i class='${type}'></i>`
});
