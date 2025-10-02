<template>
    <view
        :class="'class ' + tClass + ' ' + _.cls(classPrefix, [span]) + ' ' + (offset ? classPrefix + '--offset-' + offset : '')"
        :style="getColStyles(gutter, style, customStyle)"
    >
        <slot />
    </view>
</template>
<script>
import { __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import _ from '../common/utils.wxs';
import { getColStyles } from './col.wxs';
import { initTDesign } from '../common/runtime';

const {
  prefix: prefix
} = config;
const name = `${prefix}-col`;
let Col = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.properties = {
      ...props,
      'tClass': {
        type: String,
        value: ''
      }
    };;
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this._ = _;
    this.getColStyles = getColStyles;
    this.relations = {
      "../row/row": {
        type: "parent"
      }
    };
  }
};
Col = initTDesign(__decorate([wxComponent()], Col));
export default Col;
</script>
<style>
@import './col.css';
</style>
