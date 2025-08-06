<template>
    <view
        v-if="!lazy || hasActivated"
        :class="'class ' + prefix + '-class ' + classPrefix + ' ' + (active ? classPrefix + '--active' : classPrefix + '--inactive')"
        :style="_._style([style, customStyle, hide ? 'display: none' : ''])"
        :id="id"
        aria-role="tabpanel"
    >
        <view v-if="panel">{{ panel }}</view>
        <slot />
        <slot name="panel" />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import props from "./props";
import config from "../common/config";
const {
  prefix: prefix
} = config;
const name = `${prefix}-tab-panel`;
let TabPanel = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.relations = {
      "../tabs/tabs": {
        type: "ancestor"
      }
    };
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      active: false,
      hide: true,
      id: "",
      hasActivated: false
    });
    this.observers = {
      "label, badgeProps, disabled, icon, panel, value, lazy"() {
        this.update();
      }
    };
  }
  setId(e) {
    this.setData({
      id: e
    });
  }
  getComputedName() {
    return null != this.value ? `${this.value}` : `${this.index}`;
  }
  update() {
    var e;
    null === (e = this.$parent) || void 0 === e || e.updateTabs();
  }
  render(e, t) {
    this.initialized = this.initialized || e;
    if (e && !this.hasActivated) {
      this.setData({
        hasActivated: true
      });
    }
    this.setData({
      active: e,
      hide: !t.data.animation && !e
    });
  }
};
TabPanel = __decorate([wxComponent()], TabPanel);
export default TabPanel;
</script>
<style>
@import './tab-panel.css';
</style>
