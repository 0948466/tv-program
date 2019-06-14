<template>
  <section class="home mb-section">
    <div class="home__inner">
      <h1 class="title-h1 home__title">
        Полная программа
        передач всех каналов
        ЗАО «Первый ТВЧ»
      </h1>
      <p class="text-norm home__text">
        Заполните форму запроса программы
        передач и получите её на email в течение
        10 минут в удобном для вас формате.
        <br><br>
        Кроме того, вы можете
        <router-link
          :to="{ name: 'sing-up' }"
          class="link"
        >
          зарегистрироваться
        </router-link>
        в системе, чтобы получать телепрограмму
        автоматически каждую неделю.
      </p>
    </div>
    <div :class="{'popup home__popup': isDesktop}">
      <Subscription class="col" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Subscription from '../components/Subscription.vue';

export default {
  name: 'Home',
  metaInfo: {
    titleTemplate: '%s',
  },
  components: { Subscription },
  computed: {
    ...mapGetters([
      'isMobile',
      'isDesktop',
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    min-height: 730px;
    &__inner {
      padding-top: 60px;
      @include w320-wDesktop {
        padding-top: 0;
      }
    }
    &__title {
      max-width: 395px;
    }
    &__text {
      max-width: 350px;
    }
    &__popup {
      top: -60px;
      right: -30px;
      transform: translateX(50%);

    }
  }
</style>
