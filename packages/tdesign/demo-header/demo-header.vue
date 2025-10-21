<template>
  <div>
    <TNoticeBar
      :visible="false"
      :content="notice"
    />
    <view class="demo-title">
      {{ title }}
    </view>
    <view class="demo-desc">
      {{ desc }}
      <slot name="desc" />
    </view>
  </div>
</template>
<script>
import TNoticeBar from '../notice-bar/notice-bar.vue';

export default {
  name: 'TDemoHeader',
  components: {
    TNoticeBar,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    notice: {
      type: String,
      default: '',
    },
  },
  data() {
    return {

    };
  },
};
</script>
<style scoped src="./index.css">
</style>
