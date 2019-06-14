/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_SING_OUT, AUTH_SING_UP,
  AUTH_RESTORE, AUTH_CHANGE_PASSWORD, CHANGE_USER_ATTRIBUTES, AUTH_RESET_PASSWORD,
} from '../actions/auth';
import apiCall from '../../utils/api';
import URL from '../../api/url';

let user = '';
try {
  user = (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) || '';
} catch (e) {
  localStorage.removeItem('user');
  console.error(e);
}

const state = { user, status: '', hasLoadedOnce: false };

const getters = {
  isAuthenticated: state => !!state.user,
  authStatus: state => state.status,
  user: state => state.user,
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, params) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    apiCall({
      url: URL.sing_in, params, method: 'POST', noToken: true,
    })
      .then((resp) => {
        const token = resp.headers.authorization;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(resp.data.data));
        commit(AUTH_SUCCESS, resp);
        resolve(resp);
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        reject(err);
      });
  }),
  [AUTH_SING_UP]: ({ commit, dispatch }, params) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    apiCall({
      url: URL.sing_up, params, method: 'POST',
    })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        reject(err);
      });
  }),
  [AUTH_SING_OUT]: ({ commit, dispatch }) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    apiCall({ url: URL.sign_out, method: 'DELETE' })
      .then(() => {
        commit(AUTH_SING_OUT);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        resolve();
      });
  }),
  [AUTH_RESTORE]: ({ commit, dispatch }, params) => new Promise((resolve, reject) => {
    apiCall({
      url: URL.restore, params, method: 'POST',
    })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        reject(err);
      });
  }),

  [AUTH_CHANGE_PASSWORD]: ({ commit, dispatch }, params) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    apiCall({
      url: URL.change_password, params, method: 'PATCH',
    })
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        reject(err);
      });
  }),

  [CHANGE_USER_ATTRIBUTES]: ({ commit, dispatch }, { params, userId }) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);

    apiCall({
      url: `${URL.change_user_attributes}${userId}`, params, method: 'PATCH',
    })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data.data));
        commit(AUTH_SUCCESS, resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  }),

  [AUTH_RESET_PASSWORD]: ({ commit, dispatch }, params) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);

    apiCall({
      url: URL.restore, params, method: 'PATCH',
    })
      .then((resp) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        commit(AUTH_SING_OUT);
        resolve(resp);
      })
      .catch((err) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        reject(err);
      });
  })
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success';
    state.user = resp.data.data;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
    state.hasLoadedOnce = true;
  },
  [AUTH_SING_OUT]: (state) => {
    state.token = '';
    state.user = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
