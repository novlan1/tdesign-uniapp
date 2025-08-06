<template>
    <view>
        <demo-progress />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import demoProgress from '../progress';
export default zpMixins.extend({
    components: {
        tNavbar,
        demoProgress
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './progress.less';
</style>
