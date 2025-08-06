<template>
    <view>
        <t-loading :theme="skylineRender ? 'spinner' : 'circular'" size="52rpx" text="加载中..." t-class-text="text-l" :duration="2000 - duration"></t-loading>
        <view class="slider-container">
            <t-slider class="slider-class" :value="duration" :min="100" :max="1500" label @change="durationChange"></t-slider>
        </view>
    </view>
</template>

<script>
import tLoading from './tdesign-miniprogram/loading/loading';
import tSlider from './tdesign-miniprogram/slider/slider';
import SkylineBehavior from '@behaviors/skyline.js';
export default {
    components: {
        tLoading,
        tSlider
    },
    data() {
        return {
            duration: 800,
            skylineRender: false
        };
    },
    mixins: [SkylineBehavior],
    methods: {
        durationChange(e) {
            this.setData({
                duration: e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
