import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8989/onlinetest/rest',
  headers: {
    'Content-Type': 'application/json',
  },
});

//Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { data, config, status } = error.response;
    // const URLS = ['/auth/login', '/auth/signup'];
    // if (URLS.includes(config.url) && status === 400) {
    //   const message = data.message;
    //   throw new Error(message);
    // }
    const message = data.message;
    throw new Error(message);
    return Promise.reject(error);
  }
);

export default axiosClient;
