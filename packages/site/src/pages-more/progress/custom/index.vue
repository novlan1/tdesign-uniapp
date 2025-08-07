<template>
    <view>
        <t-progress percentage="88" trackColor="#EAC9FF" color="#CD04FF" t-class-label="external-class-label" />
        <t-progress percentage="88" t-class-bar="external-class-bar" />
    </view>
</template>

<script>
import tProgress from 'tdesign-uniapp/progress/progress';
export default {
    components: {
        tProgress
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
