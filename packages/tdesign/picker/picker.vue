<template>
    <view>
        <t-popup
            v-if="usePopup"
            class="class"
            :visible="visible"
            placement="bottom"
            :using-custom-navbar="usingCustomNavbar || popupProps.usingCustomNavbar"
            :z-index="popupProps.zIndex || defaultPopUpzIndex"
            :overlay-props="popupProps.overlayProps || defaultPopUpProps"
            @visible-change="onPopupChange"
        >
            <!-- parse <include src="./template.wxml"/> -->
            <block>
                <view slot="content" :style="_._style([style, customStyle])" :class="classPrefix + ' ' + prefix + '-class'">
                    <view :class="classPrefix + '__toolbar'" v-if="header">
                        <view :class="classPrefix + '__cancel ' + prefix + '-class-cancel'" v-if="cancelBtn" @tap="onCancel">{{ cancelBtn }}</view>
                        <view :class="classPrefix + '__title ' + prefix + '-class-title'">{{ title }}</view>
                        <view :class="classPrefix + '__confirm ' + prefix + '-class-confirm'" v-if="confirmBtn" @tap="onConfirm">{{ confirmBtn }}</view>
                    </view>
                    <slot name="header" />
                    <slot name="content" />
                    <view :class="_.cls(classPrefix + '__main', [])">
                        <slot />
                        <view :class="classPrefix + '__mask ' + classPrefix + '__mask--top'" />
                        <view :class="classPrefix + '__mask ' + classPrefix + '__mask--bottom'" />
                        <view :class="classPrefix + '__indicator'" :style="'height: ' + pickItemHeight + 'px'"></view>
                    </view>
                    <slot name="footer" />
                </view>
            </block>
        </t-popup>
        <block v-else>
            <!-- parse <include src="./template.wxml"/> -->
            <block>
                <view slot="content" :style="_._style([style, customStyle])" :class="classPrefix + ' ' + prefix + '-class'">
                    <view :class="classPrefix + '__toolbar'" v-if="header">
                        <view :class="classPrefix + '__cancel ' + prefix + '-class-cancel'" v-if="cancelBtn" @tap="onCancel">{{ cancelBtn }}</view>
                        <view :class="classPrefix + '__title ' + prefix + '-class-title'">{{ title }}</view>
                        <view :class="classPrefix + '__confirm ' + prefix + '-class-confirm'" v-if="confirmBtn" @tap="onConfirm">{{ confirmBtn }}</view>
                    </view>
                    <slot name="header" />
                    <slot name="content" />
                    <view :class="_.cls(classPrefix + '__main', [])">
                        <slot />
                        <view :class="classPrefix + '__mask ' + classPrefix + '__mask--top'" />
                        <view :class="classPrefix + '__mask ' + classPrefix + '__mask--bottom'" />
                        <view :class="classPrefix + '__indicator'" :style="'height: ' + pickItemHeight + 'px'"></view>
                    </view>
                    <slot name="footer" />
                </view>
            </block>
        </block>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tPopup from "../popup/popup";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import { rpx2px } from "../common/utils";
import config from "../common/config";
import props from "./props";
import useCustomNavbar from "../mixins/using-custom-navbar";
const {
  prefix: prefix
} = config;
const name = `${prefix}-picker`;
let Picker = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.behaviors = [useCustomNavbar];
    this = props;
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-confirm`, `${prefix}-class-cancel`, `${prefix}-class-title`];
    this.options = {
      multipleSlots: true
    };
    this.relations = {
      "../picker-item/picker-item": {
        type: "child",
        linked() {
          this.updateChildren();
        }
      }
    };
    this.observers = {
      "value, visible"() {
        this.updateChildren();
      }
    };
    this.lifetimes = {
      attached() {
        this.setData({
          pickItemHeight: rpx2px(this.itemHeight)
        });
      }
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      defaultPopUpProps: {},
      defaultPopUpzIndex: 11500,
      pickItemHeight: 0
    });
    this.methods = {
      updateChildren() {
        const {
          pickItemHeight: e
        } = this;
        const {
          value: t,
          defaultValue: i
        } = this;
        this.$children.forEach((s, r) => {
          var l;
          var n;
          s.setData({
            value: null !== (n = null !== (l = null == t ? void 0 : t[r]) && void 0 !== l ? l : null == i ? void 0 : i[r]) && void 0 !== n ? n : "",
            columnIndex: r,
            pickItemHeight: e
          });
          s.update();
        });
      },
      getSelectedValue() {
        return [this.$children.map(e => e._selectedValue), this.$children.map(e => e._selectedLabel)];
      },
      getColumnIndexes() {
        return this.$children.map((e, t) => ({
          column: t,
          index: e._selectedIndex
        }));
      },
      onConfirm() {
        const [e, t] = this.getSelectedValue();
        const i = this.getColumnIndexes();
        this.close("confirm-btn");
        this.$emit("confirm", {
          detail: {
            value: e,
            label: t,
            columns: i
          }
        });
        if (JSON.stringify(this.value) !== JSON.stringify(e)) {
          this.$emit("change", {
            detail: {
              value: e,
              label: t,
              columns: i
            }
          });
        }
      },
      triggerColumnChange({
        column: e,
        index: t
      }) {
        const [i, s] = this.getSelectedValue();
        this.$emit("pick", {
          detail: {
            value: i,
            label: s,
            column: e,
            index: t
          }
        });
      },
      onCancel() {
        this.close("cancel-btn");
        this.$emit("cancel");
      },
      onPopupChange(e) {
        const {
          visible: t
        } = e.detail;
        this.close("overlay");
        this.$emit("visible-change", {
          detail: {
            visible: t
          }
        });
      },
      close(e) {
        if (this.autoClose) {
          this.setData({
            visible: false
          });
        }
        this.$emit("close", {
          detail: {
            trigger: e
          }
        });
      }
    };
  }
  ready() {
    this.$children.map((e, t) => e.columnIndex = t);
  }
};
Picker = __decorate([wxComponent()], Picker);
export default Picker;
</script>
<style>
@import './picker.css';
</style>
