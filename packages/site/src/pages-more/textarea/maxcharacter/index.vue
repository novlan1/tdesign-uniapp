<template>
    <view>
        <t-textarea t-class="external-class" label="标签文字" placeholder="设置最大字符个数，一个汉字表示两个字符" maxcharacter="200" :disableDefaultPadding="true" indicator />
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
