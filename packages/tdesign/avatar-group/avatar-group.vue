<template>
    <view :style="_._style([style, customStyle])" :class="className + ' class'">
        <slot />
        <view :class="classPrefix + '__collapse--slot'"><slot name="collapse-avatar" /></view>
        <view :class="classPrefix + '__collapse--default'" v-if="max && max < length" @tap="onCollapsedItemClick">
            <t-avatar
                :t-class-image="prefix + '-avatar--border ' + prefix + '-avatar--border-' + size + ' ' + prefix + '-class-image'"
                :t-class-content="prefix + '-class-content'"
                :size="size"
                :shape="shape"
                :icon="collapseAvatar ? '' : 'user-add'"
                aria-role="none"
            >
                {{ collapseAvatar }}
            </t-avatar>
        </view>
    </view>
</template>
<script>
import tAvatar from "../avatar/avatar";
import { __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import avatarGroupProps from "./props";

import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';


const {
  prefix: prefix
} = config;
const name = `${prefix}-avatar-group`;
let AvatarGroup = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-image`];
    // this = avatarGroupProps;
    this.properties = avatarGroupProps;
    this._ = _;
    this.components = {
      tAvatar
    }

    this.setData({
      prefix: prefix,
      classPrefix: name,
      hasChild: true,
      length: 0,
      className: "",
      size: 'medium',
    });
    this.options = {
      multipleSlots: true
    };
    this.relations = {
      "../avatar/avatar": {
        type: "descendant"
      }
    };
    this.lifetimes = {
      attached() {
        this.setClass();
      },
      ready() {
        this.setData({
          length: this.$children.length
        });
        this.handleMax();
      }
    };
    this.observers = {
      "cascading, size"() {
        this.setClass();
      }
    };
    this.methods = {
      setClass() {
        const {
          cascading: e,
          size: t
        } = this;
        const s = e.split("-")[0];
        const a = [name, `${prefix}-class`, `${name}-offset-${s}`, `${name}-offset-${s}-${t.indexOf("px") > -1 ? "medium" : t || "medium"}`];
        this.setData({
          className: a.join(" ")
        });
      },
      handleMax() {
        const {
          max: e
        } = this;
        const t = this.$children.length;
        if (!e || e > t) {
          return;
        }
        this.$children.splice(e, t - e).forEach(e => {
          e.hide();
        });
      },
      onCollapsedItemClick(e) {
        this.$emit("collapsed-item-click", {
          detail: e.detail
        });
      }
    };
  }
};
AvatarGroup = initTDesign(__decorate([wxComponent()], AvatarGroup));
export default AvatarGroup;
</script>
<style>
@import './avatar-group.css';
</style>
