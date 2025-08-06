<template>
    <view>
        <t-loading :indicator="false" text="加载中..."></t-loading>
    </view>
</template>

<script>
import tLoading from './tdesign-miniprogram/loading/loading';
export default {
    components: {
        tLoading
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
