<template>
    <view>
        <t-tabs :defaultValue="0">
            <t-tab-panel icon="app" label="选项" :value="index" v-for="(item, index) in 3" :key="index"></t-tab-panel>
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
