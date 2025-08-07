<template>
    <view>
        <t-textarea label="标签文字" placeholder="请输入文字" :disableDefaultPadding="true" :autosize="autosize" @line-change="onLineChange" />
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
            autosize: {
                maxHeight: 120,
                minHeight: 20
            }
        };
    },
    methods: {
        onLineChange(e) {
            console.log('lineCount: ', e.detail);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
