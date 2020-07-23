import { GET, POST, PUT } from '.';

export default {
  getProject: async (id) => await GET(`/projects/${id}`),
  createNote: async (notes) => await POST(`/notes`, notes),
  moveNote: async (data) => await PUT(`/notes/move`, data),
  moveGroup: async (data) => await PUT(`/groups/move`, data),
  updateGroup: async (groups) => await PUT(`/groups`, groups),
  updateNote: async (notes) => await PUT(`/notes`, notes),
};
