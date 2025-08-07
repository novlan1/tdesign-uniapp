<template>
    <view class="skyline">
        <t-navbar title="Link" left-arrow :capsule="false" />
        <scroll-view scroll-y type="list" class="scroll-view">
            <view class="demo">
                <t-demo-header title="Link 链接" desc="文字超链接用于跳转一个新页面，如当前项目跳转，友情链接等。" notice="渲染框架支持情况：Skyline、WebView" />
                <t-demo title="01 组件类型" desc="基础文字链接">
                    <content />
                </t-demo>
                <t-demo desc="下划线文字链接">
                    <underline />
                </t-demo>
                <t-demo desc="前置图标文字链接">
                    <prefix />
                </t-demo>
                <t-demo desc="后置图标文字链接">
                    <suffix />
                </t-demo>
                <t-demo title="02 组件状态" desc="不同主题">
                    <theme />
                </t-demo>
                <t-demo desc="禁用状态">
                    <disabled />
                </t-demo>
                <t-demo title="03 组件样式" desc="链接尺寸">
                    <size />
                </t-demo>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import content from './content';
import underline from './underline';
import prefix from './prefix';
import suffix from './suffix';
import theme from './theme';
import disabled from './disabled';
import size from './size';
export default zpMixins.extend({
    components: {
        content,
        underline,
        prefix,
        suffix,
        theme,
        disabled,
        size
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './link.less';
</style>
