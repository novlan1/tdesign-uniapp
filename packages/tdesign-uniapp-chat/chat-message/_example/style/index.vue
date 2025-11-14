<template>
    <view class="chat-example">
        <view class="chat-example-block"><t-chat-message :content="userMessage.content" :role="userMessage.role" variant="text"></t-chat-message></view>
        <view class="chat-example-block"><t-chat-message :content="userMessage.content" :role="userMessage.role" variant="base"></t-chat-message></view>
        <view class="chat-example-block"><t-chat-message :content="userMessage.content" :role="userMessage.role" variant="outline"></t-chat-message></view>
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
        return {};
    },
    props: {
        userMessage: {
            type: Object,
            default: () => ({
                role: 'user',

                content: [
                    {
                        type: 'text',
                        data: '牛顿第一定律是否适用于所有参考系？'
                    }
                ]
            })
        }
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
