<template>
    <view>
        <t-checkbox value="1" label="多选" default-checked />

        <view class="box" style="height: 32rpx" />

        <t-checkbox value="2" label="多选" placement="right" default-checked />
    </view>
</template>

<script>
import tCheckboxGroup from './tdesign-miniprogram/checkbox-group/checkbox-group';
import tCheckbox from './tdesign-miniprogram/checkbox/checkbox';
export default {
    components: {
        tCheckboxGroup,
        tCheckbox
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
