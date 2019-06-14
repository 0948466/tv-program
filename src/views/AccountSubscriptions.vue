<template>
  <form
    class="account-subscriptions mb-section"
    @submit.prevent="onFormSubscriptionsSubmit"
    @reset.prevent="onFormSubscriptionsReset"
  >
    <Breadcrumbs />
    <p
      v-if="showWarning"
      class="account-subscriptions__warning text-norm"
    >
      Рассылка телепрограммы осуществляется еженедельно по Пятницам 14:00(MCK)
      <span
        class="icon-close-warning"
        @click="onWarningIconCloseClick"
      />
    </p>
    <div class="account-subscriptions__title-wrap">
      <h3 class="title-h3">
        Телеканалы для получения телепрограммы:
      </h3>
      <div>
        <button
          class="link"
          @click.prevent="chooseOn('channels')"
        >
          Выбрать все
        </button>
        <button
          class="link"
          @click.prevent="removeSelection('channels')"
        >
          Снять выделение
        </button>
      </div>
    </div>
    <div class="wrapper account-subscriptions__wrapper">
      <div class="account-subscriptions__left">
        <div
          v-for="channel in optionsChannelsLeft"
          :key="channel.channel_id"
          class="col"
        >
          <label
            class="label-checkbox"
            :class="{ 'label-checkbox_checked': form.channels[channel.channel_id] }"
          >
            <input
              v-model="form.channels[channel.channel_id]"
              type="checkbox"
              :true-value="1"
              :false-value="0"
              hidden
            >
            {{ channel.name }}
          </label>
        </div>
      </div>
      <div class="account-subscriptions__right">
        <div
          v-for="channel in optionsChannelsRight"
          :key="channel.channel_id"
          class="col"
        >
          <label
            class="label-checkbox"
            :class="{ 'label-checkbox_checked': form.channels[channel.channel_id] }"
          >
            <input
              v-model="form.channels[channel.channel_id]"
              type="checkbox"
              :true-value="1"
              :false-value="0"
              hidden
            >
            {{ channel.name }}
          </label>
        </div>
      </div>

    </div>
    <div class="account-subscriptions__title-wrap">
      <h3 class="title-h3">
        Форматы телепрограммы:
      </h3>
      <div>
        <button
          class="link"
          @click.prevent="chooseOn('formats')"
        >
          Выбрать все
        </button>
        <button
          class="link"
          @click.prevent="removeSelection('formats')"
        >
          Снять выделение
        </button>
      </div>
    </div>
    <div class="wrapper wrapper_200 account-subscriptions__wrapper_200">
      <label
        v-for="(val, format) in form.formats"
        :key="format"
        class="label-checkbox"
        :class="{ 'label-checkbox_checked': form.formats[format] }"
      >
        <input
          v-model="form.formats[format]"
          type="checkbox"
          :true-value="1"
          :false-value="0"
          hidden
        >
        {{ format }}
      </label>
    </div>

    <button
      class="btn-norm"
      type="submit"
    >
      Сохранить изменения
    </button>
    <button
      class="btn-border account-subscriptions__btn-reset"
      type="reset"
    >
      Отмена
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { CHANGE_USER_ATTRIBUTES } from '../store/actions/auth';
import { GET_CHANNELS } from '../store/actions/channels';
import { showSuccess } from '../utils/toastr';
import Breadcrumbs from '../components/Breadcrumbs.vue';

export default {
  name: 'AccountSubscriptions',
  components: { Breadcrumbs },
  metaInfo: {
    titleTemplate: 'Выборка | %s',
  },
  data: () => ({
    form: {
      channels: [],
      formats: {
        XLSX: 0,
        JSON: 0,
        XML: 0,
        TXT: 0,
      },
    },
    checkbox: {},
    showWarning: true,
  }),
  computed: {
    ...mapGetters([
      'channels',
      'user',
    ]),
    optionsChannels() {
      if (this.channels.length) {
        return this.channels.map(item => item.attributes);
      }
      return [];
    },
    optionsChannelsLeft() {
      if (this.optionsChannels.length) {
        const num = (this.optionsChannels.length % 2) ? 1 : 0;
        return this.optionsChannels.slice(0, Math.floor(this.optionsChannels.length / 2) + num);
      }
      return [];
    },
    optionsChannelsRight() {
      if (this.optionsChannels.length) {
        const num = (this.optionsChannels.length % 2) ? 1 : 0;
        return this.optionsChannels.slice(Math.floor(this.optionsChannels.length / 2) + num);
      }
      return [];
    },
  },
  beforeMount() {
    this.getChannel();
    this.showWarning = !localStorage.getItem('AccountSubscriptionHideWarning');
  },
  methods: {
    onFormSubscriptionsSubmit() {
      const formData = new FormData();

      const channels = Object.entries(this.form.channels).reduce((acc, value) => {
        if (value[1]) {
          acc.push(value[0]);
        }
        return acc;
      }, []);

      const formats = Object.entries(this.form.formats).reduce((acc, value) => {
        if (value[1]) {
          acc.push(value[0]);
        }
        return acc;
      }, []);

      formData.append('user[formats][]', formats);
      formData.append('user[channels][]', channels);

      this.$store.dispatch(CHANGE_USER_ATTRIBUTES, { params: formData, userId: this.user.id })
        .then(() => {
          showSuccess('Данные сохранены');
        });
    },
    onFormSubscriptionsReset() {
      this.removeSelection('formats');
      this.removeSelection('channels');
      this.addCheckedParams();
    },
    chooseOn(data) {
      Object.keys(this.form[data]).forEach((item) => {
        this.form[data][item] = 1;
        return false;
      });
    },
    removeSelection(data) {
      Object.keys(this.form[data]).forEach((item) => {
        this.form[data][item] = 0;
        return false;
      });
    },
    onWarningIconCloseClick() {
      this.showWarning = false;
      localStorage.setItem('AccountSubscriptionHideWarning', '1');
    },
    getChannel() {
      if (!this.channels.length) {
        this.$store.dispatch(GET_CHANNELS).then(() => {
          this.initChannel();
          this.addCheckedParams();
        });
      } else {
        this.initChannel();
        this.addCheckedParams();
      }
    },
    initChannel() {
      this.form.channels = this.channels.reduce((acc, value) => Object
        .assign({}, acc, { [value.attributes.channel_id]: 0 }), {});
    },
    addCheckedParams() {
      if (this.user.attributes.channels) {
        this.user.attributes.channels.forEach((item) => {
          this.form.channels[item] = 1;
        });
      }

      if (this.user.attributes.formats) {
        this.user.attributes.formats.forEach((item) => {
          this.form.formats[item.toUpperCase()] = 1;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.account-subscriptions {
  &__warning {
    position: relative;
    padding: 20px 30px 20px 60px;
    border: 1px dashed $color-border;
    &::before {
      content: '';
      position: absolute;
      top: 22px;
      left: 18px;
      width: 24px;
      height: 24px;
      background: url("../assets/images/icons/icon_info.svg") no-repeat center / cover  ;
    }
  }
  &__title-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 40px;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
  }
  .title-h3 {
    margin-bottom: 0;
  }
  .btn-norm {
    margin-right: 10px;
    @media only screen and (max-width: 380px) {
      margin-right: auto;
    }
  }
  &__wrapper {
    padding-bottom: 20px;
    margin-bottom: 40px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px dashed $color-border;
    .col {
      margin-bottom: 0;
    }
  }
  &__wrapper_200 {
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
  &__btn-reset {
    margin-right: auto;
  }
}
</style>
