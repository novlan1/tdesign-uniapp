<template>
    <view class="input-example">
        <t-input :style="style" label="标签文字" placeholder="请输入文字" borderless />
    </view>
</template>

<script>
import tInput from './tdesign-miniprogram/input/input';
export default {
    components: {
        tInput
    },
    data() {
        return {
            style: 'border-radius: 18rpx;'
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
