<template>
    <!-- template没有找到这个wxml，已注释 -->
    <!-- <template :is="draggable ? 'draggable' : 'view'" :data="prefix, classPrefix, style, customStyle, moveStyle, draggable, buttonData"/> -->
</template>

<script>
import tButton from "../button/button";
import tDraggable from "./draggable/draggable";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import useCustomNavbar from "../mixins/using-custom-navbar";
import { unitConvert, systemInfo } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-fab`;
const baseButtonProps = {
  size: "large",
  shape: "circle",
  theme: "primary",
  tClass: `${prefix}-fab__button`
};
let Fab = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.behaviors = [useCustomNavbar];
    this = props;
    this.externalClasses = ["class", `${prefix}-class`, `${prefix}-class-button`];
    this.setData({
      prefix: prefix,
      classPrefix: name,
      buttonData: baseButtonProps,
      moveStyle: null
    });
    this.observers = {
      "buttonProps.**, icon, text, ariaLabel, yBounds"() {
        var t;
        this.setData({
          buttonData: Object.assign(Object.assign(Object.assign(Object.assign({}, baseButtonProps), {
            shape: this.text ? "round" : "circle"
          }), this.buttonProps), {
            icon: this.icon,
            content: this.text,
            ariaLabel: this.ariaLabel
          })
        }, null === (t = this.computedSize) || void 0 === t ? void 0 : t.bind(this));
      }
    };
    this.methods = {
      onTplButtonTap(t) {
        this.$emit("click", {
          detail: t
        });
      },
      onStart(t) {
        this.$emit("dragstart", {
          detail: t.detail.e
        });
      },
      onMove(t) {
        const {
          yBounds: e
        } = this;
        const {
          distanceTop: o
        } = this;
        const {
          x: s,
          y: i,
          rect: r
        } = t.detail;
        const a = systemInfo.windowWidth - r.width;
        const n = systemInfo.windowHeight - Math.max(o, unitConvert(e[0])) - r.height;
        const p = Math.max(0, Math.min(s, a));
        const m = Math.max(0, unitConvert(e[1]), Math.min(i, n));
        this.setData({
          moveStyle: `right: ${p}px; bottom: ${m}px;`
        });
      },
      onEnd(t) {
        this.$emit("dragend", {
          detail: t.detail.e
        });
      },
      computedSize() {
        var t;
        var e;
        if (!this.draggable) {
          return;
        }
        const o = this.zpSelectComponent("#draggable");
        (null === (e = null === (t = this) || void 0 === t ? void 0 : t.yBounds) || void 0 === e ? void 0 : e[1]) ? this.setData({
          moveStyle: `bottom: ${unitConvert(this.yBounds[1])}px`
        }, o.computedRect) : o.computedRect();
      }
    };
  }
};
Fab = __decorate([wxComponent()], Fab);
export default Fab;
</script>
<style>
@import './fab.css';
</style>
