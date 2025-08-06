<template>
    <view class="wrapper">
        <t-slider :default-value="23" :step="0.1" @change="handleChange" />
    </view>
</template>

<script>
import tSlider from './tdesign-miniprogram/slider/slider';
export default {
    components: {
        tSlider
    },
    data() {
        return {};
    },
    methods: {
        handleChange(e) {
            console.log(e.detail.value);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
