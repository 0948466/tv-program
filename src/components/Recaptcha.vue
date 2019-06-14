<template>
  <VueRecaptcha
    ref="recaptcha"
    class="recaptcha"
    sitekey="6LfnIJkUAAAAANhHtvztAzCSiukBNsZw4VqEb8-0"
    @verify="$emit('verify')"
  />
</template>
<script>
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'Recaptcha',
  components: { VueRecaptcha },
  props: {
    checkRecaptcha: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    checkRecaptcha(checkRecaptcha) {
      if (checkRecaptcha) {
        console.log(123333);
      }
    },
  },
};
</script>

<style scoped>

</style>
