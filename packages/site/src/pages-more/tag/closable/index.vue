<template>
    <view class="demo">
        <t-tag v-if="show[0]" class="margin-16" @close="handleClose0" closable variant="light">文字标签</t-tag>
        <t-tag v-if="show[1]" class="margin-16" @close="handleClose1" closable variant="outline">文字标签</t-tag>
    </view>
</template>

<script>
import tTag from 'tdesign-uniapp/tag/tag';
export default {
    components: {
        tTag
    },
    data() {
        return {
            show: [true, true]
        };
    },
    methods: {
        handleClose0() {
            this.setData({
                [`show[0]`]: false
            });
        },
        handleClose1() {
            this.setData({
                [`show[1]`]: false
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
