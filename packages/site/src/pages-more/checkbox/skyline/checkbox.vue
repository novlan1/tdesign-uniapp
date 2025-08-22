<template>
    <view>
        <checkbox-demo />
    </view>
</template>

<script lang="ts">

import tNavbar from 'tdesign-uniapp/navbar/navbar';
import checkboxDemo from '../checkbox';
export default {
    components: {
        tNavbar,
        checkboxDemo
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="less">
@import './checkbox.less';
</style>
