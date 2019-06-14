<template>
  <div id="app">
    <loading
      v-if="isLoading"
      :active="true"
      :is-full-page="true"
      color="#00c853"
    />
    <div class="left" />
    <div class="center">
      <MainHeader />
      <router-view class="container" />
      <MainFooter />
    </div>
    <Sidebar v-if="isDesktop" />
  </div>
</template>

<style lang="scss">
  .left,
  .sidebar {
    flex-grow: 1;
  }
  .center {
    padding: 20px 0;
  }
  .container {
    max-width: 770px;
    @include w320-wDesktop {
      max-width: none;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  .label-checkbox_checked::before {
    background-image: url("./assets/images/icons/icon_done.svg");
  }

  .wrapper {
    display: grid;
    margin: 0 -10px;
    width: 100%;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    & > div:last-child .col {
      margin-left: auto;
    }
    &_200 {
      grid-template-columns: repeat(auto-fit, 200px);
      @include w320-wDesktop {
        padding: 0 10px;
        margin: 0;
      }
    }
  }
  .col {
    padding: 0 10px;
    max-width: 390px;
    width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 660px) {
    .col {
      max-width: none;
      margin: 0 0 40px auto;
      br {
        display: none;
      }
    }
    .border-right {
      margin-bottom: 40px;
      border-bottom: 1px dashed $color-border;
      border-right: none !important;
    }
  }

#app {
  display: grid;
  grid-template-columns: 1fr minmax(320px, 860px) 1fr;
  grid-gap: 40px;
  min-height: calc(100vh + 1px);
  @media only screen and (max-width: 1450px) {
    grid-template-columns: 0 minmax(320px, 860px) 1fr;
    grid-gap: 20px;
  }

  @include w320-wDesktop {
    grid-gap: 10px;
    min-height: 100vh;
    grid-template-columns: 0 minmax(320px, 1fr) 0;
  }
}

  #toast-container {
    font-size: 14px;
  }
  #app,
 #modals-container, #toast-container {
  font-family: 'Noto Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .v--modal-block-scroll {
    padding-right: 15px;
    width: 100%;
    box-sizing: border-box;

  }
</style>


<script>
import { mapMutations, mapGetters } from 'vuex';
import Loading from 'vue-loading-overlay';
import MainHeader from './components/MainHeader.vue';
import MainFooter from './components/MainFooter.vue';
import Sidebar from './components/Sidebar.vue';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  metaInfo: {
    title: 'Веб-сервис Телепрограмма',
  },
  components: {
    Sidebar, MainHeader, MainFooter, Loading,
  },
  computed: {
    ...mapGetters([
      'isMobile',
      'isDesktop',
      'isLoading',
    ]),
  },
  beforeMount() {
    this.CHANGE_WINDOW_WIDTH(window.outerWidth);
  },
  mounted() {
    window.addEventListener('resize', this.onWindowResizeThrottler, false);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResizeThrottler);
  },
  methods: {
    ...mapMutations([
      'CHANGE_WINDOW_WIDTH',
    ]),
    onWindowResizeThrottler() {
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = null;
          this.onWindowResizeHandler();
        }, 200);
      }
    },
    onWindowResizeHandler() {
      this.CHANGE_WINDOW_WIDTH(window.outerWidth);
    },
  },
};
</script>
