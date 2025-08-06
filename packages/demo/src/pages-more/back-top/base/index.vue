<template>
    <view>
        <t-back-top :theme="backTopTheme" :text="backTopText" :scroll-top="scrollTop" @to-top="onToTop"></t-back-top>
    </view>
</template>

<script>
import tBackTop from './tdesign-miniprogram/back-top/back-top';
export default {
    components: {
        tBackTop
    },
    data() {
        return {
            backTopTheme: 'round',
            backTopText: '顶部'
        };
    },
    props: {
        scrollTop: {
            type: Number,
            default: 0
        }
    },
    methods: {
        onToTop(e) {
            this.$emit('to-top', {
                detail: e
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
