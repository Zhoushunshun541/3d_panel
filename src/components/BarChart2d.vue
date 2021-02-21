<template>
  <div class="bar-chart-2d" :id="id"></div>
</template>

<script>
import { Echart } from '../utils/mixins';

export default {
  name: 'BarChart2d',
  mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'barCharts2d',
    },
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          show: true,
          itemWidth: 10,
          itemHeight: 10,
          right: 10,
        },
        grid: {
          top: '25%',
          right: '3%',
          left: '10%',
          bottom: '10%',
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '一本部',
              '2本部',
              '3本部',
              '4本部',
              '5本部',
              '6本部',
              '7本部',
            ],
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.12)',
              },
            },
            axisLabel: {
              margin: 10,
              color: '#e2e9ff',
              textStyle: {
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            name: '单位：万元',
            axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff',
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,1)',
              },
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.12)',
              },
            },
          },
        ],
        series: [
          {
            name: '2019',
            type: 'bar',
            data: [30, 66, 29, 80, 54, 50, 20],
            barWidth: '10px',
            itemStyle: {
              normal: {
                color: '#0D6DA9',
                barBorderRadius: [30, 30, 30, 30],
                shadowBlur: 4,
              },
            },
          },
          {
            name: '2020',
            type: 'bar',
            data: [30, 66, 29, 80, 54, 50, 20],
            barWidth: '10px',
            itemStyle: {
              normal: {
                color: '#07C297',
                barBorderRadius: [30, 30, 30, 30],
                shadowBlur: 4,
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
.bar-chart-2d {
  width: 530px;
  height: 215px;
}
</style>
