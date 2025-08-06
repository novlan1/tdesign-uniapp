<template>
    <view>
        <t-input class="custom-class" label="标签文字" placeholder="请输入文字" value="已输入内容" status="error" tips="错误提示" :clearable="" />

        <t-input label="标签文字" value="不可编辑文字" disabled />

        <t-input label="标签文字" value="只读模式" readonly></t-input>
    </view>
</template>

<script>
import tInput from './tdesign-miniprogram/input/input';
export default {
    components: {
        tInput
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
