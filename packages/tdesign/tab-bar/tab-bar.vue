<template>
    <view
        :style="_._style([style, customStyle])"
        :class="_.cls(classPrefix, [['border', bordered], ['fixed', fixed], ['safe', safeAreaInsetBottom], shape]) + ' class ' + prefix + '-class'"
        aria-role="tablist"
    >
        <slot />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { wxComponent, SuperComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const classPrefix = `${prefix}-tab-bar`;
let Tabbar = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.relations = {
      "../tab-bar-item/tab-bar-item": {
        type: "descendant"
      }
    };
    this.externalClasses = [`${prefix}-class`];
    this.backupValue = -1;
    this.setData({
      prefix: prefix,
      classPrefix: classPrefix
    });
    this = props;
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.observers = {
      value() {
        this.updateChildren();
      }
    };
    this.lifetimes = {
      ready() {
        this.showChildren();
      }
    };
    this.methods = {
      showChildren() {
        const {
          value: e
        } = this;
        this.$children.forEach(r => {
          r.setData({
            crowded: this.$children.length > 3
          });
          if (r.properties.value === e) {
            r.showSpread();
          }
        });
      },
      updateChildren() {
        const {
          value: e
        } = this;
        this.$children.forEach(r => {
          r.checkActive(e);
        });
      },
      updateValue(e) {
        this._trigger("change", {
          value: e
        });
      },
      changeOtherSpread(e) {
        this.$children.forEach(r => {
          if (r.properties.value !== e) {
            r.closeSpread();
          }
        });
      },
      initName() {
        return this.backupValue += 1;
      }
    };
  }
};
Tabbar = __decorate([wxComponent()], Tabbar);
export default Tabbar;
</script>
<style>
@import './tab-bar.css';
</style>
