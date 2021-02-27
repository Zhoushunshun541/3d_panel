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
      // options: {
      //   tooltip: {
      //     trigger: 'axis',
      //   },
      //   legend: {
      //     data: ['2019', '2020'],
      //   },
      //   grid: {
      //     left: '3%',
      //     right: '4%',
      //     bottom: '3%',
      //     containLabel: true,
      //   },
      //   toolbox: {
      //     feature: {
      //       saveAsImage: {},
      //     },
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     axisLine: {
      //       show: false,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     splitLine: {
      //       lineStyle: {
      //         color: 'rgba(255, 255, 255, 0.1)',
      //         width: 1,
      //         type: 'dotted',
      //       },
      //     },
      //     data: ['一月', '二月', '三月', '四月', '五月', '六月'],
      //   },
      //   yAxis: {
      //     type: 'value',
      //     axisLabel: false,
      //     axisTick: {
      //       show: false,
      //     },
      //     splitLine: {
      //       lineStyle: {
      //         color: 'rgba(255, 255, 255, 0.1)',
      //         width: 1,
      //       },
      //     },
      //     axisLine: {
      //       show: false,
      //     },
      //   },
      //   series: [
      //     {
      //       name: '2019',
      //       type: 'line',
      //       smooth: 0.4,
      //       symbol: 'none',
      //       lineStyle: {
      //         color: '#07C297',
      //       },
      //       stack: '总量',
      //       data: [200, 150, 100, 150, 200, 230],
      //     },
      //     {
      //       name: '2020',
      //       type: 'line',
      //       smooth: 0.4,
      //       symbol: 'none',
      //       lineStyle: {
      //         color: '#FFCC00',
      //       },
      //       stack: '总量',
      //       data: [100, 150, 130, 150, 180, 210],
      //     },
      //   ],
      // },
    };
  },
  computed: {
    options() {
      // 数据处理
      const year = new Date().getFullYear();
      const data = [];
      const thisData = [];
      const upData = [];
      const thisYear = this.$state.thisYear.this;
      const upYear = this.$state.thisYear.up;
      thisYear.forEach(item => {
        data.push(item.name);
        thisData.push(item.num);
      });
      upYear.forEach(item => {
        upData.push(item.num);
      });
      return {
        color: ['#07C297', '#FFCC00'],
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: [year - 1, year],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
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
          data,
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
            name: year - 1,
            type: 'line',
            smooth: 0.4,
            symbol: 'none',
            lineStyle: {
              color: '#07C297',
              width: 1,
            },
            stack: '总量',
            data: [200, 150, 100, 150, 200, 230],
          },
          {
            name: year,
            type: 'line',
            smooth: 0.4,
            symbol: 'none',
            lineStyle: {
              color: '#FFCC00',
              width: 1,
            },
            stack: '总量',
            data: [100, 150, 130, 150, 180, 210],
          },
        ],
      };
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style lang="less" scoped>
.line-chart {
  width: 100%;
  height: 100%;
}
</style>
