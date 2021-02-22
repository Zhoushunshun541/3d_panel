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
      <VueSeamlessScroll
        :data="bistList"
        class="max-height"
        :class-option="classOption"
      >
        <ul>
          <li class="flex" v-for="(item, i) in bistList" :key="i">
            <div class="table-index">{{ item.id }}</div>
            <div class="dept-name">{{ item.name }}</div>
            <div class="check-num">{{ item.monthCount }}</div>
            <div class="bad-num">{{ item.lastMonth }}</div>
            <div class="month-bad-num" :class="`mbn-${item.id}`"></div>
            <div class="all-bad-num" :class="`abn-${item.id}`"></div>
          </li>
        </ul>
      </VueSeamlessScroll>
    </div>
  </div>
</template>

<script>
import VueSeamlessScroll from 'vue-seamless-scroll';
import { ScrollList } from '@/utils/mixins';

export default {
  name: 'BistTable',
  components: {
    VueSeamlessScroll,
  },
  mixins: [ScrollList],
  data() {
    return {
      // 不良率列表
      bistList: [
        {
          id: 1,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
        },
        {
          id: 2,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
        },
        {
          id: 3,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
        },
        {
          id: 4,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
        },
        {
          id: 5,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
        },
        {
          id: 6,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
        },
      ],
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
          left: '5%',
          right: '15%',
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
            label: {
              normal: {
                show: false,
              },
            },
            animationDuration: 1500,
          },
        ],
        animationEasing: 'cubicOut',
      },
    };
  },
  methods: {
    // 处理图标数据
    dealWithEchart() {
      this.bistList.forEach(item => {
        const options = JSON.parse(JSON.stringify(this.options));
        options.yAxis.data = [item.lastMonth];
        options.series[0].data[0].value = item.lastMonth;
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
        const dom = document.getElementsByClassName(`mbn-${item.id}`);
        dom.forEach(d => {
          const myChart = this.$echart.init(d);
          myChart.setOption(options);
        });

        const options1 = JSON.parse(JSON.stringify(this.options));
        options1.yAxis.data = [item.lastMonth];
        options1.series[0].data[0].value = item.lastMonth;
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
        const dom1 = document.getElementsByClassName(`abn-${item.id}`);
        dom1.forEach(d => {
          const myChart = this.$echart.init(d);
          myChart.setOption(options1);
        });
      });
    },
  },
  mounted() {
    /**
     * 因为使用了滚动的插件  看其源码是将待滚动的ul部分直接复制一份拼接在下方滚动
     * 但是这会导致一个问题  如果用id获取dom  来渲染echart会导致复制的那一份没有生成表格
     * 所以定时查询dom的方式来实现
     *
     * ps   其实也可以自己写dom  设置圆角背景渐变色方式  但是还要考虑动画效果  都是可以实现的方式
     * 等到接口以后实际根据需求来变更
     */
    const setInter = setInterval(() => {
      const dom = document.getElementsByClassName('month-bad-num');
      if (dom.length > 7) {
        this.dealWithEchart();
        clearInterval(setInter);
      }
    }, 300);
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
