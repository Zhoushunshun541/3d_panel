<template>
  <div class="bar-chart-2d" :id="id"></div>
</template>

<script>
import { Echart, DealPercent } from '../utils/mixins';
import { business_gdp } from '@/api/api';

export default {
  name: 'BarChart2d',
  mixins: [Echart, DealPercent],
  props: {
    id: {
      type: String,
      default: 'barCharts2d',
    },
    type: {
      type: [String, Number],
      default: '0',
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
          top: 25,
          textStyle: {
            color: 'rgba(207, 220, 255, 0.6)',
          },
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
            data: [],
            axisLine: {
              lineStyle: {
                color: '#29A4FF',
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
              },
            },
            axisLabel: {
              margin: 10,
              color: 'rgba(207, 220, 255, 0.6)',
              textStyle: {
                fontSize: 14,
              },
            },
          },
        ],
        yAxis: [
          {
            name: '单位：万美元',
            axisLabel: {
              fontSize: 14,
              formatter: '{value}',
              color: 'rgba(207, 220, 255, 0.6)',
            },
            nameTextStyle: {
              fontSize: 14,
              color: 'rgba(207, 220, 255, 0.6)',
            },
            axisLine: {
              lineStyle: {
                color: '#29A4FF',
              },
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
        ],
        series: [
          {
            name: '2019',
            type: 'bar',
            data: [],
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
            data: [],
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
  methods: {
    // 获取人均产值
    getBusinessGDP() {
      business_gdp({ type: this.type }).then(res => {
        if (res.status) {
          res.data.list.forEach(item => {
            this.options.xAxis[0].data = [];
            this.options.series[0].data = [];
            this.options.series[1].data = [];
            this.options.xAxis[0].data.push(item.name);
            this.options.series[0].data.push(item.up_num);
            this.options.series[1].data.push(item.local_num);
          });
          this.$store.dispatch('setState', [
            {
              key: 'GDP',
              value: {
                target_percentage: this.DealPercent(res.data.target_percentage),
                gdp_percentage: this.DealPercent(res.data.gdp_percentage),
                all_gdp: res.data.all_gdp,
              },
            },
          ]);
          this.$nextTick(() => {
            this.initChart();
          });
        }
      });
    },
  },
  created() {
    this.getBusinessGDP();
  },
  watch: {
    type() {
      this.getBusinessGDP();
    },
  },
};
</script>

<style lang="less" scoped>
.bar-chart-2d {
  width: 530px;
  height: 225px;
}
</style>
