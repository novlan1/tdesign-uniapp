<template>
    <view>
        <checkbox-demo />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from 'tdesign-uniapp/navbar/navbar';
import checkboxDemo from '../checkbox';
export default zpMixins.extend({
    components: {
        tNavbar,
        checkboxDemo
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './checkbox.less';
</style>
