<template>
  <header class="header_component flex">
    <div class="header-logo">
      <img
        src="../assets/images/header_logo.png"
        width="158"
        height="58"
        alt=""
      />
    </div>
    <div class="header-tip">
      营业本部 数据看板
    </div>
    <div class="header-info"></div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header_component {
  padding: 0 60px;
  background: #003569;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  .header-logo img {
    width: 160px;
    height: 60px;
  }
  .header-tip {
    color: rgba(255, 255, 255, 100);
    font-size: 36px;
  }
}
</style>
