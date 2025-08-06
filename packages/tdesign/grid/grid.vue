<template>
    <view :style="_._style([style, customStyle])" :class="_.cls(classPrefix, [theme]) + ' class ' + prefix + '-class'">
        <view v-if="column > 0" :class="classPrefix + '__content'" :style="contentStyle"><slot /></view>
        <scroll-view v-else scroll-x scroll-with-animation :class="classPrefix + '__content'" :style="'white-space: nowrap;' + contentStyle"><slot /></scroll-view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import { isObject } from "../common/validator";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-grid`;
let Grid = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = ["t-class"];
    this.relations = {
      "../grid-item/grid-item": {
        type: "descendant"
      }
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      contentStyle: ""
    });
    this.observers = {
      "column,hover,align,gutter,border"() {
        this.updateContentStyle();
        this.doForChild(t => t.updateStyle());
      }
    };
    this.lifetimes = {
      attached() {
        this.updateContentStyle();
      }
    };
    this.methods = {
      doForChild(t) {
        this.$children.forEach(t);
      },
      updateContentStyle() {
        const t = [];
        const e = this.getContentMargin();
        if (e) {
          t.push(e);
        }
        this.setData({
          contentStyle: t.join(";")
        });
      },
      getContentMargin() {
        const {
          gutter: t
        } = this;
        let {
          border: e
        } = this;
        if (!e) {
          return `margin-left:-${t}rpx; margin-top:-${t}rpx`;
        }
        isObject(e) || (e = {});
        const {
          width: r = 2
        } = e;
        return `margin-left:-${r}rpx; margin-top:-${r}rpx`;
      }
    };
  }
};
Grid = __decorate([wxComponent()], Grid);
export default Grid;
</script>
<style>
@import './grid.css';
</style>
