import axiosClient from './axiosClient';

const topicApi = {
    create(data) {
        const url = '/topics/create';
        return axiosClient.put(url, data);
    },

    getAll() {
        const url = '/topics';
        return axiosClient.get(url);
    },
};

export default topicApi;