<template>
  <header class="header_component flex">
    <div class="header-logo">
      <img src="../assets/images/logo.png" width="158" height="58" alt="" />
    </div>
    <div class="header-tip flex">
      <span>营业本部 数据看板</span>
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
  height: 80px;
  background: url('../assets/images/header_logo.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .header-logo img {
    width: 150px;
    height: 60px;
  }
  .header-tip {
    height: 100%;
    justify-content: center;
    span {
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      background-image: linear-gradient(#fff, #149eeb);
      font-size: 36px;
    }
  }
  & > div {
    width: 33.33%;
  }
}
</style>
