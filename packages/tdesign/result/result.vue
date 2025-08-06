<template>
  <view
    :style="_._style([style, customStyle])"
    :class="classPrefix + ' ' + classPrefix + '--theme-' + theme + ' class ' + prefix + '-class'"
  >
    <view
      :aria-hidden="true"
      :class="classPrefix + '__thumb'"
    >
      <t-image
        v-if="image"
        :t-class="prefix + '-class-image'"
        :src="image"
        mode="aspectFit"
      />
      <!-- parse <template v-else-if="_icon" is="icon" :data="tClass: classPrefix + '__icon', ..._icon"/> -->
      <block
        v-else-if="_icon"
        name="icon"
      >
        <t-icon
          :style="style || ''"
          :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
          :prefix="prefix || ''"
          :name="'close' || ''"
          :size="22 || ''"
          :color="color || ''"
          :aria-hidden="true || ''"
          :aria-label="'清除' || ''"
          :aria-role="'button' || ''"
          @click="bindclick || ''"
        />
      </block>
      <slot name="image" />
    </view>
    <view :class="classPrefix + '__title ' + prefix + '-class-title'">
      <block v-if="title">
        {{ title }}
      </block>
      <slot name="title" />
    </view>
    <view :class="classPrefix + '__description ' + prefix + '-class-description'">
      <block v-if="description">
        {{ description }}
      </block>
      <slot name="description" />
    </view>
  </view>
</template>

<script>
import tIcon from '../icon/icon';
import tImage from '../image/image';
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import props from './props';
import config from '../common/config';
import { calcIcon } from '../common/utils';
import { setData } from 'src/miniprogram_dist_uni/uni_modules/zp-mixins/methods/setData.js';
const {
  prefix: prefix,
} = config;
const name = `${prefix}-result`;
const THEME_ICON = {
  default: 'error-circle',
  success: 'check-circle',
  warning: 'error-circle',
  error: 'close-circle',
};
let default_1 = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true,
    };
    console.log('this', this, this.setData);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-image`, `${prefix}-class-title`, `${prefix}-class-description`];
    this.setData = setData.bind(this);
    this.classPrefix = name;

    this.prefix = prefix;
    // this = props;
    this.setData({
      prefix,
      classPrefix: name,
    });
    this.data = function () {
      return {
        classPrefix: name,
      };
    };
    this.lifetimes = {
      ready() {
        this.initIcon();
      },
    };
    this.observers = {
      'icon, theme'() {
        this.initIcon();
      },
    };
    this.methods = {
      setData,
      initIcon() {
        const {
          icon: e,
          theme: o,
        } = this;
        this.setData({
          _icon: calcIcon(e, THEME_ICON[o]),
        });
      },
    };
  }
};
default_1 = __decorate([wxComponent()], default_1);
default_1.data = function () {
  return {};
};
console.log('default_1', default_1);
export default default_1;
</script>
<script module="_" lang="wxs" src="../common/utils.wxs"></script>
<style>
@import './result.css';
</style>
