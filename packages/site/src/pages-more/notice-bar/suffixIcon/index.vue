<template>
    <view>
        <t-notice-bar :visible="visible" suffixIcon="close" content="这是一条普通的通知信息" @click="click"></t-notice-bar>
    </view>
</template>

<script>
import tNoticeBar from 'tdesign-uniapp/notice-bar/notice-bar';
export default {
    components: {
        tNoticeBar
    },
    data() {
        return {
            visible: true
        };
    },
    methods: {
        click(e) {
            const { trigger } = e.detail;
            console.log(`click on the ${trigger} area`);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
