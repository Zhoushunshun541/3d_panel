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
    <ul
      class="animate__animated mt5"
      :class="{ animate__fadeInRight: showAnimate }"
    >
      <li v-for="(item, i) in list" :key="i" class="progress">
        <div class="dept-name">{{ item.name }}</div>
        <div class="flex quarter-progress">
          <div class="quarter" v-for="(r, index) in item.season" :key="index">
            <div
              class="anima w0"
              :style="{
                background: r.percentage > 100 ? '#07C297' : '#1999D6',
                color: r.percentage > 100 ? '#01144E' : '#fff',
                width: r.percentage <= 100 ? r.percentage + '%' : '100%',
              }"
            >
              {{ r.percentage }}%
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
  </div>
</template>

<script>
// 季度分析的组件
export default {
  name: 'QuarterXrd',
  data() {
    return {
      showAnimate: false,
    };
  },
  computed: {
    list() {
      return this.$state.quarterData;
    },
  },
  watch: {
    list() {
      this.showAnimate = false;
      this.$nextTick(() => {
        this.showAnimate = true;
      });
    },
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
    width: 102px;
  }
  .dept-name {
    width: 50px;
    flex-shrink: 0;
    color: #5d6b95;
  }
  .all-year {
    width: 90px;
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
      width: 408px;
      height: 5px;
      border: 1px dashed rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
