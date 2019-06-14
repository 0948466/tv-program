<template>
  <section class="sidebar">
    <div class="sidebar__inner" :class="{'sidebar__inner_on-home': isHomePage }">
      <div class="sidebar__wrap">
        <div
          v-if="isHomePage"
          class="sidebar__link-wrap"
        >
          <router-link
            class="btn-border-light"
            :to="{ name: 'account-subscriptions' }"
          >
            Личный кабинет
          </router-link>
        </div>
        <div
          v-if="isAuthenticated"
          class="sidebar__menu"
        >
          <h3 class="title-h3-light sidebar__title">
            {{ user.attributes.email }}
          </h3>
          <router-link
            class="text-norm link-light sidebar__link"
            :to="{ name: 'account-subscriptions' }"
          >
            Выборка
          </router-link>
          <router-link
            class="text-norm link-light sidebar__link"
            :to="{ name: 'account-settings' }"
          >
            Настройки аккаунта
          </router-link>
          <router-link
            class="text-norm link-light sidebar__link"
            :to="{ name: 'sing-in' }"
          >
            Выйти
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'user',
    ]),
    isHomePage() {
      return this.$route.name === 'home';
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  /*background-image: url("../assets/images/background/pattern.jpg");*/

  &__inner {
    position: fixed;
    padding: 20px 20px 20px 30px;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background-image: url("../assets/images/background/pattern.jpg");
    &_on-home {
      position: relative;
      height: 100%;
    }
  }
  &__wrap {
    width: 240px;
  }
  &__link-wrap {
    display: flex;
    align-items: center;
    min-height: 80px;
  }
  &__menu {
    display: flex;
    flex-direction: column;
    min-height: 300px;
  }
  &__title {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed $color-border-dashed-light;
  }
  &__link {
    margin-bottom: 9px;

    &.router-link-exact-active {
      position: relative;
      color: $color-border-dashed-light;
      text-decoration: none;
      cursor: default;
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: -50px;
        transform: translateY(-50%);
        border: 10px solid transparent;
        border-right: 10px solid $color-link;
      }
    }
  }
}
</style>
