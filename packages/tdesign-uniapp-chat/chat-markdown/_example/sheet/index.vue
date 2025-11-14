<template>
    <view class="chat-example-block">
        <t-chat-markdown :content="markdownContent" @click="handleLinkTap" />
    </view>
</template>

<script>
import tChatMarkdown from 'tdesign-uniapp/chat-markdown/chat-markdown.js';
import markdownData from './mock.js';
// 内置marked处理
export default {
    components: {
        tChatMarkdown
    },
    data() {
        return {
            markdownContent: markdownData
        };
    },
    methods: {
        handleLinkTap(e) {
            // 打开链接
            console.log('监听点击', e);
            uni.navigateTo({
                url: e.detail.node.href
            });
        }
    }
};
</script>
<style>
@import './index.css';
</style>
