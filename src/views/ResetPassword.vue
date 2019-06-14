<template>
  <section class="reset-password mb-section">
    <div class="wrapper">
      <div class="border-right">
        <form
          ref="form"
          autocomplete="off"
          class="col"
          @submit.prevent="onFormSubmit"
        >
          <h2 class="title-h2">
            Изменить пароль
          </h2>
          <input
            v-model="form['user[password]']"
            class="input"
            type="password"
            name="user[password]"
            placeholder="Пароль"
            autocomplete="new-password"
            required
          >
          <input
            v-model="form['user[password_confirmation]']"
            class="input"
            type="password"
            name="user[password_confirmation]"
            placeholder="Пароль ещё раз"
            autocomplete="new-password"
            required
          >
          <button
            class="btn-norm"
            type="submit"
          >
            Сохранить пароль
          </button>
        </form>
      </div>
      <div>
        <div class="col">
          <h2 class="title-h2">
            Вспомнили пароль?
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
import { AUTH_RESET_PASSWORD } from '../store/actions/auth';
import { showSuccess, showPasswordMatchError } from '../utils/toastr';

export default {
  name: 'ResetPassword',
  metaInfo: {
    titleTemplate: 'Вход | %s',
  },
  data: () => ({
    form: {
      'user[password]': '',
      'user[password_confirmation]': '',
    },
  }),

  methods: {
    onFormSubmit() {
      if (this.form['user[password]'] !== this.form['user[password_confirmation]']) {
        showPasswordMatchError();
        return;
      }

      if (!Object.values(this.form).includes('')) {
        const formData = new FormData();
        Object.entries(this.form).forEach((item) => {
          formData.append(item[0], item[1]);
        });

        formData.append('reset_password_token', this.$route.query.reset_password_token)

        this.$store.dispatch(AUTH_RESET_PASSWORD, formData).then(() => {
          this.$router.push({ name: 'sing-in' });
          showSuccess('Ваш пароль изменен.');
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .reset-password {
    max-width: none;
    &__link-wrap {
      margin-bottom: 40px;
    }
    input:last-of-type {
      margin-bottom: 20px;
    }
  }
</style>
