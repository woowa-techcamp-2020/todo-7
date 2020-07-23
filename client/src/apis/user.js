import { post } from '.';

export const createUser = async (userData) => await post('/users', userData);
export const login = async (loginData) => await post('/users/login', loginData);
