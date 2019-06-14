/* eslint-disable promise/param-names */
import {
  GET_CHANNELS, SAVE_CHANNELS,
} from '../actions/channels';
import apiCall from '../../utils/api';
import URL from '../../api/url';

const state = { channels: [] };

const getters = {
  channels: state => state.channels,
};

const actions = {
  [GET_CHANNELS]: ({ commit, dispatch }) => new Promise((resolve, reject) => {
    apiCall({ url: URL.channels, method: 'GET' })
      .then((resp) => {
        commit(SAVE_CHANNELS, resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  }),
};

const mutations = {
  [SAVE_CHANNELS]: (state, resp) => {
    if (resp.data && resp.data.data && resp.data.data) {
      state.channels = resp.data.data.sort((a, b) => {
        const letter1 = a.attributes.name[0].toLowerCase();
        const letter2 = b.attributes.name[0].toLowerCase();
        const reg = /^[а-яё]*$/i;

        if ((reg.test(letter1) && reg.test(letter2))
          || (!reg.test(letter1) && !reg.test(letter2))) {
          if (letter1 < letter2) {
            return -1;
          }
          return 1;
        }

        if (reg.test(letter1) && !reg.test(letter2)) {
          return -1;
        }

        return 1;
      });
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
