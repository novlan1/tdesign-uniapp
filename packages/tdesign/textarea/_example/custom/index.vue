<template>
  <view class="textarea-example">
    <text class="textarea-example__label">
      标签文字
    </text>
    <t-textarea
      t-class="external-class"
      placeholder="请输入文字"
      bordered
      maxlength="100"
      :disable-default-padding="true"
      indicator
      :custom-style="style"
    />
  </view>
</template>

<script>
import tTextarea from 'tdesign-uniapp/textarea/textarea';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tTextarea,
  },
  data() {
    return {
      style: 'height: 248rpx',
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
@import './index.css';
</style>
