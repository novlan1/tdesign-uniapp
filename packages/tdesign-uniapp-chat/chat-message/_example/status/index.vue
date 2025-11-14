<template>
    <view class="chat-example">
        <view class="chat-example-block">
            <t-chat-message
                avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
                :content="message.content"
                :role="message.role"
                animation="gradient"
                :status="message.status"
            ></t-chat-message>
        </view>
        <view class="chat-example-block">
            <t-chat-message
                avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
                :content="message.content"
                :role="message.role"
                animation="skeleton"
                :status="message.status"
            ></t-chat-message>
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
                status: 'pending',
                content: [
                    {
                        type: 'text',
                        data: '牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。'
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
