<template>
    <view class="demo-rate">
        <view class="demo-rate__title">第三方图标</view>
        <t-rate :value="value" iconPrefix="icon" icon="a-1h" @change="onChange" />
    </view>
</template>

<script>
import tRate from 'tdesign-uniapp/rate/rate';
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
