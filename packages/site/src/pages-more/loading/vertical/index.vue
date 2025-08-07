<template>
    <view>
        <div class="box">
            <t-loading :theme="skylineRender ? 'spinner' : 'circular'" size="40rpx" text="加载中" layout="vertical" class="wrapper" />
            <t-loading theme="spinner" size="40rpx" text="加载中" layout="vertical" class="wrapper" />
        </div>
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
