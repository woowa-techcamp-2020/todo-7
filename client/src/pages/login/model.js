import Event from '../../utils/event';
import apis from '../../apis';

export default class LoginModel {
  async init() {
    this.createEvents();
    return await apis.loginCheck();
  }

  createEvents() {
    this.loginEvent = new Event();
  }

  async login({ username, password }) {
    const status = await apis.login({ username, password });
    this.loginEvent.trigger(status);
  }
}
