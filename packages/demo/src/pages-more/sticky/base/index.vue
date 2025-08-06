<template>
    <view>
        <t-sticky :offset-top="navbarHeight">
            <t-button size="large" theme="primary" t-class="external-class">基础吸顶</t-button>
        </t-sticky>
    </view>
</template>

<script>
import tSticky from './tdesign-miniprogram/sticky/sticky';
import tButton from './tdesign-miniprogram/button/button';
export default {
    components: {
        tSticky,
        tButton
    },
    data() {
        return {};
    },
    props: {
        navbarHeight: {
            type: Number,
            default: 0
        }
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
