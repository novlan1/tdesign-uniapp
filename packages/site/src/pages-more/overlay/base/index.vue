<template>
    <view>
        <t-overlay :visible="visible" :duration="500" @click="handleOverlayClick" />

        <t-button block size="large" theme="primary" variant="outline" @tap.native="handleClick">基础用法</t-button>
    </view>
</template>

<script>
import tOverlay from 'tdesign-uniapp/overlay/overlay';
import tButton from 'tdesign-uniapp/button/button';
export default {
    components: {
        tOverlay,
        tButton
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        handleClick() {
            this.setData({
                visible: true
            });
        },
        handleOverlayClick(e) {
            this.setData({
                visible: e.detail.visible
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
