<template>
    <view>
        <view class="demo-desc">基础进度条</view>
        <view class="demo-wrapper">
            <t-progress percentage="80" />
        </view>

        <view class="demo-desc">百分比内显</view>
        <view class="demo-wrapper">
            <t-progress theme="plump" percentage="80" />
        </view>

        <view class="demo-desc">环形进度条</view>
        <view class="demo-wrapper" v-if="!skylineRender">
            <t-progress theme="circle" percentage="30" />
        </view>

        <view class="demo-desc">微型环形进度条</view>
        <view class="demo-wrapper" v-if="!skylineRender">
            <t-progress theme="circle" size="micro" percentage="30" :label="false" />
        </view>
    </view>
</template>

<script>
import tProgress from './tdesign-miniprogram/progress/progress';
import SkylineBehavior from '@behaviors/skyline.js';
export default {
    components: {
        tProgress
    },
    data() {
        return {
            skylineRender: ''
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
