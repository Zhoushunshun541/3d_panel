<template>
  <div :id="id" class="coustom-progress"></div>
</template>

<script>
import { Echart } from '../utils/mixins';

export default {
  name: 'Progress',
  mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'progress',
    },
    list: {
      type: Array,
      default: () => [
        { name: '一', data: 36 },
        { name: '二', data: 19 },
        { name: '三', data: 11 },
        { name: '四', data: 9 },
      ],
    },
  },
  data() {
    return {
      options: {
        grid: {
          containLabel: true,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        tooltip: {
          show: false,
        },
        legend: {
          show: false,
        },
        xAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          data: ['sss'],
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        color: ['#FFCC00', '#07C297 ', '#149EEB', '#0B6099'],
        series: [],
      },
    };
  },
  created() {
    this.list.forEach((item, index) => {
      this.options.series.push({
        type: 'bar',
        name: item.name,
        stack: '1',
        barWidth: 12,
        data: [item.data],
        itemStyle: {
          normal: {
            barBorderRadius: [0],
          },
        },
      });
      if (index === 0) {
        this.options.series[index].itemStyle.normal.barBorderRadius = [
          5,
          0,
          0,
          5,
        ];
      } else if (index === this.list.length - 1) {
        this.options.series[index].itemStyle.normal.barBorderRadius = [
          0,
          5,
          5,
          0,
        ];
      }
    });
  },
};
</script>

<style lang="less" scoped>
.coustom-progress {
  width: 100%;
  height: 15px;
}
</style>
