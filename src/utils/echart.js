export const Echart = {
  methods: {
    initChart() {
      this.myChart = this.$echart.init(document.getElementById(this.id));
      this.myChart.setOption(this.options);
    },
  },
  mounted() {
    this.initChart();
  },
};
