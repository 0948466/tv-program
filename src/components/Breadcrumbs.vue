<template>
  <header class="breadcrumbs">
    <router-link
      class="title-h2 breadcrumbs__link"
      :to="{ name: 'account-subscriptions'}"
    >
      Выборка
    </router-link>
    <router-link
      class="title-h2 breadcrumbs__link"
      :to="{ name: 'account-settings'}"
    >
      Настройки
    </router-link>
  </header>
</template>

<script>
export default {
  name: 'Breadcrumbs',
};
</script>

<style lang="scss" scoped>
  .breadcrumbs {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px dashed $color-border;
    margin-bottom: 45px;
    &__link {
      position: relative;
      margin-bottom: 0;
      padding-bottom: 18px;
      text-decoration: none;
      user-select: none;
      &:not(:last-of-type) {
        margin-right: 40px;
      }
      &.router-link-exact-active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: -2px;
        width: calc(100% + 4px);
        height: 2px;
        background-color: $color-link;
      }
    }
  }

</style>
