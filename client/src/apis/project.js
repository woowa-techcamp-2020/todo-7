import { GET, POST, PUT } from '.';

export default {
  getProject: async (id) => await (await GET(`/projects/${id}`)).json(),
  createNote: async (notes) => await (await POST(`/notes`, notes)).json(),
  moveNote: async (data) => await (await PUT(`/notes/move`, data)).json(),
  moveGroup: async (data) => await (await PUT(`/groups/move`, data)).json(),
};
