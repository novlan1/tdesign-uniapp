<template>
    <view>
        <t-notice-bar :visible="true" :prefixIcon="false">
            <view slot="content">这是一条普通的通知信息</view>
        </t-notice-bar>
    </view>
</template>

<script>
import tNoticeBar from './tdesign-miniprogram/notice-bar/notice-bar';
export default {
    components: {
        tNoticeBar
    },
    data() {
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
