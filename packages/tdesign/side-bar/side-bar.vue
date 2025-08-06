<template>
    <view :class="classPrefix + ' class ' + prefix + '-class'" :style="_._style([style, customStyle])">
        <slot />
        <view :class="classPrefix + '__padding'"></view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tSideBarItem from "../side-bar-item/side-bar-item";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-side-bar`;
const relationsPath = "../side-bar-item/side-bar-item";
let SideBar = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.children = [];
    this.relations = {
      [relationsPath]: {
        type: "child",
        linked(e) {
          this.children.push(e);
        },
        unlinked(e) {
          const i = this.children.findIndex(i => i === e);
          this.children.splice(i, 1);
        }
      }
    };
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this = props;
    this.observers = {
      value(e) {
        this.$children.forEach(i => {
          i.updateActive(e);
        });
      }
    };
    this.setData({
      classPrefix: name,
      prefix: prefix
    });
    this.methods = {
      doChange({
        value: e,
        label: i
      }) {
        this._trigger("change", {
          value: e,
          label: i
        });
      }
    };
  }
};
SideBar = __decorate([wxComponent()], SideBar);
export default SideBar;
</script>
<style>
@import './side-bar.css';
</style>
