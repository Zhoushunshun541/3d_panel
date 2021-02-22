<template>
  <div class="target-info mt15 flex">
    <div class="bg-color flex">
      <div>
        <span>2020目标</span>
        <span class="amount-num">
          {{ 100000 | toThousandFilter }}
          <span class="fs14">万元</span>
        </span>
      </div>
      <div>
        <span>2020目标</span>
        <span class="amount-num">
          {{ -100000 | toThousandFilter }}
          <span class="fs14">万元</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(0)
        .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
  },
};
</script>

<style lang="less" scoped>
.target-info {
  color: #fff;
  font-size: 14px;
  background: url('../assets/images/title_bg.png');
  background-repeat: no-repeat;
  padding-left: 70px;
  .amount-num {
    font-size: 20px;
    color: #4ebbf5;
  }
  .bg-color {
    width: 100%;
    height: 60px;
    & > div {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
  }
}
</style>
