<template>
    <view>
        <t-popup :visible="visible" @visible-change="onVisibleChange" placement="center">
            <view class="block">
                <t-icon t-class="close-btn" name="close-circle" size="64rpx" color="#fff" @tap.native="onClose" />
            </view>
        </t-popup>

        <t-button block size="large" variant="outline" theme="primary" @tap.native="handlePopup">居中弹出层-带自定义关闭按钮</t-button>
    </view>
</template>

<script>
import tPopup from './tdesign-miniprogram/popup/popup';
import tIcon from './tdesign-miniprogram/icon/icon';
import tButton from './tdesign-miniprogram/button/button';
export default {
    components: {
        tPopup,
        tIcon,
        tButton
    },
    data() {
        return {
            cur: {},

            position: [
                {
                    value: 'top',
                    text: '顶部弹出'
                },
                {
                    value: 'left',
                    text: '左侧弹出'
                },
                {
                    value: 'center',
                    text: '中间弹出'
                },
                {
                    value: 'bottom',
                    text: '底部弹出'
                },
                {
                    value: 'right',
                    text: '右侧弹出'
                }
            ],

            visible: false
        };
    },
    methods: {
        handlePopup(e) {
            const { item } = e.currentTarget.dataset;
            this.setData(
                {
                    cur: item
                },
                () => {
                    this.setData({
                        visible: true
                    });
                }
            );
        },
        onVisibleChange(e) {
            this.setData({
                visible: e.detail.visible
            });
        },
        onClose() {
            this.setData({
                visible: false
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
