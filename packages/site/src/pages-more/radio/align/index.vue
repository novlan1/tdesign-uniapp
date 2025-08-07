<template>
    <view>
        <t-radio value="radio1" allow-uncheck label="单选" default-checked />

        <view class="block"></view>

        <t-radio value="radio2" allow-uncheck label="单选" placement="right" default-checked />
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
    methods: {
        onChange(event) {
            console.log('radio', event.detail);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
