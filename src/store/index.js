import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import channels from './modules/channels';
import schedules from './modules/schedules';


import {
  CHANGE_WINDOW_WIDTH,
  LOADING,
} from './mutation-types';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    windowWidth: null,
    loading: false,
  },
  getters: {
    windowWidth: state => state.windowWidth,
    isMobile: state => state.windowWidth < 1100,
    isDesktop: state => state.windowWidth > 1099,
    isLoading: state => state.loading,
  },
  mutations: {
    [CHANGE_WINDOW_WIDTH](state, payload) {
      state.windowWidth = payload;
    },
    [LOADING](state, payload) {
      state.loading = payload;
    },
  },
  actions: {},
  modules: {
    auth,
    channels,
    schedules,
  },
  strict: debug,
});
