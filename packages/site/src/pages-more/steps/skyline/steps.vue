<template>
    <view>
        <steps />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import steps from '../steps';
export default zpMixins.extend({
    components: {
        tNavbar,
        steps
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './steps.less';
</style>
