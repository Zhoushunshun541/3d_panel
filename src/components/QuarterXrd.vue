<template>
  <div class="quarter-xrd" id="QuarterXrd">
    <div class="fix-title">
      <div class="dept-name"></div>
      <div class="quarter">一季度</div>
      <div class="quarter">二季度</div>
      <div class="quarter">三季度</div>
      <div class="quarter">四季度</div>
      <div class="all-year">完成全年目标</div>
    </div>
    <template v-if="showList.length > 0">
      <ul class="animate__animated animate__fadeInRight mt5">
        <!-- :class="{ animate__fadeInRight: showAnimate }" -->

        <li v-for="(item, i) in showList" :key="i" class="progress">
          <div class="dept-name">{{ item.name }}</div>
          <div class="flex quarter-progress">
            <div class="quarter" v-for="(r, index) in item.season" :key="index">
              <div
                class="anima w0"
                :style="{
                  background: r.percentage > 100 ? '#07C297' : '#1999D6',
                  color: r.percentage > 100 ? '#01144E' : 'rgb(207, 220, 255)',
                  width: r.percentage <= 100 ? r.percentage + '%' : '100%',
                }"
              >
                <span style="padding-left:5px">{{ r.percentage }}%</span>
              </div>
            </div>
            <div class="all-year-progress">
              <div
                class="anima w0"
                :style="{
                  height: '100%',
                  background: item.all_percentage > 100 ? '#07C297' : '#1999D6',
                  color: item.all_percentage > 100 ? '#01144E' : '#fff',
                  width:
                    item.all_percentage <= 100
                      ? item.all_percentage + '%'
                      : '100%',
                }"
              ></div>
            </div>
          </div>
          <div class="all-year" style="color:#CFDCFF;">
            <span class="pr5" style="color: #5D6B95;">
              全年
            </span>
            {{ item.all_percentage }}%
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { business_order } from '@/api/api';
import { DealPercent } from '@/utils/mixins';
// 季度分析的组件
export default {
  name: 'QuarterXrd',
  mixins: [DealPercent],
  data() {
    return {
      showAnimate: false,
      list: [],
      showList: [], // 分页数据
    };
  },
  methods: {
    // 获取接单详情 水球图那里
    getAllYearOrder() {
      business_order().then(res => {
        if (res.status) {
          // 将百分比转number
          const temp = JSON.parse(JSON.stringify(res.data.this_year));
          temp.percentage = this.DealPercent(res.data.this_year.percentage);
          temp.target_percentage = this.DealPercent(
            res.data.this_year.target_percentage
          );
          this.list = res.data.list;
          this.getPageList();
          this.$store.dispatch('setState', [
            {
              key: 'waterData',
              value: +res.data.percentage,
            },
            {
              key: 'thisYear',
              value: temp,
            },
            {
              key: 'orderInfo',
              value: {
                complete_num: parseFloat(res.data.complete_num),
                from_complete: parseFloat(res.data.from_complete),
              },
            },
          ]);
        }
      });
    },
    // 获取分页数据
    getPageList(page = 0) {
      // 获取全部数据
      const list = JSON.parse(JSON.stringify(this.list));
      // 获取总页数
      const total = Math.ceil(this.list.length / 7);
      // 获取相应页的数据  如果是不足一页 取值要注意
      if (page * 7 < this.list.length) {
        this.showList = list.splice(page * 7, 7);
      } else {
        this.showList = list.splice(page * 7, this.list.length);
      }
      if (page >= total - 1) {
        page = -1;
      }
      this.$nextTick(() => {
        this.showAnimate = true;
      });
      setTimeout(() => {
        this.showAnimate = false;
        this.getPageList(page + 1);
      }, this.$state.timerTask.order);
    },
  },
  created() {
    const st = setInterval(() => {
      if (this.$state.timerTask.order > 0) {
        clearInterval(st);
        this.getAllYearOrder();
      }
    });
  },
};
</script>

<style lang="less" scoped>
#QuarterXrd {
  width: 100%;
  height: 325px;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  li {
    display: flex;
    align-items: center;
    height: 20px;
    margin-bottom: 15px;
  }
  .max-height {
    margin-top: 10px;
    height: 290px;
    overflow: scroll;
  }
  .fix-title {
    display: flex;
    align-items: center;
    color: #5d6b95;
  }
  .quarter {
    width: 92px;
  }
  .dept-name {
    text-align: left;
    width: 90px;
    flex-shrink: 0;
    color: #5d6b95;
  }
  .all-year {
    width: 90px;
    text-align: right;
    flex-shrink: 0;
  }
  .progress {
    height: 28px;
    .quarter {
      border: 1px dashed rgba(255, 255, 255, 0.1);
    }
    .quarter-progress {
      flex-wrap: wrap;
    }
    .anima {
      transition: all 0.5s;
    }
    .all-year-progress {
      transition: all 0.5s;
      margin-top: 2px;
      width: 368px;
      height: 5px;
      border: 1px dashed rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
