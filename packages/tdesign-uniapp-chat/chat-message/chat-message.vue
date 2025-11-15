<template>
  <view
    :class="chatItemClass"
    :style="_._style([customStyle])"
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
          <block v-if="content && content.length > 0">
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
<script>
import chatContent from '../chat-content/chat-content.vue';
import chatThinking from '../chat-thinking/chat-thinking.vue';
import chatLoading from '../chat-loading/chat-loading.vue';
import attachments from '../attachments/attachments.vue';

import props from './props';
import { prefix } from 'tdesign-uniapp/common/config';
import _ from 'tdesign-uniapp/common/utils.wxs';
import { uniComponent } from 'tdesign-uniapp/common/src/index';


const name = `${prefix}-chat-message`;

export default uniComponent({
  name,
  options: {
    multipleSlots: true,
    styleIsolation: 'shared',
  },

  components: {
    chatContent,
    chatThinking,
    chatLoading,
    attachments,
  },

  props: {
    ...props,
  },

  data() {
    return {
      classPrefix: name,
      article: '',
      showAvatar: null,
      showName: null,
      showDateTime: null,
      contentClasses: [],
      chatItemClass: [],

      _,
    };
  },

  watch: {
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
      this.setChatItemClass();
    },
    variant: {
      handler() {
        this.setChatItemClass();
      },
    },
    placement: {
      handler() {
        this.setChatItemClass();
      },
    },
    showDateTime: {
      handler() {
        this.setChatItemClass();
      },
    },
  },

  mounted() {
    this.setShowAvatar();
    this.setShowName();
    this.setShowDateTime();
    this.setContentClasses();
    this.setChatItemClass();
  },

  methods: {
    handleLongPress(e) {
      this.$emit('longpress', {
        e,
        id: this.chatId,
      });
    },

    setShowAvatar() {
      this.showAvatar = this.avatar || '';
    },

    setShowName() {
      this.showName =  this.name || '';
    },

    setShowDateTime() {
      this.showDateTime = this.datetime || '';
    },

    setContentClasses() {
      this.contentClasses = [`${this.classPrefix}__content`];
    },

    setChatItemClass() {
      const { classPrefix, showDateTime } = this;
      const { variant, role, placement } = this;
      const baseClass = [`${classPrefix}`, `${classPrefix}--${variant}`, role, placement];
      if (showDateTime) {
        baseClass.push(`${classPrefix}__header`);
      }
      this.chatItemClass = baseClass;
    },
  },
});
</script>
<style scoped>
@import './chat-message.css';
</style>
