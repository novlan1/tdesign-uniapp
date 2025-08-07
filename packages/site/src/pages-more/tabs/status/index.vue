<template>
    <view>
        <t-tabs :value="value" @change="onTabsChange" @click="onTabsClick">
            <t-tab-panel :label="value == '0' ? '选中' : '默认'" value="0" />
            <t-tab-panel :label="value == '1' ? '选中' : '默认'" value="1" />
            <t-tab-panel label="禁用" value="2" disabled />
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
        return {
            value: '0'
        };
    },
    methods: {
        onTabsChange(event) {
            this.setData({
                value: event.detail.value
            });
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
