<template>
  <view
    :class="'class ' + classPrefix + ' ' + [classes]"
    :style="_._style([style, customStyle])"
  >
    <scroll-view
      :class="_.cls(classPrefix + '__content', [['reverse', reverse]])"
      :scroll-y="true"
      :enable-flex="true"
      :enhanced="true"
      :scroll-with-animation="true"
      :scroll-top="scrollViewTop"
      data-ref="chatListRef"
      @scroll="onScroll"
      @scrolltoupper="handlerScrollToUpper"
      @scrolltolower="handlerScrollToLower"
    >
      <block v-if="reverse">
        <view class="placeholder" />
      </block>
      <!-- /**
        * 1. 两种方式获取要渲染的 list
        *  a. props 传 data
        *  b. slots t-chat-message
        * a 优先级更高
        */ -->
      <block v-if="data.length > 0">
        <block
          v-for="(item, index) in data"
          :key="index"
        >
          <chat-message
            v-if="virtualList ? index >= startIndex && index <= endIndex : true"
            :avatar="item.avatar || ''"
            :name="item.name || ''"
            :datetime="item.datetime || ''"
            :content="item.content"
            :role="item.role"
            :placement="layout === 'both' ? (item.role === 'user' ? 'right' : 'left') : 'left'"
            :animation="animation"
            :status="item.status || ''"
          />
        </block>
      </block>
      <slot v-else />
    </scroll-view>
    <view :class="classPrefix + '__footer'">
      <slot name="footer" />
    </view>
  </view>
</template>
<script module="_" lang="wxs" src="@/../../components/common/utils.wxs"></script>
<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import chatMessage from 'tdesign-uniapp/chat-message/chat-message';
import { SuperComponent, wxComponent, ComponentsOptionsType } from '../../../components/common/src/index';
import config from 'tdesign-uniapp/common/config';
import props from './props';

const { prefix } = config;
const name = `${prefix}-chat-list`;

@wxComponent()
export default class Chat extends SuperComponent {
    options: ComponentsOptionsType = {
        multipleSlots: true
    };

    properties = {
        ...props,

        virtualList: {
            type: Boolean,
            value: false
        },
        fragmentLen: {
            type: Number,
            value: 8
        }
    };

    data = {
        classPrefix: name,
        scrollViewTop: 0,
        classes: [],
        listClasses: [],
        startIndex: 0,
        endIndex: 0
    };

    observers = {
        data() {
            const dataLen = this.data.length;
            if (this.virtualList && this.oldDataLen !== dataLen) {
                this.oldDataLen = dataLen;
                this.resetFragments();
            }
        }
    };

    methods = {
        setScrollTop(scrollTop: any = 0) {
            if (scrollTop === this.scrollViewTop) {
                // eslint-disable-next-line no-param-reassign
                scrollTop -= 1;
            }
            this.setData({
                scrollViewTop: scrollTop
            });
        },
        scrollToBottom() {
            this.setScrollTop();
        },
        onScroll(e: any) {
            this.$emit('scroll', {
                detail: e
            });
        },

        handlerScrollToUpper() {
            if (!this.reverse && this.virtualList) {
                this.addFragment();
            }
        },

        handlerScrollToLower() {
            if (this.reverse && this.virtualList) {
                this.addFragment();
            }
        },

        resetFragments() {
            const dataLen = this.data.length;
            if (dataLen) {
                const { fragmentLen } = this;
                if (this.reverse) {
                    this.setData({
                        startIndex: 0,
                        endIndex: Math.min(dataLen - 1, fragmentLen - 1)
                    });
                } else {
                    this.setData({
                        startIndex: Math.max(dataLen - fragmentLen, 0),
                        endIndex: Math.max(dataLen - 1, 0)
                    });
                }
            }
        },

        addFragment(count: any = 4) {
            const dataLen = this.data.length;
            if (dataLen) {
                if (this.reverse) {
                    this.setData({
                        endIndex: Math.min(dataLen - 1, this.endIndex + count)
                    });
                } else {
                    this.setData({
                        startIndex: Math.max(this.startIndex - count, 0)
                    });
                    // todo 正向布局自动滚动到原来位置？
                }
            }
        }
    };

    lifetimes = {
        created() {
            this.setScrollTop = this.setScrollTop.bind(this);
            this.scrollToBottom = this.scrollToBottom.bind(this);
        }
    };
}
</script>
<style lang="less">
@import './chat-list.less';
</style>
