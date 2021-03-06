import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import echarts from 'echarts';
import 'echarts-gl';
import '../node_modules/echarts/map/js/world.js';
import fullscreen from 'vue-fullscreen';
import animated from 'animate.css';

Vue.use(animated);
Vue.use(fullscreen);
Vue.prototype.$echart = echarts;
Vue.config.productionTip = false;
Vue.config.errorHandler = (err, vm, info) => {
  // 处理错误
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  console.log(err, vm, info);
};

Vue.prototype.$state = store.state;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
