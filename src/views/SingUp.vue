<template>
  <section class="sing-up mb-section">
    <div class="wrapper">
      <div class="border-right">
        <form
          autocomplete="off"
          class="col"
          rel="form"
          @submit.prevent="onFormSubmit"
        >
          <h2 class="title-h2">
            Регистрация
            <br>
            нового пользователя
          </h2>
          <input
            v-model="form['user[email]']"
            class="input"
            type="email"
            placeholder="Ваш email"
            autocomplete="new-email"
            required
          >
          <input
            v-model="form['user[password]']"
            class="input"
            type="password"
            placeholder="Придумайте пароль"
            autocomplete="new-password"
            required
          >
          <input
            v-model="form['user[password_confirmation]']"
            class="input"
            type="password"
            placeholder="Пароль ещё раз"
            autocomplete="new-password"
            required
          >
          <Recaptcha
            @verify="onRecaptchaVerify"
          />
          <div class="text-small">
            Создавая новый аккаунт, Вы подтверждаете, что
            <br>
            принимаете условия
            <a
              :href="$url.terms"
              class="link"
              target="_blank"
              rel="noopener"
            >
              Пользовательского соглашения.
            </a>
          </div>

          <button
            class="btn-norm"
            type="submit"
          >
            Создать аккаунт
          </button>
        </form>
      </div>
      <div>
        <div class="col">
          <h2 class="title-h2">
            У вас уже есть
            <br>
            зарегистрированный
            <br>
            аккаунт?
          </h2>
          <router-link
            :to="{ name: 'sing-in' }"
            class="btn-border"
          >
            Войти в личный кабинет
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { AUTH_SING_UP } from '../store/actions/auth';
import { showSuccess, showRecaptchaError, showPasswordMatchError } from '../utils/toastr';
import Recaptcha from '../components/Recaptcha.vue';

export default {
  name: 'SingUp',
  components: { Recaptcha },
  metaInfo: {
    titleTemplate: 'Регистрация | %s',
  },
  data: () => ({
    form: {
      'user[email]': '',
      'user[password]': '',
      'user[password_confirmation]': '',
    },
    submitted: false,
    reCaptcha: false,
  }),
  methods: {
    onFormSubmit() {
      this.submitted = true;

      if (this.form['user[password]'] !== this.form['user[password_confirmation]']) {
        showPasswordMatchError();
        return;
      }

      if (!this.reCaptcha) {
        showRecaptchaError();
        return;
      }

      if (!Object.values(this.form).includes('')) {
        const formData = new FormData();
        Object.entries(this.form).forEach((item) => {
          formData.append(item[0], item[1]);
        });
        this.$store.dispatch(AUTH_SING_UP, formData).then(() => {
          this.$router.push({ name: 'sing-in' });
          showSuccess('СПАСИБО ЗА РЕГИСТРАЦИЮ',
            `Ваша регистрация практически завершена. Пожалуйста активируйте учетную запись.
             <br>
             Для этого перейдите по ссылке, отправленную вам на указанный адрес электронной почты.
             `);
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
.sing-up {
  max-width: none;
}
</style>
