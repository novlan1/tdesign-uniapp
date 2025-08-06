<template>
    <view :style="_._style([style, customStyle])" :class="'class ' + prefix + '-class ' + classPrefix">
        <view :aria-hidden="true" :class="classPrefix + '__thumb'">
            <t-image v-if="image" :t-class="prefix + '-class-image'" :src="image" mode="aspectFit" />
            <!-- parse <template v-else-if="iconName || _.isNoEmptyObj(iconData)" is="icon" :data="tClass: classPrefix + '__icon', name: iconName, ...iconData"/> -->
            <block name="icon" v-if="false" v-else-if="iconName || _.isNoEmptyObj(iconData)">
                <t-icon
                    :style="style || ''"
                    :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                    :prefix="prefix || ''"
                    :name="'close' || ''"
                    :size="22 || ''"
                    :color="color || ''"
                    :aria-hidden="true || ''"
                    :aria-label="ariaLabel || ''"
                    :aria-role="ariaRole || ''"
                    @click="bindclick || ''"
                />
            </block>
            <slot v-else name="image" />
        </view>
        <view :class="classPrefix + '__description ' + prefix + '-class-description'">
            <block v-if="description">{{ description }}</block>
            <slot name="description" />
        </view>
        <view :class="classPrefix + '__actions ' + prefix + '-class-actions'"><slot name="action" /></view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tImage from "../image/image";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import props from "./props";
import config from "../common/config";
import { setIcon } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-empty`;
let default_1 = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true
    };
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-description`, `${prefix}-class-image`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.observers = {
      icon(e) {
        const o = setIcon("icon", e, "");
        this.setData(Object.assign({}, o));
      }
    };
  }
};
default_1 = __decorate([wxComponent()], default_1);
export default default_1;
</script>
<style>
@import './empty.css';
@import 'undefined';
</style>
