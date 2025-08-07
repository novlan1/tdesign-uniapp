<template>
    <view>
        <t-tabs :defaultValue="0" :space-evenly="false" @change="onTabsChange" @click="onTabsClick">
            <t-tab-panel label="选项" :value="index" v-for="(item, index) in 8" :key="index"></t-tab-panel>
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
