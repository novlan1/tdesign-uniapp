<template>
    <view>
        <t-empty icon="info-circle-filled" description="描述文字">
            <t-button slot="action" theme="primary" size="large">操作按钮</t-button>
        </t-empty>
    </view>
</template>

<script>
import tEmpty from './tdesign-miniprogram/empty/empty';
import tButton from './tdesign-miniprogram/button/button';
export default {
    components: {
        tEmpty,
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
