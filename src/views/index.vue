<template>
  <div class="index_page">
    <Header></Header>
    <div class="index_content">
      <div class="index-first border_warp">
        <!-- 左侧的顶部 -->
        <div class="index-first__top flex">
          <div class="top-left">
            <span class="title mb25">2020年接单情况</span>
            <div class="title_tip">今年总接单</div>
            <div class="flex order-num">
              <div class="amount">
                {{ 21065 | toThousandFilter }}
                <span class="fs24">万元</span>
              </div>
              <div class="compare flex">
                <div>同比：<span class="red">+0.05%</span></div>
                <div>相比目标：<span class="green">+0.05%</span></div>
              </div>
            </div>
          </div>
          <div class="top-right">
            <line-chart></line-chart>
          </div>
        </div>
        <!-- 2020年完成与目标比 -->
        <div class="meet-target flex">
          <div style="flex-grow: 1;">
            <span class="title_1">2020年完成与目标比</span>
            <div class="target-info flex">
              <div>
                <span>2020目标</span>
                <span class="amount-num">
                  {{ 100000 | toThousandFilter }}
                  <span class="fs14">万元</span>
                </span>
              </div>
              <div>
                <span>2020目标</span>
                <span class="amount-num">
                  {{ -100000 | toThousandFilter }}
                  <span class="fs14">万元</span>
                </span>
              </div>
            </div>
          </div>
          <WaterPolo></WaterPolo>
        </div>
        <QuarterXrd></QuarterXrd>
        <BarChart class="mt55"></BarChart>
      </div>
      <div class="index_sec">
        <div class="flex top">
          <div class="top_left flex border_warp">
            <div class="area-list"></div>
            <Earth></Earth>
          </div>
          <!-- 地图右侧 -->
          <div class="top-right border_warp">
            <!-- 本周接单总金额 -->
            <div class="top-right_top flex">
              <span class="tip">
                {{ 5123.4 | toThousandFilter }}
                <span class="fs14">万元</span>
              </span>
              <span class="tip1">本周接单总金额</span>
              <span class="tip2">环比 - 2.30%</span>
            </div>
            <!-- 本周接单TOP 3 -->
            <div class="top-right_mid">
              <div class="mid-tip fs12">本周接单TOP 3</div>
              <ul class="rank-list mt10">
                <li>
                  <div class="no-one rank fl">是一部</div>
                  <div class="fr">352.10 万元</div>
                </li>
                <li>
                  <div class="no-two rank fl">是一部</div>
                  <div class="fr">352.10 万元</div>
                </li>
                <li>
                  <div class="no-three rank fl">是一部</div>
                  <div class="fr">352.10 万元</div>
                </li>
                <li style="margin-bottom:10px;">
                  <div class="fl all">其余合计</div>
                  <div class="fr">1230.20 万元</div>
                </li>
              </ul>
              <Progress></Progress>
            </div>
            <div class="top-right_bottom"></div>
          </div>
        </div>
      </div>
    </div>
    <ZssFooter :list="options"></ZssFooter>
  </div>
</template>

<script>
import Header from '@/components/Header';
import ZssFooter from '@/components/Tabs';
import WaterPolo from '@/components/WaterPolo';
import Earth from '../components/Earth.vue';
import LineChart from '@/components/LineChart';
import QuarterXrd from '@/components/QuarterXrd';
import BarChart from '@/components/BarChart';
import Progress from '@/components/Progress';

export default {
  name: 'index',
  components: {
    Header,
    ZssFooter,
    WaterPolo,
    Earth,
    LineChart,
    QuarterXrd,
    BarChart,
    Progress,
  },
  data() {
    return {
      options: [
        { id: 1, name: '营业部看板' },
        { id: 2, name: '管理部看板' },
        { id: 3, name: '生产工厂看板' },
        { id: 4, name: '财务部看板' },
        { id: 5, name: '供应链部看板' },
        { id: 6, name: 'IE部看板' },
        { id: 7, name: '染色部看板' },
        { id: 8, name: '制造部看板' },
      ], // 底部选项
    };
  },
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(0)
        .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
  },
};
</script>

<style lang="less">
@import './index.less';
</style>
