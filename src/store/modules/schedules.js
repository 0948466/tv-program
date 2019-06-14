/* eslint-disable promise/param-names */
import {
  SCHEDULES_REQUEST,
} from '../actions/schedules';
import apiCall from '../../utils/api';
import URL from '../../api/url';
import { LOADING } from '../mutation-types';

const actions = {
  [SCHEDULES_REQUEST]: ({ commit, dispatch }, params) => new Promise((resolve) => {
    commit(LOADING, true);
    apiCall({ url: URL.schedules, params, method: 'POST' })
      .then((resp) => {
        commit(LOADING, false);
        resolve(resp);
      })
      .catch((error) => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }),
};

export default {
  actions,
};
