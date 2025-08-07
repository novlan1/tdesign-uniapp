<template>
    <view>
        <t-collapse :defaultValue="[0]" expandMutex expandIcon>
            <t-collapse-panel header="折叠面板标题" :value="0">
                此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容
            </t-collapse-panel>
            <t-collapse-panel header="折叠面板标题" :value="1">
                此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容
            </t-collapse-panel>
            <t-collapse-panel header="折叠面板标题" :value="2">
                此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容
            </t-collapse-panel>
            <t-collapse-panel header="折叠面板标题" disabled :value="3">
                此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容
            </t-collapse-panel>
        </t-collapse>
    </view>
</template>

<script>
import tCollapse from './tdesign-miniprogram/collapse/collapse';
import tCollapsePanel from './tdesign-miniprogram/collapse-panel/collapse-panel';
export default {
    components: {
        tCollapse,
        tCollapsePanel
    },
    data() {
        return {};
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
