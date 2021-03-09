<template>
  <div class="footer_component flex">
    <div
      class="footer_item"
      :class="active === item.id ? 'active' : ''"
      v-for="(item, i) in options"
      @click="selectItem(item)"
      :key="i"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      active: 1,
      options: [
        { id: 1, name: '营业部看板' },
        { id: 2, name: '管理部看板' },
        { id: 3, name: '生产工厂看板' },
        { id: 4, name: '财务部看板' },
        { id: 5, name: '供应链部看板' },
        { id: 6, name: 'IE部看板' },
        { id: 7, name: '染色部看板' },
        { id: 8, name: '织造部看板' },
      ],
    };
  },
  methods: {
    selectItem(item) {
      this.active = item.id;
      this.$emit('click', item);
    },
  },
};
</script>

<style lang="less" scoped>
.footer_component {
  width: 100%;
  justify-content: center;
  position: absolute;
  align-items: flex-end;
  bottom: 0;
  left: 0;
  .footer_item {
    cursor: pointer;
    color: #5d6b95;
    border-radius: 15px 15px 0 0;
    font-size: 18px;
    padding: 10px 18px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .active {
    color: #5ac8fa;
    background-color: rgba(0, 122, 255, 0.2);
    border: 1px solid rgba(0, 122, 255, 1);
    padding: 15px 40px;
  }
}
</style>
