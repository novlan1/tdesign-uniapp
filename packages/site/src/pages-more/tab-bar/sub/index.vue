<template>
    <view>
        <t-tab-bar t-class="t-tab-bar" defaultValue="user" theme="tag" :split="false">
            <t-tab-bar-item :value="item.value" :sub-tab-bar="item.children" v-for="(item, index) in list" :key="index">
                {{ item.label }}
            </t-tab-bar-item>
        </t-tab-bar>
    </view>
</template>

<script>
import tTabBar from 'tdesign-uniapp/tab-bar/tab-bar';
import tTabBarItem from 'tdesign-uniapp/tab-bar-item/tab-bar-item';
const list = [
    {
        value: 'home',
        label: '首页',
        icon: 'home',
        children: []
    },
    {
        value: 'app',
        label: '应用',
        icon: 'app',
        children: []
    },
    {
        value: 'user',
        label: '我的',
        children: [
            {
                value: 'info',
                label: '基本信息'
            },
            {
                value: 'home-page',
                label: '个人主页'
            },
            {
                value: 'setting',
                label: '设置'
            }
        ]
    }
];
export default {
    components: {
        tTabBar,
        tTabBarItem
    },
    data() {
        return {
            list
        };
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
