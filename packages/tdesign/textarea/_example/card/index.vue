<template>
  <view class="textarea-example">
    <t-textarea
      t-class="external-class"
      label="标签文字"
      placeholder="请输入文字"
      maxlength="500"
      indicator
      :disable-default-padding="true"
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
      style: 'border-radius: 18rpx;',
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
@import './index.css';
</style>
