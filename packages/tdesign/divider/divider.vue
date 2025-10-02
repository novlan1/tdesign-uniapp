<template>
    <view :class="layout === 'vertical' ? classPrefix + '--vertical-center' : ''">
        <view
            :class="classPrefix + ' class ' + prefix + '-class ' + classPrefix + '--' + layout + ' ' + classPrefix + '--' + align + ' ' + (dashed ? classPrefix + '--dashed' : '')"
            :style="_._style([dividerStyle, style, customStyle])"
        >
            <view :class="prefix + '-class-content ' + classPrefix + '__content'">
                <view v-if="content">{{ content }}</view>
                <slot v-else name="content" />
            </view>
        </view>
    </view>
</template>
<script>
import { __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';


const {
  prefix: prefix
} = config;
const name = `${prefix}-divider`;
let Divider = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`];
    this.options = {
      multipleSlots: true
    };
    this._ = _;
    this.properties = props;;
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.observers = {
      lineColor() {
        this.setStyle();
      }
    };
    this.methods = {
      setStyle() {
        const {
          lineColor: e
        } = this;
        const o = "" + (e ? `border-color: ${e};` : "");
        this.setData({
          dividerStyle: o
        });
      }
    };
  }
};
Divider = initTDesign(__decorate([wxComponent()], Divider));
export default Divider;
</script>
<style>
@import './divider.css';
</style>
