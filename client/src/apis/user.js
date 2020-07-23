import { POST, GET } from '.';

export default {
  createUser: async (data) => await POST('/users', data),
  login: async (data) => (await POST('/users/login', data)).status,
  loginCheck: async () => (await GET('/users')).status,
};
