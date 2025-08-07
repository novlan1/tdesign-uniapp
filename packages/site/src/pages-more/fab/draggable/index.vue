<template>
    <view>
        <t-fab
            icon="gesture-press"
            text="拖我"
            aria-label="增加"
            usingCustomNavbar
            draggable
            :y-bounds="[0, 32]"
            @click="handleClick"
            @dragstart="handleDragStart"
            @dragend="handleDragEnd"
        ></t-fab>
    </view>
</template>

<script>
import tFab from './tdesign-miniprogram/fab/fab';
export default {
    components: {
        tFab
    },
    data() {
        return {};
    },
    methods: {
        handleClick(e) {
            console.log('handleClick: ', e);
        },
        handleDragStart(e) {
            console.log('handleDragStart: ', e);
        },
        handleDragEnd(e) {
            console.log('handleDragEnd: ', e);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
