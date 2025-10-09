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
import tDivider from 'tdesign-uniapp/divider/divider';
// TODO: check skyline exists
// import SkylineBehavior from 'tdesign-site/src/mixins/skyline.js'
export default {
  components: {
    tDivider,
  },
  data() {
    return {
      skylineRender: false,
    };
  },
  created() {},
  // mixins: [SkylineBehavior],
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
