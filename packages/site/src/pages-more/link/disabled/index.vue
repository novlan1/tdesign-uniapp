<template>
  <view>
    <view class="link-example">
      <t-link
        :navigator-props="navigatorProps"
        size="small"
        theme="primary"
        content="跳转链接"
        suffix-icon="jump"
        disabled
        hover
      />
      <t-link
        size="small"
        content="跳转链接"
        suffix-icon="jump"
        disabled
      />
      <t-link
        size="small"
        theme="danger"
        content="跳转链接"
        suffix-icon="jump"
        disabled
      />
    </view>
    <view class="link-example">
      <t-link
        size="small"
        theme="warning"
        content="跳转链接"
        suffix-icon="jump"
        disabled
      />
      <t-link
        size="small"
        theme="success"
        content="跳转链接"
        suffix-icon="jump"
        disabled
      />
    </view>
  </view>
</template>

<script>
import tLink from 'tdesign-uniapp/link/link';
export default {
  components: {
    tLink,
  },
  data() {
    return {
      navigatorProps: {
        url: '/pages/home/home',
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style>
@import './index.css';
</style>
