import element from '../../../utils/element';
import loginColumn from '../../organisms/loginColumn';
import './styles.css';


export default () => element({
    className: 'login', 
    child: [
        element({
            className: 'login-header',
            child: 'Sign in to TODO'
        }),
        loginColumn(), 
    ]
});
