<template>
  <view>
    <view class="chat-example">
      <view class="title">
        用户内容纯文本支持HTML转义
      </view>
      <view class="chat-example-block">
        <t-chat-content
          :content="userContent"
          role="user"
        />
      </view>
    </view>

    <view class="chat-example">
      <view class="title">
        助手内容（Markdown）
      </view>
      <view class="chat-example-block">
        <t-chat-content
          :content="assistantContent"
          role="assistant"
        />
      </view>
    </view>
  </view>
</template>

<script>
import tChatContent from 'tdesign-uniapp/chat-content/chat-content.js';
// import { Lexer } from 'marked';
import markdownData from './mock.js';

// 创建Lexer实例时添加配置，禁用gfm规范中的缩进代码块
// const lexer = new Lexer({});

// const tokens = lexer.lex(markdownData);

export default {
  components: {
    tChatContent,
  },
  data() {
    return {
      userContent: {
        type: 'text',
        data: '这是用户发送的普通文本内容',
      },
      assistantContent: {
        type: 'markdown',
        data: markdownData,
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
