import element from '../../../utils/element';
import label from '../../atoms/label';
import input from '../../atoms/input';
import button from '../../atoms/button';

import './styles.css';

export default () => element({
    className: 'login-column', 
    child: [ 
        label({ 
            className: 'login-label',
            f: 'username',
            text: 'Username',
        }),
        input({
            className: 'login-input',
            name: 'username',
        }),
        label({ 
            className: 'login-label',
            f: 'password',
            text: 'Password',
        }),
        input({
            className: 'login-input',
            type: 'password',
            name: 'password',
        }),
        button({
            className: 'login-button primary',
            text: 'Sign in',
        })
    ] 
});