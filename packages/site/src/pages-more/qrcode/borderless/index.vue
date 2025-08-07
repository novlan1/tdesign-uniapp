<template>
    <view>
        <t-qrcode value="https://tdesign.tencent.com/" :borderless="true" />
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
