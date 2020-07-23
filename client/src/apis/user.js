import { POST, GET } from '.';

export default {
  getUsers: async () => await GET('/users'),
  createUser: async (data) => await POST('/users', data),
  login: async (data) => (await POST('/users/login', data)).status,
  loginCheck: async () => (await GET('/users/check')).status,
  getUsers: async (data) => await GET('/users', data),
  getProjects: async () => await GET('/users/projects'),
};
