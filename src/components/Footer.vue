<template>
  <footer class="footer_component">
    <div v-for="(item, i) in list" :key="i">{{ item.name }}</div>
  </footer>
</template>

<script>
export default {
  name: 'footer',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped></style>
