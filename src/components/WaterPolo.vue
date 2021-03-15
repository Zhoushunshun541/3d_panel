<template>
  <div class="water-polo_page" :id="id"></div>
</template>

<script>
import 'echarts-liquidfill';
import { Echart } from '../utils/mixins';

export default {
  name: 'WaterPolo',
  mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'WaterPolo',
    },
  },
  computed: {
    options() {
      return {
        backgroundColor: '',
        series: [
          {
            type: 'liquidFill',
            radius: '80%',
            center: ['50%', '50%'],
            data: [this.$state.waterData / 100, this.$state.waterData / 100], // data个数代表波浪数
            color: ['#139EEB', '#139EEB'],
            backgroundStyle: {
              borderWidth: 1,
              color: '#00224A',
            },
            label: {
              normal: {
                formatter: [
                  `{${
                    this.$state.waterData < 60 ? 'wa' : 'a'
                  }|${this.$state.waterData.toFixed(2)}%}`,
                  `{${this.$state.waterData < 60 ? 'wb' : 'b'}|完成与目标比}`,
                ].join('\n'),
                rich: {
                  a: {
                    fontSize: 16,
                  },
                  b: {
                    fontSize: 10,
                  },
                  wa: {
                    fontSize: 16,
                    color: 'rgba(207, 220, 255, 0.85)',
                  },
                  wb: {
                    fontSize: 10,
                    color: 'rgba(207, 220, 255, 0.85)',
                  },
                },
              },
            },
            outline: {
              show: false,
            },
          },
          {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['95%', '100%'],
            hoverAnimation: false,
            data: [
              {
                name: '',
                value: this.$state.waterData,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: '#139EEB',
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: '#139EEB',
                  },
                },
              },
              {
                // 画中间的图标
                name: '',
                value: 0.01,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: '#ffffff',
                  normal: {
                    color: '#139EEB',
                    borderColor: '#139EEB',
                    borderWidth: 4,
                    borderRadius: 2,
                  },
                },
                label: {
                  borderRadius: 2,
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: '#139EEB',
                  },
                },
              },
              {
                // 解决圆点过大后续部分显示明显的问题
                name: '',
                value: 0.8,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: '#139EEB',
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: '#139EEB',
                  },
                },
              },
              {
                // 画剩余的刻度圆环
                name: '',
                value: 100 - this.$state.waterData,
                itemStyle: {
                  color: '#050038',
                },
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: 'rgba(255,255,255,0)',
                  },
                },
              },
            ],
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
.water-polo_page {
  margin-top: 30px;
  width: 100px;
  height: 100px;
}
</style>
