<template>
    <view class="wrapper">
        <block v-for="(item, index) in items" :key="index">
            <view class="block">
                <text>{{ item }}</text>
                <t-check-tag class="margin-16" size="large" :variant="item" :content="['已选中态', '未选中态']" />
                <t-check-tag class="margin-16" default-checked size="large" :variant="item" :content="['已选中态', '未选中态']" />
            </view>
        </block>
    </view>
</template>

<script>
import tCheckTag from './tdesign-miniprogram/check-tag/check-tag';
export default {
    components: {
        tCheckTag
    },
    data() {
        return {
            items: ['light', 'dark', 'outline', 'light-outline']
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
