<template>
  <div class="complate-situation">
    <div class="flex complate-situation_title">
      <span class="title_1">{{ title }}</span>
      <div class="custom-radio">
        <div :class="{ active: active === 1 }" @click="active = 1">
          上个月
        </div>
        <div :class="{ active: active === 2 }" @click="active = 2">
          上季度
        </div>
      </div>
    </div>
    <div class="bar-chart" :id="id"></div>
  </div>
</template>

<script>
import { Echart } from '../utils/echart';

export default {
  name: 'BarChart',
  mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'barChart',
    },
    title: {
      type: String,
      default: '2020年四季度销售完成情况',
    },
  },
  data() {
    const CubeLeft = this.$echart.graphic.extendShape({
      shape: {
        x: 0,
        y: 0,
      },
      buildPath(ctx, shape) {
        const { xAxisPoint } = shape;
        const c0 = [shape.x, shape.y];
        const c1 = [shape.x - 6, shape.y - 6];
        const c2 = [xAxisPoint[0] - 6, xAxisPoint[1] - 6];
        const c3 = [xAxisPoint[0], xAxisPoint[1]];
        ctx
          .moveTo(c0[0], c0[1])
          .lineTo(c1[0], c1[1])
          .lineTo(c2[0], c2[1])
          .lineTo(c3[0], c3[1])
          .closePath();
      },
    });
    const CubeRight = this.$echart.graphic.extendShape({
      shape: {
        x: 0,
        y: 0,
      },
      buildPath(ctx, shape) {
        const { xAxisPoint } = shape;
        const c1 = [shape.x, shape.y];
        const c2 = [xAxisPoint[0], xAxisPoint[1]];
        const c3 = [xAxisPoint[0] + 13, xAxisPoint[1] - 6];
        const c4 = [shape.x + 13, shape.y - 6];
        ctx
          .moveTo(c1[0], c1[1])
          .lineTo(c2[0], c2[1])
          .lineTo(c3[0], c3[1])
          .lineTo(c4[0], c4[1])
          .closePath();
      },
    });
    const CubeTop = this.$echart.graphic.extendShape({
      shape: {
        x: 0,
        y: 0,
      },
      buildPath(ctx, shape) {
        const c1 = [shape.x, shape.y];
        const c2 = [shape.x + 13, shape.y - 6];
        const c3 = [shape.x + 6, shape.y - 13];
        const c4 = [shape.x - 6, shape.y - 6];
        ctx
          .moveTo(c1[0], c1[1])
          .lineTo(c2[0], c2[1])
          .lineTo(c3[0], c3[1])
          .lineTo(c4[0], c4[1])
          .closePath();
      },
    });
    this.$echart.graphic.registerShape('CubeLeft', CubeLeft);
    this.$echart.graphic.registerShape('CubeRight', CubeRight);
    this.$echart.graphic.registerShape('CubeTop', CubeTop);
    const MAX = [3000, 3000, 1000, 1800, 1600, 2600, 3000];
    const VALUE = [2012, 1230, 2349, 1654, 1230, 2349, 1654];
    return {
      active: 1,
      options: {
        backgroundColor: '',
        title: {
          text: '',
          top: 32,
          left: 18,
          textStyle: {
            color: '#00F6FF',
            fontSize: 24,
          },
        },
        grid: {
          left: 0,
          right: 0,
          bottom: '3%',
          top: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [
            '一本部',
            '二本部',
            '三本部',
            '四本部',
            '五本部',
            '六本部',
            '七本部',
          ],
          axisLine: {
            show: true,
            lineStyle: {
              color: 'white',
            },
          },
          offset: 20,
          axisTick: {
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
              color: '#7DFFFD',
            },
          },
          axisLabel: {
            fontSize: 10,
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(207, 220, 255, 0.6)',
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              fontSize: 14,
            },
            boundaryGap: ['20%', '20%'],
          },
          {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: 'rgba(207, 220, 255, 0.6)',
              },
            },
            min: 0,
            max: 125,
            interval: 25,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              fontSize: 14,
              formatter: '{value} %',
            },
          },
        ],
        series: [
          {
            type: 'custom',
            renderItem(params, api) {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: 'group',
                position: [10, 0],
                children: [
                  {
                    type: 'CubeLeft',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: 'rgba(28, 154, 151,.6)',
                    },
                  },
                  {
                    type: 'CubeRight',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: 'rgba(28, 154, 151,.7)',
                    },
                  },
                  {
                    type: 'CubeTop',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: 'rgba(28, 154, 151,.8)',
                    },
                  },
                ],
              };
            },
            data: MAX,
          },
          {
            type: 'custom',
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: 'group',
                position: [10, 0],
                children: [
                  {
                    type: 'CubeLeft',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: this.$echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#4AD5E7',
                        },
                        {
                          offset: 1,
                          color: '#39C9C8',
                        },
                      ]),
                    },
                  },
                  {
                    type: 'CubeRight',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: this.$echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#4AD5E7',
                        },
                        {
                          offset: 1,
                          color: '#39C9C8',
                        },
                      ]),
                    },
                  },
                  {
                    type: 'CubeTop',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: this.$echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#4AD5E7',
                        },
                        {
                          offset: 1,
                          color: '#39C9C8',
                        },
                      ]),
                    },
                  },
                ],
              };
            },
            data: VALUE,
          },
          {
            type: 'custom',
            renderItem(params, api) {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: 'group',
                position: [-10, 0],
                children: [
                  {
                    type: 'CubeLeft',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: '#1080C4',
                    },
                  },
                  {
                    type: 'CubeRight',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: '#1080C4',
                    },
                  },
                  {
                    type: 'CubeTop',
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: '#1080C4',
                    },
                  },
                ],
              };
            },
            data: MAX,
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
.complate-situation {
  &_title {
    justify-content: space-between;
    .custom-radio {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 120px;
      height: 25px;
      border-radius: 6px;
      border: 1px solid rgba(51, 67, 113, 1);
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 100%;
      }
      .active {
        color: #5ac8fa;
        border-radius: 2px;
        background-color: rgba(0, 122, 255, 0.2);
        border: 0.6px solid rgba(0, 122, 255, 1);
      }
    }
  }
  .bar-chart {
    margin-top: 13px;
    width: 545px;
    height: 230px;
  }
}
</style>
