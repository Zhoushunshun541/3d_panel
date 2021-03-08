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
      active: 0,
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
            hoverOffset: 3,
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
    // 处理数据 渲染echart的方法
    getBusinessBackParagraph() {
      // 千分分隔符
      function toThousandFilter(num) {
        const str = num.toString().split('.')[1] || '';

        return (
          num.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,') + str
        );
      }
      business_back_paragraph({ top: 10 }).then(res => {
        if (res.status) {
          this.options.series[0].data = res.data.list.map(arr => {
            return { name: arr.name, value: arr.num, selected: false };
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
            this.changePieSelect(res.data.list);
          });
        }
      });
    },
    // 动态更改选中样式的 方法
    changePieSelect(list, s = 4000) {
      // 设置当前选择状态
      this.myChart.dispatchAction({
        type: 'highlight',
        dataIndex: this.active,
      });
      // 取消上个选择状态
      if (this.active > 0) {
        this.myChart.dispatchAction({
          type: 'downplay',
          dataIndex: this.active - 1,
        });
      } else if (this.active === 0) {
        this.myChart.dispatchAction({
          type: 'downplay',
          dataIndex: list.length - 1,
        });
      }
      setTimeout(() => {
        if (this.active < list.length - 1) {
          ++this.active;
          this.$emit('getActive', this.active);
        } else {
          this.active = 0;
          this.$emit('getActive', 0);
        }
        this.changePieSelect(list);
      }, s);
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
