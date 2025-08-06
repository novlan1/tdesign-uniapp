<template>
    <view v-if="wrapperVisible" :class="classPrefix + ' class ' + prefix + '-class'" :style="_._style([_this.getStyles(top, zIndex), style, customStyle])">
        <view
            :class="classPrefix + '__mask'"
            v-if="show"
            :style="_._style(['height:' + maskHeight + 'px', style, customStyle])"
            @tap="handleMaskClick"
            @touchmove.stop.prevent="closeDropdown"
        ></view>
        <t-popup
            :visible="show"
            :z-index="zIndex + 1"
            :duration="duration"
            :show-overlay="showOverlay"
            custom-style="position: absolute"
            :overlay-props=""
            @leaved="onLeaved"
            @visible-change="handleMaskClick"
            :t-class="classPrefix + '__popup-host'"
            :t-class-content="classPrefix + '__content ' + prefix + '-class-content'"
        >
            <view :class="classPrefix + '__body'">
                <scroll-view v-if="!multiple && options && options.length > 0" :class="classPrefix + '__scroll'" scroll-y :scroll-into-view="'id_' + value">
                    <t-radio-group
                        :class="classPrefix + '__radio ' + prefix + '-class-column'"
                        :t-class="classPrefix + '__radio-group'"
                        :style="'grid-template-columns: repeat(' + optionsColumns + ', 1fr)'"
                        :value="value"
                        @change="handleRadioChange"
                    >
                        <view :id="'id_' + item[valueAlias]" v-for="(item, index) in options" :key="index">
                            <t-radio
                                :placement="placement"
                                tabindex="0"
                                icon="line"
                                :class="classPrefix + '__radio-item ' + prefix + '-class-column-item'"
                                t-class="radio"
                                :t-class-label="prefix + '-class-column-item-label'"
                                :value="item[valueAlias]"
                                :label="item[labelAlias]"
                                :disabled="item.disabled"
                            />
                        </view>
                    </t-radio-group>
                </scroll-view>
                <scroll-view v-if="multiple && options && options.length > 0" :class="classPrefix + '__scroll'" scroll-y :scroll-into-view="'id_' + firstCheckedValue">
                    <t-checkbox-group
                        :class="classPrefix + '__checkbox ' + prefix + '-class-column'"
                        :t-class="classPrefix + '__checkbox-group'"
                        :style="'grid-template-columns: repeat(' + optionsColumns + ', 1fr)'"
                        :value="value ? value : []"
                        @change="handleRadioChange"
                    >
                        <view :id="'id_' + item[valueAlias]" v-for="(item, index) in options" :key="index">
                            <t-checkbox
                                tabindex="0"
                                :class="classPrefix + '__checkbox-item ' + prefix + '-class-column-item'"
                                theme="tag"
                                :value="item[valueAlias]"
                                :label="item[labelAlias]"
                                :disabled="item.disabled"
                            ></t-checkbox>
                        </view>
                    </t-checkbox-group>
                </scroll-view>
                <slot />
            </view>
            <view :class="classPrefix + '__footer ' + prefix + '-class-footer'">
                <slot name="footer" />
                <block v-if="multiple">
                    <t-button
                        block
                        :class="classPrefix + '__footer-btn ' + classPrefix + '__reset-btn'"
                        theme="light"
                        content="重置"
                        :disabled="value.length == 0"
                        @tap.native="handleReset"
                    />
                    <t-button
                        block
                        :class="classPrefix + '__footer-btn ' + classPrefix + '__confirm-btn'"
                        theme="primary"
                        content="确定"
                        :disabled="value.length == 0"
                        @tap.native="handleConfirm"
                    />
                </block>
            </view>
        </t-popup>
    </view>
</template>
<script module="_this" lang="wxs" src="@/dropdown-item/index.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tButton from "../button/button";
import tRadio from "../radio/radio";
import tRadioGroup from "../radio-group/radio-group";
import tCheckbox from "../checkbox/checkbox";
import tCheckboxGroup from "../checkbox-group/checkbox-group";
import tPopup from "../popup/popup";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import menuProps from "../dropdown-menu/props";
import { getRect } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-dropdown-item`;
let DropdownMenuItem = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true
    };
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-column`, `${prefix}-class-column-item`, `${prefix}-class-column-item-label`, `${prefix}-class-footer`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      show: false,
      top: 0,
      maskHeight: 0,
      initValue: null,
      hasChanged: false,
      duration: menuProps.duration.value,
      zIndex: menuProps.zIndex.value,
      overlay: menuProps.showOverlay.value,
      labelAlias: "label",
      valueAlias: "value",
      computedLabel: "",
      firstCheckedValue: ""
    });
    this.relations = {
      "../dropdown-menu/dropdown-menu": {
        type: "parent",
        linked(e) {
          const {
            zIndex: t,
            duration: a,
            showOverlay: s
          } = e.properties;
          this.setData({
            zIndex: t,
            duration: a,
            showOverlay: s
          });
        }
      }
    };
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.observers = {
      keys(e) {
        this.setData({
          labelAlias: e.label || "label",
          valueAlias: e.value || "value"
        });
      },
      value(e) {
        const {
          options: t,
          labelAlias: a,
          valueAlias: s
        } = this;
        if (this.multiple && !Array.isArray(e)) {
          throw TypeError("应传入数组类型的 value");
        }
        const o = t.find(t => t[s] === e);
        if (o) {
          this.setData({
            computedLabel: o[a]
          });
        }
      },
      "label, computedLabel, disabled"() {
        var e;
        null === (e = this.$parent) || void 0 === e || e.getAllItems();
      },
      show(e) {
        if (e) {
          this.getParentBottom(() => {
            this.setData({
              wrapperVisible: true
            });
          });
        }
      }
    };
    this.methods = {
      closeDropdown() {
        var e;
        null === (e = this.$parent) || void 0 === e || e.setData({
          activeIdx: -1
        });
        this.setData({
          show: false
        });
        this.$emit("close");
      },
      getParentBottom(e) {
        getRect(this.$parent, `#${prefix}-bar`).then(t => {
          this.setData({
            top: t.bottom,
            maskHeight: t.top
          }, e);
        });
      },
      handleTreeClick(e) {
        const {
          level: t,
          value: a
        } = e.currentTarget.dataset;
        const {
          value: s
        } = this;
        s[t] = a;
        this._trigger("change", {
          value: s
        });
      },
      handleRadioChange(e) {
        const {
          value: t
        } = e.detail;
        this._trigger("change", {
          value: t
        });
        if (this.multiple) {
          const e = this.options.find(e => t.includes(e.value));
          if (e) {
            this.firstCheckedValue = e.value;
          }
        } else {
          this.closeDropdown();
        }
      },
      handleMaskClick() {
        var e;
        if (null === (e = this.$parent) || void 0 === e ? void 0 : e.properties.closeOnClickOverlay) {
          this.closeDropdown();
        }
      },
      handleReset() {
        this._trigger("change", {
          value: []
        });
        this._trigger("reset");
      },
      handleConfirm() {
        this._trigger("confirm", {
          value: this.value
        });
        this.closeDropdown();
        this.setData({
          firstCheckedValue: this.firstCheckedValue
        });
      },
      onLeaved() {
        this.setData({
          wrapperVisible: false
        });
      }
    };
  }
};
DropdownMenuItem = __decorate([wxComponent()], DropdownMenuItem);
export default DropdownMenuItem;
</script>
<style>
@import './dropdown-item.css';
</style>
