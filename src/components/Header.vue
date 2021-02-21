<template>
  <header class="header_component flex">
    <div class="header-logo" @click="setFullScreen">
      <img src="../assets/images/logo.png" width="158" height="58" alt="" />
    </div>
    <div class="header-tip flex">
      <span>营业本部 数据看板</span>
    </div>
    <div class="header-info flex">
      <svg class="icon weather-icon" aria-hidden="true">
        <use xlink:href="#icontianqi-qing"></use>
      </svg>
    </div>
  </header>
</template>

<script>
import { weatherInfo } from '@/api';

export default {
  data() {
    return {
      weatherInfo: {},
      fullscreen: false,
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
      const p = {
        location: '无锡',
        output: 'json',
        ak: 'VKVFOcI2Z7RHXMqdEcx4d9woOtG0zw3o',
      };
      weatherInfo(p).then(res => {
        console.log(res);
      });
    },
  },
  created() {
    // this.getWeatherInfo();
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
    width: 150px;
    height: 60px;
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
    padding-right: 20px;
    justify-content: flex-end;
  }
  .weather-icon {
    width: 55px;
    height: 35px;
  }
}
</style>
