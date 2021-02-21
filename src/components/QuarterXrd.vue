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
    <VueSeamlessScroll
      :data="list"
      class="max-height"
      :class-option="classOption"
    >
      <ul>
        <li v-for="(item, i) in list" :key="i" class="progress">
          <div class="dept-name">{{ item.name }}</div>
          <div class="flex quarter-progress">
            <div class="quarter">
              <div
                :style="{
                  background: item.one > 1 ? '#07C297' : '#1999D6',
                  color: item.one > 1 ? '#01144E' : '#fff',
                  width: item.one <= 1 ? item.one * 100 + '%' : '100%',
                }"
              >
                {{ item.one * 100 }}%
              </div>
            </div>
            <div class="quarter">
              <div
                :style="{
                  background: item.one > 1 ? '#07C297' : '#1999D6',
                  color: item.one > 1 ? '#01144E' : '#fff',
                  width: item.one <= 1 ? item.one * 100 + '%' : '100%',
                }"
              >
                {{ item.one * 100 }}%
              </div>
            </div>
            <div class="quarter">
              <div
                :style="{
                  background: item.one > 1 ? '#07C297' : '#1999D6',
                  color: item.one > 1 ? '#01144E' : '#fff',
                  width: item.one <= 1 ? item.one * 100 + '%' : '100%',
                }"
              >
                {{ item.one * 100 }}%
              </div>
            </div>
            <div class="quarter">
              <div
                :style="{
                  background: item.one > 1 ? '#07C297' : '#1999D6',
                  color: item.one > 1 ? '#01144E' : '#fff',
                  width: item.one <= 1 ? item.one * 100 + '%' : '100%',
                }"
              >
                {{ item.one * 100 }}%
              </div>
            </div>
            <div class="all-year-progress">
              <div
                :style="{
                  height: '100%',
                  background: item.one > 1 ? '#07C297' : '#1999D6',
                  color: item.one > 1 ? '#01144E' : '#fff',
                  width: item.one <= 1 ? item.one * 100 + '%' : '100%',
                }"
              ></div>
            </div>
          </div>
          <div class="all-year">
            <span class="pr5">全年</span>
            {{ item.one }}
          </div>
        </li>
      </ul>
    </VueSeamlessScroll>
  </div>
</template>

<script>
import VueSeamlessScroll from 'vue-seamless-scroll';
import { ScrollList } from '@/utils/mixins';

// 季度分析的组件
export default {
  name: 'QuarterXrd',
  mixins: [ScrollList],
  components: {
    VueSeamlessScroll,
  },
  data() {
    return {
      list: [
        {
          name: '无锡总部111',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
        {
          name: '无锡总部',
          one: 1.7,
          two: 0,
          three: 0,
          fource: 0,
          p: 0,
        },
      ],
    };
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
  color: #cfdcff;
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
  }
  .quarter {
    width: 102px;
  }
  .dept-name {
    width: 50px;
    flex-shrink: 0;
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
    .all-year-progress {
      margin-top: 2px;
      width: 408px;
      height: 5px;
      border: 1px dashed rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
