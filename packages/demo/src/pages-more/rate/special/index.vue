<template>
    <view class="demo-rate">
        <view class="rate-wrapper">
            <t-rate :value="value" size="60rpx" @change="onChange" :texts="texts" />
        </view>
        <view :class="'desc desc--' + (value > 3 ? 'active' : '')">{{ texts[value - 1] }}</view>
    </view>
</template>

<script>
import tRate from './tdesign-miniprogram/rate/rate';
export default {
    components: {
        tRate
    },
    data() {
        return {
            value: 4,
            texts: ['非常糟糕', '有些糟糕', '可以尝试', '可以前往', '推荐前往']
        };
    },
    methods: {
        onChange(e) {
            const { value } = e.detail;
            this.setData({
                value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
