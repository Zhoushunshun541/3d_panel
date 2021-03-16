<template>
  <div class="target-info mt15 flex">
    <div class="bg-color flex" v-if="+type === 1">
      <div class="w160">
        <span>{{ $state.now_year }}目标</span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="+orderInfo.complete_num"
            :duration="1500"
          ></CountTo>
          <span class="fs14nc">万元</span>
        </span>
      </div>
      <div class="w160">
        <span>距目标</span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="+orderInfo.from_complete"
            :duration="1500"
          ></CountTo>
          <span class="fs14nc">万元</span>
        </span>
      </div>
    </div>
    <div class="bg-color flex" v-if="+type === 2">
      <div class="w120">
        <span>{{ $state[active === 0 ? 'month' : 'quarter'] }}总产值</span>
        <span class="amount-num">
          <CountTo
            v-if="+$state.GDP.all_gdp !== 0"
            separator=","
            :endVal="+$state.GDP.all_gdp"
            :duration="1500"
          ></CountTo>
          <span v-else>0</span>
          <span class="fs14nc">万美元</span>
        </span>
      </div>
      <div class="compare flex">
        <div>
          同比：<span
            :class="
              $state.GDP.gdp_percentage.indexOf('-') !== -1 ? 'green' : 'red'
            "
          >
            {{ $state.GDP.gdp_percentage }}
          </span>
        </div>
        <div>
          相比目标：<span
            :class="
              $state.GDP.target_percentage.indexOf('-') !== -1 ? 'green' : 'red'
            "
          >
            {{ $state.GDP.target_percentage }}
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
            :endVal="+$state.planInfo.factory_num"
            :duration="1500"
          ></CountTo>
          <span class="fs14nc amount-num">个</span>
        </span>
      </div>
      <div class="mr70">
        <span>平均每月产能</span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="+$state.planInfo.avg_month_num"
            :duration="1500"
            :decimals="2"
          ></CountTo>
          <span class="fs14nc amount-num">万件</span>
        </span>
      </div>
      <div>
        <span>上月总产出<span class="fs12">/排产产能</span></span>
        <span class="amount-num">
          <CountTo
            separator=","
            :endVal="+$state.planInfo.up_month_num"
            :duration="1500"
            :decimals="2"
          ></CountTo>
          <span class="fs14nc amount-num">
            /
            <CountTo
              separator=","
              :endVal="+$state.planInfo.plan_num"
              :duration="1500"
              :decimals="2"
            ></CountTo>
          </span>
          <span class="fs14nc">万件</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from 'vue-count-to';

export default {
  name: 'TitleTip',
  props: {
    type: {
      type: [Number, String],
      default: 0,
    },
    active: {
      type: [Number, String],
      default: 0,
    },
  },
  components: {
    CountTo,
  },
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(1)
        .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
  },
  computed: {
    orderInfo() {
      return this.$state.orderInfo;
    },
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
