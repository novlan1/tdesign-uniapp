<template>
    <view>
        <t-input prefixIcon="app" label="标签文字" placeholder="请输入文字" />

        <t-input prefixIcon="app" placeholder="请输入文字" />
    </view>
</template>

<script>
import tInput from 'tdesign-uniapp/input/input';
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
