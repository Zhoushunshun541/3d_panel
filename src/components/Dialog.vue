<template>
  <div ref="dialog" v-show="show" class="order_dialog flex">
    <div class="flex show-info">
      <p>
        恭喜<span class="fs60">{{ temp_info.name }}</span>
      </p>
      <p>
        接单
        <span class="yellow fs60">{{ temp_info.num | toThousandFilter }}</span>
        万元
      </p>
      <img class="animation-gif" src="../assets/images/prosperity.gif" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    orderInfo: {
      type: Array,
      default: () => {
        return [{ name: '', num: 0 }];
      },
    },
    delay: {
      type: [Number, String],
      default: 3000,
    },
  },
  data() {
    return {
      temp_info: {
        name: '',
        num: 0,
      },
      index: 0, // 当前数据的下标
      show: false,
    };
  },
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(1)
        .replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
  },
  methods: {
    // 插入到body里
    innerBodyHtml() {
      const dom = this.$refs.dialog;
      document.body.append(dom);
      setTimeout(() => {
        this.closeDialog();
      }, this.delay);
    },
    // 关闭弹窗
    closeDialog() {
      this.show = false;
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
      this.showDialog();
    },
    showDialog() {
      this.show = true;
      this.temp_info = this.orderInfo[this.index];
      if (this.index < this.orderInfo.length) {
        this.index++;
        this.innerBodyHtml();
      } else {
        this.temp_info = {
          name: '',
          num: 0,
        };
        this.index = 0;
      }
    },
  },
  watch: {
    orderInfo(newValue) {
      this.index = 0;
      if (newValue.length === 0) {
        return;
      }
      this.showDialog();
    },
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>

<style lang="less" scoped>
.order_dialog {
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: absolute;
  font-size: 50px;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  .animation-gif {
    width: 405px;
    height: 405px;
  }
  .yellow {
    color: #ffcc00;
  }
  .show-info {
    flex-direction: column;
    justify-content: center;
  }
}
</style>
