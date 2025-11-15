<template>
  <view :class="classPrefix">
    <view :class="classPrefix + '__container'">
      <view :class="classPrefix + '__thead'">
        <view :class="classPrefix + '__tr'">
          <block
            v-for="(th, j) in node.header"
            :key="j"
          >
            <view
              :class="classPrefix + '__th'"
              :style="'text-align:' + node.align[j] || 'left' + ';'"
            >
              <chat-markdown-node :nodes="th.tokens" />
            </view>
          </block>
        </view>
      </view>
      <view :class="classPrefix + '__tbody'">
        <block
          v-for="(row, k) in node.rows"
          :key="k"
        >
          <view :class="classPrefix + '__tr'">
            <block
              v-for="(cell, l) in row"
              :key="l"
            >
              <view
                :class="classPrefix + '__td'"
                :style="'text-align:' + node.align[l] || 'left' + ';'"
              >
                <chat-markdown-node :nodes="cell.tokens" />
              </view>
            </block>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import zpMixins from '@/uni_modules/zp-mixins/index';
import chatMarkdownNode from '../chat-markdown-node/chat-markdown-node';
import { SuperComponent, wxComponent, ComponentsOptionsType } from '../../../../components/common/src/index';
import config from '../../../../components/common/config';

const { prefix } = config;
const name = `${prefix}-chat-markdown-table`;

@wxComponent()
export default class ChatMarkdownTable extends SuperComponent {
  options: ComponentsOptionsType = {
    multipleSlots: true,
  };

  properties = {
    node: {
      type: Object,
      value: {},
    },
  };

  data = {
    classPrefix: name,
  };
}
</script>
<style lang="less">
@import './chat-markdown-table.less';
</style>
