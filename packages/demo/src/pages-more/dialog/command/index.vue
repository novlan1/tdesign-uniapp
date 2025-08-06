<template>
    <view>
        <t-button size="large" variant="outline" theme="primary" @tap.native="showDialog" block>命令行操作</t-button>
        <t-dialog id="t-dialog" />
    </view>
</template>

<script>
import tButton from './tdesign-miniprogram/button/button';
import tDialog from './tdesign-miniprogram/dialog/dialog';
import Dialog from './tdesign-miniprogram/dialog/index';
export default {
    components: {
        tButton,
        tDialog
    },
    data() {
        return {};
    },
    methods: {
        showDialog() {
            const dialogConfig = {
                context: this,
                title: '弹窗标题',
                closeOnOverlayClick: true,
                content: '告知当前状态、信息和解决方法等内容。',
                confirmBtn: '确定',
                cancelBtn: '取消'
            };
            Dialog.confirm(dialogConfig)
                .then((data) => console.log('点击了确定', data))
                .catch((data) => console.log('点击了取消', data));
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
