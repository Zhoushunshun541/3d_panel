import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '首页',
    meta: {
      title: '营业部面板',
    },
    component: () => import(/* webpackChunkName: "one" */ '../views/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '数字看板';
  next();
  // ...
});
export default router;
