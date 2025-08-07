<template>
    <view class="loading-size-demo">
        <t-loading :theme="skylineRender ? 'spinner' : 'circular'" size="64rpx" text="加载中..." class="large" />

        <view class="demo-desc">中尺寸</view>

        <t-loading :theme="skylineRender ? 'spinner' : 'circular'" size="56rpx" text="加载中..." class="middle" />

        <view class="demo-desc">小尺寸</view>

        <t-loading :theme="skylineRender ? 'spinner' : 'circular'" size="48rpx" text="加载中..." />
    </view>
</template>

<script>
import tLoading from 'tdesign-uniapp/loading/loading';
import SkylineBehavior from '@behaviors/skyline.js';
export default {
    components: {
        tLoading
    },
    data() {
        return {
            skylineRender: false
        };
    },
    mixins: [SkylineBehavior],
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
