<template>
  <div class="sandwich-menu">
    <template
      v-if="isAuthenticated"
    >
      <h3 class="title-h3 sandwich-menu__title">
        {{ user.attributes.email }}
      </h3>
      <router-link
        class="text-norm link sandwich-menu__link"
        :to="{ name: 'account-subscriptions' }"
      >
        Выборка
      </router-link>
      <router-link
        class="text-norm link sandwich-menu__link"
        :to="{ name: 'account-settings' }"
      >
        Настройки аккаунта
      </router-link>
      <router-link
        class="text-norm link sandwich-menu__link"
        :to="{ name: 'sing-in' }"
      >
        Выйти
      </router-link>
    </template>
    <template v-else>
      <router-link
        class="text-norm link sandwich-menu__link"
        :to="{ name: 'home' }"
      >
        Телепрограмма
      </router-link>
      <router-link
        class="text-norm link sandwich-menu__link"
        :to="{ name: 'sing-in' }"
      >
        Войти
      </router-link>
      <router-link
        class="text-norm link sandwich-menu__link"
        :to="{ name: 'sing-up' }"
      >
        Зарегитрироваться
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SandwichMenu',
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'user',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .sandwich-menu {
    position: absolute;
    top: calc(100% + 15px);
    right: -10px;
    padding: 2em 4em;
    width: calc(100vw + 20px);
    max-width: 400px;
    min-width: 144px;
    min-height: 270px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 20px 20px 0 rgba(38, 50, 56, 0.1);
    z-index: 20;
    text-align: left;
    @include w320-wDesktop {
      max-height: calc(100vh - 90px);
      overflow-y: scroll;
    }
    @include wDesktop-1299 {
      max-height: calc(100vh - 130px);
      overflow: auto;
    }
    &__menu {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    &__title {
      padding: .5em 0;
      margin-bottom: 20px;
      border-bottom: 1px dashed $color-border;
    }
    a {
      display: block;
      margin-bottom: 0.5em;
      white-space: nowrap;
      &.router-link-exact-active,
      &:hover {
        text-decoration: none;
      }
    }
  }
</style>
