<template>
    <view class="button-example">
        <t-button theme="light" block size="large" t-class="group-btn">填充按钮</t-button>
        <t-button theme="primary" block size="large" t-class="group-btn">填充按钮</t-button>
    </view>
</template>

<script>
import tButton from './tdesign-miniprogram/button/button';
export default {
    components: {
        tButton
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
