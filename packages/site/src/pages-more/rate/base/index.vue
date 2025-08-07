<template>
    <view class="demo-rate">
        <view class="demo-rate__title">实心评分</view>

        <t-rate :value="value" @change="onChange" />
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
            value: 3
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
