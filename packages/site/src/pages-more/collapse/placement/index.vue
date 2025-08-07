<template>
    <view class="wrapper">
        <t-collapse :value="activeValues" @change="handleChange">
            <t-collapse-panel header="折叠面板标题" placement="top" :value="0" expandIcon>
                此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容
            </t-collapse-panel>
        </t-collapse>
    </view>
</template>

<script>
import tCollapse from 'tdesign-uniapp/collapse/collapse';
import tCollapsePanel from 'tdesign-uniapp/collapse-panel/collapse-panel';
export default {
    components: {
        tCollapse,
        tCollapsePanel
    },
    data() {
        return {
            activeValues: [0]
        };
    },
    methods: {
        handleChange(e) {
            this.setData({
                activeValues: e.detail.value
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
