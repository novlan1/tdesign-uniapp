<template>
    <view class="textarea-example">
        <text class="textarea-example__label">标签文字</text>
        <t-textarea t-class="external-class" placeholder="请输入文字" bordered maxlength="100" :disableDefaultPadding="true" indicator :style="style" />
    </view>
</template>

<script>
import tTextarea from 'tdesign-uniapp/textarea/textarea';
export default {
    components: {
        tTextarea
    },
    data() {
        return {
            style: 'height: 248rpx'
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
