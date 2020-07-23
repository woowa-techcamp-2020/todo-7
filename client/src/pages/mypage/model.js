import Event from '../../utils/event';
import api from '../../apis/user';

export default class MyPageModel {
  async init() {
    const res = await api.getProjects();
    if (res.status == 200) {
      const { projects, nickname } = await res.json();
      this.projects = projects;
      this.nickname = nickname;
      this.createEvents();
    }
    return res.status;
  }

  getUserData() {
    return {
      projects: this.projects,
      nickname: this.nickname,
    };
  }

  createEvents() {
    this.loginEvent = new Event();
  }
}
