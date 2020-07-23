import element from '../../../utils/element';
import label from '../../atoms/label';
import input from '../../atoms/input';
import button from '../../atoms/button';

import './styles.css';

export default () =>
  element({
    tag: 'form',
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
      label({
        className: 'login-failure-label',
        text: '로그인에 실패하였습니다.',
      }),
      button({
        className: 'login-button primary',
        text: 'Sign in',
      }),
    ],
  });
