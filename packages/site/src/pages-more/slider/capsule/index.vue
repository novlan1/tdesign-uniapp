<template>
    <view class="wrapper">
        <t-slider :defaultValue="30" theme="capsule" />

        <t-slider :defaultValue="[40, 60]" range theme="capsule" />

        <t-slider :defaultValue="[40, 60]" range label="${value}" theme="capsule" />

        <t-slider :defaultValue="60" :marks="marks" :step="20" theme="capsule" />

        <t-slider :defaultValue="[20, 80]" range :marks="marks" :step="20" theme="capsule" />
    </view>
</template>

<script>
import tSlider from './tdesign-miniprogram/slider/slider';
export default {
    components: {
        tSlider
    },
    data() {
        return {
            marks: {
                0: '0',
                20: '20',
                40: '40',
                60: '60',
                80: '80',
                100: '100'
            }
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
