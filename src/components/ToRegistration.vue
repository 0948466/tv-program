<template>
  <div class="to-registration">
    <h2 class="title-h2">
      Ещё нет аккаунта?
      <br>
      Зарегистрируйтесь.
    </h2>

    <p class="text-norm sing-in__text">
      Пройдя регистрацию, вы сможете
      <br>
      настроить автоматическое
      <br>
      получение телепрограммы
      <br>
      каждую неделю.
    </p>
    <router-link
      :to="{ name: 'sing-up' }"
      class="btn-border"
    >
      Создать аккаут
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ToRegistration',
};
</script>

<style scoped>

</style>
