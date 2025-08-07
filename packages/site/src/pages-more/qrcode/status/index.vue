<template>
    <view>
        <t-qrcode value="https://tdesign.tencent.com/" :status="'active'" @refresh="handleRefresh" />

        <view class="demo-summary">expired</view>
        <t-qrcode value="https://tdesign.tencent.com/" :status="'expired'" @refresh="handleRefresh" />

        <view class="demo-summary">loading</view>
        <t-qrcode value="https://tdesign.tencent.com/" :status="'loading'" @refresh="handleRefresh" />

        <view class="demo-summary">scanned</view>
        <t-qrcode value="https://tdesign.tencent.com/" :status="'scanned'" @refresh="handleRefresh" />
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
    methods: {
        handleRefresh() {
            console.log('Click Refresh');
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
