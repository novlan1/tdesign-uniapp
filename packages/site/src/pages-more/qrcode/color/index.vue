<template>
    <view>
        <t-qrcode value="https://tdesign.tencent.com/" level="M" status="active" color="#0052D9" bgColor="#fff" />

        <view class="demo-summary">二维码背景颜色</view>

        <t-qrcode value="https://tdesign.tencent.com/" level="M" status="active" color="#0052D9" bgColor="#D9E1FF" />
    </view>
</template>

<script>
import tQrcode from 'tdesign-uniapp/qrcode/qrcode';
export default {
    components: {
        tQrcode
    },
    data() {
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
