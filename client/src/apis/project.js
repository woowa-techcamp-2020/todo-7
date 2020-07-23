import { GET, POST, PUT } from '.';

export const getProject = async (id) => await GET(`/projects/${id}`);
export const createCard = async (notes) => await POST(`/notes`, notes);
export const moveCard = async (data) => await PUT(`/notes/move`, data);
