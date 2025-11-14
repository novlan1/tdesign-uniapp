<template>
  <view class="chat-example">
    <view class="chat-example-block">
      <t-chat-loading
        animation="dots"
        text="加载中..."
      />
    </view>
  </view>
</template>

<script>
import tChatLoading from 'tdesign-uniapp-chat/chat-loading/chat-loading.vue';
export default {
  components: {
    tChatLoading,
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
