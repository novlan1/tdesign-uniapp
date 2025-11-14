<template>
  <view>
    <block>
      <view class="chat-example-desc">
        block 样式
      </view>
      <view class="chat-example-block">
        <t-chat-thinking
          layout="block"
          :content="content"
          :status="status"
          :animation="animation"
        />
      </view>

      <view class="chat-example-desc">
        border 样式
      </view>
      <view class="chat-example-block">
        <t-chat-thinking
          layout="border"
          :content="content"
          :status="status"
          :animation="animation"
        />
      </view>
    </block>
  </view>
</template>

<script>
import tChatThinking from 'tdesign-uniapp-chat/chat-thinking/chat-thinking.vue';
export default {
  components: {
    tChatThinking,
  },
  data() {
    return {
      animation: 'moving',
      status: 'complete',
      content: {
        text: '嗯，用户问牛顿第一定律是不是适用于所有参考系。首先，我得先回忆一下牛顿第一定律的内容。牛顿第一定律，也就是惯性定律，说物体在没有外力作用时会保持静止或匀速直线运动。也就是说， 保持原来的运动状态。',
        title: '已深度思考(用时19秒)',
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
