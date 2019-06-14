<template>
  <section class="accepted">
    <div
      class="icon-close"
      @click="$emit('close')"
    />
    <h2 class="title-h2 accepted__title">
      Принято в обработку
    </h2>
    <div class="p text-norm accepted__text">
      В течение 10 минут на указанный email вы
      получите письмо с приложенной программой
      выбранных вами телеканалов.
      Сейчас вы можете зарегистрироваться в
      системе, чтобы получать телепрограмму
      автоматически каждую неделю.
    </div>
    <a
      class="accepted__btn btn-norm"
      href="/sing-up"
      @click.prevent="onLinkToRegClick"
    >
      Регистрация
    </a>
    <button
      class="btn-border accepted__btn-esc"
      @click="$emit('close')"
    >
      Нет, спасибо
    </button>
  </section>
</template>

<script>
export default {
  name: 'Accepted',
  methods: {
    onLinkToRegClick() {
      this.$emit('close');
      setTimeout(() => {
        this.$router.push({ name: 'sing-up' });
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
  .accepted {
    padding: 40px 0;
    margin: 0 auto;
    max-width: 343px;
    /*<!--@include max-screen($screen-xs-max) {-->*/
      /*<!--padding: 20px 0;-->*/
    /*<!--}-->*/
    &__title {
      margin-bottom: 40px;
    }
    &__text {
      margin-bottom: 40px;
    }
    &__link-to-reg {
      margin-right: 10px;
    }
    &__btn {
      margin-right: 10px;
    }
  }

</style>
