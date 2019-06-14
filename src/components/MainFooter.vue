<template>
  <footer class="main-footer">
    <div class="main-footer__item">
      <p class="main-footer__text text-small">
        Возникли трудности или
        <br>
        вопросы? Напишите нам.
      </p>
      <a
        href="mailto:d.chunikhin@1tvch.ru"
        class="text-norm link"
      >d.chunikhin@1tvch.ru</a>
    </div>
    <div class="main-footer__item">
      <p class="main-footer__text text-small">
        Основной сайт
        <br>
        ЗАО «Первый ТВЧ»
      </p>
      <a
        href="http://1tvch.ru/"
        class="text-norm link"
        target="_blank"
        rel="noopener"
      >www.1tvch.ru</a>
    </div>
    <div class="main-footer__item">
      <p class="main-footer__text text-small">
        © 2019 ЗАО «Первый ТВЧ»
        <br>
        Все права защищены. При копировании материалов
        <br>
        сайта ссылка на оригинал обязательна.
      </p>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'MainFooter',

};
</script>

<style lang="scss" scoped>
  .main-footer {
    display: flex;
    margin-top: auto;
    flex-wrap: wrap;
    &__item:not(:last-child) {
      margin-right: 40px;
      padding-right: 40px;
      @include border-right;
      @include w320-wDesktop {
        padding-right: 0;
        margin-bottom: 20px;
        border: none;
          br {
            display: none;
          }
      }
    }
    &__text {
      margin-bottom: 0;
    }
  }
</style>
