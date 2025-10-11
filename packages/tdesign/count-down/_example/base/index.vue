<template>
  <view>
    <view class="demo-count-down">
      <text class="demo-count-down-desc">
        时分秒
      </text>
      <view class="demo-count-down-content">
        <t-count-down :time="time" />
      </view>
    </view>

    <view class="demo-count-down">
      <text class="demo-count-down-desc">
        带毫秒
      </text>
      <view class="demo-count-down-content">
        <t-count-down
          format="HH:mm:ss:SSS"
          :time="time"
          millisecond
        />
      </view>
    </view>

    <view class="demo-count-down">
      <text class="demo-count-down-desc">
        带方形底
      </text>
      <view class="demo-count-down-content">
        <t-count-down
          content="default"
          :time="time"
          theme="square"
        />
      </view>
    </view>

    <view class="demo-count-down">
      <text class="demo-count-down-desc">
        带圆形底
      </text>
      <view class="demo-count-down-content">
        <t-count-down
          content="default"
          :time="time"
          theme="round"
        />
      </view>
    </view>

    <view class="demo-count-down">
      <text class="demo-count-down-desc">
        带单位
      </text>
      <view class="demo-count-down-content">
        <t-count-down
          content="default"
          :time="time"
          split-with-unit
          theme="round"
        />
      </view>
    </view>

    <view class="demo-count-down">
      <text class="demo-count-down-desc">
        无底色带单位
      </text>
      <view class="demo-count-down-content">
        <t-count-down
          t-class-count="external-count"
          t-class-split="external-split"
          content="default"
          :time="time"
          split-with-unit
        />
      </view>
    </view>
  </view>
</template>

<script>
import tCountDown from 'tdesign-uniapp/count-down/count-down';
export default {
  components: {
    tCountDown,
  },
  data() {
    return {
      time: 5760000,
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
