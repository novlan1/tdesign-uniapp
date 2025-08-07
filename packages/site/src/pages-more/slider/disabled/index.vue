<template>
    <view>
        <t-slider :value="35" disabled />

        <view class="wrapper">
            <t-slider show-extreme-value label="${value}" :value="[40, 60]" range disabled />
        </view>

        <view class="wrapper">
            <t-slider range :value="[20, 60]" :marks="marks" :step="20" disabled />
        </view>
    </view>
</template>

<script>
import tSlider from 'tdesign-uniapp/slider/slider';
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
