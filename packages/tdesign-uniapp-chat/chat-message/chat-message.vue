<template>
  <view
    :class="'class ' + chatItemClass"
    :style="_._style([style, customStyle])"
    @longpress="handleLongPress"
  >
    <view
      v-if="showAvatar"
      :class="classPrefix + '__avatar'"
    >
      <block v-if="avatar">
        <image
          :src="avatar"
          :class="classPrefix + '__avatar-image'"
        />
      </block>
    </view>
    <view :class="contentClasses">
      <view
        v-if="showName || showDateTime"
        :class="classPrefix + '__base'"
      >
        <text
          v-if="showName"
          :class="classPrefix + '__name'"
        >
          {{ name }}
        </text>
        <text
          v-if="datetime"
          :class="classPrefix + '__time'"
        >
          {{ datetime }}
        </text>
      </view>
      <block v-if="status === 'pending'">
        <view style="width: 100%">
          <chat-loading :animation="animation" />
        </view>
      </block>
      <block v-else>
        <view :class="classPrefix + '__detail'">
          <!-- 属性传值优先级高于content插槽 -->
          <block v-if="content.length > 0">
            <block
              v-for="(item, index) in content"
              :key="index"
            >
              <attachments
                v-if="item.type === 'attachment' && role === 'user'"
                :items="item.data"
                :removable="false"
                :in-chat="true"
              />

              <chat-thinking
                v-if="item.type === 'thinking'"
                :content="item.data"
                :role="role"
                :status="status"
              />

              <chat-content
                v-else-if="item.type === 'text' || item.type === 'markdown'"
                :content="item"
                :role="role"
                :status="status"
              />
            </block>
          </block>
          <block v-else>
            <slot name="content" />
          </block>
        </view>
      </block>
      <view
        v-if="role === 'assistant'"
        :class="classPrefix + '__actionbar'"
      >
        <slot name="actionbar" />
      </view>
    </view>
  </view>
</template>
<script module="_" lang="wxs" src="@/../../components/common/utils.wxs"></script>
<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import chatContent from 'tdesign-uniapp/chat-content/chat-content';
import chatThinking from 'tdesign-uniapp/chat-thinking/chat-thinking';
import chatLoading from 'tdesign-uniapp/chat-loading/chat-loading';
import attachments from 'tdesign-uniapp/attachments/attachments';
import { SuperComponent, wxComponent, ComponentsOptionsType } from '../../../components/common/src/index';
import props from './props';
import config from 'tdesign-uniapp/common/config';

const { prefix } = config;
const name = `${prefix}-chat-message`;

@wxComponent()
export default class ChatMessage extends SuperComponent {
    options: ComponentsOptionsType = {
        multipleSlots: true
    };

    properties = props;

    data = {
        classPrefix: name,
        article: '',
        showAvatar: null,
        showName: null,
        showDateTime: null,
        contentClasses: [],
        chatItemClass: []
    };

    observers = {
        avatar() {
            this.setShowAvatar();
        },
        name() {
            this.setShowName();
        },
        datetime() {
            this.setShowDateTime();
        },
        classPrefix() {
            this.setContentClasses();
        },
        'classPrefix, variant, placement, showDateTime'() {
            this.setChatItemClass();
        }
    };

    methods = {
        handleLongPress(e: any) {
            this.$emit('longpress', {
                detail: {
                    e,
                    id: this.chatId
                }
            });
        },
        setShowAvatar() {
            this.setData({
                showAvatar: this?.avatar || ''
            });
        },
        setShowName() {
            this.setData({
                showName: this?.name || ''
            });
        },
        setShowDateTime() {
            this.setData({
                showDateTime: this?.datetime || ''
            });
        },
        setContentClasses() {
            this.setData({
                contentClasses: [`${this.classPrefix}__content`]
            });
        },
        setChatItemClass() {
            const { classPrefix, showDateTime } = this;
            const { variant, role, placement } = this;
            const baseClass = [`${classPrefix}`, `${classPrefix}--${variant}`, role, placement];
            if (showDateTime) {
                baseClass.push(`${classPrefix}__header`);
            }
            this.setData({
                chatItemClass: baseClass
            });
        }
    };

    lifetimes = {
        created() {
            this.handleLongPress = this.handleLongPress.bind(this);
        },
        attached() {
            this.setShowAvatar();
            this.setShowName();
            this.setShowDateTime();
            this.setContentClasses();
            this.setChatItemClass();
        },
        detached() {}
    };
}
</script>
<style lang="less">
@import './chat-message.less';
</style>
