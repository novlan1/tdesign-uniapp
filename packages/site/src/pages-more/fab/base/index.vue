<template>
    <view>
        <t-fab icon="add" @click="handleClick" aria-label="增加"></t-fab>
    </view>
</template>

<script>
import tFab from 'tdesign-uniapp/fab/fab';
export default {
    components: {
        tFab
    },
    data() {
        return {};
    },
    methods: {
        handleClick(e) {
            console.log(e);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
