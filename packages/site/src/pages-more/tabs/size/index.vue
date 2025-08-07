<template>
    <view>
        <t-tabs :defaultValue="0">
            <t-tab-panel label="小尺寸" value="0" />
            <t-tab-panel label="选项" value="1" />
            <t-tab-panel label="选项" value="2" />
            <t-tab-panel label="选项" value="3" />
        </t-tabs>

        <view style="height: 16px" />

        <t-tabs class="bigger" :defaultValue="0">
            <t-tab-panel label="大尺寸" value="0" />
            <t-tab-panel label="选项" value="1" />
            <t-tab-panel label="选项" value="2" />
            <t-tab-panel label="选项" value="3" />
        </t-tabs>
    </view>
</template>

<script>
import tTabs from 'tdesign-uniapp/tabs/tabs';
import tTabPanel from 'tdesign-uniapp/tab-panel/tab-panel';
export default {
    components: {
        tTabs,
        tTabPanel
    },
    data() {
        return {};
    },
    methods: {
        onTabsChange(event) {
            console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
        },
        onTabsClick(event) {
            console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
