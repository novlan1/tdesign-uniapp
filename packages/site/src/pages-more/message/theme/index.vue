<template>
    <view>
        <t-message id="t-message" />

        <view class="message-example">
            <t-button t-class="external-class" theme="primary" variant="outline" size="large" block @tap.native="showInfoMessage">普通通知</t-button>

            <t-button t-class="external-class" theme="primary" variant="outline" size="large" block @tap.native="showSuccessMessage">成功通知</t-button>

            <t-button t-class="external-class" theme="primary" variant="outline" size="large" block @tap.native="showWarnMessage">警示通知</t-button>

            <t-button t-class="external-class" theme="primary" variant="outline" size="large" block @tap.native="showErrorMessage">错误通知</t-button>
        </view>
    </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tMessage from 'tdesign-uniapp/message/message';
import Message from 'tdesign-uniapp/message/index';
export default {
    components: {
        tButton,
        tMessage
    },
    data() {
        return {};
    },
    methods: {
        showInfoMessage() {
            Message.info({
                context: this,
                offset: [90, 32],
                duration: 5000,
                content: '这是一条普通通知信息'
            });
        },
        showWarnMessage() {
            Message.warning({
                context: this,
                offset: [90, 32],
                duration: 5000,
                content: '这是一条需要用户关注到的警示通知'
            });
        },
        showSuccessMessage() {
            Message.success({
                context: this,
                offset: [90, 32],
                duration: 5000,
                content: '这是一条成功的提示消息'
            });
        },
        showErrorMessage() {
            Message.error({
                context: this,
                offset: [90, 32],
                duration: 5000,
                content: '这是一条错误提示通知'
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
