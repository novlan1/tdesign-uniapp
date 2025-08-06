<template>
    <view>
        <t-tabs :defaultValue="0">
            <t-tab-panel label="选项" value="0" :badge-props="" />
            <t-tab-panel label="选项" value="1" :badge-props="" />
            <t-tab-panel label="选项" value="2" />
        </t-tabs>
    </view>
</template>

<script>
import tTabs from './tdesign-miniprogram/tabs/tabs';
import tTabPanel from './tdesign-miniprogram/tab-panel/tab-panel';
export default {
    components: {
        tTabs,
        tTabPanel
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
