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
        title: {
          text: '',
          x: 'center',
          y: 'center',
          textStyle: {
            rich: {
              a: {
                fontSize: 18,
                color: '#fff',
              },
              b: {
                fontSize: 12,
                color: '#fff',
              },
              c: {
                fontSize: 12,
                color: '#CFDCFF',
                // padding: [5,0]
              },
            },
          },
        },
        grid: {
          left: 0,
        },
        series: [
          {
            type: 'pie',
            radius: ['55%', '70%'],
            center: ['50%', '50%'],
            data: [],
            hoverAnimation: false,
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#007AFF',
                },
              },
            },
            label: {
              formatter: '{name|{b}}',
              padding: [-15, -30, 0, 0],
              rich: {
                name: {
                  fontSize: 12,
                  color: '#CFDCFF',
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
      // 千分分隔符
      function toThousandFilter(num) {
        return (+num || 0)
          .toFixed(1)
          .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
      }
      business_back_paragraph().then(res => {
        if (res.status) {
          this.options.series[0].data = res.data.list.map(arr => {
            return { name: arr.name, value: arr.num };
          });
          this.options.title.text = [
            `{a|${toThousandFilter(res.data.all_num) || 0}}{b|万元}`,
            `{b|${res.data.all_percentage || 0}%}`,
          ].join('\n');
          this.$store.dispatch('setState', {
            key: 'backList',
            value: res.data.list,
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
  height: 190px;
  width: 260px;
}
</style>