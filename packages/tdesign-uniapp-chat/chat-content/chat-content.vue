<template>
  <view
    :class="'class ' + classPrefix"
    :style="_._style([style, customStyle])"
  >
    <block v-if="status === 'error' || content.type === 'text'">
      <view :class="classPrefix + '__' + role + ' ' + classPrefix + '__' + status">
        <view class="_pre">
          <rich-text :nodes="textInfo" />
        </view>
      </view>
    </block>
    <block v-else>
      <view :class="classPrefix + '__assistant'">
        <t-chat-markdown
          :content="textInfo"
          :options="markdownProps && markdownProps.options"
        />
      </view>
    </block>
  </view>
</template>
<script module="_" lang="wxs" src="@/../../components/common/utils.wxs"></script>
<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import tChatMarkdown from 'tdesign-uniapp/chat-markdown/chat-markdown';
import { SuperComponent, wxComponent, ComponentsOptionsType } from '../../../components/common/src/index';
import config from 'tdesign-uniapp/common/config';
import { TdChatContentProps } from './type';
import props from './props';

const { prefix } = config;
const name = `${prefix}-chat-content`;

export interface ChatContentProps extends TdChatContentProps {}

@wxComponent()
export default class ChatContent extends SuperComponent {
    options: ComponentsOptionsType = {
        multipleSlots: true
    };

    properties = props;

    data = {
        classPrefix: name,
        textInfo: ''
    };

    observers = {
        content() {
            this.setTextInfo();
        }
    };

    methods = {
        getEscapeReplacement(ch: any) {
            const escapeReplacements = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return escapeReplacements[ch];
        },
        escape(html: any, encode: any = false) {
            const escapeTest = /[&<>"']/;
            const escapeReplace = new RegExp(escapeTest.source, 'g');
            const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
            const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');
            if (encode) {
                if (escapeTest.test(html)) {
                    return html.replace(escapeReplace, this.getEscapeReplacement);
                }
            } else if (escapeTestNoEncode.test(html)) {
                return html.replace(escapeReplaceNoEncode, this.getEscapeReplacement);
            }
            return html;
        },

        setTextInfo() {
            // error 状态下统一按纯文本处理，避免走 markdown 渲染
            if (this.content.type === 'text' || this.status === 'error') {
                this.setData({
                    textInfo: this.escape(this.content.data || '')
                });
            } else {
                this.setData({
                    textInfo: this.content.data
                });
            }
        }
    };

    lifetimes = {
        created() {
            this.getEscapeReplacement = this.getEscapeReplacement.bind(this);
            this.escape = this.escape.bind(this);
        },
        attached() {
            this.setTextInfo();
        },

        detached() {}
    };
}
</script>
<style lang="less">
@import './chat-content.less';
</style>
