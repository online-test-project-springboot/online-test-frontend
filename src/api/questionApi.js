import { getToken } from 'utils';
import axiosClient from './axiosClient';

const questionApi = {
  create(topicCode, data) {
    console.log(data);
    const url = `/topics/${topicCode}/questions/create`;
    return axiosClient.put(url, data, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  getAll(topicCode) {
    const url = `/topics/${topicCode}/questions`;
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  getById(topicCode, questionCode) {
    const url = `/topics/${topicCode}/questions/${questionCode}`;
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },



  update(topicCode, questionCode, data) {
    const url = `/topics/${topicCode}/questions/update/${questionCode}`;
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  delete(topicCode, questionCode) {
    const url = `/topics/${topicCode}/questions/delete/${questionCode}`;
    return axiosClient.delete(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },
};

export default questionApi;
