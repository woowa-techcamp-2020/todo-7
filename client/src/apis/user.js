import { POST } from '.';

export default {
  createUser: async (data) => await POST('/users', data),
  login: async (data) => (await POST('/users/login', data)).status,
};
