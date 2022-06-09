import { getToken } from 'utils';
import axiosClient from './axiosClient';

const topicApi = {
  create(data) {
    const url = '/topics/create';
    return axiosClient.put(url, data, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  getAll() {
    const url = '/topics';
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  getById(code) {
    const url = `/topics/${code}`;
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  update(code, data) {
    const url = `/topics/update/${code}`;
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  delete(code) {
    const url = `/topics/delete/${code}`;
    return axiosClient.delete(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },
};

export default topicApi;
