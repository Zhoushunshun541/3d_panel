/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 季度
const QUARTER = ['四季度', '一季度', '二季度', '三季度'];
// 月份
const MONTH = [
  '12月',
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
];
const nowDate = new Date();
export default new Vuex.Store({
  state: {
    // 登录相关信息  start
    token: localStorage.getItem('token') || '',
    now_year: nowDate.getFullYear(),
    month: MONTH[nowDate.getMonth()],
    quarter: QUARTER[Math.floor(nowDate.getMonth() / 3)],
    waterData: +sessionStorage.getItem('waterData') || 0,
    orderInfo: JSON.parse(sessionStorage.getItem('orderInfo')) || {
      complete_num: 0,
      from_complete: 0,
    },
    // 各个模块的切换定时
    timerTask: JSON.parse(sessionStorage.getItem('timerTask')) || {
      dynamic: 0,
      plan: 0,
      qc_bad: 0,
      cost: 0,
      gdp: 0,
      sales: 0,
      prosperity: 0,
      order: 0,
    },
    backList: JSON.parse(sessionStorage.getItem('backList')) || [],
    GDP: JSON.parse(sessionStorage.getItem('GDP')) || {
      target_percentage: 0,
      gdp_percentage: 0,
      all_gdp: 0,
    },
    planInfo: JSON.parse(sessionStorage.getItem('planInfo')) || {
      factory_num: 0,
      avg_month_num: 0,
      up_month_num: 0,
      plan_num: 0,
    },
    // 今年接单的数据
    thisYear: JSON.parse(sessionStorage.getItem('this_year')) || {
      num: 0,
      percentage: 0,
      target_percentage: 0,
      this: [],
      up: [],
    },
  },
  mutations: {
    userLogin(state, params) {
      state.token = params.token;
      localStorage.setItem('token', params.token);
    },
    userLogout(state) {
      state.token = '';
      localStorage.clear();
      sessionStorage.clear();
    },
    setState(state, params) {
      if (Array.isArray(params)) {
        params.forEach(obj => {
          sessionStorage.setItem(obj.key, JSON.stringify(obj.value));
          state[obj.key] = obj.value;
        });
      } else {
        sessionStorage.setItem(params.key, JSON.stringify(params.value));
        state[params.key] = params.value;
      }
    },
  },
  actions: {
    userLogout({ commit }) {
      commit('userLogout');
    },
    userLogin({ commit }, params) {
      commit('userLogin', params);
    },
    setState({ commit }, params) {
      commit('setState', params);
    },
  },
});
