import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import VModal from 'vue-js-modal';
import App from './App.vue';
import { router } from './router';
import store from './store';
import URL from './api/url';
import HTTP from './api/http-common';
import './registerServiceWorker';
import './scss/style.scss';
import Loading from './components/Loading.vue';


Vue.component('loading', Loading);
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.component('multiselect', Multiselect);
Vue.prototype.$http = HTTP;
Vue.prototype.$url = URL;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
