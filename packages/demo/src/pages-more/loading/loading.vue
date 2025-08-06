<template>
  <view class="skyline">
    <t-navbar
      class="demo-navbar"
      title="Loading"
      left-arrow
    />
    <scroll-view
      scroll-y
      type="list"
      class="scroll-view"
    >
      <view class="demo">
        <t-demo-header
          title="Loading 加载"
          desc="文用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。"
          notice="渲染框架支持情况：Skyline、WebView"
        />
        <t-demo
          title="01 组件类型"
          desc="纯图标"
          padding
        >
          <BaseComp />
        </t-demo>
        <t-demo
          desc="图标加文字横向"
          padding
        >
          <horizontal />
        </t-demo>
        <t-demo
          desc="图标加文字竖向"
          padding
        >
          <vertical />
        </t-demo>
        <t-demo
          desc="纯文字"
          padding
        >
          <TextComp />
        </t-demo>

        <t-demo
          title="02 组件尺寸"
          desc="大尺寸"
          padding
        >
          <size />
        </t-demo>

        <t-demo
          title="03 加载速度"
          desc="加载速度调整"
          padding
        >
          <duration />
        </t-demo>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
// import zpMixins from '@/uni_modules/zp-mixins/index';
import BaseComp from './base/index.vue';
// import horizontal from './horizontal/index.vue';
// import vertical from './vertical/index.vue';
// import TextComp from './text/index.vue';
// import duration from './duration/index.css';
// import size from './size/index.vue';
export default {
  components: {
    BaseComp,
    // horizontal,
    // vertical,
    // TextComp,
    // duration,
    // size,
  },
  data() {
    return {};
  },
  methods: {
    goToProgress() {
      uni.redirectTo({
        url: '/pages/loading/loadingProgress/index',
      });
    },
  },
};
</script>
<style lang="less">
@import './loading.less';
</style>
