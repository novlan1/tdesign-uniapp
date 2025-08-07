<template>
    <view>
        <t-popup :visible="visible" usingCustomNavbar @visible-change="onVisibleChange" :placement="cur.value || 'top'">
            <view :class="'block block--' + cur.value">{{ cur.text }}</view>
        </t-popup>

        <t-button
            block
            size="large"
            variant="outline"
            theme="primary"
            @tap.native="handlePopup($event, { item })"
            :data-item="item"
            t-class="wrapper"
            v-for="(item, index) in position"
            :key="index"
        >
            {{ item.text }}
        </t-button>
    </view>
</template>

<script>
import tPopup from './tdesign-miniprogram/popup/popup';
import tButton from './tdesign-miniprogram/button/button';
export default {
    components: {
        tPopup,
        tButton
    },
    data() {
        return {
            cur: {
                value: '',
                text: ''
            },

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
        handlePopup(e, _dataset) {
            /* ---处理dataset begin--- */
            this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
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
