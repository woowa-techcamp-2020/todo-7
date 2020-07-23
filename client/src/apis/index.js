const defaultOptions = (method) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
  },
});

const serverUrl = 'http://localhost:3000';

const createQuery = (data) => {
  return data
    ? '?' +
        Object.keys(data)
          .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
          .join('&')
    : '';
};

const POST = async (url = '', data) =>
  await fetch(`${serverUrl}${url}`, {
    body: JSON.stringify(data),
    ...defaultOptions('POST'),
  });

const PUT = async (url = '', data) =>
  await fetch(`${serverUrl}${url}`, {
    body: JSON.stringify(data),
    ...defaultOptions('PUT'),
  });

const GET = async (url = '', data) => await fetch(`${serverUrl}${url}${createQuery(data)}`, defaultOptions('GET'));

const DELETE = async (url = '') => await fetch(`${serverUrl}${url}`, defaultOptions('DELETE'));

export default {
  createProject: async (data) => await POST('/projects', data),
  createUser: async (data) => await POST('/users', data),
  createNote: async (notes) => await (await POST(`/notes`, notes)).json(),
  login: async (data) => (await POST('/users/login', data)).status,
  loginCheck: async () => (await GET('/users/check')).status,
  getUsers: async () => await GET('/users'),
  getProjects: async () => await GET('/users/projects'),
  getProject: async (id) => await await GET(`/projects/${id}`),
  moveNote: async (data) => await (await PUT(`/notes/move`, data)).json(),
  moveGroup: async (data) => await (await PUT(`/groups/move`, data)).json(),
};
