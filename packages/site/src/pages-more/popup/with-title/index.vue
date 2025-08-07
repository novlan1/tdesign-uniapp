<template>
    <view>
        <t-popup :visible="visible" @visible-change="onVisibleChange" placement="bottom">
            <view class="block">
                <view class="header">
                    <view class="btn btn--cancel" aria-role="button">取消</view>
                    <view class="title">标题文字</view>
                    <view class="btn btn--confirm" aria-role="button">确定</view>
                </view>
            </view>
        </t-popup>

        <t-button block size="large" variant="outline" theme="primary" @tap.native="handlePopup">底部弹出层-带标题及操作</t-button>
    </view>
</template>

<script>
import tPopup from 'tdesign-uniapp/popup/popup';
import tButton from 'tdesign-uniapp/button/button';
export default {
    components: {
        tPopup,
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
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
