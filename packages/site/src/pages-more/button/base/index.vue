<template>
  <view>
    <view class="button-example">
      <t-button
        theme="primary"
        size="large"
      >
        填充按钮
      </t-button>
      <t-button
        theme="light"
        size="large"
      >
        填充按钮
      </t-button>
      <t-button size="large">
        填充按钮
      </t-button>
    </view>

    <view class="button-example">
      <t-button
        theme="primary"
        size="large"
        variant="outline"
      >
        描边按钮
      </t-button>
      <t-button
        theme="primary"
        size="large"
        variant="text"
      >
        文字按钮
      </t-button>
    </view>
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
