<template>
  <view>
    <view class="block">
      <t-navbar
        t-class-placeholder="t-navbar-placeholder"
        t-class-content="t-navbar-content"
        left-arrow
        title="标题居中"
      />
    </view>

    <t-navbar
      t-class-placeholder="t-navbar-placeholder"
      t-class-content="t-navbar-content"
      left-arrow
    >
      <template
        #left
      >
        <view
          class="custom-title"
        >
          标题左对齐
        </view>
      </template>
    </t-navbar>

    <view class="demo-desc">
      标题尺寸
    </view>

    <t-navbar
      t-class-placeholder="t-navbar-placeholder"
      t-class-content="t-navbar-content"
      left-arrow
    >
      <template
        #left
      >
        <text
          class="left-text"
          @tap="onBack"
        >
          返回
        </text>
      </template>
    </t-navbar>
    <view class="header-title">
      大标题尺寸
    </view>
  </view>
</template>

<script>
import tNavbar from 'tdesign-uniapp/navbar/navbar';
export default {
  components: {
    tNavbar,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style>
@import './index.css';
</style>
