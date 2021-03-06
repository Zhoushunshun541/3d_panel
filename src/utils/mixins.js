export const Echart = {
  methods: {
    initChart() {
      this.myChart = this.$echart.init(document.getElementById(this.id));
      this.myChart.setOption(this.options);
    },
  },
  beforeDestroy() {
    this.myChart.dispose();
  },
};
export const DealPercent = {
  methods: {
    // 处理百分号
    DealPercent(str) {
      if (str) {
        return parseFloat(str.toString().split('%')[0]);
      }
    },
  },
};

export const ScrollList = {
  data() {
    return {
      classOption: {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      },
    };
  },
};
