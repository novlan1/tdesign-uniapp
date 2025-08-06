<template>
    <view
        :id="tId"
        :class="
            _.cls(classPrefix, [
                ['active', active],
                ['disabled', disabled]
            ]) +
            ' class ' +
            prefix +
            '-class'
        "
        :style="_._style([style, customStyle])"
        @tap="handleClick"
        aria-role="button"
        :aria-label="
            ariaLabel ||
            (badgeProps.dot || badgeProps.count ? (active ? '已选中，' + label + _.getBadgeAriaLabel({ ...badgeProps }) : label + _.getBadgeAriaLabel({ ...badgeProps })) : '')
        "
        :aria-disabled="disabled"
    >
        <block v-if="active">
            <view :class="classPrefix + '__line'"></view>
            <view :class="classPrefix + '__prefix'"></view>
            <view :class="classPrefix + '__suffix'"></view>
        </block>
        <!-- parse <template v-if="_icon" is="icon" :data="tClass: classPrefix + '__icon', ..._icon"/> -->
        <block name="icon" v-if="false" v-if="_icon">
            <t-icon
                :style="style || ''"
                :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                :prefix="prefix || ''"
                :name="'close' || ''"
                :size="22 || ''"
                :color="color || ''"
                :aria-hidden="true || ''"
                :aria-label="'清除' || ''"
                :aria-role="'button' || ''"
                @click="bindclick || ''"
            />
        </block>
        <block v-if="badgeProps">
            <!-- parse <template is="badge" :data="...badgeProps, content: label"/> -->
            <block name="badge">
                <t-badge
                    :color="color || ''"
                    :content="label || ''"
                    :count="count || 0"
                    :dot="dot || false"
                    :max-count="maxCount || 99"
                    :offset="offset || []"
                    :shape="shape || 'circle'"
                    :show-zero="showZero || false"
                    :size="size || 'medium'"
                    :t-class="tClass"
                    :t-class-content="tClassContent"
                    :t-class-count="tClassCount"
                />
            </block>
        </block>
        <block v-else>{{ label }}</block>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tBadge from "../badge/badge";
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-side-bar-item`;
let SideBarItem = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this = Object.assign(Object.assign({}, props), {
      tId: {
        type: String
      }
    });
    this.relations = {
      "../side-bar/side-bar": {
        type: "parent",
        linked(e) {
          this.parent = e;
          this.updateActive(e.data.value);
        }
      }
    };
    this.observers = {
      icon(e) {
        this.setData({
          _icon: "string" == typeof e ? {
            name: e
          } : e
        });
      }
    };
    this.setData({
      classPrefix: name,
      prefix: prefix,
      active: false,
      isPre: false,
      isNext: false
    });
    this.methods = {
      updateActive(e) {
        const t = e === this.value;
        this.setData({
          active: t
        });
      },
      handleClick() {
        var e;
        if (this.disabled) {
          return;
        }
        const {
          value: t,
          label: i
        } = this;
        null === (e = this.parent) || void 0 === e || e.doChange({
          value: t,
          label: i
        });
      }
    };
  }
};
SideBarItem = __decorate([wxComponent()], SideBarItem);
export default SideBarItem;
</script>
<style>
@import './side-bar-item.css';
@import 'undefined';
</style>
