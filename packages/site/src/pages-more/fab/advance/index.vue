<template>
    <view>
        <t-fab icon="add" :button-props="fabButton" @click="handleClick" text="分享给朋友" />
    </view>
</template>

<script>
import tFab from 'tdesign-uniapp/fab/fab';
export default {
    components: {
        tFab
    },
    data() {
        return {
            fabButton: {
                icon: 'share',
                openType: 'share'
            }
        };
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
