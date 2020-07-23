import Event from '../../utils/event';
import api from '../../apis/user';

export default class LoginModel {
  init() {
    this.createEvents();
  }

  createEvents() {
    this.loginEvent = new Event();
  }

  async login({ username, password }) {
    const status = await api.login({ username, password });
    this.loginEvent.trigger(status);
  }
}
