<template>
    <view>
        <t-navbar t-class-placeholder="t-navbar-placeholder" t-class-content="t-navbar-content" class="custom-navbar" left-arrow title="标题文字" />
    </view>
</template>

<script>
import tNavbar from 'tdesign-uniapp/navbar/navbar';
export default {
    components: {
        tNavbar
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
