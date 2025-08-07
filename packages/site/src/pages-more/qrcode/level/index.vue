<template>
    <view>
        <t-slider :value="value" min="0" max="3" step="1" :marks="marks" @change="handleSliderChange" />
        <view class="qrcode-content">
            <t-qrcode value="https://tdesign.tencent.com/" :level="currentLevel" status="active" />
        </view>
    </view>
</template>

<script>
import tQrcode from './tdesign-miniprogram/qrcode/qrcode';
import tSlider from './tdesign-miniprogram/slider/slider';
export default {
    components: {
        tQrcode,
        tSlider
    },
    data() {
        return {
            value: 1,
            marks: {
                0: '7%',
                1: '15%',
                2: '25%',
                3: '35%'
            },
            currentLevel: 'M'
        };
    },
    methods: {
        handleSliderChange(e) {
            const { value } = e.detail;
            const levels = ['L', 'M', 'Q', 'H'];
            this.setData({
                value: value,
                currentLevel: levels[value]
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
