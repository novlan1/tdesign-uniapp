<template>
    <view>
        <t-tabs :animation="" :defaultValue="0" @change="onTabsChange" @click="onTabsClick" t-class="custom-tabs" t-class-content="custom-panel">
            <t-tab-panel label="选项一" value="0">
                <view class="custom-panel__content">选项一内容</view>
            </t-tab-panel>
            <t-tab-panel label="选项二" value="1">
                <view class="custom-panel__content">选项二内容</view>
            </t-tab-panel>
            <t-tab-panel label="选项三" value="2">
                <view class="custom-panel__content">选项三内容</view>
            </t-tab-panel>
            <t-tab-panel label="选项四" value="3">
                <view class="custom-panel__content">选项四内容</view>
            </t-tab-panel>
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
