<template>
  <div class="index_page">
    <Header></Header>
    <div class="index_content">
      <div class="index-first border_warp">
        <!-- 左侧的顶部 -->
        <div class="index-first__top flex">
          <div class="top-left">
            <span class="title">2020年接单情况</span>
            <div class="title_tip mt25">今年总接单</div>
            <div class="flex order-num">
              <div class="amount">
                {{ $state.thisYear.num | toThousandFilter }}
                <span class="fs24">万元</span>
              </div>
              <div class="compare flex">
                <div>
                  同比：<span
                    class="w50"
                    :class="
                      this.$state.thisYear.percentage.indexOf('-') >= 0
                        ? 'green'
                        : 'red'
                    "
                    >{{ $state.thisYear.percentage }}</span
                  >
                </div>
                <div>
                  相比目标：<span
                    class="w50"
                    :class="
                      this.$state.thisYear.target_percentage.indexOf('-') >= 0
                        ? 'green'
                        : 'red'
                    "
                  >
                    {{ $state.thisYear.target_percentage }}
                  </span>
                </div>
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
            <TitleTip type="1"></TitleTip>
          </div>
          <WaterPolo></WaterPolo>
        </div>
        <QuarterXrd></QuarterXrd>
        <BarChart class="mt55" :active="active"></BarChart>
      </div>
      <div class="index_sec">
        <div class="flex top">
          <div class="top_left flex border_warp">
            <div class="area-list">
              <div
                @click="area_id = area.id"
                v-for="(area, i) in areaList"
                :key="i"
                :class="{ active: area.id === area_id }"
              >
                {{ area.name }}
              </div>
            </div>
            <Earth></Earth>
          </div>
          <!-- 地图右侧 -->
          <div class="top-right border_warp">
            <!-- 本周接单总金额 -->
            <div class="top-right_top flex">
              <span class="tip">
                {{ weekOrderInfo.all_num | toThousandFilter }}
                <span class="fs14">万元</span>
              </span>
              <span class="tip1">本周接单总金额</span>
              <span
                :class="
                  weekOrderInfo.all_percentage.indexOf('-') > -1
                    ? 'green'
                    : 'red'
                "
              >
                环比{{ weekOrderInfo.all_percentage }}
              </span>
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
            <div class="top-right_bottom">
              <VueSeamlessScroll
                :data="orderList"
                class="max-height"
                :class-option="classOption"
              >
                <ul class="news_warp" style="height: 180px;">
                  <li class="mb10" v-for="(item, i) in orderList" :key="i">
                    <div class="news-date">{{ item.date }}</div>
                    <div>{{ item.name }} 接单 {{ item.num }}万元</div>
                  </li>
                </ul>
              </VueSeamlessScroll>
            </div>
          </div>
        </div>
        <div class="flex bottom mt15">
          <div class="bottom-left border_warp mr10">
            <div class="header flex">
              <span class="title">2020年三季度人均产值</span>
              <div class="custom-radio">
                <div :class="{ active: active === 0 }" @click="active = 0">
                  上个月
                </div>
                <div :class="{ active: active === 1 }" @click="active = 1">
                  上季度
                </div>
              </div>
            </div>
            <div class="content">
              <TitleTip type="2"></TitleTip>
              <BarChart2d :type="active"></BarChart2d>
            </div>
          </div>
          <div class="bottom-right border_warp">
            <span class="title" style="line-height:40px;">
              2020年10月费用公示
            </span>
            <ScrollTable></ScrollTable>
          </div>
        </div>
      </div>
      <div class="index_third">
        <div class="index_third-top border_warp">
          <span class="title" style="line-height:40px;">
            2020年11月～4月工厂排产计划
          </span>
          <TitleTip :type="3"></TitleTip>
          <div class="plan-content mt25">
            <div class="plan-title flex">
              <p>各工厂每月平均产能</p>
              <p>计划排产</p>
            </div>
          </div>
          <PlanTable></PlanTable>
        </div>
        <div class="index_third-bottom border_warp mt15">
          <span class="title" style="line-height:40px;">
            2020年10月自检不良率
          </span>
          <span>单位:万件</span>
          <BistTable></BistTable>
        </div>
      </div>
      <div class="index_four">
        <div class="index_four-top border_warp">
          <div class="header mb15 flex" style="margin-top:-10px">
            <span class="title">最新动态</span>
            <div class="custom-radio">
              <div :class="{ active: active === 0 }" @click="active = 0">
                公司
              </div>
              <div :class="{ active: active === 1 }" @click="active = 1">
                行业
              </div>
            </div>
          </div>
          <VueSeamlessScroll
            :data="dynamic"
            class="max-height"
            :class-option="classOption"
          >
            <ul class="news_warp">
              <li class="mb10" v-for="(item, i) in dynamic" :key="i">
                <div class="news-date">{{ item.date }}</div>
                <div>{{ item.title }}</div>
              </li>
            </ul>
          </VueSeamlessScroll>
        </div>
        <div class="index_four-mid border_warp mt10"></div>
        <div class="index_four-bottom border_warp flex mt10">
          <div>
            <span class="title">2020年回款超期情况</span>
            <PieEchart></PieEchart>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <ZssFooter></ZssFooter>
    <Dialog
      :show.sync="showDialog"
      :order-info="{ name: '无锡异步', num: 123123 }"
    ></Dialog>
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
import VueSeamlessScroll from 'vue-seamless-scroll';
import TitleTip from '@/components/TitleTip';
import BarChart2d from '@/components/BarChart2d';
import ScrollTable from '@/components/ScrollTable';
import PlanTable from '@/components/PlanTable';
import BistTable from '@/components/BistTable';
import Dialog from '@/components/Dialog';
import PieEchart from '@/components/PieEchart';
import { ScrollList } from '@/utils/mixins';
import { business_week_order, business_dynamic } from '@/api/api';

