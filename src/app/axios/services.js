import http from './apiClient'

const getAll = (url) => {
    return http.get(url);
};

const getOne = (url,id) => {
    return http.get(`${url}/${id}`);
};

const create = (url,data) => {
    return http.post(url, data);
  };

const update = (url,id, data) => {
    return http.put(`${url}/${id}`, data);
};

const remove = (url,id) => {
    return http.delete(`${url}/${id}`);
};

const removeAll = (token) => {
    return http.delete(`users`);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    getOne,
    create,
    update,
    remove,
    removeAll,
};