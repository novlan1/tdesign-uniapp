<template>
    <view>
        <link />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import link from '../link';
export default zpMixins.extend({
    components: {
        tNavbar,
        link
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './link.less';
</style>
