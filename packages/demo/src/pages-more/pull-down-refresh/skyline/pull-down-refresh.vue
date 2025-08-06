<template>
    <view>
        <t-navbar class="demo-navbar" title="PullDownRefresh" left-arrow />
        <base />
    </view>
</template>

<script>
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import base from '../base';
export default {
    components: {
        tNavbar,
        base
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
<style>
@import './pull-down-refresh.css';
</style>
