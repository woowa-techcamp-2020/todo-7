import Event from '../../utils/event';
import apis from '../../apis';

export default class CreatePageModel {
  async init() {
    const res = await apis.getUsers();
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
    this.createProjectEvent = new Event();
  }

  async createProject(data) {
    const { id } = await (await apis.createProject(data)).json();
    this.createProjectEvent.trigger(id);
  }
}
