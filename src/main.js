import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import echarts from 'echarts';
import 'echarts-gl';
import '../node_modules/echarts/map/js/world.js';
import fullscreen from 'vue-fullscreen';

Vue.use(fullscreen);
Vue.prototype.$echart = echarts;
Vue.config.productionTip = false;
Vue.prototype.$state = store.state;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
