<template>
    <view>
        <view class="wrapper">
            <t-slider :defaultValue="60" :marks="marks" :step="20" @change="handleChange" />
        </view>

        <view class="demo-desc">带刻度双游标滑块</view>

        <view class="wrapper">
            <t-slider range :defaultValue="[20, 60]" :marks="marks" :step="20" />
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
    methods: {
        handleChange(e) {
            console.log(e);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
