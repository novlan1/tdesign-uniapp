<template>
    <view>
        <t-button variant="outline" @tap.native="openDrawerBase" block size="large" theme="primary">带标题抽屉</t-button>

        <t-drawer :visible="visible" :placement="placement" title="标题" :items="sidebar" usingCustomNavbar @overlay-click="overlayClick" @item-click="itemClick"></t-drawer>
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

            baseSidebar: [
                {
                    title: '菜单一'
                },
                {
                    title: '菜单二'
                },
                {
                    title: '菜单三'
                },
                {
                    title: '菜单四'
                },
                {
                    title: '菜单五'
                },
                {
                    title: '菜单六'
                },
                {
                    title: '菜单七'
                },
                {
                    title: '菜单八'
                }
            ],

            visible: false
        };
    },
    methods: {
        openDrawerBase() {
            this.setData({
                visible: true,
                sidebar: this.baseSidebar
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
