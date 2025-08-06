<template>
    <view>
        <t-navbar class="demo-navbar" title="PullDownRefresh" leftArrow />
        <base />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
export default zpMixins.extend({
    components: {
        base
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './pull-down-refresh.less';
</style>
