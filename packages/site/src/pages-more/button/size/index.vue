<template>
    <view class="button-example">
        <t-button theme="primary" size="large">按钮48</t-button>
        <t-button theme="primary">按钮40</t-button>
        <t-button theme="primary" size="small">按钮32</t-button>
        <t-button theme="primary" size="extra-small">按钮28</t-button>
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
