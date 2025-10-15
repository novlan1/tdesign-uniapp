<template>
  <view>
    <view class="link-example">
      <t-link
        size="small"
        theme="primary"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
      <t-link
        size="small"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
      <t-link
        size="small"
        theme="danger"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
    </view>
    <view class="link-example">
      <t-link
        size="small"
        theme="warning"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
      <t-link
        size="small"
        theme="success"
        content="跳转链接"
        suffix-icon="jump"
        hover
      />
    </view>
  </view>
</template>

<script>
import tLink from 'tdesign-uniapp/link/link.vue';
export default {
  components: {
    tLink,
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
