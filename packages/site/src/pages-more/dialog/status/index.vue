<template>
    <view>
        <view class="demo-desc">文字按钮</view>
        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showConfirm" @tap.native="showDialog($event, { key: 'showConfirm' })" block>
            文字按钮
        </t-button>
        <t-dialog
            :visible="showConfirm"
            title="对话框标题"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            confirm-btn="确定"
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        />

        <view class="demo-desc">水平基础按钮</view>
        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showWarnConfirm" @tap.native="showDialog($event, { key: 'showWarnConfirm' })" block>
            水平基础按钮
        </t-button>
        <t-dialog
            :visible="showWarnConfirm"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            :confirm-btn=""
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        />

        <view class="demo-desc">垂直基础按钮</view>
        <t-button
            t-class="wrapper"
            theme="primary"
            size="large"
            variant="outline"
            data-key="showTooLongBtnContent"
            @tap.native="showDialog($event, { key: 'showTooLongBtnContent' })"
            block
        >
            垂直基础按钮
        </t-button>
        <t-dialog
            :visible="showTooLongBtnContent"
            title="对话框标题"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            :confirm-btn="confirmBtn"
            cancel-btn="取消"
            button-layout="vertical"
            @confirm="closeDialog"
            @cancel="closeDialog"
        />

        <view class="demo-desc">多按钮</view>
        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showMultiBtn" @tap.native="showDialog($event, { key: 'showMultiBtn' })" block>
            多按钮
        </t-button>
        <t-dialog
            :visible="showMultiBtn"
            title="对话框标题"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            button-layout="vertical"
            :actions="multiBtnList"
            @action="closeDialog"
        />

        <view class="demo-desc">带关闭按钮的对话框</view>
        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showCloseBtn" @tap.native="showDialog($event, { key: 'showCloseBtn' })" block>
            带关闭按钮的对话框
        </t-button>
        <t-dialog
            :visible="showCloseBtn"
            title="对话框标题"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            close-btn
            :confirm-btn=""
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        />
    </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tDialog from 'tdesign-uniapp/dialog/dialog';
export default {
    components: {
        tButton,
        tDialog
    },
    data() {
        return {
            confirmBtn: {
                content: '确定',
                variant: 'base'
            },

            dialogKey: '',
            showConfirm: false,
            showWarnConfirm: false,
            showTooLongBtnContent: false,
            showMultiBtn: false,

            multiBtnList: [
                {
                    content: '次要按钮',
                    theme: 'light'
                },
                {
                    content: '次要按钮',
                    theme: 'light'
                },
                {
                    content: '主要按钮',
                    theme: 'primary'
                }
            ],

            showCloseBtn: ''
        };
    },
    methods: {
        showDialog(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            const { key } = e.currentTarget.dataset;
            this.setData({
                [key]: true,
                dialogKey: key
            });
        },
        closeDialog() {
            const { dialogKey } = this;
            this.setData({
                [dialogKey]: false
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
