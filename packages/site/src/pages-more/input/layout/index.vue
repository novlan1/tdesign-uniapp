<template>
    <view>
        <t-input label="标签文字" layout="vertical" placeholder="请输入文字" :suffixIcon=""></t-input>
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
