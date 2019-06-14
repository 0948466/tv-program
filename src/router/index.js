import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import Home from '../views/Home.vue';

Vue.use(Router);
Vue.use(Meta);

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return {
      selector: to.hash,
      // , offset: { x: 0, y: 10 }
    };
  }
  return { x: 0, y: 0 };
};

export const router = new Router({
  mode: 'history',
  scrollBehavior,
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
    {
      path: '/account/subscriptions',
      name: 'account-subscriptions',
      component: () => import(/* webpackChunkName: "AccountSubscriptions" */ '../views/AccountSubscriptions.vue'),
    },
    {
      path: '/account/settings',
      name: 'account-settings',
      component: () => import(/* webpackChunkName: "AccountSettings" */ '../views/AccountSettings.vue'),
    },
    {
      path: '/users/restore',
      name: 'restore',
      component: () => import(/* webpackChunkName: "Restore" */ '../views/Restore.vue'),
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
    {
      path: '/users/password/edit',
      name: 'reset-password',
      component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword.vue'),
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
      beforeEnter: (to, from, next) => {
        if (to.query && to.query.reset_password_token) {
          next();
        } else {
          next({ name: 'home' });
        }
      },
    },
    {
      path: '/users/sing-in',
      name: 'sing-in',
      component: () => import(/* webpackChunkName: "SingIn" */ '../views/SingIn.vue'),
      meta: {
        public: true,
      },
    },
    {
      path: '/users/sing-up',
      name: 'sing-up',
      component: () => import(/* webpackChunkName: "SingUp" */ '../views/SingUp.vue'),
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!localStorage.getItem('token');

  if (!isPublic && !loggedIn) {
    return next({
      path: '/users/sing-in',
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/account/subscriptions');
  }

  next();
});
