<template>
  <div>
    <div class="bist-table_header flex">
      <div class="table-index"></div>
      <div class="dept-name">工厂名称</div>
      <div class="check-num">检验数</div>
      <div class="bad-num">不良数</div>
      <div class="bad-num-chart">10月不良率</div>
      <div class="bad-num-chart">2020年累计不良率</div>
    </div>
    <div class="bist-table-list mt10">
      <div class="w100 left">
        <div
          v-if="month_bad > 0"
          class="assist-line"
          :style="{ marginLeft: `calc(${(month_bad / m_max) * 100}% - 15px)` }"
        >
          <div class="line"></div>
          <div>{{ month_bad }}%</div>
        </div>
      </div>
      <div class="w100 right">
        <div
          v-if="month_bad > 0"
          class="assist-line"
          :style="{ marginLeft: `calc(${(year_bad / y_max) * 100}% - 15px)` }"
        >
          <div class="line"></div>
          <div>{{ year_bad }}%</div>
        </div>
      </div>
      <ul
        class="animate__animated"
        :class="{ animate__fadeInRight: showAnimate }"
      >
        <li class="flex" v-for="(item, i) in bistList" :key="i">
          <div class="table-index">{{ item.id }}</div>
          <div class="dept-name">{{ item.name }}</div>
          <div class="check-num">{{ item.qc_num }}</div>
          <div class="bad-num">{{ item.bad_num }}</div>
          <div class="flex bad-num-chart">
            <div :id="`mbn-${item.id}`"></div>
            <span :class="item.month_bad_percentage > month_bad ? 'red' : ''">
              {{ item.month_bad_percentage }}%
            </span>
          </div>
          <div class="flex bad-num-chart">
            <div :id="`abn-${item.id}`"></div>
            <span :class="item.year_bad_percentage > year_bad ? 'red' : ''">
              {{ item.year_bad_percentage }}%
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { business_qc_bad } from '@/api/api';

let mychart = null;
let mychart1 = null;
export default {
  name: 'BistTable',
  data() {
    return {
      // 不良率列表
      bistList: [],
      showAnimate: false,
      month_bad: 0, // 月不良率标准
      year_bad: 0, // 年不良率标准
      m_max: 0, // 设置echart最大值   月
      y_max: 0, // 设置echart最大值   年
      options: {
        backgroundColor: '',
        title: {
          show: false,
        },
        tooltip: {
          trigger: 'item',
        },
        grid: [
          {
            borderWidth: 0,
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
          },
        ],
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
          max: 0,
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
                value: 0,
              },
            ],
          },
        ],
        animationEasing: 'cubicOut',
      },
    };
  },
  methods: {
    // 获取相关数据
    getBusinessQcBad(page = 1) {
      this.showAnimate = false;
      const p = {
        page,
        per_page: 7,
      };
      business_qc_bad(p).then(res => {
        if (res.status) {
          const d = res.data;
          this.month_bad = parseFloat(d.month_bad);
          this.year_bad = parseFloat(d.year_bad);
          // 取数据里百分比最大的那个
          const m_max = Math.max(
            ...d.list.map(item => item.month_bad_percentage)
          );
          const y_max = Math.max(
            ...d.list.map(item => item.year_bad_percentage)
          );
          // 比较不良率标准大还是数组里大  取最大值
          this.m_max = m_max >= d.month_bad ? m_max : d.month_bad;
          this.y_max = y_max >= d.year_bad ? y_max : d.year_bad;
          this.bistList = d.list.map((item, index) => {
            const obj = {
              id: index + 1,
              ...item,
            };
            return obj;
          });
          this.$nextTick(() => {
            this.dealWithEchart();
          });
          const totalPage = Math.ceil(res.data.pagenations.total / 6);
          this.showAnimate = true;
          setTimeout(() => {
            if (totalPage <= page) {
              page = 0;
            }
            this.getBusinessQcBad(page + 1);
          }, this.$state.timerTask.qc_bad);
        }
      });
    },
    // 处理图表数据
    dealWithEchart() {
      if (mychart || mychart1) {
        mychart.dispose();
        mychart1.dispose();
      }

      this.bistList.forEach(item => {
        const options = JSON.parse(JSON.stringify(this.options));
        const options1 = JSON.parse(JSON.stringify(this.options));
        // 月不良率
        options.yAxis.data = [item.month_bad_percentage];
        // 保证柱状图长度和dom一致
        options.xAxis.max = this.m_max;
        options.series[0].data[0].value = item.month_bad_percentage;
        options.series[1].data[0].value = this.m_max;
        options.series[0].data[0].name = '10月不良数';
        options.series[0].data[0].color = 'rgba(20, 158, 235, 1)';
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
        mychart = this.$echart.init(document.getElementById(`mbn-${item.id}`));
        mychart.setOption(options);

        // 年不良率
        options1.yAxis.data = [item.year_bad_percentage];
        options1.xAxis.max = this.y_max;
        options1.series[0].data[0].value = item.year_bad_percentage;
        options1.series[1].data[0].value = this.y_max;
        options1.series[0].data[0].name = '年累计不良数';
        options1.series[0].data[0].color = 'rgba(20, 158, 235, 1)';
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
        mychart1 = this.$echart.init(document.getElementById(`abn-${item.id}`));
        mychart1.setOption(options1);
      });
    },
  },
  created() {
    const st = setInterval(() => {
      if (this.$state.timerTask.qc_bad > 0) {
        clearInterval(st);
        this.$nextTick(() => {
          this.getBusinessQcBad();
        });
      }
    });
  },
  beforeDestroy() {
    mychart.dispose();
    mychart1.dispose();
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
    color: #5d6b95;
  }
  .check-num,
  .bad-num {
    text-align: right;
  }
}
.bist-table-list {
  font-size: 14px;
  position: relative;
  .w100 {
    width: 100px;
    position: absolute;
  }
  .assist-line {
    display: flex;
    flex-direction: column;
    color: #ff6c66;
    align-items: center;
    width: 30px;
    float: left;
    margin-left: -15px;
    transition: all 1s;
    .line {
      width: 0.5px;
      height: 255px;
      border-left: 0.5px dashed #ff6c66;
    }
  }
  .left {
    right: 209px;
  }
  .right {
    right: 45px;
  }
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
    margin-bottom: 15px;
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
  width: 80px;
}
.check-num {
  text-align: right;
  width: 60px;
}
.bad-num {
  text-align: right;
  width: 60px;
}
.bad-num-chart {
  width: 145px;
  height: 20px;
  flex-shrink: 0;
  justify-content: space-between;
  div:first-child {
    width: 100px;
    height: 20px;
  }
  span {
    padding-left: 5px;
  }
}
</style>
