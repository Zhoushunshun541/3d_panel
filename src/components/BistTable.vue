<template>
  <div>
    <div class="bist-table_header flex">
      <div class="table-index"></div>
      <div class="dept-name">工厂名称</div>
      <div class="check-num">检验数</div>
      <div class="bad-num">不良数</div>
      <div class="month-bad-num">10月不良率</div>
      <div class="all-bad-num">2020年累计不良率</div>
    </div>
    <div class="bist-table-list mt10">
      <ul>
        <li class="flex" v-for="(item, i) in bistList" :key="i">
          <div class="table-index">{{ item.id }}</div>
          <div class="dept-name">{{ item.name }}</div>
          <div class="check-num">{{ item.qc_num }}</div>
          <div class="bad-num">{{ item.bad_num }}</div>
          <div class="month-bad-num" :id="`mbn-${item.id}`"></div>
          <div class="all-bad-num" :id="`abn-${item.id}`"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { business_qc_bad } from '@/api/api';

export default {
  name: 'BistTable',
  data() {
    return {
      // 不良率列表
      bistList: [],
      options: {
        backgroundColor: '',
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'item',
        },
        grid: {
          borderWidth: 0,
          top: '10%',
          left: '0',
          right: '50',
          bottom: '3%',
        },
        yAxis: {
          type: 'category',
          inverse: true,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            inside: false,
          },
          data: [],
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        series: [
          {
            name: '',
            type: 'bar',
            zlevel: 2,
            barWidth: '10px',
            data: [
              {
                name: '',
                value: '',
                itemStyle: {
                  normal: {
                    show: true,
                    color: {},
                    barBorderRadius: 10,
                  },
                  emphasis: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                  },
                },
              },
            ],

            animationDuration: 1500,
          },
          {
            name: '背景',
            type: 'bar',
            barWidth: 10,
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: 'rgba(0, 0, 0, 0)',
              },
            },
            data: [
              {
                name: '',
                value: 100,
                label: {
                  show: true,
                  position: 'right',
                  formatter: '',
                  fontSize: 14,
                  rich: {
                    red: {
                      color: '#FF6C66',
                    },
                    white: {
                      color: '#fff',
                    },
                  },
                },
              },
            ],
            animationDuration: 0,
          },
        ],
        animationEasing: 'cubicOut',
      },
    };
  },
  methods: {
    // 获取相关数据
    getBusinessQcBad() {
      business_qc_bad().then(res => {
        if (res.status) {
          this.bistList = res.data.list.map((item, index) => {
            const obj = {
              id: index + 1,
              ...item,
            };
            return obj;
          });
          this.$nextTick(() => {
            this.dealWithEchart();
          });
        }
      });
    },
    // 处理图标数据
    dealWithEchart() {
      this.bistList.forEach(item => {
        const options = JSON.parse(JSON.stringify(this.options));
        options.yAxis.data = [item.month_bad_percentage];
        options.series[0].data[0].value = item.month_bad_percentage;
        options.series[0].data[0].name = '10月不良数';
        options.series[0].data[0].color = 'rgba(20, 158, 235, 1)';
        options.series[1].data[0].label.formatter = `{${
          item.month_bad_percentage >= 3 ? 'red' : 'white'
        }|${item.month_bad_percentage}%}`;
        options.series[0].data[0].itemStyle.normal.color = new this.$echart.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: `rgba(20, 158, 235, .1)`,
            },
            {
              offset: 1,
              color: `rgba(20, 158, 235, 1)`,
            },
          ],
          false
        );
        const myChart = this.$echart.init(
          document.getElementById(`mbn-${item.id}`)
        );
        myChart.setOption(options);

        const options1 = JSON.parse(JSON.stringify(this.options));
        options1.yAxis.data = [item.year_bad_percentage];
        options1.series[0].data[0].value = item.year_bad_percentage;
        options.series[0].data[0].name = '年累计不良数';
        options1.series[0].data[0].color = 'rgba(20, 158, 235, 1)';
        options1.series[1].data[0].label.formatter = `{${
          item.year_bad_percentage >= 3 ? 'red' : 'white'
        }|${item.year_bad_percentage}%}`;
        options1.series[0].data[0].itemStyle.normal.color = new this.$echart.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: `rgba(7, 194, 151, 0)`,
            },
            {
              offset: 1,
              color: `rgba(78, 187, 245, 1)`,
            },
          ],
          false
        );
        const myChart1 = this.$echart.init(
          document.getElementById(`abn-${item.id}`)
        );
        myChart1.setOption(options1);
      });
    },
  },
  mounted() {
    this.getBusinessQcBad();
  },
};
</script>

<style lang="less" scoped>
.bist-table_header {
  display: flex;
  justify-content: space-between;
  div {
    flex-shrink: 0;
    padding: 0;
    font-size: 14px;
    color: rgba(207, 220, 255, 0.6);
  }
  .check-num,
  .bad-num {
    text-align: right;
  }
}
.bist-table-list {
  font-size: 14px;
  .max-height {
    height: 240px;
    overflow: scroll;
  }
  .table-index {
    text-align: center;
    font-size: 18px;
    color: #546781;
  }
  li {
    margin-bottom: 24px;
    justify-content: space-between;
  }
  div {
    flex-shrink: 0;
  }
}
.table-index {
  width: 35px;
  margin: 0;
}
.dept-name {
  text-align: right;
  width: 60px;
}
.check-num {
  text-align: right;
  width: 80px;
}
.bad-num {
  text-align: right;
  width: 60px;
}
.month-bad-num,
.all-bad-num {
  width: 145px;
  height: 20px;
  flex-shrink: 0;
}
</style>
