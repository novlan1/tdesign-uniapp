<template>
    <view>
        <t-tabs :defaultValue="0" @change="onTabsChange" @click="onTabsClick" t-class="custom-tabs">
            <t-tab-panel label="选项" value="0" />
            <t-tab-panel label="选项" value="1" />
        </t-tabs>

        <t-tabs :defaultValue="0" @change="onTabsChange" @click="onTabsClick" t-class="custom-tabs">
            <t-tab-panel label="选项" value="0" />
            <t-tab-panel label="选项" value="1" />
            <t-tab-panel label="上限六个文字" value="2" />
        </t-tabs>

        <t-tabs :defaultValue="0" @change="onTabsChange" @click="onTabsClick" t-class="custom-tabs">
            <t-tab-panel label="选项" value="0" />
            <t-tab-panel label="选项" value="1" />
            <t-tab-panel label="选项" value="2" />
            <t-tab-panel label="上限四字" value="3" />
        </t-tabs>

        <t-tabs :defaultValue="0" sticky :stickyProps="stickyProps" @change="onTabsChange" @click="onTabsClick" @scroll="onStickyScroll" t-class="custom-tabs">
            <t-tab-panel label="选项" value="0" />
            <t-tab-panel label="选项" value="1" />
            <t-tab-panel label="选项" value="2" />
            <t-tab-panel label="选项" value="3" />
            <t-tab-panel label="上限四字" value="4" />
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
        return {
            stickyProps: {
                zIndex: 2
            }
        };
    },
    methods: {
        onTabsChange(event) {
            console.log(`Change tab, tab-panel value is ${event.detail.value}.`);
        },
        onTabsClick(event) {
            console.log(`Click tab, tab-panel value is ${event.detail.value}.`);
        },
        onStickyScroll(event) {
            console.log(event.detail);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
