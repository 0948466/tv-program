<template>
  <header class="main-header">
    <a
      href="http://1tvch.ru/"
      class="main-header__link-home border-right"
      target="_blank"
      rel="noopener"
    >
      <img
        class="main-header__logo"
        src="../assets/images/logo-1tvch.png"
        alt="1tvch"
      >
    </a>
    <router-link
      class="link-big"
      :to="{ name: 'home' }"
    >
      Веб-сервис
      <br>
      телепрограмма
    </router-link>
    <router-link
      v-if="isDesktop && isHomePage"
      class="btn-norm main-header__btn-sing-up"
      :to="{ name: 'sing-up' }"
    >
      Подписаться
    </router-link>
    <Sandwich
      v-if="isMobile"
      class="main-header__sandwich"
    />
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Sandwich from './Sandwich.vue';

export default {
  name: 'MainHeader',
  components: { Sandwich },
  computed: {
    ...mapGetters([
      'isMobile',
      'isDesktop',
      'isAuthenticated',
    ]),
    isHomePage() {
      return this.$route.name === 'home';
    },
  },
};
</script>

<style lang="scss" scoped>
  .main-header {
    display: flex;
    align-items: center;
    margin-bottom: 100px;
    @include w320-wDesktop {
      margin-bottom: 30px;
    }
    & > a:not(:last-of-type) {
      margin-right: 40px;
    }
    &__link-home {
      padding-right: 40px;
      @include w320-wDesktop {
        padding-right: 0;
        &.border-right {
          border: none;
          margin-bottom: 0;
        }
      }
    }
    &__sandwich {
      margin-left: auto;
    }
    &__logo {
      width: 124px;
      height: 80px;
    }
    &__btn-sing-up {
      position: relative;
      padding-left: 40px;
      margin-left: auto;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 8px;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        background: url("../assets/images/icons/icon_add.svg") no-repeat center / contain;
      }
    }
  }

</style>
