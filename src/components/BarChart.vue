<template>
  <div class="complate-situation">
    <div class="flex complate-situation_title">
      <span class="title_1">{{ title }}</span>
      <div class="custom-radio">
        <div :class="{ active: active === 0 }">
          上个月
        </div>
        <div :class="{ active: active === 1 }">
          上季度
        </div>
      </div>
    </div>
    <div class="bar-chart" :id="id"></div>
  </div>
</template>

<script>
import { Echart } from '../utils/mixins';
import { business_sales_complete } from '@/api/api';

export default {
  name: 'BarChart',
  mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'barChart',
    },
    type: {
      type: [String, Number],
      default: '0',
    },
    active: {
      type: Number,
      default: 0,
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
    const echart = this.$echart;
    this.$echart.graphic.registerShape('CubeLeft', CubeLeft);
    this.$echart.graphic.registerShape('CubeRight', CubeRight);
    this.$echart.graphic.registerShape('CubeTop', CubeTop);
    return {
      options: {
        backgroundColor: '',
        legend: {
          right: 0,
          top: '2%',
          icon: 'roundRect',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: 'rgba(207, 220, 255, .6)',
          },
        },
        grid: {
          left: 0,
          right: 0,
          bottom: '28%',
          top: '18%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(207, 220, 255, 0.6)',
            },
          },
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
            name: '单位：万元',
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
            name: '目标',
            itemStyle: {
              color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(7, 194, 151, 0)',
                },
                {
                  offset: 1,
                  color: 'rgba(7, 194, 151, 1)',
                },
              ]),
            },
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#07C297',
                        },
                        {
                          offset: 1,
                          color: '#07C297',
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#07C297',
                        },
                        {
                          offset: 1,
                          color: '#07C297',
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: '#07C297',
                        },
                        {
                          offset: 1,
                          color: '#07C297',
                        },
                      ]),
                    },
                  },
                ],
              };
            },
            data: [],
          },
          {
            type: 'custom',
            name: '完成',
            itemStyle: {
              color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(57, 201, 200, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(74, 213, 231, 1)',
                },
              ]),
            },
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
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
            data: [],
          },
          {
            type: 'custom',
            name: '同期',
            itemStyle: {
              color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(0, 122, 255, .1)',
                },
                {
                  offset: 1,
                  color: 'rgba(0, 122, 255, 1)',
                },
              ]),
            },
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(16, 128, 196, .1)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(16, 128, 196, 1)',
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(16, 128, 196, .1)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(16, 128, 196, 1)',
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
                      fill: new echart.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgba(16, 128, 196, .1)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(16, 128, 196, 1)',
                        },
                      ]),
                    },
                  },
                ],
              };
            },
            data: [],
          },
          {
            type: 'line',
            name: '销售完成率',
            yAxisIndex: 1,
            itemStyle: {
              color: '#FFCC00',
              borderWidth: 4,
            },
            lineStyle: {
              type: 'dashed',
            },
            data: [],
          },
        ],
      },
    };
  },
  methods: {
    // 获取销售的完成情况
    getSalesComplete() {
      business_sales_complete({ type: this.type }).then(res => {
        if (res.status) {
          const MAX = [];
          const VALUE = [];
          const UPDATA = [];
          const COMPLETE = [];
          res.data.list.forEach(item => {
            MAX.push(item.sales_num);
            VALUE.push(item.complete_num);
            UPDATA.push(item.up_num);
            COMPLETE.push(item.percentage);
            this.options.xAxis.data.push(item.name);
            this.options.series[0].data = MAX;
            this.options.series[1].data = VALUE;
            this.options.series[2].data = UPDATA;
            this.options.series[3].data = COMPLETE;
          });
          this.initChart();
        }
      });
    },
  },
  created() {
    this.getSalesComplete();
  },
};
</script>

<style lang="less" scoped>
.complate-situation {
  &_title {
    justify-content: space-between;
  }
  .bar-chart {
    margin-top: 13px;
    width: 545px;
    height: 230px;
  }
}
</style>
