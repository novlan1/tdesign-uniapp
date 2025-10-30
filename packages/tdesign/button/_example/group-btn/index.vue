<template>
  <view class="button-example">
    <t-button
      theme="light"
      block
      size="large"
      t-class="group-btn"
      style="flex: 1;margin-right: 16px;"
    >
      填充按钮
    </t-button>
    <t-button
      theme="primary"
      block
      size="large"
      t-class="group-btn"
      style="flex: 1;"
    >
      填充按钮
    </t-button>
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button.vue';
export default {
  components: {
    tButton,
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.button-example {
    margin: 32rpx;
    display: flex;
}
</style>
