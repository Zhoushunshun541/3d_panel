/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 登录相关信息  start
    token: localStorage.getItem('token') || '',
    waterData: +sessionStorage.getItem('waterData') || 0,
    quarterData: +sessionStorage.getItem('quarterData') || [],
    // 今年接单的数据
    thisYear: JSON.parse(sessionStorage.getItem('this_year')) || {
      num: 0,
      percentage: '',
      target_percentage: '',
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
