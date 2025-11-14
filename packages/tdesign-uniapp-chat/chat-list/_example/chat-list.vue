<template>
    <view>
        <t-navbar class="demo-navbar" title="ChatList" leftArrow />
        <view class="demo">
            <!-- 通过 isActive 为 chatSender 的 value 赋值，避免 textarea 在 ios 上无法被遮挡的问题 -->
            <t-tabs :space-evenly="false" :swipeable="false" :value="value" @change="onTabsChange">
                <t-tab-panel label="基础使用" :value="0">
                    <base />
                </t-tab-panel>
                <t-tab-panel label="组合式用法" :value="1">
                    <hook-component :isActive="value === 1" />
                </t-tab-panel>
                <t-tab-panel label="自定义" :value="2">
                    <custom :isActive="value === 2" />
                </t-tab-panel>
                <!-- 本次迭代先不上 -->
                <!-- <t-tab-panel label="代码助手" value="{{3}}">
      <codedemo />
    </t-tab-panel> -->
                <t-tab-panel label="文案助手" :value="4">
                    <docs :isActive="value === 4" />
                </t-tab-panel>
                <t-tab-panel label="图像生成" :value="5">
                    <imagedemo :isActive="value === 5" />
                </t-tab-panel>
                <t-tab-panel label="任务规划" :value="6">
                    <agent :isActive="value === 6" />
                </t-tab-panel>
            </t-tabs>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tTabs from 'tdesign-uniapp/tabs/tabs';
import tTabPanel from 'tdesign-uniapp/tab-panel/tab-panel';
import base from './base';
import hookComponent from './hook-component';
import custom from './custom';
import codedemo from './code';
import docs from './docs';
import imagedemo from './image';
import agent from './agent';
export default zpMixins.extend({
    components: {
        tTabs,
        tTabPanel,
        base,
        hookComponent,
        custom,
        codedemo,
        docs,
        imagedemo,
        agent
    },
    data() {
        return {
            value: 0
        };
    },
    options: {
        styleIsolation: 'shared'
    },
    methods: {
        onTabsChange(event: any) {
            this.setData({
                value: event.detail.value
            });
        }
    }
});
</script>
<style lang="less">
@import './chat-list.less';
</style>
