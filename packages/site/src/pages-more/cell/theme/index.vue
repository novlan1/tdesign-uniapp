<template>
    <view>
        <t-cell-group theme="card">
            <t-cell title="单行标题" leftIcon="service" hover arrow />
            <t-cell title="单行标题" leftIcon="internet" hover arrow />
            <t-cell title="单行标题" leftIcon="lock-on" hover arrow />
        </t-cell-group>
    </view>
</template>

<script>
import tCellGroup from './tdesign-miniprogram/cell-group/cell-group';
import tCell from './tdesign-miniprogram/cell/cell';
import tIcon from './tdesign-miniprogram/icon/icon';
export default {
    components: {
        tCellGroup,
        tCell,
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
