import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.trello.com/1',
});

// axiosInstance.interceptors.response.use(response => {
//   return response;
// }, error => {
//   console.error('Interceptor error:', error);
//   return Promise.reject(error);
// });