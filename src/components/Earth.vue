<template>
  <div
    class="earth_page"
    :id="id"
    :style="{
      width: parseFloat(+width) ? width + 'px' : width,
      height: parseFloat(+height) ? height + 'px' : height,
    }"
  ></div>
</template>

<script>
// import { Echart } from '../utils/mixins';

export default {
  name: 'Earth',
  // mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'Earth',
    },
    height: {
      type: [String, Number],
      default: '523',
    },
    width: {
      type: [String, Number],
      default: '860',
    },
  },
  data() {
    return {
      mapChart: {},
      myChart: null,
      // 立体球形纹路
      option: {
        globe: {
          displacementScale: 0.01,
          globeRadius: 60,
          baseTexture: require('../assets/images/world.topo.bathy.jpg'), // 贴图 球形和平面的吻合
          silent: true,
          // environment: require('../assets/images/world.topo.bathy.jpg'), // 背景
          // heightTexture: require('https://file.idiot-zs.top/world.topo.bathy.200401.3x21600x10800.jpg'), // 地球的整个纹路
          // heightTexture: require('../assets/images/world.topo.bathy.jpg'), // 地球的整个纹路
          shading: 'lambert',
          light: {
            main: {
              color: '#fff',
              intensity: 0,
              shadow: false,
              shadowQuality: 'high',
              alpha: 55,
              beta: 10,
            },
            ambient: {
              color: '#fff',
              intensity: 1,
            },
          },
          realisticMaterial: {
            roughness: 0.9,
          },
          postEffect: {
            enable: true,
          },

          // 地球是否自己转动 autoRotate为true时自己转动
          viewControl: {
            autoRotate: true,
            animationDurationUpdate: 4000,
            targetCoord: '',
          },
        },
        series: [
          {
            type: 'scatter3D',
            coordinateSystem: 'globe',
            blendMode: 'lighter',
            symbolSize: 10,
            symbol: 'circle',
            silent: false,
            itemStyle: {
              color: 'red',
            },
            data: [
              [120.26, 32.54],
              [138.252924, 36.204824],
              [121.480237, 31.236305],
              [30.802498, 26.820553],
              [95.956223, 21.913965],
            ],
          },
          {
            name: 'lines3D',
            type: 'lines3D',
            coordinateSystem: 'globe',
            effect: {
              show: true,
              period: 1,
              trailWidth: 1,
              trailLength: 1,
              trailOpacity: 1,
              trailColor: '#007b98',
            },
            blendMode: 'lighter',
            lineStyle: {
              width: 3,
              color: '#007b98',
              opacity: 1,
            },
            data: [
              {
                coords: [
                  // 江苏到日本
                  [120.26, 32.54],
                  [138.252924, 36.204824],
                ],
                value: 0,
              },
              {
                coords: [
                  // 日本到上海
                  [138.252924, 36.204824],
                  [121.480237, 31.236305],
                ],
                value: 0,
              },
              {
                coords: [
                  // 上海到埃及
                  [121.480237, 31.236305],
                  [30.802498, 26.820553],
                ],
                value: 0,
              },
              {
                coords: [
                  // 埃及到缅甸
                  [30.802498, 26.820553],
                  [95.956223, 21.913965],
                ],
                value: 0,
              },
              {
                coords: [
                  // 缅甸到江苏
                  [95.956223, 21.913965],
                  [120.26, 32.54],
                ],
                value: 0,
              },
            ],
          },
        ],
      },

      // 平面地球 主要是设置地球的样式
      mapOption: {
        // backgroundColor: '#034278', // 当和立体球形贴图是海洋的颜色
        visualMap: {
          show: false,
          min: 0,
          max: 100000,
        },
        series: [
          {
            type: 'map',
            map: 'world',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            // 二维数组，定义定位的左上角以及右下角分别所对应的经纬度。例如
            boundingCoords: [
              [-180, 90],
              [180, -90],
            ],
            itemStyle: {
              normal: {
                borderWidth: 0.4,
                borderColor: 'rgb(0,232,232)', // 地球纹路的颜色
                areaColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  // 相邻每个板块 从上到下的颜色变化
                  colorStops: [
                    {
                      offset: 0.2,
                      color: 'rgb(0,48,62)', // 0% 处的颜色
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0,179,188,0.8)', // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 创建一个canvasdom  并将其初始化
      // this.mapChart = this.$echart.init(
      //   document.createElement('canvas'),
      //   null,
      //   {
      //     width: 510,
      //     height: 477,
      //   }
      // );
      // 获取容器并对其初始化
      this.myChart = this.$echart.init(document.getElementById(this.id));

      // 将平面地球和立体球形的纹路重叠
      // this.mapChart.setOption(this.mapOption);
      this.myChart.setOption(this.option);
      // this.option.globe.baseTexture = this.mapChart;

      this.myChart.setOption(this.option);
      // this.myChart.setOption(this.mapOption); // 平面展开图
    },
  },
};
</script>

<style lang="less" scoped></style>
