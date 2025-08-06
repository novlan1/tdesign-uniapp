<template>
    <view>
        <view
            v-if="_this.getMonthTitle(currentMonth[0].year, realLocalText.months[currentMonth[0].month], realLocalText.monthTitle)"
            :class="'class ' + classPrefix + '__title ' + prefix + '-class-title'"
        >
            {{ _this.getMonthTitle(currentMonth[0].year, realLocalText.months[currentMonth[0].month], realLocalText.monthTitle) }}
        </view>
        <view :style="_._style([style, customStyle])" :class="_.cls(classPrefix, [['bordered', bordered], theme]) + ' class ' + prefix + '-class'"><slot /></view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-cell-group`;
let CellGroup = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-title`];
    this.relations = {
      "../cell/cell": {
        type: "child",
        linked() {
          this.updateLastChid();
        },
        unlinked() {
          this.updateLastChid();
        }
      }
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.methods = {
      updateLastChid() {
        const e = this.$children;
        e.forEach((t, o) => t.setData({
          isLastChild: o === e.length - 1
        }));
      }
    };
  }
};
CellGroup = __decorate([wxComponent()], CellGroup);
export default CellGroup;
</script>
<style>
@import './cell-group.css';
</style>
