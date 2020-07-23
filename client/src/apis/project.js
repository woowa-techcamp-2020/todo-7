import { GET, POST } from '.';

export const getProject = async (id) => await GET(`/projects/${id}`);
export const createCard = async (notes) => await POST(`/notes`, notes);
