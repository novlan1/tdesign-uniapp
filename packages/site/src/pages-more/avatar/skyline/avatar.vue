<template>
    <view>
        <demo-avatar />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from './tdesign-miniprogram/navbar/navbar';
import demoAvatar from '../avatar';
export default zpMixins.extend({
    components: {
        tNavbar,
        demoAvatar
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './avatar.less';
</style>
