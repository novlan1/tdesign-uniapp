<template>
    <view>
        <t-navbar class="demo-navbar" title="ChatSender" leftArrow />
        <view class="demo">
            <t-demo-header title="ChatSender 对话输入" desc="用于 AI 聊天的输入框，可以扩展模型、多模态等能力。" notice="渲染框架支持情况：WebView" />
            <t-demo title="01 组件类型" desc="基础类型">
                <base />
            </t-demo>
            <t-demo desc="上传文件">
                <attachments />
            </t-demo>
            <t-demo desc="内容引用">
                <content-citation />
            </t-demo>
            <t-demo desc="文件引用">
                <file-citation />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tTabs from 'tdesign-uniapp/tabs/tabs';
import tTabPanel from 'tdesign-uniapp/tab-panel/tab-panel';
import base from './base';
import attachments from './attachments';
import contentCitation from './content-citation';
import fileCitation from './file-citation';
export default zpMixins.extend({
    components: {
        tTabs,
        tTabPanel,
        base,
        attachments,
        contentCitation,
        fileCitation
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './chat-sender.less';
</style>
