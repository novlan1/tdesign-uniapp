<template>
    <view>
        <view class="button-example">
            <t-button theme="primary" size="large" disabled>填充按钮</t-button>
            <t-button theme="light" size="large" disabled>填充按钮</t-button>
            <t-button size="large" disabled>填充按钮</t-button>
        </view>

        <view class="button-example">
            <t-button theme="primary" size="large" variant="outline" disabled>描边按钮</t-button>
            <t-button theme="primary" size="large" variant="text" disabled>文字按钮</t-button>
        </view>
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
