<template>
    <view>
        <t-notice-bar
            :visible="true"
            prefixIcon="sound"
            suffixIcon="chevron-right"
            content="提示文字描述提示文字描述提示文字描述"
            t-class="external-class"
            t-class-prefix-icon="external-class-prefix-icon"
        ></t-notice-bar>
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
