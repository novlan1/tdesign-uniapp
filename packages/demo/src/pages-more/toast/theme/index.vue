<template>
    <view>
        <t-toast id="t-toast" />

        <view class="box">
            <t-button theme="primary" size="large" variant="outline" @tap.native="showSuccessToast" block>成功提示</t-button>
            <t-button theme="primary" size="large" variant="outline" @tap.native="showWarningToast" block>警告提示</t-button>
            <t-button theme="primary" size="large" variant="outline" @tap.native="showErrorToast" block>错误提示</t-button>
        </view>
    </view>
</template>

<script>
import tToast from './tdesign-miniprogram/toast/toast';
import tButton from './tdesign-miniprogram/button/button';
import Toast from './tdesign-miniprogram/toast/index';
export default {
    components: {
        tToast,
        tButton
    },
    data() {
        return {};
    },
    methods: {
        showSuccessToast() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '成功文案',
                theme: 'success',
                direction: 'column'
            });
        },
        showWarningToast() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '警告文案',
                theme: 'warning',
                direction: 'column'
            });
        },
        showErrorToast() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '错误文案',
                theme: 'error',
                direction: 'column'
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
