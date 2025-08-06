<template>
    <view>
        <t-radio :default-checked="true" allow-uncheck icon="line" label="单选" />

        <view class="gutter" style="height: 32rpx"></view>

        <t-radio :default-checked="true" allow-uncheck icon="dot" label="单选" />
    </view>
</template>

<script>
import tRadio from './tdesign-miniprogram/radio/radio';
export default {
    components: {
        tRadio
    },
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {},
    /**
     * 组件的方法列表
     */
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
