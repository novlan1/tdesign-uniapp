<template>
    <view>
        <t-popup
            v-if="!destroyOnClose || visible"
            :style="_._style([style, customStyle])"
            class="class"
            @visible-change="visibleChange"
            :visible="visible"
            :zIndex="zIndex"
            :usingCustomNavbar="usingCustomNavbar"
            :placement="placement == 'right' ? 'right' : 'left'"
            :showOverlay="showOverlay"
            :closeOnOverlayClick="closeOnOverlayClick"
        >
            <view :class="classPrefix">
                <slot name="title" />
                <view v-if="title" :class="classPrefix + '__title'">{{ title }}</view>
                <scroll-view :class="classPrefix + '__sidebar'" scroll-y type="list">
                    <view
                        :class="classPrefix + '__sidebar-item'"
                        :hover-class="classPrefix + '--hover'"
                        :hover-start-time="0"
                        :hover-stay-time="100"
                        wx:item="item"
                        :data-item="item"
                        :data-index="index"
                        @tap="itemClick"
                        :aria-role="ariaRole || 'button'"
                        :aria-label="item.title"
                        v-for="(item, index) in items"
                        :key="index"
                    >
                        <view :aria-hidden="true" v-if="item.icon" :class="classPrefix + '__sidebar-item-icon'"><t-icon :name="item.icon" /></view>

                        <view :class="classPrefix + '__sidebar-item-title'">{{ item.title }}</view>
                    </view>
                </scroll-view>
                <view :class="classPrefix + '__footer'">
                    <slot />
                    <slot name="footer" />
                </view>
            </view>
        </t-popup>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tPopup from "../popup/popup";
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import useCustomNavbar from "../mixins/using-custom-navbar";
const {
  prefix: prefix
} = config;
const name = `${prefix}-drawer`;
let Drawer = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.behaviors = [useCustomNavbar];
    this.externalClasses = [];
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.setData({
      classPrefix: name
    });
    this.methods = {
      visibleChange({
        detail: e
      }) {
        const {
          visible: t
        } = e;
        const {
          showOverlay: r
        } = this;
        this.setData({
          visible: t
        });
        t || this.$emit("close", {
          detail: {
            trigger: "overlay"
          }
        });
        if (r) {
          this.$emit("overlay-click", {
            detail: {
              visible: t
            }
          });
        }
      },
      itemClick(e) {
        const {
          index: t,
          item: r
        } = e.currentTarget.dataset;
        this.$emit("item-click", {
          detail: {
            index: t,
            item: r
          }
        });
      }
    };
  }
};
Drawer = __decorate([wxComponent()], Drawer);
export default Drawer;
</script>
<style>
@import './drawer.css';
</style>
