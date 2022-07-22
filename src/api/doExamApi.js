import { getToken } from 'utils';
import axiosClient from './axiosClient';

const BASE_URL = "/do-exam";

const doExamApi = {
  takeExam(examCode) {
    const url = `${BASE_URL}/${examCode}`;
    return axiosClient.get(url, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

  submitExam(examCode, data) {
    const url = `${BASE_URL}/submit/${examCode}`;
    return axiosClient.post(url, data, { headers: { Authorization: `Bearer ${getToken()}` } });
  },

};

export default doExamApi;
