<template>
    <view>
        <t-cell title="单行标题" hover arrow />
        <t-cell title="单行标题" hover required arrow />
        <t-cell title="单行标题" hover arrow ariaLabel="单行标题，有16条消息">
            <t-badge :count="16" slot="note" />
        </t-cell>
        <t-cell title="单行标题" hover>
            <t-switch :defaultValue="true" slot="note" />
        </t-cell>
        <t-cell title="单行标题" hover note="辅助信息" arrow />
        <t-cell title="单行标题" hover arrow leftIcon="app" :bordered="false" />
    </view>
</template>

<script>
import tCell from './tdesign-miniprogram/cell/cell';
import tBadge from './tdesign-miniprogram/badge/badge';
import tSwitch from './tdesign-miniprogram/switch/switch';
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tCell,
        tBadge,
        tSwitch,
        tIcon
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
