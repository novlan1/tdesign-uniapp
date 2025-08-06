<template>
    <view :style="_._style([style, customStyle])" :class="_.cls(classPrefix, [layout, ['readonly', readonly], sequence]) + ' class ' + prefix + '-class'"><slot /></view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tStep from "../step-item/step-item";
import { __decorate } from "@/miniprogram_npm/tslib";
import { wxComponent, SuperComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-steps`;
let Steps = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.relations = {
      "../step-item/step-item": {
        type: "child",
        linked(e) {
          this.updateChildren();
          const {
            readonly: t
          } = this;
          e.setData({
            readonly: t
          });
        },
        unlinked() {
          this.updateLastChid();
        }
      }
    };
    this.externalClasses = [`${prefix}-class`];
    this = props;
    this.controlledProps = [{
      key: "current",
      event: "change"
    }];
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.observers = {
      "current, theme, sequence"() {
        this.updateChildren();
      }
    };
    this.methods = {
      updateChildren() {
        const e = this.$children;
        e.forEach((t, s) => {
          t.updateStatus(Object.assign({
            index: s,
            items: e
          }, this));
        });
      },
      updateLastChid() {
        const e = this.$children;
        e.forEach((t, s) => t.setData({
          isLastChild: s === e.length - 1
        }));
      },
      handleClick(e) {
        if (!this.readonly) {
          const t = this.current;
          this._trigger("change", {
            previous: t,
            current: e
          });
        }
      }
    };
  }
};
Steps = __decorate([wxComponent()], Steps);
export default Steps;
</script>
<style>
@import './steps.css';
</style>
