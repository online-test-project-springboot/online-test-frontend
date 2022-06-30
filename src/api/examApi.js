import { getToken } from 'utils';
import axiosClient from './axiosClient';

const examApi = {
  create(data) {
    const url = `/exams/create`;
    return axiosClient.put(url, data, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  getAll() {
    const url = `/exams`;
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  getById(examCode) {
    const url = `/exams/${examCode}`;
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  update(examCode, data) {
    const url = `/exams/update/${examCode}`;
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  delete( examCode) {
    const url = `/exams/delete/${examCode}`;
    return axiosClient.delete(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },
};

export default examApi;
