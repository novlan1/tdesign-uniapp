<template>
    <view>
        <t-navbar class="demo-navbar" title="ChatMarkdown" leftArrow />
        <view class="demo">
            <t-demo-header
                title="ChatMarkdown Markdown内容"
                desc="用于聊天场景中渲染 Markdown 格式文本的组件，内置 marked 解析器，支持多种 Markdown 语法和配置选项。"
                notice="渲染框架支持情况：WebView"
            />
            <t-demo title="01 基础 Markdown 样式" desc="标题与文本">
                <base />
            </t-demo>
            <t-demo desc="列表">
                <list />
            </t-demo>
            <t-demo title="02 代码块与表格" desc="代码块">
                <code />
            </t-demo>
            <t-demo desc="表格">
                <sheet />
            </t-demo>
            <t-demo title="03 图片与超链接">
                <url />
            </t-demo>
            <t-demo title="04 引用">
                <refer />
            </t-demo>
        </view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import base from './base';
import list from './list';
import code from './code';
import sheet from './sheet';
import url from './url';
import refer from './refer';
export default zpMixins.extend({
    components: {
        base,
        list,
        code,
        sheet,
        url,
        refer
    },
    data() {
        return {};
    },
    methods: {}
});
</script>
<style lang="less">
@import './chat-markdown.less';
</style>
