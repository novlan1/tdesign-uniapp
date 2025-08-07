<template>
    <view>
        <t-tab-bar t-class="t-tab-bar" :value="value" @change="onChange" theme="tag" :split="false">
            <t-tab-bar-item :value="item.value" :icon="item.icon" v-for="(item, index) in list" :key="index">
                {{ item.label }}
            </t-tab-bar-item>
        </t-tab-bar>
    </view>
</template>

<script>
import tTabBar from 'tdesign-uniapp/tab-bar/tab-bar';
import tTabBarItem from 'tdesign-uniapp/tab-bar-item/tab-bar-item';
export default {
    components: {
        tTabBar,
        tTabBarItem
    },
    data() {
        return {
            value: 'label_1',
            list: [
                {
                    value: 'label_1',
                    label: '首页',
                    icon: 'home'
                },
                {
                    value: 'label_2',
                    label: '应用',
                    icon: 'app'
                },
                {
                    value: 'label_3',
                    label: '聊天',
                    icon: 'chat'
                },
                {
                    value: 'label_4',
                    label: '我的',
                    icon: 'user'
                }
            ]
        };
    },
    methods: {
        onChange(e) {
            this.setData({
                value: e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
