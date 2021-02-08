<template>
  <div class="index_page">
    <Header></Header>
    <div class="index_content">
      <div class="index_first"></div>
    </div>
    <Footer :list="options"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'index',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      options: [
        { id: 1, name: '营业部看板' },
        { id: 2, name: '管理部看板' },
        { id: 3, name: '生产工厂看板' },
        { id: 4, name: '财务部看板' },
        { id: 5, name: '供应链部看板' },
        { id: 6, name: 'IE部看板' },
        { id: 7, name: '染色部看板' },
        { id: 8, name: '制造部看板' },
      ], // 底部选项
    };
  },
};
</script>

<style lang="less">
@import './index.less';
</style>
