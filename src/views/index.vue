<template>
  <div class="index_page">
    <Header></Header>
    <div class="index_content">
      <div class="index-first border_warp">
        <!-- 左侧的顶部 -->
        <div class="index-first__top flex">
          <div class="top-left">
            <span class="title">
              <svg class="icon icon-title" aria-hidden="true">
                <use xlink:href="#iconai-module"></use>
              </svg>
              {{ $state.now_year }}年接单情况
            </span>
            <div class="title_tip mt25">今年总接单</div>
            <div class="flex order-num">
              <div class="amount">
                <CountTo
                  separator=","
                  :endVal="+$state.thisYear.num"
                  :duration="1500"
                ></CountTo>
                <span class="fs24">万元</span>
              </div>
            </div>
          </div>
          <div class="top-right">
            <LineChart></LineChart>
          </div>
        </div>
        <!-- 2020年完成与目标比 -->
        <div class="meet-target flex">
          <div style="flex-grow: 1;">
            <span class="title_1">{{ $state.now_year }}年完成与目标比</span>
            <TitleTip type="1"></TitleTip>
          </div>
          <WaterPolo></WaterPolo>
        </div>
        <QuarterXrd></QuarterXrd>
        <BarChart class="mt20" :active="active"></BarChart>
      </div>
      <div class="index_sec">
        <div class="flex top">
          <div class="top_left flex border_warp">
            <!-- <div class="area-list">
              <div
                @click="area_id = area.id"
                v-for="(area, i) in areaList"
                :key="i"
                :class="{ active: area.id === area_id }"
              >
                {{ area.name }}
              </div>
            </div> -->
            <!-- <Earth></Earth> -->
            <!-- <video
              id="my-video"
              class="video-js factory-live vjs-default-skin"
              preload="auto"
              controls
              muted
            >
              <source
                src="https://nclive.grtn.cn/typd/sd/live.m3u8?_upt=07d322ea1595884800"
                type="application/x-mpegURL"
              />
            </video> -->
            <video
              class="factory-live all-h-w"
              autoplay
              controls
              loop
              muted
              src="https://www.handa.com.cn/cn/EnterprisePublicity.mp4"
            >
              your browser does not support the video tag
            </video>
            <!-- src="https://file.idiot-zs.top/%E6%81%92%E7%94%B0%E4%BC%81%E4%B8%9A%E5%AE%A3%E4%BC%A0%E7%89%87%E6%97%A0%E9%85%8D%E9%9F%B3%E7%89%882017%E6%9C%80%E6%96%B0%E7%89%88.mp4" -->
          </div>
          <!-- 地图右侧 -->
          <div class="top-right border_warp">
            <!-- 本周接单总金额 -->
            <div class="top-right_top flex">
              <span class="tip">
                <CountTo
                  separator=","
                  :endVal="+weekOrderInfo.all_num"
                  :duration="1500"
                ></CountTo>
                <span class="fs14nc">万元</span>
              </span>
              <span class="tip1">本周接单总金额</span>
              <span :class="weekOrderInfo.all_percentage < 0 ? 'green' : 'red'">
                环比
                <CountTo
                  separator=","
                  :endVal="+weekOrderInfo.all_percentage"
                  :duration="1500"
                ></CountTo>
                %
              </span>
            </div>
            <!-- 本周接单TOP 3 -->
            <div class="top-right_mid">
              <div class="mid-tip">本周接单TOP 3</div>
              <ul class="rank-list mt10" v-if="topList.length > 0">
                <li>
                  <div class="no-one rank fl">{{ topList[0].name }}</div>
                  <div class="fr">{{ topList[0].num }} 万元</div>
                </li>
                <li>
                  <div class="no-two rank fl">{{ topList[1].name }}</div>
                  <div class="fr">{{ topList[1].num }} 万元</div>
                </li>
                <li>
                  <div class="no-three rank fl">{{ topList[2].name }}</div>
                  <div class="fr">{{ topList[2].num }} 万元</div>
                </li>
                <li style="margin-bottom:10px;">
                  <div class="fl all">其余合计</div>
                  <div class="fr">{{ topList[3].num }} 万元</div>
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
                <ul class="news_warp">
                  <li class="mb10" v-for="(item, i) in orderList" :key="i">
                    <div class="news-date">{{ item.date }}</div>
                    <div style="color:rgba(207, 220, 255, 0.75);">
                      {{ item.name }} 接单 {{ item.num }}元
                    </div>
                  </li>
                </ul>
              </VueSeamlessScroll>
            </div>
          </div>
        </div>
        <div class="flex bottom mt15">
          <div class="bottom-left border_warp mr10">
            <div class="header flex">
              <span class="title">
                <svg class="icon icon-title" aria-hidden="true">
                  <use xlink:href="#iconai-module"></use>
                </svg>
                {{
                  gdp.year + $state[active_gdp === 0 ? 'month' : 'quarter']
                }}人均产值
              </span>
              <div class="custom-radio">
                <div :class="{ active: active_gdp === 0 }">
                  上个月
                </div>
                <div :class="{ active: active_gdp === 1 }">
                  上季度
                </div>
              </div>
            </div>
            <div class="content">
              <TitleTip :active="active_gdp" type="2"></TitleTip>
              <BarChart2d :type="active_gdp"></BarChart2d>
            </div>
          </div>
          <div class="bottom-right border_warp">
            <span class="title">
              <svg class="icon icon-title" aria-hidden="true">
                <use xlink:href="#iconai-module"></use>
              </svg>
              {{ $state.now_year }}年{{ $state.month }}费用公示
            </span>
            <ScrollTable></ScrollTable>
          </div>
        </div>
      </div>
      <!-- 第三模块 -->
      <div class="index_third">
        <div class="index_third-top border_warp">
          <span class="title">
            <svg class="icon icon-title" aria-hidden="true">
              <use xlink:href="#iconai-module"></use>
            </svg>
            {{ $state.now_year }}年{{ now_m + 1 }}月～{{
              now_m > 7 ? now_m - 7 : now_m + 6
            }}月工厂排产计划
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
          <p class="title">
            <svg class="icon icon-title" aria-hidden="true">
              <use xlink:href="#iconai-module"></use>
            </svg>
            {{ $state.now_year + '年' + $state.month }}自检不良率
          </p>
          <p class="fs14">单位:万件</p>
          <BistTable></BistTable>
        </div>
      </div>
      <!-- 第四模块 -->
      <div class="index_four">
        <div class="index_four-top border_warp">
          <div class="header mb15 flex">
            <span class="title">
              <svg class="icon icon-title" aria-hidden="true">
                <use xlink:href="#iconai-module"></use>
              </svg>
              最新动态
            </span>
            <div class="custom-radio">
              <div :class="{ active: active_new === 0 }">
                公司
              </div>
              <div :class="{ active: active_new === 1 }">
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
                <div class="news-date" :class="{ 'news-top': i === 0 }">
                  {{ item.date }}
                </div>
                <div>{{ item.title }}</div>
              </li>
            </ul>
          </VueSeamlessScroll>
        </div>
        <div class="index_four-mid border_warp mt10">
          <span class="title">
            <svg class="icon icon-title" aria-hidden="true">
              <use xlink:href="#iconai-module"></use>
            </svg>
            近半年美元兑人民币汇率走势
          </span>
          <ExchangeRate class="mt15"></ExchangeRate>
        </div>
        <div class="index_four-bottom border_warp flex mt10">
          <div>
            <span class="title">
              <svg class="icon icon-title" aria-hidden="true">
                <use xlink:href="#iconai-module"></use>
              </svg>
              {{ $state.now_year }}年回款超期情况
            </span>
            <PieEchart
              @getActive="
                data => {
                  backAct = data;
                }
              "
            ></PieEchart>
          </div>
          <div>
            <ul class="flex back-status">
              <li
                v-for="(item, i) in backList"
                class="flex"
                :class="{ active: i === backAct }"
                :key="i"
              >
                <template v-if="item.num > 0">
                  <span class="type_index">{{ i + 1 }}</span>
                  <div class="flex content ml15">
                    <span class="w55">{{ item.name }}</span>
                    <span class="ml5 w90 ta-r">
                      {{ item.num | toThousandFilter }}万元
                    </span>
                    <span class="ml10 w30 ta-r as-r"
                      >{{ item.percentage }}%</span
                    >
                  </div>
                </template>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ZssFooter></ZssFooter>
    <Dialog :order-info="orderInfo"></Dialog>
  </div>
