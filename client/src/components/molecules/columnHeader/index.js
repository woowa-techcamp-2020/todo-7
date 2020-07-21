import './styles.css';
import element from '../../../utils/element';
import counter from '../../atoms/counter';
import icon from '../../atoms/icon';

export default ({ className = '', title = '', count = 0 }) => element({
    className,
    child: [
        counter({
            className: `${className}-counter`, 
            count: count
        }),
        element({
            className: `${className}-title`,
            child: title
        }),
        element({
            className: `${className}-actions`,
            child: icon({ className: `${className}-add-icon` })
        })
    ]
});
