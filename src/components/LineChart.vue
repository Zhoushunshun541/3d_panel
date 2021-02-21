<template>
  <div class="line-chart" :id="id"></div>
</template>

<script>
import { Echart } from '../utils/mixins';

export default {
  name: 'LineChart',
  mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'lineChart',
    },
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['2019', '2020'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              width: 1,
              type: 'dotted',
            },
          },

          data: ['一月', '二月', '三月', '四月', '五月', '六月'],
        },
        yAxis: {
          type: 'value',
          axisLabel: false,
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              width: 1,
            },
          },
          axisLine: {
            show: false,
          },
        },
        series: [
          {
            name: '2019',
            type: 'line',
            smooth: 0.4,
            symbol: 'none',
            lineStyle: {
              color: '#07C297',
            },
            stack: '总量',
            data: [200, 150, 100, 150, 200, 230],
          },
          {
            name: '2020',
            type: 'line',
            smooth: 0.4,
            symbol: 'none',
            lineStyle: {
              color: '#FFCC00',
            },
            stack: '总量',
            data: [100, 150, 130, 150, 180, 210],
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
.line-chart {
  width: 100%;
  height: 100%;
}
</style>
