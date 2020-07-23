import Event from '../../utils/event';
import loginPage from '../../components/templates/login';

export default class LoginView {
  init(app) {
    this.app = app;
    this.render();
    this.createEvents();
    const submitButton = this.app.querySelector('.login-button');
    submitButton.addEventListener('click', (event) => this.onLoginButtonPressed(event));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        console.log(submitButton);
        this.onLoginButtonPressed(event);
      }
    });
  }

  createEvents() {
    this.loginEvent = new Event();
  }

  onLoginButtonPressed(event) {
    event.stopImmediatePropagation();
    const username = this.app.querySelector('.text-input').value;
    const password = this.app.querySelector('.password-input').value;
    this.loginEvent.trigger({ username, password });
  }

  login(status) {
    console.log(status);
    if (status >= 400) {
      this.app.querySelector('.password-input').value = '';
      this.app.querySelector('.login-failure-label').style.display = 'block';
    } else location.hash = '#project';
  }

  render() {
    this.app.innerHTML = loginPage();
  }
}
