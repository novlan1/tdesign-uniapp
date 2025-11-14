<template>
    <view class="chat-example">
        <view class="chat-example-block">
            <t-chat-message datetime="16:38" name="张三" :content="message.content" :role="message.role"></t-chat-message>
        </view>
        <view class="chat-example-block">
            <t-chat-message
                avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
                datetime="16:38"
                name="TDesignAI"
                :content="message.content"
                :role="message.role"
            ></t-chat-message>
        </view>
        <view class="chat-example-block">
            <t-chat-message
                avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
                datetime="16:38"
                name="TDesignAI"
                :content="message.content"
                :role="message.role"
                placement="right"
            ></t-chat-message>
        </view>
    </view>
</template>

<script>
import tChatMessage from 'tdesign-uniapp/chat-message/chat-message';
import tChatActionbar from 'tdesign-uniapp/chat-actionbar/chat-actionbar';
import tDivider from 'tdesign-uniapp/divider/divider';
export default {
    components: {
        tChatMessage,
        tChatActionbar,
        tDivider
    },
    data() {
        return {
            message: {
                role: 'system',
                content: [
                    {
                        type: 'text',
                        data: '牛顿第一定律是否适用于所有参考系？'
                    }
                ]
            }
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
