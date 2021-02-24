<template>
  <div class="exchange-rate" :id="id"></div>
</template>

<script>
import { exchangeRate } from '@/api/api';

export default {
  name: 'ExchangeRate',
  props: {
    id: {
      type: String,
      default: 'ExchangeRate',
    },
  },
  data() {
    return {
      options: {},
    };
  },
  methods: {
    getExchangeRate() {
      exchangeRate().then(res => {
        if (res.status) {
          console.log(res);
          this.$store.dispatch('setState', {
            key: 'exchange',
            value: res.data.frate,
          });
        }
      });
    },
  },
  mounted() {
    this.getExchangeRate();
  },
};
</script>

<style lang="less" scoped></style>
