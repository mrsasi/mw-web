import http from './api';

export const getCribs = (query) => http.get('cribs', query);
export const getACribs = (id) => http.get(`cribs/${id}`);
export const createCribs = (body) => http.post('cribs', body);
export const updateCribs = (id, body) => http.put(`cribs/${id}`, body);
export const deleteCribs = (id) => http.delete(`cribs/${id}`);
