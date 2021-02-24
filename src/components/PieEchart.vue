<template>
  <div class="pie-echart" :id="id"></div>
</template>

<script>
import { Echart } from '@/utils/mixins';
import { business_back_paragraph } from '@/api/api';

export default {
  name: 'PieEchart',
  mixins: [Echart],
  props: {
    id: {
      type: String,
      default: 'PieEchart',
    },
  },
  data() {
    const color = [
      'rgba(20, 158, 235, 1)',
      'rgba(255, 108, 102, 0.9)',
      'rgba(142, 48, 255, 1)',
      'rgba(199, 244, 47, 1)',
      'rgba(7, 194, 151, 1)',
      'rgba(241, 227, 141, 1)',
      'rgba(234, 81, 165, 1)',
      'rgba(198, 86, 204, 1)',
      'rgba(241, 134, 252, 1)',
      'rgba(126, 5, 92, 1)',
    ];
    return {
      options: {
        backgroundColor: '',
        color,
        series: [
          {
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '50%'],
            data: [],
            hoverAnimation: false,
            labelLine: {
              normal: {
                length: 20,
                length2: 120,
                lineStyle: {
                  color: '#007AFF',
                },
              },
            },
            label: {
              formatter: '{name|{b}}',
              rich: {
                name: {
                  fontSize: 12,
                  color: '#fff',
                },
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    getBusinessBackParagraph() {
      business_back_paragraph().then(res => {
        if (res.status) {
          this.options.series[0].data = res.data.list.map(arr => {
            return { name: arr.name, value: arr.num };
          });
          this.$nextTick(() => {
            this.initChart();
          });
        }
      });
    },
  },
  mounted() {
    this.getBusinessBackParagraph();
  },
};
</script>

<style lang="less" scoped>
.pie-echart {
  height: 215px;
  width: 215px;
}
</style>