</template>

<script>
import Header from '@/components/Header';
import ZssFooter from '@/components/Tabs';
import WaterPolo from '@/components/WaterPolo';
// import Earth from '../components/Earth.vue';
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
import ExchangeRate from '@/components/ExchangeRate';
import { ScrollList, DealPercent } from '@/utils/mixins';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import 'videojs-contrib-hls';
import {
  business_week_order,
  business_dynamic,
  business_timer_task,
  business_prosperity,
} from '@/api/api';
import CountTo from 'vue-count-to';

export default {
  name: 'index',
  mixins: [ScrollList, DealPercent],
  components: {
    Header,
    ZssFooter,
    WaterPolo,
    // Earth,
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
    ExchangeRate,
    Dialog,
    CountTo,
  },
  data() {
    return {
      backAct: 0, // 回款超期饼图的当前选中的下标
      orderInfo: [], // 订单喜报的数据
      now_m: new Date().getMonth(),
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
      gdp: {
        year: '',
        month: '',
      },
      // 周接单详情
      weekOrderInfo: {
        all_num: 0,
        all_percentage: 0,
      }, // 接单详情数据
      // 新闻列表
      orderList: [],
      topList: [], // 接单top3
      // 最新动态的列表
      dynamic: [],
      area_id: 1,
      active: 0, // 0 上个月   1  上季度
      active_gdp: 0, // 人均产值 0 上个月   1  上季度
      active_new: 0, // 最新动态 0 公司   1  行业
      myPlayer: null,
    };
  },
  methods: {
    // 初始化播放器
    getVideo() {
      this.myPlayer = videojs(
        'my-video',
        {
          bigPlayButton: false,
          textTrackDisplay: false,
          posterImage: true,
          errorDisplay: false,
          controlBar: true,
        },
        function() {
          this.play();
        }
      );
      setTimeout(() => {
        this.myPlayer.volume(0.8);
      }, 500);
    },
    // 获取接单情况
    getWeekOrder() {
      this.orderList = [];
      business_week_order().then(res => {
        if (res.status) {
          this.orderList = res.data.list ? res.data.list : [];
          this.topList = res.data.week_list ? res.data.week_list : [];
          this.weekOrderInfo = {
            all_num: res.data.all_num,
            all_percentage: this.DealPercent(res.data.all_percentage),
          };
        }
      });
    },
    // 定时切换上个月上季度的数据
    autoWebPageRefresh(active, delay = 10000, obj = '') {
      if (obj !== '') {
        const nowDate = new Date();
        const year = nowDate.getFullYear();
        if (
          (this[active] === 1 && Math.floor(nowDate.getMonth() / 3) === 0) ||
          (this[active] === 0 && nowDate.getMonth() === 0)
        ) {
          this[obj].year = `${year - 1}年`;
        } else {
          this[obj].year = `${year}年`;
        }
      }
      setTimeout(() => {
        if (this[active]) {
          this[active] = 0;
        } else {
          this[active] = 1;
        }
        this.autoWebPageRefresh(active, delay, obj);
      }, delay);
    },
    // 获取最新动态
    getBusinessDynamic() {
      this.dynamic = [];
      business_dynamic({ type: this.active_new }).then(res => {
        if (res.status) {
          this.dynamic = res.data.list;
        } else {
          this.dynamic = [];
        }
      });
    },
    // 获取各个任务的轮询切换的时间
    getBusinessTimerTask() {
      return new Promise(resolve => {
        business_timer_task().then(res => {
          if (res.status) {
            this.$store.dispatch('setState', {
              key: 'timerTask',
              value: res.data,
            });
            this.autoWebPageRefresh('active_gdp', res.data.gdp, 'gdp');
            this.autoWebPageRefresh('active', res.data.sales);
            this.autoWebPageRefresh('active_new', res.data.news);
            resolve();
          }
        });
      });
    },
    // 获取接单喜报的接口
    getBusinessProsperity() {
      this.orderInfo = [];
      business_prosperity().then(res => {
        if (res.status) {
          this.orderInfo = res.data.list;
        } else {
          this.orderInfo = [];
        }
        setTimeout(() => {
          this.getBusinessProsperity();
        }, this.$state.timerTask.prosperity);
      });
    },
  },
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(2)
        .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
  },
  async created() {
    await this.getBusinessTimerTask();
    this.getWeekOrder();
    this.getBusinessDynamic();
    this.getBusinessProsperity();
  },
  // mounted() {
  //   this.getVideo();
  // },
  computed: {
    // 超期回款列表
    backList() {
      return this.$state.backList;
    },
  },
  watch: {
    active_new() {
      this.getBusinessDynamic();
    },
  },
};
</script>

<style lang="less">
@import './index.less';
</style>
