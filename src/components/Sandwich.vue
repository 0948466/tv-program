<template>
  <div class="sandwich">
    <div
      v-if="!open"
      class="sandwich__icon-wrap"
      @click="open = !open"
    >
      <div class="sandwich__icon" />
    </div>
    <template v-else>
      <div
        class="sandwich__icon-close"
        @click="open = !open"
      />
      <SandwichMenu @onLinkClick="onSideBarLinkClick" />
    </template>
  </div>
</template>

<script>
import SandwichMenu from '@/components/SandwichMenu.vue';

export default {
  name: 'Sandwich',
  components: {
    SandwichMenu,
  },
  data: () => ({
    open: false,
  }),
  watch: {
    $route() {
      this.open = false;
    },
  },
  methods: {
    onSideBarLinkClick() {
      this.open = false;
    },
    onOverlayClick(e) {
      e.preventDefault();
      this.open = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .sandwich {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 53px;
    padding: 0 10px;
    box-sizing: border-box;
    &__icon-wrap {
      display: flex;
      align-items: center;
      height: 27px;
      cursor: pointer;
    }
    &__icon,
    &__icon::before,
    &__icon::after {
      position: relative;
      margin: 0 auto;
      width: 27px;
      height: 2px;
      background-color: #797979;
    }
    &__icon::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 0;
    }
    &__icon::after {
      content: '';
      position: absolute;
      top: 6px;
      left: 0;
    }
    &__icon-close {
      position: relative;
      width: 27px;
      height: 27px;
      font-size: 0;
      background-color: transparent;
      border: 0;
      outline: 0;
      cursor: pointer;
      &::before,
      &::after {
        content: "";
        top: 12px;
        left: 2px;
        position: absolute;
        width: 24px;
        height: 1.6px;
        background-color: #848484;
      }
      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }
</style>
