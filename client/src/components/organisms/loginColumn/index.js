import element from '../../../utils/element';
import label from '../../atoms/label';
import button from '../../atoms/button';

import './styles.css';
import labelInput from '../../molecules/labelInput';

export default () =>
  element({
    tag: 'form',
    className: 'login-column',
    child: [
      labelInput({ className: 'login-label-input', text: 'Username', name: 'username' }),
      labelInput({ className: 'login-label-input', text: 'Password', type: 'password', name: 'password' }),

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
