<template>
    <view
        :class="'class ' + prefix + '-class ' + _.cls(classPrefix, [span]) + ' ' + (offset ? classPrefix + '--offset-' + offset : '')"
        :style="utils.getColStyles(gutter, style, customStyle)"
    >
        <slot />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="utils" lang="wxs" src="@/col/col.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-col`;
let Col = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.relations = {
      "../row/row": {
        type: "parent"
      }
    };
  }
};
Col = __decorate([wxComponent()], Col);
export default Col;
</script>
<style>
@import './col.css';
</style>
