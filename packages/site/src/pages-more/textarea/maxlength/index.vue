<template>
    <view>
        <t-textarea t-class="external-class" label="标签文字" placeholder="设置最大字符个数" maxlength="200" :disableDefaultPadding="true" indicator />
    </view>
</template>

<script>
import tTextarea from 'tdesign-uniapp/textarea/textarea';
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
