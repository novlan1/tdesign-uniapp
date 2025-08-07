<template>
    <view>
        <t-button t-class="wrapper" size="large" theme="primary" variant="outline" data-key="showWithInput" @tap.native="showDialog($event, { key: 'showWithInput' })" block>
            输入类-无描述
        </t-button>
        <t-dialog :visible="showWithInput" title="带输入框对话框" confirm-btn="确定" cancel-btn="取消" @confirm="closeDialog" @cancel="closeDialog">
            <t-input borderless class="dialog-input" clearable slot="content" placeholder="输入12文案" placeholder-class="placeholder" />
        </t-dialog>

        <t-button
            t-class="wrapper"
            theme="primary"
            size="large"
            variant="outline"
            data-key="showTextAndTitleWithInput"
            @tap.native="showDialog($event, { key: 'showTextAndTitleWithInput' })"
            block
        >
            输入类-带描述
        </t-button>
        <t-dialog
            :visible="showTextAndTitleWithInput"
            title="带输入框对话框"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            confirm-btn="确定"
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        >
            <t-input borderless class="dialog-input" clearable slot="content" placeholder="输入12文案" placeholder-class="placeholder" />
        </t-dialog>
    </view>
</template>

<script>
import tButton from 'tdesign-uniapp/button/button';
import tInput from 'tdesign-uniapp/input/input';
import tDialog from 'tdesign-uniapp/dialog/dialog';
export default {
    components: {
        tButton,
        tInput,
        tDialog
    },
    data() {
        return {
            dialogKey: '',
            showWithInput: false,
            showTextAndTitleWithInput: false
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
