import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import echarts from 'echarts';
import 'echarts-gl';
import '../node_modules/echarts/map/js/world.js';

Vue.prototype.$echart = echarts;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
