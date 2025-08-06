<template>
  <view
    :style="_._style([style, customStyle, show ? '' : 'display: none', inheritColor ? 'color: inherit' : ''])"
    :class="'class ' + prefix + '-class ' + classPrefix + ' ' + (classPrefix + '--' + layout) + ' ' + (fullscreen ? classPrefix + '--fullscreen' : '')"
  >
    <view
      v-if="indicator"
      :class="prefix + '-class-indicator ' + classPrefix + '__spinner ' + classPrefix + '__spinner--' + theme + ' ' + (reverse ? 'reverse' : '')"
      :style="
        'width: ' +
          _.addUnit(size) +
          '; height: ' +
          _.addUnit(size) +
          '; ' +
          (inheritColor ? 'color: inherit;' : '') +
          ' ' +
          (indicator ? '' : 'display: none;') +
          ' ' +
          (duration ? 'animation-duration: ' + duration / 1000 + 's;' : '') +
          ' animation-play-state: ' +
          (pause ? 'paused' : 'running') +
          ';'
      "
      :aria-role="ariaRole || 'img'"
      :aria-label="ariaLabel || text || '加载中'"
    >
      <view
v-for="(item, index) in 12"
v-if="theme === 'spinner'"
:key="index" :class="classPrefix + '__dot ' + classPrefix + '__dot-' + index"
/>
      <view
v-if="theme === 'circular'"
            :class="classPrefix + '__circular'"
/>
      <block v-if="theme === 'dots'">
        <view
          :class="classPrefix + '__dot'"
          :style="
            (duration ? 'animation-duration: ' + duration / 1000 + 's; animation-delay:' + 0 + 's;' : '') +
              ' animation-play-state: ' +
              (pause ? 'paused' : 'running') +
              ';'
          "
        />
        <view
          :class="classPrefix + '__dot'"
          :style="
            (duration ? 'animation-duration: ' + duration / 1000 + 's; animation-delay:' + (duration * 1) / 3000 + 's;' : '') +
              ' animation-play-state: ' +
              (pause ? 'paused' : 'running') +
              ';'
          "
        />
        <view
          :class="classPrefix + '__dot'"
          :style="
            (duration ? 'animation-duration: ' + duration / 1000 + 's; animation-delay:' + (duration * 2) / 3000 + 's;' : '') +
              ' animation-play-state: ' +
              (pause ? 'paused' : 'running') +
              ';'
          "
        />
      </block>
      <slot name="indicator" />
    </view>
    <view
:class="_.cls(classPrefix + '__text', [layout]) + ' ' + prefix + '-class-text'"
          :aria-hidden="indicator"
:aria-label="ariaLabel || text"
>
      <block v-if="text">
        {{ text }}
      </block>
      <slot name="text" />
      <slot />
    </view>
  </view>
</template>
<script>
import { __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { initTDesign } from '../common/runtime';
import _ from '../common/utils.wxs';
const {
  prefix: prefix
} = config;
const name = `${prefix}-loading`;
let Loading = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-text`, `${prefix}-class-indicator`];
    this.setData({
      prefix: prefix,
      classPrefix: name,
      show: true
    });
    this.options = {
      multipleSlots: true
    };
    this.props = props;
    this._ = _;
    // this = Object.assign({}, props);
    this.timer = null;
    this.observers = {
      loading(e) {
        const {
          delay: t
        } = this;
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (e && t) {
          this.timer = setTimeout(() => {
            this.setData({
              show: e
            });
            this.timer = null;
          }, t);
        } else {
          this.setData({
            show: e
          });
        }
      }
    };
    this.lifetimes = {
      detached() {
        clearTimeout(this.timer);
      }
    };
  }
  refreshPage() {
    this.$emit("reload");
  }
};
Loading = initTDesign(__decorate([wxComponent()], Loading));
console.log('loading', Loading)
export default Loading;
</script>
<style>
@import './loading.css';
</style>
