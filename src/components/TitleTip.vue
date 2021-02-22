<template>
  <div class="target-info mt15 flex">
    <div class="bg-color flex" v-show="+type === 1">
      <div>
        <span>2020目标</span>
        <span class="amount-num">
          {{ orderInfo.complete_num | toThousandFilter }}
          <span class="fs14">万元</span>
        </span>
      </div>
      <div>
        <span>距目标</span>
        <span class="amount-num">
          {{ orderInfo.from_complete | toThousandFilter }}
          <span class="fs14">万元</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { business_order } from '@/api';

export default {
  name: 'TitleTip',
  props: {
    type: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      orderInfo: {
        complete_num: '',
        from_complete: '',
        percentage: '',
      },
    };
  },
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(0)
        .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
  },
  methods: {
    // 获取接单详情 水球图那里
    getAllYearOrder() {
      business_order().then(res => {
        if (res.status) {
          this.orderInfo = {
            complete_num: res.data.complete_num,
            from_complete: res.data.from_complete,
          };
          this.$store.dispatch('setState', [
            {
              key: 'waterData',
              value: +res.data.percentage,
            },
            {
              key: 'thisYear',
              value: res.data.this_year,
            },
          ]);
        }
      });
    },
  },
  created() {
    switch (+this.type) {
      case 1:
        this.getAllYearOrder();
        break;
      default:
        break;
    }
  },
};
</script>

<style lang="less" scoped>
.target-info {
  color: #fff;
  font-size: 14px;
  background: url('../assets/images/title_bg.png');
  background-repeat: no-repeat;
  padding-left: 70px;
  .amount-num {
    font-size: 20px;
    color: #4ebbf5;
  }
  .bg-color {
    width: 100%;
    height: 60px;
    & > div {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
  }
}
</style>
