<template>
    <view>
        <textarea-demo />
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tNavbar from 'tdesign-uniapp/navbar/navbar';
import textareaDemo from '../textarea';
export default zpMixins.extend({
    components: {
        tNavbar,
        textareaDemo
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './textarea.less';
</style>
