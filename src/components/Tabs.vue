<template>
  <div class="footer_component flex">
    <div
      class="footer_item"
      :class="active === item.id ? 'active' : ''"
      v-for="(item, i) in list"
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
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: 1,
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
  bottom: 0;
  left: 0;
  .footer_item {
    border-radius: 15px 15px 0 0;
    color: #cfdcff;
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
