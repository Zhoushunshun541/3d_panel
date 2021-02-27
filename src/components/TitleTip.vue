<template>
  <div class="target-info mt15 flex">
    <div class="bg-color flex" v-if="+type === 1">
      <div>
        <span>2020目标</span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="orderInfo.complete_num"
            :duration="1500"
          ></CountTo>
          <span class="fs14">万元</span>
        </span>
      </div>
      <div>
        <span>距目标</span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="orderInfo.from_complete"
            :duration="1500"
          ></CountTo>
          <span class="fs14">万元</span>
        </span>
      </div>
    </div>
    <div class="bg-color flex" v-if="+type === 2">
      <div>
        <span>三季度总产值</span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="$state.GDP.all_gdp"
            :duration="1500"
          ></CountTo>
          <span class="fs14">万元</span>
        </span>
      </div>
      <div class="compare flex">
        <div>
          同比：<span
            class="w50"
            :class="$state.GDP.gdp_percentage < 0 ? 'green' : 'red'"
          >
            <CountTo
              separator=","
              :endVal="$state.GDP.gdp_percentage"
              :duration="1500"
            ></CountTo>
            %
          </span>
        </div>
        <div>
          相比目标：<span
            class="w50"
            :class="$state.GDP.target_percentage < 0 ? 'green' : 'red'"
          >
            <CountTo
              separator=","
              :endVal="$state.GDP.target_percentage"
              :duration="1500"
            ></CountTo>
            %
          </span>
        </div>
      </div>
    </div>
    <div class="bg-color flex" v-if="+type === 3">
      <div class="mr70">
        <span>工厂数量</span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="$state.planInfo.factory_num"
            :duration="1500"
          ></CountTo>
          <span class="fs14 amount-num">个</span>
        </span>
      </div>
      <div class="mr70">
        <span>平均每月产能</span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="$state.planInfo.avg_month_num"
            :duration="1500"
          ></CountTo>
          <span class="fs14 amount-num">万件</span>
        </span>
      </div>
      <div>
        <span>上月总产出<span class="fs12">/排产产能</span></span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="$state.planInfo.up_month_num"
            :duration="1500"
          ></CountTo>
          <span class="fs12 amount-num">
            /
            <CountTo
              separator=","
              :endVal="$state.planInfo.plan_num"
              :duration="1500"
            ></CountTo>
            万件
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { business_order } from '@/api/api';
import { DealPercent } from '@/utils/mixins';
import CountTo from 'vue-count-to';

export default {
  name: 'TitleTip',
  mixins: [DealPercent],
  props: {
    type: {
      type: [Number, String],
      default: 0,
    },
  },
  components: {
    CountTo,
  },
  data() {
    return {
      orderInfo: {
        complete_num: 0,
        from_complete: 0,
        percentage: 0,
      },
    };
  },
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(1)
        .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
  },
  methods: {
    // 获取接单详情 水球图那里
    getAllYearOrder() {
      business_order().then(res => {
        if (res.status) {
          this.orderInfo = {
            complete_num: parseFloat(res.data.complete_num),
            from_complete: parseFloat(res.data.from_complete),
          };
          // 将百分比转number
          const temp = JSON.parse(JSON.stringify(res.data.this_year));
          temp.percentage = this.DealPercent(res.data.this_year.percentage);
          temp.target_percentage = this.DealPercent(
            res.data.this_year.target_percentage
          );
          this.$store.dispatch('setState', [
            {
              key: 'waterData',
              value: +res.data.percentage,
            },
            {
              key: 'thisYear',
              value: temp,
            },
            {
              key: 'quarterData',
              value: res.data.list,
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
  font-size: 14px;
  background: url('../assets/images/title_bg.png');
  background-repeat: no-repeat;
  padding-left: 70px;
  .amount-num {
    font-size: 20px;
    color: #4ebbf5 !important;
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