export default {
  name: 'index',
  mixins: [ScrollList],
  components: {
    Header,
    ZssFooter,
    WaterPolo,
    Earth,
    LineChart,
    QuarterXrd,
    BarChart,
    Progress,
    VueSeamlessScroll,
    TitleTip,
    BarChart2d,
    ScrollTable,
    PlanTable,
    BistTable,
    PieEchart,
    Dialog,
  },
  data() {
    return {
      showDialog: false,
      // 地区列表
      areaList: [
        {
          id: 1,
          name: '无锡总部',
        },
        {
          id: 2,
          name: '上海办事处',
        },
        {
          id: 3,
          name: '日本办事处',
        },
        {
          id: 4,
          name: '盐城恒康工厂',
        },
        {
          id: 5,
          name: '缅甸办事处1',
        },
        {
          id: 6,
          name: '缅甸办事处2',
        },
        {
          id: 7,
          name: '缅甸办事处3',
        },
        {
          id: 8,
          name: '埃及工厂',
        },
      ],
      // 周接单详情
      weekOrderInfo: {
        all_num: '',
        all_percentage: '',
      }, // 接单详情数据
      // 新闻列表
      orderList: [],
      // 最新动态的列表
      dynamic: [],
      area_id: 1,
      active: 0,
    };
  },
  methods: {
    // 获取接单情况
    getWeekOrder() {
      business_week_order().then(res => {
        if (res.status) {
          this.orderList = res.data.list;
          this.weekOrderInfo = {
            all_num: res.data.all_num,
            all_percentage: res.data.all_percentage,
          };
        }
        // setTimeout(() => {
        //   this.getWeekOrder();
        // }, 1000);
      });
    },
    // 定时切换上个月上季度的数据
    autoWebPageRefresh() {
      setTimeout(() => {
        if (this.active) {
          this.active -= 1;
        } else {
          this.active += 1;
        }

        this.autoWebPageRefresh();
      }, 60 * 1000);
    },
    // 获取最新动态
    getBusinessDynamic() {
      business_dynamic({ type: this.active }).then(res => {
        if (res.status) {
          this.dynamic = res.data.list;
        }
      });
    },
  },
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(1)
        .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
  },
  created() {
    // setTimeout(() => {
    //   this.showDialog = true;
    // }, 3000);
    this.getWeekOrder();
    this.autoWebPageRefresh();
    this.getBusinessDynamic();
  },
  mounted() {},
};
</script>

<style lang="less">
@import './index.less';
</style>
