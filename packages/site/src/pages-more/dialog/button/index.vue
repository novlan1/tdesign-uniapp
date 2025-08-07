<template>
    <view>
        <t-button size="large" theme="primary" variant="outline" data-type="hasCancelBtn" @tap.native="showDialog($event, { type: 'hasCancelBtn' })" block>开放能力按钮</t-button>
        <t-dialog id="t-dialog" />
    </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tDialog from 'tdesign-uniapp/dialog/dialog';
import Dialog from 'tdesign-uniapp/dialog/index';
export default {
    components: {
        tButton,
        tDialog
    },
    data() {
        return {};
    },
    methods: {
        showDialog(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const dialogConfig = {
                context: this,
                title: '弹窗标题',
                content: '告知当前状态、信息和解决方法等内容。',
                cancelBtn: '取消',
                confirmBtn: {
                    openType: 'share',
                    content: '分享给朋友',
                    bindgetphonenumber({ detail }) {
                        console.log(detail);
                        if (detail.errMsg.includes('fail')) {
                            console.log('获取失败');
                            return false; // 不关闭弹窗
                        }
                        return true; // 关闭弹窗
                    }
                }
            };
            Dialog.confirm(dialogConfig)
                .then(() => {
                    console.log('点击确定');
                })
                .catch(() => {
                    console.log('点击取消');
                });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
