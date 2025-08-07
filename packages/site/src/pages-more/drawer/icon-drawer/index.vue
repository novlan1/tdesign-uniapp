<template>
    <view>
        <t-button variant="outline" block @tap.native="openDrawerIcon" size="large" theme="primary">带图标抽屉</t-button>

        <t-drawer :visible="visible" :placement="placement" :items="sidebar" usingCustomNavbar @overlay-click="overlayClick" @item-click="itemClick"></t-drawer>
    </view>
</template>

<script>
import tButton from './tdesign-miniprogram/button/button';
import tDrawer from './tdesign-miniprogram/drawer/drawer';
export default {
    components: {
        tButton,
        tDrawer
    },
    data() {
        return {
            placement: 'left',
            sidebar: [],

            iconSidebar: [
                {
                    title: '菜单一',
                    icon: 'app'
                },
                {
                    title: '菜单二',
                    icon: 'app'
                },
                {
                    title: '菜单三',
                    icon: 'app'
                },
                {
                    title: '菜单四',
                    icon: 'app'
                },
                {
                    title: '菜单五',
                    icon: 'app'
                },
                {
                    title: '菜单六',
                    icon: 'app'
                },
                {
                    title: '菜单七',
                    icon: 'app'
                },
                {
                    title: '菜单八',
                    icon: 'app'
                }
            ],

            visible: false
        };
    },
    /**
     * 组件的方法列表
     */
    methods: {
        openDrawerIcon() {
            this.setData({
                visible: true,
                sidebar: this.iconSidebar
            });
        },
        itemClick(e) {
            console.log(e.detail);
        },
        overlayClick(e) {
            console.log(e.detail);
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
