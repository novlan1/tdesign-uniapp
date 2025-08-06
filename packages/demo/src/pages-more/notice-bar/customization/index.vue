<template>
    <view>
        <!-- slot实现自定义content内容 -->
        <t-notice-bar :visible="true">
            <view slot="content" class="inline">提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述</view>
            <t-link slot="operation" content="详情" theme="primary" :underline="false" :navigator-props="navigatorProps" />
            <t-icon slot="suffix-icon" name="close" size="44rpx"></t-icon>
        </t-notice-bar>
    </view>
</template>

<script>
import tNoticeBar from './tdesign-miniprogram/notice-bar/notice-bar';
import tLink from './tdesign-miniprogram/link/link';
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tNoticeBar,
        tLink,
        tIcon
    },
    data() {
        return {
            navigatorProps: {
                url: '/pages/xxx/xxx'
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
