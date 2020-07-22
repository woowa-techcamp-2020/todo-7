import { GET } from ".";

export const getProject = async (id) => await GET(`/projects/${id}`);
export const login = async (loginData) => await post('/users/login', loginData);