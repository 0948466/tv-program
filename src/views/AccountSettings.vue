<template>
  <section class="account-settings mb-section">
    <Breadcrumbs />
    <form
      class="account-settings__form col"
      @submit.prevent="onFormSubmit"
      @reset.prevent="onFormReset"
    >
      <h3 class="title-h3">
        Смена пароля аккаунта:
      </h3>
      <input
        v-model="form['user[current_password]']"
        class="input"
        type="password"
        placeholder="Старый пароль"
        autocomplete="old-password"
        required
      >
      <input
        v-model="form['user[password]']"
        class="input"
        type="password"
        placeholder="Новый пароль"
        autocomplete="new-password1"
        required
      >
      <input
        v-model="form['user[password_confirmation]']"
        class="input"
        type="password"
        placeholder="Новый пароль ещё раз"
        autocomplete="new-password2"
        required
      >
      <button
        class="btn-norm"
        type="submit"
      >
        Сохранить изменения
      </button>
      <button
        class="btn-border"
        type="reset"
      >
        Отмена
      </button>
    </form>
  </section>
</template>

<script>
import Breadcrumbs from '../components/Breadcrumbs.vue';
import { AUTH_CHANGE_PASSWORD } from '../store/actions/auth';

import { showSuccess, showPasswordMatchError } from '../utils/toastr';

export default {
  name: 'AccountSettings',
  metaInfo: {
    titleTemplate: 'Настройки | %s',
  },
  components: { Breadcrumbs },
  data: () => ({
    form: {
      'user[current_password]': null,
      'user[password]': null,
      'user[password_confirmation]': null,
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
        Object.entries(this.form)
          .forEach((item) => {
            formData.append(item[0], item[1]);
          });

        this.$store.dispatch(AUTH_CHANGE_PASSWORD, formData).then(() => {
          this.$router.push({ name: 'home' });
          showSuccess('Пароль изменен');
        });
      }
    },
    onFormReset() {
      Object.keys(this.form).forEach((key) => {
        this.form[key] = null;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.account-settings {
  &__form {
    padding: 0;
  }
  .btn-norm {
    margin-right: 10px;
  }
}
</style>
