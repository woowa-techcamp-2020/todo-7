import { GET, POST, PUT } from '.';

export const getProject = async (id) => await GET(`/projects/${id}`);
export const createCard = async (notes) => await POST(`/notes`, notes);
export const updateColumn = async (groups) => await PUT(`/groups`, groups);
