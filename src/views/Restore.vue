<template>
  <section class="restore mb-section">
    <div class="wrapper">
      <div class="border-right">
        <form
          class="col"
          @submit.prevent="onFormRestoreSubmit"
        >
          <h2 class="title-h2">
            Забыли пароль от
            <br>
            личного кабинета?
          </h2>
          <p class="text-norm">
            Укажите ваш адрес электронной почты,
            <br>
            и мы вышлем вам письмо с инструкциями
            <br>
            для восстановления доступа к сервису.
          </p>
          <input
            v-model="form['user[email]']"
            class="input"
            type="email"
            placeholder="Ваш email"
            autocomplete="new-email"
            required
          >
          <Recaptcha
            @verify="onRecaptchaVerify"
          />
          <button
            class="btn-norm"
            type="submit"
          >
            Восстановить доступ
          </button>
        </form>
      </div>
      <div>
        <div class="col">
          <ToRegistration />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { AUTH_RESTORE } from '../store/actions/auth';
import { showSuccess, showRecaptchaError } from '../utils/toastr';
import ToRegistration from '../components/ToRegistration.vue';
import Recaptcha from '../components/Recaptcha.vue';

export default {
  name: 'Restore',
  metaInfo: {
    titleTemplate: 'Восстановление пароля | %s',
  },
  components: { Recaptcha, ToRegistration },
  data: () => ({
    form: {
      'user[email]': '',
    },
    reCaptcha: false,
  }),
  methods: {
    onFormRestoreSubmit() {
      if (!this.reCaptcha) {
        showRecaptchaError();
        return;
      }

      if (!Object.values(this.form).includes('')) {
        const formData = new FormData();
        Object.entries(this.form).forEach((item) => {
          formData.append(item[0], item[1]);
        });

        this.$store.dispatch(AUTH_RESTORE, formData).then(() => {
          this.$router.push({ name: 'sing-in' });
          showSuccess('Данные по восстановлению пароля отправлены Вам на почту');
        });
      }
    },
    onRecaptchaVerify() {
      this.reCaptcha = true;
    },
  },
};
</script>

<style lang="scss" scoped>
  .restore {
    max-width: none;
  }
  @include w320-wDesktop {
    .restore {
      &__col br {
        display: none;
      }
    }
  }
</style>
