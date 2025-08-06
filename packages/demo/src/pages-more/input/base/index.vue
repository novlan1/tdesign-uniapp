<template>
    <view>
        <t-input label="标签文字" placeholder="请输入文字" />

        <t-input placeholder="请输入文字">
            <view slot="label" class="custom-label">标签文字</view>
        </t-input>

        <t-input placeholder="请输入文字" />
    </view>
</template>

<script>
import tInput from './tdesign-miniprogram/input/input';
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
