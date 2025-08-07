<template>
    <view class="demo-rate">
        <view class="demo-rate__title">自定义评分</view>
        <t-rate :value="value" icon="thumb-up" @change="onChange" />
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
