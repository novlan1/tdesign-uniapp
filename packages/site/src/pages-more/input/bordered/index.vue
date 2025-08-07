<template>
    <view class="input-example">
        <view class="input-example__label">标签文字</view>
        <t-input placeholder="请输入文字" :borderless="true" :suffixIcon="" :style="style" />
    </view>
</template>

<script>
import tInput from 'tdesign-uniapp/input/input';
export default {
    components: {
        tInput
    },
    data() {
        return {
            style: 'border: 2rpx solid var(--td-component-border);border-radius: 12rpx;'
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
