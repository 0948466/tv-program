<template>
  <section class="sing-in mb-section">
    <div class="wrapper">
      <div class="border-right">
        <form
          ref="form"
          autocomplete="off"
          class="col"
          @submit.prevent="onFormSubmit"
        >
          <h2 class="title-h2">
            Вход в личный
            <br>
            кабинет пользователя
          </h2>
          <input
            v-model="email"
            class="input"
            type="email"
            name="user[email]"
            placeholder="Ваш email"
            autocomplete="new-email"
          >
          <input
            v-model="password"
            class="input"
            type="password"
            name="user[password]"
            placeholder="Пароль"
            autocomplete="new-password"
          >
          <div class="sing-in__link-wrap">
            <router-link
              :to="{ name: 'restore' }"
              class="link text-small"
            >
              Забыли пароль?
            </router-link>
          </div>
          <button
            class="btn-norm"
            type="submit"
          >
            Войти в личный кабинет
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
import { mapGetters } from 'vuex';
import { AUTH_REQUEST, AUTH_SING_OUT } from '../store/actions/auth';
import ToRegistration from '@/components/ToRegistration.vue';


export default {
  name: 'SingIn',
  components: { ToRegistration },
  metaInfo: {
    titleTemplate: 'Вход | %s',
  },
  data: () => ({
    email: null,
    password: null,
    submitted: false,
  }),
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
  },
  created() {
    if (localStorage.getItem('user')) {
      this.$store.dispatch(AUTH_SING_OUT);
    }
  },
  methods: {
    onFormSubmit() {
      this.submitted = true;
      if (this.email && this.password) {
        const formData = new FormData(this.$refs.form);
        this.$store.dispatch(AUTH_REQUEST, formData).then(() => {
          this.$router.push('/');
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sing-in {
  max-width: none;
  &__link-wrap {
    margin-bottom: 40px;
  }
  input:last-of-type {
    margin-bottom: 20px;
  }
}
</style>
