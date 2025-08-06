<template>
    <view>
        <t-toast id="t-toast" />
        <view class="box">
            <t-button size="large" variant="outline" theme="primary" @tap.native="showText" block>纯文本</t-button>
            <t-button size="large" variant="outline" theme="primary" @tap.native="showMultiText" block>多行文字</t-button>
            <t-button size="large" variant="outline" theme="primary" @tap.native="showHorizontalText" block>带横向图标</t-button>
            <t-button size="large" variant="outline" theme="primary" @tap.native="showVerticalText" block>带竖向图标</t-button>
            <t-button v-if="!skylineRender" size="large" variant="outline" theme="primary" @tap.native="showLoading" block>加载状态</t-button>
        </view>
    </view>
</template>

<script>
import tToast from './tdesign-miniprogram/toast/toast';
import tButton from './tdesign-miniprogram/button/button';
import SkylineBehavior from '@behaviors/skyline.js';
import { Toast } from 'tdesign-miniprogram';
export default {
    components: {
        tToast,
        tButton
    },
    data() {
        return {
            skylineRender: ''
        };
    },
    mixins: [SkylineBehavior],
    methods: {
        showText() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '轻提示文字内容'
            });
        },
        showMultiText() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '最多一行展示十个汉字宽度限制最多不超过三行文字'
            });
        },
        showHorizontalText() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '带横向图标',
                icon: 'check-circle'
            });
        },
        showVerticalText() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '带竖向图标',
                icon: 'check-circle',
                direction: 'column'
            });
        },
        showLoading() {
            Toast({
                context: this,
                selector: '#t-toast',
                message: '加载中...',
                theme: 'loading',
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
