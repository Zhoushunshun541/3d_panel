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
        title: {
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 25,
            color: 'rgb(97, 142, 205)',
          },
        },
        series: [
          {
            type: 'liquidFill',
            radius: '80%',
            center: ['50%', '50%'],
            data: [this.$state.waterData, this.$state.waterData], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: 'rgb(255,0,255,0.1)',
            },
            label: {
              normal: {
                formatter: `${(this.$state.waterData * 100).toFixed(
                  2
                )}% \n完成与目标比`,
                textStyle: {
                  fontSize: 12,
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
                value: 100 * this.$state.waterData,
                labelLine: {
                  show: false,
                },
                itemStyle: {
                  color: '#5886f0',
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: '#5886f0',
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
                    color: '#5886f0',
                    borderColor: '#5886f0',
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
                    color: '#5886f0',
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
                  color: '#5886f0',
                },
                emphasis: {
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    color: '#5886f0',
                  },
                },
              },
              {
                // 画剩余的刻度圆环
                name: '',
                value: 100 * (1 - this.$state.waterData),
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
};
</script>

<style lang="less" scoped>
.water-polo_page {
  margin-top: 30px;
  width: 100px;
  height: 100px;
}
</style>
