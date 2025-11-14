<template>
    <view :class="classPrefix">
        <!-- 代码语言标签 -->
        <view :class="classPrefix + '__header'" v-if="node.lang">
            <text :class="classPrefix + '__lang'">{{ node.lang }}</text>
        </view>

        <!-- 代码内容区域 -->
        <scroll-view :class="classPrefix + '__content'" :scroll-x="true">
            <text :class="classPrefix + '__text'" :decode="true">{{ node.text }}</text>
        </scroll-view>
    </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import { SuperComponent, wxComponent, ComponentsOptionsType } from '../../../../components/common/src/index';
import config from '../../../../components/common/config';

const { prefix } = config;
const name = `${prefix}-chat-markdown-code`;

@wxComponent()
export default class ChatMarkdownCode extends SuperComponent {
    options: ComponentsOptionsType = {
        multipleSlots: true
    };

    properties = {
        node: {
            type: Object,
            value: () => ({})
        }
    };

    data = {
        classPrefix: name
    };
}
</script>
<style lang="less">
@import './chat-markdown-code.less';
</style>
