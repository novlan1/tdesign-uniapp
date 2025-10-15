<template>
  <view>
    <t-divider
      :t-class="skylineRender ? 'skyline-dashed' : ''"
      dashed
    />
    <t-divider
      :t-class="skylineRender ? 'skyline-dashed' : ''"
      dashed
      content="文字信息"
      align="left"
    />
    <t-divider
      :t-class="skylineRender ? 'skyline-dashed' : ''"
      dashed
      content="文字信息"
    />
    <t-divider
      :t-class="skylineRender ? 'skyline-dashed' : ''"
      dashed
      content="文字信息"
      align="right"
    />
  </view>
</template>

<script>
import tDivider from 'tdesign-uniapp/divider/divider.vue';
import SkylineBehavior from 'packages/demo/src/mixins/skyline.js';

export default {
  components: {
    tDivider,
  },
  mixins: [SkylineBehavior],
  data() {
    return {
      skylineRender: false,
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
