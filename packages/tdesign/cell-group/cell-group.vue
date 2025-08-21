<template>
    <view>
        <view
            v-if="title"
            :class="'class ' + classPrefix + '__title ' + prefix + '-class-title'"
        >
            {{ title }}
        </view>
        <view :style="_._style([style, customStyle])" :class="_.cls(classPrefix, [['bordered', bordered], theme]) + ' class ' + prefix + '-class'"><slot /></view>
    </view>
</template>
<script>
import { __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { initTDesign } from '../common/runtime';
import _ from '../common/utils.wxs';

const {
  prefix: prefix
} = config;
const name = `${prefix}-cell-group`;
let CellGroup = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-title`];
    // this.relations = {
    //   "../cell/cell": {
    //     type: "child",
    //     linked() {
    //       this.updateLastChid();
    //     },
    //     unlinked() {
    //       this.updateLastChid();
    //     }
    //   }
    // };
    this.properties = props;
    this._ = _;
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
CellGroup = initTDesign(__decorate([wxComponent()], CellGroup));
export default CellGroup;
</script>
<style>
@import './cell-group.css';
</style>
