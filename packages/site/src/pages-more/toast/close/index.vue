<template>
    <view>
        <t-toast id="t-toast" />

        <view class="box">
            <view class="toast-example">
                <t-button theme="primary" size="large" variant="outline" @tap.native="handleShow">显示提示</t-button>
                <t-button theme="primary" size="large" variant="outline" @tap.native="handleHide">关闭提示</t-button>
            </view>
        </view>
    </view>
</template>

<script>
import tToast from 'tdesign-uniapp/toast/toast';
import Toast, { hideToast } from 'tdesign-uniapp/toast/index';
export default {
    components: {
        tToast
    },
    data() {
        return {};
    },
    methods: {
        handleShow() {
            Toast({
                context: this,
                selector: '#t-toast',
                duration: -1,
                message: '轻提示文字内容'
            });
        },
        handleHide() {
            hideToast({
                context: this,
                selector: '#t-toast'
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
