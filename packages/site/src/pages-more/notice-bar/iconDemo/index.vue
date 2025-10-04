<template>
  <view>
    <t-notice-bar
      :visible="visible"
      :prefix-icon="false"
      content="提示文字描述提示文字描述提示文字描述"
    >
      <view slot="prefix-icon">
        <t-icon name="error-circle-filled" />
      </view>
    </t-notice-bar>
  </view>
</template>

<script>
import tNoticeBar from 'tdesign-uniapp/notice-bar/notice-bar';
import tIcon from 'tdesign-uniapp/icon/icon';
export default {
  components: {
    tNoticeBar,
    tIcon,
  },
  data() {
    return {
      visible: true,
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
