<template>
    <view>
        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showConfirm" @tap.native="showDialog($event, { key: 'showConfirm' })" block>
            确认类-带标题
        </t-button>
        <t-dialog
            :visible="showConfirm"
            title="对话框标题"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            :confirm-btn="confirmBtn"
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        />

        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showWarnConfirm" @tap.native="showDialog($event, { key: 'showWarnConfirm' })" block>
            确认类-无标题
        </t-button>
        <t-dialog
            :visible="showWarnConfirm"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            :confirm-btn=""
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        />

        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showLightConfirm" @tap.native="showDialog($event, { key: 'showLightConfirm' })" block>
            确认类-纯标题
        </t-button>
        <t-dialog :visible="showLightConfirm" title="对话框标题" :confirm-btn="" cancel-btn="取消" @confirm="closeDialog" @cancel="closeDialog" />
    </view>
</template>

<script>
import tButton from './tdesign-miniprogram/button/button';
import tDialog from './tdesign-miniprogram/dialog/dialog';
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
            showLightConfirm: false
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
