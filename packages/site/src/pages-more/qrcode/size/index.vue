<template>
    <view class="container">
        <view class="button-group">
            <t-button class="button" variant="text" :disabled="size <= minSize" @tap.native="changeSize($event, { step: -10 })" :data-step="-10">- Smaller</t-button>
            <view class="line"></view>
            <t-button class="button" variant="text" :disabled="size >= maxSize" @tap.native="changeSize($event, { step: 10 })" :data-step="10">+ Larger</t-button>
        </view>
        <view class="qrcode-container">
            <t-qrcode :size="size" value="https://tdesign.tencent.com/" />
        </view>
    </view>
</template>

<script>
import tQrcode from 'tdesign-uniapp/qrcode/qrcode';
import tButton from 'tdesign-uniapp/button/button';
export default {
    components: {
        tQrcode,
        tButton
    },
    data() {
        return {
            size: 160,
            minSize: 80,
            maxSize: 240
        };
    },
    methods: {
        changeSize(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const newSize = this.size + e.currentTarget.dataset.step;
            if (newSize >= this.minSize && newSize <= this.maxSize) {
                this.setData({
                    size: newSize
                });
            }
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
