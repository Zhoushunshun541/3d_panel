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
      <ul>
        <li class="flex" v-for="(item, i) in planList" :key="i">
          <!-- <div class="table-index">{{ item.id }}</div> -->
          <div class="table-index">{{ i + 1 }}</div>
          <div class="dept-name">{{ item.name }}</div>
          <div class="month-capacity">{{ item.avg_month }}</div>
          <div class="last-month">{{ item.up_month }}</div>
          <div
            class="month"
            v-for="(month, index) in item.month_list"
            :class="{ ml15: index === 0 }"
            :key="index"
          >
            <div
              :class="
                month.month_percentage >= 100
                  ? 'complete'
                  : month.month_percentage === 0
                  ? ''
                  : 'unfinished'
              "
              :style="{
                width:
                  month.month_percentage > 100
                    ? '100%'
                    : month.month_percentage + '%',
              }"
            >
              {{ month.month_percentage + '%' }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { business_plan } from '@/api/api';

export default {
  name: 'PlanTable',
  data() {
    return {
      // 排产计划列表
      planList: [],
    };
  },
  methods: {
    // 获取排产计划的信息
    getBusinessPlan() {
      business_plan().then(res => {
        if (res.status) {
          this.planList = res.data.factory_list;
          this.$store.dispatch('setState', {
            key: 'planInfo',
            value: {
              factory_num: res.data.factory_num,
              avg_month_num: res.data.avg_month_num,
              up_month_num: res.data.up_month_num,
              plan_num: res.data.plan_num,
            },
          });
        }
      });
    },
  },
  created() {
    this.getBusinessPlan();
  },
};
</script>

<style lang="less" scoped>
.plan-table_header {
  div {
    flex-shrink: 0;
    padding: 0;
    font-size: 14px;
    color: #5d6b95;
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
