<template>
    <view :class="_.cls(classPrefix, [['fixed', fixed]]) + ' ' + visibleClass + ' class ' + prefix + '-class'" :style="_._style([boxStyle, style, customStyle])">
        <view v-if="fixed" :class="classPrefix + '__placeholder ' + prefix + '-class-placeholder'" />
        <view :class="classPrefix + '__content ' + prefix + '-class-content'">
            <view :class="classPrefix + '__left ' + (hideLeft ? classPrefix + '__left--hide' : '') + ' ' + prefix + '-class-left'">
                <view v-if="leftArrow" :class="classPrefix + '__btn'" @tap="goBack" aria-role="button" aria-label="返回">
                    <t-icon name="chevron-left" :class="classPrefix + '__left-arrow'" />
                </view>
                <slot name="left" />
                <view :class="classPrefix + '__capsule ' + prefix + '-class-capsule'"><slot name="capsule" /></view>
            </view>
            <view :class="classPrefix + '__center ' + (hideCenter ? classPrefix + '__center--hide' : '') + ' ' + prefix + '-class-center'">
                <slot name="title" />
                <text v-if="title" :class="classPrefix + '__center-title ' + prefix + '-class-title'">{{ showTitle }}</text>
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import { getRect, systemInfo } from "../common/utils";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-navbar`;
let Navbar = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-placeholder`, `${prefix}-class-content`, `${prefix}-class-title`, `${prefix}-class-left`, `${prefix}-class-center`, `${prefix}-class-left-icon`, `${prefix}-class-home-icon`, `${prefix}-class-capsule`, `${prefix}-class-nav-btn`];
    this.timer = null;
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.observers = {
      visible(t) {
        const {
          animation: e
        } = this;
        const i = `${name}${t ? "--visible" : "--hide"}`;
        this.setData({
          visibleClass: `${i}${e ? "-animation" : ""}`
        });
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (e) {
          this.timer = setTimeout(() => {
            this.setData({
              visibleClass: i
            });
          }, 300);
        }
      },
      "title,titleMaxLength"() {
        const {
          title: t
        } = this;
        const e = this.titleMaxLength || Number.MAX_SAFE_INTEGER;
        let i = t.slice(0, e);
        if (e < t.length) {
          i += "...";
        }
        this.setData({
          showTitle: i
        });
      }
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      boxStyle: "",
      showTitle: "",
      hideLeft: false,
      hideCenter: false,
      _menuRect: null,
      _leftRect: null,
      _boxStyle: {}
    });
    this.methods = {
      initStyle() {
        this.getMenuRect();
        const {
          _menuRect: t,
          _leftRect: e
        } = this;
        if (!t || !e || !systemInfo) {
          return;
        }
        const i = {
          "--td-navbar-padding-top": `${systemInfo.statusBarHeight}px`,
          "--td-navbar-right": systemInfo.windowWidth - t.left + "px",
          "--td-navbar-left-max-width": `${t.left}px`,
          "--td-navbar-capsule-height": `${t.height}px`,
          "--td-navbar-capsule-width": `${t.width}px`,
          "--td-navbar-height": `${2 * (t.top - systemInfo.statusBarHeight) + t.height}px`
        };
        this.calcCenterStyle(e, t, i);
      },
      calcCenterStyle(t, e, i) {
        const n = Math.max(t.right, systemInfo.windowWidth - e.left);
        const s = Object.assign(Object.assign({}, i), {
          "--td-navbar-center-left": `${n}px`,
          "--td-navbar-center-width": `${Math.max(e.left - n, 0)}px`
        });
        const a = Object.entries(s).map(([t, e]) => `${t}: ${e}`).join("; ");
        this.setData({
          boxStyle: a,
          _boxStyle: s
        });
      },
      getLeftRect() {
        getRect(this, `.${name}__left`).then(t => {
          if (t.right > this._leftRect.right) {
            this.calcCenterStyle(t, this._menuRect, this._boxStyle);
          }
        });
      },
      getMenuRect() {
        if (uni.getMenuButtonBoundingClientRect) {
          const t = uni.getMenuButtonBoundingClientRect();
          this.setData({
            _menuRect: t,
            _leftRect: {
              right: systemInfo.windowWidth - t.left
            }
          });
        }
      },
      onMenuButtonBoundingClientRectWeightChange() {
        if (uni.onMenuButtonBoundingClientRectWeightChange) {
          uni.onMenuButtonBoundingClientRectWeightChange(t => this.queryElements(t));
        }
      },
      offMenuButtonBoundingClientRectWeightChange() {
        if (uni.offMenuButtonBoundingClientRectWeightChange) {
          uni.offMenuButtonBoundingClientRectWeightChange(t => this.queryElements(t));
        }
      },
      queryElements(t) {
        Promise.all([getRect(this, `.${this.classPrefix}__left`), getRect(this, `.${this.classPrefix}__center`)]).then(([e, i]) => {
          Math.round(e.right) > t.left ? this.setData({
            hideLeft: true,
            hideCenter: true
          }) : Math.round(i.right) > t.left ? this.setData({
            hideLeft: false,
            hideCenter: true
          }) : this.setData({
            hideLeft: false,
            hideCenter: false
          });
        });
      },
      goBack() {
        const {
          delta: t
        } = this;
        const that = this;
        this.$emit("go-back");
        if (t > 0) {
          uni.navigateBack({
            delta: t,
            fail(t) {
              that.$emit("fail", {
                detail: t
              });
            },
            complete(t) {
              that.$emit("complete", {
                detail: t
              });
            },
            success(t) {
              that.$emit("success", {
                detail: t
              });
            }
          });
        }
      }
    };
  }
  attached() {
    this.initStyle();
    this.getLeftRect();
    this.onMenuButtonBoundingClientRectWeightChange();
  }
  detached() {
    this.offMenuButtonBoundingClientRectWeightChange();
  }
};
Navbar = __decorate([wxComponent()], Navbar);
export default Navbar;
</script>
<style>
@import './navbar.css';
</style>
