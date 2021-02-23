<template>
  <div ref="dialog" v-show="show" class="order_dialog flex">
    <div class="flex show-info">
      <p>
        恭喜<span class="fs60">{{ orderInfo.name }}</span>
      </p>
      <p>
        接单
        <span class="yellow fs60">{{ orderInfo.num | toThousandFilter }}</span>
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
    show: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: [Number, String],
      default: 3000,
    },
    orderInfo: {
      type: Object,
      default: () => {
        return { name: '', num: 0 };
      },
    },
  },
  filters: {
    toThousandFilter(num) {
      return (+num || 0)
        .toFixed(0)
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
      this.$emit('update:show', false);
      if (this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    },
  },
  watch: {
    show(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.innerBodyHtml();
        });
      }
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
