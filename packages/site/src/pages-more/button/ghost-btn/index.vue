<template>
  <view class="button-example">
    <t-button
      theme="primary"
      ghost
      size="large"
    >
      幽灵按钮
    </t-button>
    <t-button
      theme="danger"
      ghost
      size="large"
    >
      幽灵按钮
    </t-button>
    <t-button
      ghost
      size="large"
    >
      幽灵按钮
    </t-button>
  </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
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
<style>
@import './index.css';
</style>
