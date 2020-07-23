import { GET, POST, PUT, DELETE } from '.';

export default {
  getProject: async (id) => await GET(`/projects/${id}`),
  createNote: async (notes) => await POST(`/notes`, notes),
  createGroup: async (groups) => await POST(`/groups`, groups),
  moveNote: async (data) => await PUT(`/notes/move`, data),
  moveGroup: async (data) => await PUT(`/groups/move`, data),
  updateGroup: async (groups) => await PUT(`/groups`, groups),
  updateNote: async (notes) => await PUT(`/notes`, notes),
  deleteGroup: async (data) => await DELETE(`/groups?id=${data.id}&projectId=${data.projectId}`),
  deleteNote: async (data) => await DELETE(`/notes?id=${data.id}&projectId=${data.projectId}`),
};
