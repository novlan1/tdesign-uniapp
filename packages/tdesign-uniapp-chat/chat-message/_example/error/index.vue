<template>
    <view class="chat-example">
        <view class="chat-example-block">
            <t-chat-message avatar="https://tdesign.gtimg.com/site/chat-avatar.png" :content="message.content" :role="message.role" status="error"></t-chat-message>
        </view>
    </view>
</template>

<script>
import tChatMessage from 'tdesign-uniapp/chat-message/chat-message';
import tChatActionbar from 'tdesign-uniapp/chat-actionbar/chat-actionbar';
export default {
    components: {
        tChatMessage,
        tChatActionbar
    },
    data() {
        return {
            message: {
                role: 'assistant',
                status: 'error',
                content: [
                    {
                        type: 'text',
                        data: '´• •`!!!请求出错'
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
