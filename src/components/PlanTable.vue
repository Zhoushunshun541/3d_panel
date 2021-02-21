<template>
  <div>
    <div class="plan-table_header flex">
      <div class="table-index"></div>
      <div class="dept-name">工厂名称</div>
      <div class="month-capacity">
        <p>平均每月</p>
        <p>产能(万件)</p>
      </div>
      <div class="last-month">
        <p>上月产出</p>
        <p>(万件)</p>
      </div>
      <div class="month ml15">11月</div>
      <div class="month">12月</div>
      <div class="month">1月</div>
      <div class="month">2月</div>
      <div class="month">3月</div>
      <div class="month">4月</div>
    </div>
    <div class="plan-table-list">
      <VueSeamlessScroll
        :data="planList"
        class="max-height"
        :class-option="classOption"
      >
        <ul>
          <li class="flex" v-for="(item, i) in planList" :key="i">
            <div class="table-index">{{ item.id }}</div>
            <div class="dept-name">{{ item.name }}</div>
            <div class="month-capacity">{{ item.monthCount }}</div>
            <div class="last-month">{{ item.lastMonth }}</div>
            <div class="month ml15">
              <div
                :class="
                  item.month1 >= 1
                    ? 'complete'
                    : item.month1 === 0
                    ? ''
                    : 'unfinished'
                "
                :style="{ width: item.month1 * 100 + '%' }"
              >
                {{ item.month1 }}
              </div>
            </div>
            <div class="month">
              <div
                :class="
                  item.month2 >= 1
                    ? 'complete'
                    : item.month2 === 0
                    ? ''
                    : 'unfinished'
                "
                :style="{ width: item.month2 * 100 + '%' }"
              >
                {{ item.month2 }}
              </div>
            </div>
            <div class="month">
              <div
                :class="
                  item.month3 >= 1
                    ? 'complete'
                    : item.month3 === 0
                    ? ''
                    : 'unfinished'
                "
                :style="{ width: item.month3 * 100 + '%' }"
              >
                {{ item.month3 }}
              </div>
            </div>
            <div class="month">
              <div
                :class="
                  item.month4 >= 1
                    ? 'complete'
                    : item.month4 === 0
                    ? ''
                    : 'unfinished'
                "
                :style="{ width: item.month4 * 100 + '%' }"
              >
                {{ item.month4 }}
              </div>
            </div>
            <div class="month">
              <div
                :class="
                  item.month5 >= 1
                    ? 'complete'
                    : item.month5 === 0
                    ? ''
                    : 'unfinished'
                "
                :style="{ width: item.month5 * 100 + '%' }"
              >
                {{ item.month5 }}
              </div>
            </div>
            <div class="month">
              <div
                :class="
                  item.month6 >= 1
                    ? 'complete'
                    : item.month6 === 0
                    ? ''
                    : 'unfinished'
                "
                :style="{ width: item.month6 * 100 + '%' }"
              >
                {{ item.month6 }}
              </div>
            </div>
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
  name: 'PlanTable',
  components: {
    VueSeamlessScroll,
  },
  mixins: [ScrollList],
  data() {
    return {
      // 排产计划列表
      planList: [
        {
          id: 1,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
          month1: 0.97,
          month2: 1.02,
          month3: 0,
          month4: 0.23,
          month5: 0,
          month6: 0,
        },
        {
          id: 1,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
          month1: 0.97,
          month2: 1.02,
          month3: 0,
          month4: 0.23,
          month5: 0,
          month6: 0,
        },
        {
          id: 1,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
          month1: 0.97,
          month2: 1.02,
          month3: 0,
          month4: 0.23,
          month5: 0,
          month6: 0,
        },
        {
          id: 1,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
          month1: 0.97,
          month2: 1.02,
          month3: 0,
          month4: 0.23,
          month5: 0,
          month6: 0,
        },
        {
          id: 1,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
          month1: 0.97,
          month2: 1.02,
          month3: 0,
          month4: 0.23,
          month5: 0,
          month6: 0,
        },
        {
          id: 1,
          name: '无锡一部',
          monthCount: 10,
          lastMonth: 212,
          month1: 0.97,
          month2: 1.02,
          month3: 0,
          month4: 0.23,
          month5: 0,
          month6: 0,
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.plan-table_header {
  div {
    flex-shrink: 0;
    padding: 0;
    font-size: 14px;
    color: rgba(207, 220, 255, 0.6);
  }
  .month-capacity,
  .last-month {
    text-align: right;
  }
}
.plan-table-list {
  font-size: 14px;
  .max-height {
    height: 285px;
    overflow: scroll;
  }
  .table-index {
    text-align: center;
    font-size: 18px;
    color: #546781;
  }
  div {
    color: #cfdcff;
    flex-shrink: 0;
  }
  .month {
    line-height: 40px;
    height: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 1px dashed rgba(255, 255, 255, 0.1);
    border-right: 1px dashed rgba(255, 255, 255, 0.1);
    & > div {
      padding-left: 5px;
    }
  }
  .unfinished {
    background-color: rgba(20, 158, 235, 0.4);
  }
  .complete {
    background-color: rgba(20, 158, 235, 0.8);
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
.month-capacity {
  text-align: right;
  width: 80px;
}
.last-month {
  text-align: right;
  width: 60px;
}
.month {
  width: 61px;
}
</style>
