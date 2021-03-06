<template>
  <div class="mid_content">
    <div class="frate-info flex" style="padding:7px 0;">
      <div class="fs24 frate-info-close-pri">
        <span :class="exchange.closePri > exchange.yesPic ? 'red' : 'green'">
          {{ exchange.closePri }}
          <svg class="icon" aria-hidden="true">
            <use
              :xlink:href="
                exchange.closePri > exchange.yesPic ? '#iconzhang' : '#icondie'
              "
            ></use>
          </svg>
        </span>
      </div>
      <div style="font-weight:400;" class="ml10">
        <p>{{ exchange.diffPer + ' ' + exchange.diffAmo }}</p>
        <p>{{ exchange.date + '  ' + exchange.datatime }}</p>
      </div>
      <div class="ml20">
        <template v-for="(item, i) in cash">
          <p :key="i" v-if="i < 2">
            {{
              item.currencyFD +
                item.currencyF_Name +
                (i === 0 ? ' = ' : ' ≈ ') +
                parseFloat(item.exchange).toFixed(4) +
                item.currencyT_Name
            }}
          </p>
        </template>
      </div>
    </div>
    <div class="flex visual-pa">
      <div class="visual-pa_item">
        <span>今开</span>
        <span>{{ exchange.closePri }}</span>
      </div>
      <div class="visual-pa_item">
        <span>昨收</span>
        <span>{{ exchange.yesPic }}</span>
      </div>
      <div class="visual-pa_item">
        <span>振幅</span>
        <span>{{ exchange.range }}</span>
      </div>
    </div>
    <div class="exchange-rate" :id="id"></div>
  </div>
</template>

<script>
import { exchangeRate } from '@/api/api';
import { Echart } from '@/utils/mixins';

export default {
  name: 'ExchangeRate',
  mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'ExchangeRate',
    },
  },
  data() {
    return {
      options: {
        grid: {
          left: '10%',
          right: '3%',
          top: '10%',
          bottom: '18%',
        },
        xAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#5D6B95',
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .1)',
              type: 'dashed',
            },
          },
          data: [],
        },
        yAxis: {
          min: 6.4,
          max: 6.9,
          axisLine: {
            show: false,
          },
          axisLabel: {
            color: '#5D6B95',
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, .1)',
            },
          },
        },
        series: [
          {
            type: 'k',
            barMaxWidth: 20,
            barMinWidth: 5,
            itemStyle: {
              color: '#FF6C66',
              color0: '#07C297',
              borderWidth: 0,
              borderColor: '#8A0000',
              borderColor0: '#008F28',
            },
            data: [], // [开盘值, 收盘值, 最低值, 最高值]
          },
        ],
      },
      cash: [], // 人民币 美元兑换比例
      exchange: {
        closePri: '', // 最新价
        diffPer: '', // 涨跌
        diffAmo: '', // 涨跌金额
        openPri: '', // 开盘价
        date: '', // 时间
        datatime: '', // 时间
        yesPic: '', // 昨收
        range: '', // 振幅
      },
    };
  },
  methods: {
    // 处理K线图数据
    dealKLineEchart(arr) {
      arr.forEach(item => {
        this.options.series[0].data.push([
          item.start,
          item.end,
          item.min,
          item.max,
        ]);
        this.options.xAxis.data.push(item.data_time);
      });
      this.$nextTick(() => {
        this.initChart();
      });
    },
    // 获取信息
    getExchangeRate() {
      exchangeRate().then(res => {
        if (res.status) {
          this.exchange = res.data.frate;
          this.cash = res.data.currency;
          this.options.yAxis.min = res.data.all_min;
          this.options.yAxis.max = res.data.all_max;
          this.dealKLineEchart(res.data.movements);
        }
      });
    },
  },
  created() {
    this.getExchangeRate();
  },
};
</script>

<style lang="less" scoped>
.mid_content {
  .icon {
    margin-left: -12px;
  }
  .frate-info {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    &-close-pri {
      color: #ff6c66;
      font-weight: bold;
      padding-left: 10px;
    }
  }
  .visual-pa {
    justify-content: space-between;
    &_item {
      padding: 7px 0;
      width: 30%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      & > span:first-child {
        color: #5d6b95;
      }
    }
  }
  .exchange-rate {
    height: 225px;
    width: 100%;
  }
}
</style>
