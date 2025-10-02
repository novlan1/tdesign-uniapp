<template>
    <!-- template没有找到这个wxml，已注释 -->
  <DraggableTemplate v-if="draggable"
    :prefix="prefix"
    :classPrefix="classPrefix"
    :style="style"
    :customStyle="customStyle"
    :moveStyle="moveStyle"
    :draggable="draggable"
    :buttonData="buttonData"
    @start="onStart"
    @move="onMove"
    @end="onEnd"
    @tap="onTplButtonTap"
  />
  <ViewTemplate 
  v-else
    :prefix="prefix"
    :classPrefix="classPrefix"
    :style="style"
    :customStyle="customStyle"
    :buttonData="buttonData"
    :buttonLayout="buttonLayout"
    :disabled="disabled"
    :loading="loading"
    :loadingProps="loadingProps"
    :ghost="ghost"
    :shape="shape"
    :size="size"
    :variant="variant"
    :icon="icon"
    :content="content"
    :ariaLabel="ariaLabel"
    :index="index"
    :customDataset="customDataset"
    :openType="openType"
    :hoverClass="hoverClass"
    :hoverStopPropagation="hoverStopPropagation"
    :hoverStartTime="hoverStartTime"
    :hoverStayTime="hoverStayTime"
    :lang="lang"
    :sessionFrom="sessionFrom"
    :sendMessageTitle="sendMessageTitle"
    :sendMessagePath="sendMessagePath"
    :sendMessageImg="sendMessageImg"
    :appParameter="appParameter"
    :showMessageCard="showMessageCard"
  />
    <!-- <template :is="draggable ? 'draggable' : 'view'" :data="prefix, classPrefix, style, customStyle, moveStyle, draggable, buttonData"/> -->
</template>

<script>
import tButton from "../button/button";
import tDraggable from "./draggable/draggable";
import { __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import useCustomNavbar from "../mixins/using-custom-navbar";
import { unitConvert, systemInfo } from "../common/utils";
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';
import DraggableTemplate from './template/draggable.vue';
import ViewTemplate from './template/view.vue';

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
    this.properties = props;;
    this.externalClasses = ["class", `${prefix}-class`, `${prefix}-class-button`];
    this.setData({
      prefix: prefix,
      classPrefix: name,
      buttonData: baseButtonProps,
      moveStyle: null
    });
    this.components = {
      DraggableTemplate,
      ViewTemplate,
      tButton,
      tDraggable
    }
    this._ = _;
    this.watch = {
      text: {
        handler(val) {
          this.content = val;
        },
        immediate: true,
      }
    }
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
Fab = initTDesign(__decorate([wxComponent()], Fab));
export default Fab;
</script>
<style>
@import './fab.css';
</style>
