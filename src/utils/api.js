import axios from 'axios';
import { showError, showNetworkError } from './toastr';

const baseURL = (process.env.NODE_ENV === 'production') ? '' : 'http://localhost:3000';

const apiCall = ({
  url, method, params, noToken,
}) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const token = localStorage.getItem('token');
  axios.defaults.headers.common.Authorization = (noToken || !token) ? '' : token;

  axios.interceptors.response.use(conf => conf, (error) => {
    if (error.response) {
      try {
        const msg = (error.response.data.errors[0])
          ? error.response.data.errors[0].detail : error.response.data.errors.detail;
        showError(msg);
      } catch (e) {
        console.error(e);
      }
    } else {
      showNetworkError();
      throw new Error(error);
    }
  });

  return axios[method.toLowerCase()](`${baseURL}${url}`, params, config);
};

export default apiCall;
