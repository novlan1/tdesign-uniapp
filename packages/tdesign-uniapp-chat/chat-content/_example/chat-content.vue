<template>
  <view>
    <t-navbar
      class="demo-navbar"
      title="ChatContent"
      left-arrow
    />
    <view class="demo">
      <t-demo-header
        title="ChatContent 对话正文"
        desc="支持 markdown 格式的渲染。"
        notice="渲染框架支持情况：WebView"
      />
      <t-demo title="01 组件类型">
        <base>
      </t-demo>
    </view>
  </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
export default zpMixins.extend({
  components: {
    base,
  },
  data() {
    return {};
  },
  methods: {},
});
</script>
<style lang="less">
@import './chat-content.less';
</style>
