<template>
    <view class="link-example">
        <t-link size="small" theme="primary" content="S号链接" suffixIcon="jump" hover />
        <t-link theme="primary" content="M号链接" suffixIcon="jump" hover />
        <t-link size="large" theme="primary" content="L号链接" suffixIcon="jump" hover />
    </view>
</template>

<script>
import tLink from './tdesign-miniprogram/link/link';
export default {
    components: {
        tLink
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
