<template>
    <view>
        <view class="demo-rate custom-color">
            <view class="demo-rate__title">填充评分</view>
            <t-rate :default-value="3" allowHalf />
        </view>
        <view class="demo-rate">
            <view class="demo-rate__title">线描评分</view>
            <t-rate :default-value="3" :icon="['star-filled', 'star']" color="#00a870" />
        </view>
    </view>
</template>

<script>
import tRate from './tdesign-miniprogram/rate/rate';
export default {
    components: {
        tRate
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
