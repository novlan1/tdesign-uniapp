<template>
    <view class="wrapper">
        <t-slider :defaultValue="30" :min="20" :max="100" :step="20" :marks="marks" @change="handleChange"></t-slider>
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
            console.log(e.detail.value);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
