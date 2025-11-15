<template>
  <view>
    <block
      v-for="(item, i) in nodes"
      :key="i"
    >
      <!-- blocks -->

      <block v-if="item.type === 'heading'">
        <view :class="classPrefix + '-h ' + classPrefix + '-h' + item.depth">
          <chat-markdown-node :nodes="item.tokens" />
        </view>
      </block>

      <block v-else-if="item.type === 'list'">
        <view
          :class="classPrefix + '-list ' + (item.ordered ? classPrefix + '-list__decimal' : '')"
          :data-type="item.ordered"
        >
          <block
            v-for="(li, j) in item.items"
            :key="j"
          >
            <view :class="classPrefix + '-list-item'">
              <block v-if="li.tokens && li.tokens.length">
                <chat-markdown-node :nodes="li.tokens" />
              </block>
              <block v-else>
                {{ '' + item.text + '' }}
              </block>
            </view>
          </block>
        </view>
      </block>

      <block v-else-if="item.type === 'paragraph'">
        <view :class="classPrefix + '-p'">
          <chat-markdown-node :nodes="item.tokens" />
        </view>
      </block>

      <block v-else-if="item.type === 'image'">
        <view :class="classPrefix + '-image'">
          <image
            :src="item.href"
            :alt="item.title"
            mode="widthFix"
          />
        </view>
      </block>

      <block v-else-if="item.type === 'table'">
        <chat-markdown-table :node="item" />
      </block>

      <block v-else-if="item.type === 'blockquote'">
        <view :class="classPrefix + '-blockquote'">
          <chat-markdown-node :nodes="item.tokens" />
        </view>
      </block>

      <block v-else-if="item.type === 'code'">
        <chat-markdown-code
          :node="item"
          :theme="theme"
        />
      </block>

      <!-- Inlines -->

      <block v-else-if="item.type === 'text'">
        <view
          :class="classPrefix + '-text ' + classPrefix + '-inline'"
          :data-raw="item.raw"
        >
          <block v-if="item.tokens && item.tokens.length">
            <chat-markdown-node :nodes="item.tokens" />
          </block>
          <block v-else>
            {{ '' + item.raw + '' }}
          </block>
        </view>
      </block>

      <block v-else-if="item.type === 'strong'">
        <view :class="classPrefix + '-strong ' + classPrefix + '-inline'">
          <block v-if="item.tokens && item.tokens.length">
            <chat-markdown-node :nodes="item.tokens" />
          </block>
          <block v-else>
            {{ '' + item.text + '' }}
          </block>
        </view>
      </block>

      <block v-else-if="item.type === 'em'">
        <view :class="classPrefix + '-em ' + classPrefix + '-inline'">
          <block v-if="item.tokens && item.tokens.length">
            <chat-markdown-node :nodes="item.tokens" />
          </block>
          <block v-else>
            {{ '' + item.text + '' }}
          </block>
        </view>
      </block>

      <block v-else-if="item.type === 'del'">
        <view :class="classPrefix + '-del ' + classPrefix + '-inline'">
          <block v-if="item.tokens && item.tokens.length">
            <chat-markdown-node :nodes="item.tokens" />
          </block>
          <block v-else>
            {{ '' + item.text + '' }}
          </block>
        </view>
      </block>

      <block v-else-if="item.type === 'link'">
        <view
          :class="classPrefix + '-link ' + classPrefix + '-inline'"
          :data-index="i"
          @tap="linkClick"
        >
          <block v-if="item.tokens && item.tokens.length">
            <chat-markdown-node :nodes="item.tokens" />
          </block>
        </view>
      </block>

      <block v-else-if="item.type === 'ref'">
        <view :class="classPrefix + '-ref ' + classPrefix + '-inline'">
          <text :class="classPrefix + '-ref-txt'">
            {{ '' + item.text + '' }}
          </text>
        </view>
      </block>

      <block v-else-if="item.type === 'space'">
        <view :class="classPrefix + '-space'" />
      </block>

      <block v-else-if="item.type === 'br'">
        <view :class="classPrefix + '-br'" />
      </block>

      <block v-else-if="item.type === 'hr'">
        <view :class="classPrefix + '-hr'" />
      </block>

      <block v-else-if="item.type === 'codespan'">
        <view
          :class="classPrefix + '-codespan ' + classPrefix + '-inline'"
          :data-type="item.type"
        >
          {{ '' + (item.text || item.raw) + '' }}
        </view>
      </block>

      <block v-else>
        <view
          :class="classPrefix + '-raw ' + classPrefix + '-inline'"
          :data-type="item.type"
        >
          {{ '' + (item.text || item.raw) + '' }}
        </view>
      </block>
    </block>
  </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import chatMarkdownTable from '../chat-markdown-table/chat-markdown-table';
import chatMarkdownCode from '../chat-markdown-code/chat-markdown-code';
import chatMarkdownNode from './chat-markdown-node';
import { SuperComponent, wxComponent, ComponentsOptionsType } from '../../../../components/common/src/index';
import config from '../../../../components/common/config';

const { prefix } = config;
const name = `${prefix}-chat-markdown`;

@wxComponent()
export default class ChatMarkdownNode extends SuperComponent {
  options: ComponentsOptionsType = {
    multipleSlots: true,
  };

  properties = {
    nodes: {
      type: Array,
      value: () => [],
    },
  };

  data = {
    classPrefix: name,
  };

  methods = {
    linkClick(e: any) {
      const { index } = e.currentTarget.dataset || {};
      const token = this.nodes?.[index];
      this.handleClick(e, 'link-tap', token);
    },

    getCareMarkdown() {
      if (this.careMarkdown) {
        return this.careMarkdown;
      }
      for (
        this.setData({
          careMarkdown: this.selectOwnerComponent(),
        });
        this.careMarkdown.__data__.name !== name;
        this.setData({
          careMarkdown: this.careMarkdown.selectOwnerComponent(),
        })
      );
      return this.careMarkdown;
    },

    handleClick(event: any, type: any, token: any) {
      // 通用点击事件
      this.getCareMarkdown().$emit('click', {
        detail: {
          event,
          node: token,
        },
      });
    },
  };

  lifetimes = {
    created() {
      this.getCareMarkdown = this.getCareMarkdown.bind(this);
      this.handleClick = this.handleClick.bind(this);
    },
    attached() {},
    detached() {},
  };
}
</script>
<style lang="less">
@import './chat-markdown-node.less';
</style>
