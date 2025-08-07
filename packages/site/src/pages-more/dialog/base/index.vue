<template>
    <view>
        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showTextAndTitle" @tap.native="showDialog($event, { key: 'showTextAndTitle' })" block>
            反馈类-带标题
        </t-button>
        <t-dialog
            :visible="showTextAndTitle"
            title="对话框标题"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            :confirm-btn="confirmBtn"
            @confirm="closeDialog"
        />

        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showContentOnly" @tap.native="showDialog($event, { key: 'showContentOnly' })" block>
            反馈类-无标题
        </t-button>
        <t-dialog :visible="showContentOnly" content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内" :confirm-btn="confirmBtn" @confirm="closeDialog" />

        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="showTitleOnly" @tap.native="showDialog($event, { key: 'showTitleOnly' })" block>
            反馈类-纯标题
        </t-button>
        <t-dialog :visible="showTitleOnly" title="对话框标题" :confirm-btn="confirmBtn" @confirm="closeDialog" />

        <t-button
            t-class="wrapper"
            theme="primary"
            size="large"
            variant="outline"
            data-key="showMultiTextAndTitle"
            @tap.native="showDialog($event, { key: 'showMultiTextAndTitle' })"
            block
        >
            反馈类-内容超长
        </t-button>
        <t-dialog :visible="showMultiTextAndTitle" title="对话框标题" :confirm-btn="confirmBtn" @confirm="closeDialog">
            <!-- 适配skyline，增加type="list" -->
            <scroll-view slot="content" type="list" scroll-y class="long-content">
                <view class="content-container">
                    这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
                    这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
                    这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
                    这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
                    这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案 这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案
                </view>
            </scroll-view>
        </t-dialog>
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
                content: '知道了',
                variant: 'base'
            },

            dialogKey: '',
            showText: false,
            showMultiText: false,
            showTextAndTitle: false,
            showTitleOnly: false,
            showMultiTextAndTitle: false,
            showContentOnly: ''
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
