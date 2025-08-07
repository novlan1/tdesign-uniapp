<template>
    <view>
        <view class="demo-desc">加载状态</view>

        <view class="group">
            <t-cell title="加载状态">
                <t-switch :defaultValue="false" loading slot="note" />
            </t-cell>
            <t-cell title="加载状态" :bordered="false">
                <t-switch :defaultValue="true" loading slot="note" />
            </t-cell>
        </view>

        <view class="demo-desc">禁用状态</view>

        <view class="group">
            <t-cell title="禁用状态">
                <t-switch disabled slot="note" />
            </t-cell>
            <t-cell title="禁用状态" :bordered="false">
                <t-switch :default-value="true" disabled slot="note" />
            </t-cell>
        </view>
    </view>
</template>

<script>
import tCell from 'tdesign-uniapp/cell/cell';
import tSwitch from 'tdesign-uniapp/switch/switch';
export default {
    components: {
        tCell,
        tSwitch
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
