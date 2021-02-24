<template>
  <header class="header_component flex">
    <div class="header-logo flex" @click="setFullScreen">
      <img src="../assets/images/logo.png" width="148" height="54" alt="" />
    </div>
    <div class="header-tip flex">
      <span>营业本部 数据看板</span>
    </div>
    <div class="header-info flex">
      <span class="pr35">
        <p>{{ nowDate.day }}</p>
        <p>{{ nowDate.week + ' ' + nowDate.time }}</p>
      </span>
      <svg class="icon weather-icon" aria-hidden="true">
        <use :xlink:href="`#${iconClass}`"></use>
      </svg>
      <span class="flex pl15" style="align-items:flex-start;">
        <span class="fs30"> {{ weatherInfo.temp }} </span>
        ℃
      </span>
      <span class="pl15 fs14"> {{ weatherInfo.text }}</span>
    </div>
  </header>
</template>

<script>
import { weatherInfo } from '@/api/api';
import { dateFormat } from '../utils/dateFormat';

const WEEK = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];
export default {
  data() {
    return {
      weatherInfo: {},
      fullscreen: false,
      nowDate: {
        day: '',
        week: '',
        time: '',
      },
      iconClass: 'icontianqi-qing',
    };
  },
  methods: {
    // 全屏的函数
    setFullScreen() {
      this.$fullscreen.toggle(document.getElementById('app'), {
        wrap: false,
        callback: this.fullscreenChange,
      });
    },
    // 全屏变化的函数
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    // 获取天气的接口  暂时没找到
    getWeatherInfo() {
      weatherInfo().then(res => {
        if (res.status) {
          this.weatherInfo = res.data;
          this.setWeatherIcon(res.data);
        }
      });
    },
    // 设置天气的图标
    setWeatherIcon(data) {
      switch (data.text) {
        case '晴':
          this.iconClass = 'icontianqi-qing';
          break;
        case '多云':
          this.iconClass = 'icontianqi-duoyun';
          break;
        case '阴':
          this.iconClass = 'icontianqi-yintian';
          break;
        case '阵雨':
          this.iconClass = 'icontianqi-xiaoyu';
          break;
        case '雷阵雨':
          this.iconClass = 'icontianqi-leiyu';
          break;
        case '雷阵雨伴有冰雹':
          this.iconClass = 'icontianqi-bingbao';
          break;
        case '雨夹雪':
          this.iconClass = 'icontianqi-yujiaxue';
          break;
        case '小雨':
          this.iconClass = 'icontianqi-xiaoyu';
          break;
        case '中雨':
          this.iconClass = 'icontianqi-zhongyu';
          break;
        case '大雨':
          this.iconClass = 'icontianqi-dayu';
          break;
        case '暴雨':
          this.iconClass = 'icontianqi-baoyu';
          break;
        case '大暴雨':
          this.iconClass = 'icontianqi-baoyu';
          break;
        case '特大暴雨':
          this.iconClass = 'icontianqi-baoyu';
          break;
        case '阵雪':
          this.iconClass = 'contianqi';
          break;
        case '小雪':
          this.iconClass = 'icontianqi-xiaoxue';
          break;
        case '中雪':
          this.iconClass = 'icontianqi-zhongxue';
          break;
        case '大雪':
          this.iconClass = 'contianqi';
          break;
        case '暴雪':
          this.iconClass = 'contianqi';
          break;
        case '雾':
          this.iconClass = 'icontianqi-wumai';
          break;
        case '冻雨':
          this.iconClass = 'contianqi';
          break;
        case '沙尘暴':
          this.iconClass = 'icontianqi-shachen';
          break;
        case '小到中雨':
          this.iconClass = 'icontianqi-xiaoyu';
          break;
        case '中到大雨':
          this.iconClass = 'icontianqi-zhongyu';
          break;
        case '大到暴雨':
          this.iconClass = 'icontianqi-dayu';
          break;
        case '暴雨到大暴雨':
          this.iconClass = 'icontianqi-baoyu';
          break;
        case '大暴雨到特大暴雨':
          this.iconClass = 'icontianqi-baoyu';
          break;
        case '小到中雪':
          this.iconClass = 'icontianqi-xiaoxue';
          break;
        case '中到大雪':
          this.iconClass = 'icontianqi-zhongxue';
          break;
        case '大到暴雪':
          this.iconClass = 'contianqi';
          break;
        case '浮尘':
          this.iconClass = 'icontianqi-shachen';
          break;
        case '扬沙':
          this.iconClass = 'contianqi';
          break;
        case '强沙尘暴':
          this.iconClass = 'contianqi';
          break;
        case '浓雾':
          this.iconClass = 'icontianqi-wumai';
          break;
        case '龙卷风':
          this.iconClass = 'contianqi';
          break;
        case '弱高吹雪':
          this.iconClass = 'contianqi';
          break;
        case '轻雾':
          this.iconClass = 'contianqi';
          break;
        case '强浓雾':
          this.iconClass = 'contianqi';
          break;
        case '霾':
          this.iconClass = 'contianqi';
          break;
        case '中度霾':
          this.iconClass = 'contianqi';
          break;
        case '重度霾':
          this.iconClass = 'contianqi';
          break;
        case '严重霾':
          this.iconClass = 'contianqi';
          break;
        case '大雾':
          this.iconClass = 'contianqi';
          break;
        case '特强浓雾':
          this.iconClass = 'contianqi';
          break;
        case '雨':
          this.iconClass = 'icontianqi-zhongyu';
          break;
        case '雪':
          this.iconClass = 'icontianqi-zhongxue';
          break;
        default:
          this.iconClass = 'icontianqi-qing';
          break;
      }
    },
    // 获取实时时间
    getNowTime() {
      const nowDate = new Date();
      const timeStamp = nowDate.getTime();
      this.nowDate.week = WEEK[nowDate.getDay()];
      this.nowDate.day = dateFormat(timeStamp, 'yyyy年MM月dd日');
      this.nowDate.time = dateFormat(timeStamp, 'hh:mm:ss');
    },
  },
  created() {
    setInterval(() => {
      this.getNowTime();
    }, 500);
    this.getWeatherInfo();
  },
};
</script>

<style lang="less" scoped>
.header_component {
  padding: 0 60px;
  background: #003569;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  background: url('../assets/images/header_logo.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .header-logo img {
    width: 148px;
    height: 54px;
    margin-top: -10px;
  }
  .header-tip {
    height: 100%;
    justify-content: center;
    span {
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-image: linear-gradient(#fff, #149eeb);
      font-size: 36px;
    }
  }
  & > div {
    width: 33.33%;
    height: 100%;
  }
  .header-info {
    font-size: 16px;
    padding-right: 20px;
    justify-content: flex-end;
  }
  .weather-icon {
    width: 55px;
    height: 35px;
  }
}
</style>
