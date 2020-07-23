import Event from '../../utils/event';
import api from '../../apis/user';

export default class CreatePageModel {
  async init() {
    const res = await api.getUsers();
    if (res.status == 200) {
      const { users, nickname } = await res.json();
      this.users = users;
      this.nickname = nickname;
      this.createEvents();
    }
    return res.status;
  }

  getData() {
    return {
      users: this.users,
      nickname: this.nickname,
    };
  }

  createEvents() {
    this.loginEvent = new Event();
  }
}
