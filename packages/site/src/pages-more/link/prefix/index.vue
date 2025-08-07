<template>
    <view class="link-example">
        <t-link size="small" theme="primary" content="跳转链接" prefixIcon="link" hover />
        <t-link size="small" content="跳转链接" prefixIcon="link" hover />
    </view>
</template>

<script>
import tLink from 'tdesign-uniapp/link/link';
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
