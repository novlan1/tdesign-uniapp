<template>
    <view :class="classPrefix + ' class ' + prefix + '-class'" :style="_._style([style, customStyle])">
        <view
            :class="
                _.cls(classPrefix + '__wrapper', [
                    ['sticky', sticky],
                    ['active', active]
                ])
            "
            :style="anchorStyle"
        >
            <view :class="classPrefix + '__slot'"><slot /></view>
            <view :class="_.cls(classPrefix + '__header', [['active', active]])">{{ index }}</view>
        </view>
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
const name = `${prefix}-indexes-anchor`;
let IndexesAnchor = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      anchorStyle: "",
      sticky: false,
      active: false
    });
    this.relations = {
      "../indexes/indexes": {
        type: "parent"
      }
    };
  }
};
IndexesAnchor = __decorate([wxComponent()], IndexesAnchor);
export default IndexesAnchor;
</script>
<style>
@import './indexes-anchor.css';
</style>
