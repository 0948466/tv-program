<template>
  <form
    ref="form"
    class="subscription"
    @submit.prevent="onFormSubmit"
  >
    <h2 class="subscription__title title-h2">
      Получите телепрограмму
      <br>
      на электронную почту
    </h2>
    <p
      class="text-small"
      :class="{ 'opacity-0': !form['channel_id[]'].length }"
    >
      Выбор каналов
    </p>
    <multiselect
      v-model="form['channel_id[]']"
      :options="optionsChannels"
      :multiple="true"
      :close-on-select="false"
      :clear-on-select="false"
      :preserve-search="true"
      placeholder="Выбор каналов"
      deselect-label="Удалить канал"
      select-label="Добавить канал"
      selected-label="Выбран"
      label="name"
      track-by="name"
      :preselect-first="true"
    >
      <template
        slot="selection"
        slot-scope="{ value, search, isOpen }"
      >
        <span
          v-if="form['channel_id[]'].length &amp;&amp; !isOpen"
          class="multiselect__single"
        >{{ selectText }}</span>
      </template>
    </multiselect>
    <p
      class="text-small"
      :class="{ 'opacity-0': !form['formats[]'].length }"
    >
      Формат программы
    </p>
    <multiselect
      v-model="form['formats[]']"
      placeholder="Формат программы"
      select-label="Добавить формат"
      :options="optionsFormats"
      :searchable="false"
      :close-on-select="false"
      :multiple="true"
      :hide-selected="true"
    />
    <div class="subscription__time-wrap">
      <div class="subscription__time-col">
        <p class="text-small">
          Дата начала
        </p>
        <multiselect
          v-model="form.start"
          :options="optionsStart"
          deselect-label="-"
          select-label="+"
          selected-label=""
          placeholder="Выбор даты"
          @input="onFormStartInput"
        />
      </div>
      <div class="subscription__time-col">
        <p class="text-small">
          Дата окончания
        </p>
        <multiselect
          v-model="form.end"
          :options="optionsEnd"
          deselect-label="-"
          select-label="+"
          selected-label=""
          placeholder="Выбор даты"
          @input="onFormEndInput"
        />
      </div>
    </div>
    <p
      class="text-small"
      :class="{ 'opacity-0': !form.email }"
    >
      Ваш email
    </p>
    <input
      v-model="form.email"
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
      class="btn-big"
      type="submit"
    >
      Получить программу
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { showRecaptchaError, showError } from '../utils/toastr';
import { GET_CHANNELS } from '../store/actions/channels';
import Recaptcha from './Recaptcha.vue';
import Accepted from './Accepted.vue';
import { SCHEDULES_REQUEST } from '../store/actions/schedules';

export default {
  name: 'Subscription',
  components: { Recaptcha },
  data: () => ({
    isLoading: true,
    optionsFormats: ['XLSX', 'JSON', 'XML', 'TXT'],
    optionsStart: [],
    optionsEnd: [],
    checkRecaptcha: false,
    value: [],
    reCaptcha: false,
    form: {
      email: '',
      'channel_id[]': '',
      'formats[]': '',
      start: '',
      end: '',
    },
  }),
  computed: {
    ...mapGetters([
      'channels',
    ]),
    selectText() {
      const selected = this.form['channel_id[]'].length;
      return this.declOfNum(selected, [`Выбрано: ${selected} программа`, `Выбрано: ${selected} программы`, `Выбрано: ${selected} программ`]);
    },
    optionsChannels() {
      if (this.channels.length) {
        return this.channels.map(item => item.attributes);
      }
      return [];
    },
  },
  beforeMount() {
    this.getChannel();
    this.addOptionsTime();
  },
  methods: {
    showAccepted() {
      this.$modal.show(Accepted,
        {},
        {
          scrollable: true,
          width: '570px',
          height: 'auto',
        });
    },
    onFormStartInput() {
      if (this.formatDateReset(this.form.start) > this.formatDateReset(this.form.end)) {
        this.form.end = this.form.start;
      }
    },
    onFormEndInput() {
      if (this.formatDateReset(this.form.start) > this.formatDateReset(this.form.end)) {
        this.form.start = this.form.end;
      }
    },
    formatDateReset(str) {
      const arr = str.split('.');
      return new Date(`${arr[1]}.${arr[0]}.${arr[2]}`);
    },
    formatDate(date) {
      let mm = date.getMonth() + 1;
      if (mm < 10) mm = `0${mm}`;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = `0${yy}`;

      return `${date.getDate()}.${mm}.${yy}`;
    },
    addOptionsTime() {
      const START = 7;
      const MIN_DAYS = -7;
      const MAX_DAYS = 7;
      const start = new Date();
      const end = new Date();
      end.setDate(end.getDate() + START);
      this.form.start = this.formatDate(start);
      this.form.end = this.formatDate(end);

      for (let i = MIN_DAYS; i <= MAX_DAYS; i += 1) {
        const optionStart = new Date();
        optionStart.setDate(optionStart.getDate() + i);
        this.optionsStart.push(this.formatDate(optionStart));
      }

      for (let i = MIN_DAYS; i <= MAX_DAYS; i += 1) {
        const optionEnd = new Date();
        optionEnd.setDate(optionEnd.getDate() + i);
        this.optionsEnd.push(this.formatDate(optionEnd));
      }
    },
    declOfNum(n, titles) {
      return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2
      && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
    },
    onRecaptchaVerify() {
      this.reCaptcha = true;
    },
    formatDateToSend(date) {
      let newDate = date.split('.');
      newDate[2] = `20${newDate[2]}`;
      return newDate.join('.');
    },
    onFormSubmit() {
      if (!this.reCaptcha) {
        showRecaptchaError();
        return;
      }
      this.submitted = true;
      if (!Object.values(this.form).includes('')) {
        const formData = new FormData();
        const channels = this.form['channel_id[]'].map(item => item.channel_id);

        formData.append('email', this.form.email);
        formData.append('start', this.formatDateToSend(this.form.start));
        formData.append('end', this.formatDateToSend(this.form.end));
        formData.append('formats[]', this.form['formats[]']);
        formData.append('channel_id[]', channels);

        this.$store.dispatch(SCHEDULES_REQUEST, formData).then(() => {
          this.showAccepted();
          Object.keys(this.form).forEach((key) => {
            this.form[key] = '';
          });
        });
      } else {
        showError('Заполните все поля');
      }
    },
    getChannel() {
      if (!this.channels.length) {
        this.$store.dispatch(GET_CHANNELS);
      }
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.subscription {
  margin: 0 auto;
  &__title {
    margin-bottom: 30px;
  }
  .text-small {
    margin-bottom: 0;
  }
  &__time-wrap {
    display: flex;
    justify-content: space-between;
  }
  &__time-col {
    width: calc(50% - 15px);
  }
}
</style>
