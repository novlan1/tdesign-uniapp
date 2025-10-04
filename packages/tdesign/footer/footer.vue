<template>
  <view
    :style="_._style([style, customStyle])"
    :class="classPrefix + ' class ' + prefix + '-class'"
  >
    <block v-if="logo">
      <view :class="classPrefix + '__logo'">
        <t-image
          v-if="logo.icon"
          :t-class="classPrefix + '__icon'"
          :src="logo.icon"
        />
        <view
          v-if="logo.title"
          :class="classPrefix + '__title'"
        >
          {{ logo.title }}
        </view>
        <t-image
          v-else-if="logo.url"
          :t-class="classPrefix + '__title-url'"
          :src="logo.url"
          mode="widthFix"
        />
      </view>
    </block>
    <block v-else>
      <view
        v-if="links.length > 0"
        :class="classPrefix + '__link-list'"
      >
        <block
          v-for="(item, index) in links"
          :key="index"
        >
          <navigator
            :url="item.url"
            :open-type="item.openType"
            hover-class="none"
            :class="classPrefix + '__link-item'"
          >
            {{ item.name }}
          </navigator>

          <view
            v-if="index !== links.length - 1"
            :aria-hidden="true"
            :class="classPrefix + '__link-line'"
          >
            |
          </view>
        </block>
      </view>
      <view :class="classPrefix + '__text'">
        {{ text }}
      </view>
    </block>
  </view>
</template>
<script>
import tImage from '../image/image';
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-footer`;
let Footer = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.properties = props;
    this._ = _;
    this.components = { tImage };
    this.setData({
      prefix,
      classPrefix: name,
    });
  }
};
Footer = initTDesign(__decorate([wxComponent()], Footer));
export default Footer;
</script>
<style>
@import './footer.css';
</style>
