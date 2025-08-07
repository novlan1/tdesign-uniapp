<template>
    <view>
        <t-divider :t-class="skylineRender ? 'skyline-dashed' : ''" dashed />
        <t-divider :t-class="skylineRender ? 'skyline-dashed' : ''" dashed content="文字信息" align="left" />
        <t-divider :t-class="skylineRender ? 'skyline-dashed' : ''" dashed content="文字信息" />
        <t-divider :t-class="skylineRender ? 'skyline-dashed' : ''" dashed content="文字信息" align="right" />
    </view>
</template>

<script>
import tDivider from './tdesign-miniprogram/divider/divider';
import SkylineBehavior from '@behaviors/skyline.js';
export default {
    components: {
        tDivider
    },
    data() {
        return {
            skylineRender: false
        };
    },
    mixins: [SkylineBehavior],
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
