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
// import { Echart } from '../utils/echart';

export default {
  name: 'WaterPolo',
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
          globeRadius: 50,
          baseTexture: '', // 贴图 球形和平面的吻合
          silent: true,
          // environment: require('../assets/images/header_logo.png'), // 背景
          // heightTexture: require('../assets/images/header_logo.png'), // 地球的整个纹路
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
          postEffect: {
            enable: false,
            SSAO: {
              enable: true,
              radius: 10,
            },
          },

          // 地球是否自己转动 autoRotate为true时自己转动
          viewControl: {
            autoRotate: true,
            animationDurationUpdate: 2000,
            targetCoord: '',
          },
        },
        series: [
          {
            type: 'scatter3D',
            coordinateSystem: 'globe',
            blendMode: 'lighter',
            symbolSize: 20,
            symbol: 'pin',
            silent: false,
            itemStyle: {
              color(params) {
                const colorList = ['rgb(246, 153, 180)', 'rgb(118,77,209)'];
                if (params.dataIndex % 2 != 0) {
                  return colorList[0];
                }
                return colorList[1];
              },
              opacity: 1,
              data: [],
            },
            label: {
              show: true,
              textStyle: {
                fontSize: 20,
              },
              formatter(params) {
                if (params.dataIndex % 2 != 0) {
                  return `Destination:\n${params.name}`;
                }
                return `Departure:\n${params.name}`;
              },
              position: 'top',
            },
          },
          {
            name: 'lines3D',
            type: 'lines3D',
            coordinateSystem: 'globe',
            effect: {
              show: false,
              period: 2,
              trailWidth: 3,
              trailLength: 1,
              trailOpacity: 1,
              trailColor: '#007b98',
            },
            blendMode: 'lighter',
            lineStyle: {
              width: 1,
              color: '#007b98',
              opacity: 0,
            },
            data: [],
          },
        ],
      },

      // 平面地球 主要是设置地球的样式
      mapOption: {
        backgroundColor: '#034278', // 当和立体球形贴图是海洋的颜色
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
                borderWidth: 2,
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
      this.mapChart = this.$echart.init(
        document.createElement('canvas'),
        null,
        {
          width: 510,
          height: 477,
        }
      );
      // 获取容器并对其初始化
      this.myChart = this.$echart.init(document.getElementById(this.id));

      // 将平面地球和立体球形的纹路重叠
      this.mapChart.setOption(this.mapOption);
      this.option.globe.baseTexture = this.mapChart;

      // 随机划多条线
      for (let i = 0; i < 50; i++) {
        this.option.series.forEach(item => {
          item.data = item.data.concat(this.rodamData());
        });
        // this.option.series[0].data = this.option.series[0].data.concat(
        //   this.rodamData()
        // );
        // this.option.series[1].data = this.option.series[1].data.concat(
        //   this.rodamData()
        // );
      }

      this.myChart.setOption(this.option);
      // this.myChart.setOption(this.mapOption);// 平面展开图
    },

    // 调用划线方法
    rodamData() {
      // let name = '随机点' + Math.random().toFixed(5) * 100000
      // let longitude = Math.random() * 62 + 73
      const longitude = 105.18;
      const latitude = Math.random() * 360 - 180;
      // let latitude = Math.random() * 50 + 3.52
      const longitude1 = 90.21;
      const latitude1 = Math.random() * 360 - 90;
      const longitude2 = 12.11;
      const latitude2 = Math.random() * 360 - 90;
      const longitude3 = 179.12;
      const latitude3 = Math.random() * 360 - 90;
      const longitude4 = 13.32;
      const latitude4 = Math.random() * 360 - 90;
      return {
        coords: [
          [longitude, latitude],
          [longitude1, latitude1],
          [longitude2, latitude2],
          [longitude3, latitude3],
          [longitude4, latitude4],
        ],
        value: (Math.random() * 3000).toFixed(2),
      };
    },
  },
};
</script>

<style lang="less" scoped></style>
