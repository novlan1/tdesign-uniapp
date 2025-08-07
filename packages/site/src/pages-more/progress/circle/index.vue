<template>
    <view>
        <t-demo v-if="!skylineRender" desc="环形进度条" padding>
            <t-progress theme="circle" percentage="80" />
            <t-progress theme="circle" percentage="88" status="warning" />
            <t-progress theme="circle" percentage="88" status="error" />
            <t-progress theme="circle" percentage="88" status="success" />
        </t-demo>
    </view>
</template>

<script>
import tProgress from './tdesign-miniprogram/progress/progress';
import SkylineBehavior from '@behaviors/skyline.js';
export default {
    components: {
        tProgress
    },
    data() {
        return {
            skylineRender: ''
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
