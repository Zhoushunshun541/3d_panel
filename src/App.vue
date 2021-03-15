<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import './assets/styles/common.less';
#app {
  width: 3072px;
  height: 1088px;
  background: url('./assets/images/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
