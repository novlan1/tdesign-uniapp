<template>
    <view>
        <t-button t-class="wrapper" size="large" theme="primary" variant="outline" data-key="imageOnTop" @tap.native="showDialog($event, { key: 'imageOnTop' })" block>
            图片置顶-带标题描述
        </t-button>
        <t-dialog
            :visible="imageOnTop"
            title="对话框标题"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            :confirm-btn=""
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        >
            <t-image slot="top" t-class="dialog-image" src="https://tdesign.gtimg.com/mobile/demos/dialog1.png" />
        </t-dialog>

        <t-button
            t-class="wrapper"
            size="large"
            theme="primary"
            variant="outline"
            data-key="imageOnTopWithContent"
            @tap.native="showDialog($event, { key: 'imageOnTopWithContent' })"
            block
        >
            图片置顶-无标题
        </t-button>
        <t-dialog
            :visible="imageOnTopWithContent"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            :confirm-btn=""
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        >
            <t-image slot="top" t-class="dialog-image" src="https://tdesign.gtimg.com/mobile/demos/dialog1.png" />
        </t-dialog>

        <t-button
            t-class="wrapper"
            size="large"
            theme="primary"
            variant="outline"
            data-key="imageOnTopWithTitle"
            @tap.native="showDialog($event, { key: 'imageOnTopWithTitle' })"
            block
        >
            图片置顶-纯标题
        </t-button>
        <t-dialog :visible="imageOnTopWithTitle" title="对话框标题" :confirm-btn="" cancel-btn="取消" @confirm="closeDialog" @cancel="closeDialog">
            <t-image slot="top" t-class="dialog-image" src="https://tdesign.gtimg.com/mobile/demos/dialog1.png" />
        </t-dialog>

        <t-button
            t-class="wrapper"
            theme="primary"
            size="large"
            variant="outline"
            data-key="imageOnMiddleWithImage"
            @tap.native="showDialog($event, { key: 'imageOnMiddleWithImage' })"
            block
        >
            图片置顶-纯图片
        </t-button>
        <t-dialog :visible="imageOnMiddleWithImage" :confirm-btn="" cancel-btn="取消" @confirm="closeDialog" @cancel="closeDialog">
            <t-image slot="top" t-class="dialog-image" src="https://tdesign.gtimg.com/mobile/demos/dialog1.png" />
        </t-dialog>

        <t-button t-class="wrapper" theme="primary" size="large" variant="outline" data-key="imageOnMiddle" @tap.native="showDialog($event, { key: 'imageOnMiddle' })" block>
            图片居中-带标题描述
        </t-button>
        <t-dialog
            :visible="imageOnMiddle"
            title="对话框标题"
            content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
            :confirm-btn=""
            cancel-btn="取消"
            @confirm="closeDialog"
            @cancel="closeDialog"
        >
            <t-image slot="middle" t-class="image-host dialog-image" src="https://tdesign.gtimg.com/mobile/demos/dialog1.png" />
        </t-dialog>

        <t-button
            t-class="wrapper"
            theme="primary"
            size="large"
            variant="outline"
            data-key="imageOnMiddleWithTitle"
            @tap.native="showDialog($event, { key: 'imageOnMiddleWithTitle' })"
            block
        >
            图片居中-纯标题
        </t-button>
        <t-dialog :visible="imageOnMiddleWithTitle" title="对话框标题" :confirm-btn="" cancel-btn="取消" @confirm="closeDialog" @cancel="closeDialog">
            <t-image slot="middle" t-class="image-host dialog-image" src="https://tdesign.gtimg.com/mobile/demos/dialog1.png" />
        </t-dialog>
    </view>
</template>

<script>
import tButton from './tdesign-miniprogram/button/button';
import tImage from './tdesign-miniprogram/image/image';
import tDialog from './tdesign-miniprogram/dialog/dialog';
export default {
    components: {
        tButton,
        tImage,
        tDialog
    },
    data() {
        return {
            dialogKey: '',
            imageOnTop: false,
            imageOnTopWithContent: false,
            imageOnTopWithTitle: false,
            imageOnMiddle: false,
            imageOnMiddleWithTitle: false,
            imageOnMiddleWithImage: false
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
