<template>
    <view>
        <t-textarea t-class="external-class" placeholder="请输入文字" :disableDefaultPadding="true" />
    </view>
</template>

<script>
import tTextarea from './tdesign-miniprogram/textarea/textarea';
export default {
    components: {
        tTextarea
    },
    data() {
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
