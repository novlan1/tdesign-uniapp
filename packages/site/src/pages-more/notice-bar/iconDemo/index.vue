<template>
    <view>
        <t-notice-bar :visible="visible" :prefixIcon="false" content="提示文字描述提示文字描述提示文字描述">
            <view slot="prefix-icon">
                <t-icon name="error-circle-filled"></t-icon>
            </view>
        </t-notice-bar>
    </view>
</template>

<script>
import tNoticeBar from './tdesign-miniprogram/notice-bar/notice-bar';
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tNoticeBar,
        tIcon
    },
    data() {
        return {
            visible: true
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
