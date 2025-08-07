<template>
    <view>
        <t-qrcode value="https://tdesign.tencent.com/" icon="https://tdesign.gtimg.com/site/tdesign-logo.png" />
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
