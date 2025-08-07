<template>
    <view>
        <radio-demo />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import radioDemo from '../radio';
export default zpMixins.extend({
    components: {
        tNavbar,
        radioDemo
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './radio.less';
</style>
