<template>
  <view>
    <t-notice-bar
      :visible="true"
      prefix-icon="sound"
      suffix-icon="chevron-right"
      content="提示文字描述提示文字描述提示文字描述"
      t-class="external-class"
      t-class-prefix-icon="external-class-prefix-icon"
    />
  </view>
</template>

<script>
import tNoticeBar from 'tdesign-uniapp/notice-bar/notice-bar.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: {
    tNoticeBar,
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
