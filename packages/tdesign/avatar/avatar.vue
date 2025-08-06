<template>
    <view :class="classPrefix + '__wrapper class ' + prefix + '-class'" :style="_._style([_this.getStyles(isShow), style, customStyle])">
        <t-badge
            :color="badgeProps.color || ''"
            :content="badgeProps.content || ''"
            :count="badgeProps.count || 0"
            :dot="badgeProps.dot || false"
            :max-count="badgeProps.maxCount || 99"
            :offset="badgeProps.offset || []"
            :shape="badgeProps.shape || 'circle'"
            :show-zero="badgeProps.showZero || false"
            :size="badgeProps.size || 'medium'"
            :t-class="badgeProps.tClass"
            :t-class-content="badgeProps.tClassContent"
            :t-class-count="badgeProps.tClassCount"
        >
            <view
                :class="_this.getClass(classPrefix, size || 'medium', shape, bordered) + ' ' + prefix + '-class-image'"
                :style="_this.getSize(size, systemInfo)"
                :aria-label="ariaLabel || alt || '头像'"
                :aria-role="ariaRole || 'img'"
                :aria-hidden="ariaHidden"
            >
                <t-image
                    v-if="image"
                    :t-class="prefix + '-image ' + classPrefix + '__image'"
                    :t-class-load="prefix + '-class-alt'"
                    :style="(imageProps && imageProps.style) || ''"
                    :src="image"
                    :mode="(imageProps && imageProps.mode) || 'aspectFill'"
                    :lazy="(imageProps && imageProps.lazy) || false"
                    :loading="(imageProps && imageProps.loading) || 'default'"
                    :shape="(imageProps && imageProps.shape) || 'round'"
                    :webp="(imageProps && imageProps.webp) || false"
                    :error="alt || 'default'"
                    @error="onLoadError"
                />
                <!-- parse <template v-else-if="iconName || _.isNoEmptyObj(iconData)" is="icon" :data="tClass: classPrefix + '__icon ' + prefix + '-class-icon', name: iconName, ...iconData"/> -->
                <block name="icon" v-if="false" v-else-if="iconName || _.isNoEmptyObj(iconData)">
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
                        @click="'handleClose' || ''"
                    />
                </block>
                <view v-else :class="classPrefix + '__text ' + prefix + '-class-content'"><slot /></view>
            </view>
        </t-badge>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/avatar/avatar.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tBadge from "../badge/badge";
import tImage from "../image/image";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import avatarProps from "./props";
import { setIcon, systemInfo } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-avatar`;
let Avatar = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true
    };
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-image`, `${prefix}-class-icon`, `${prefix}-class-alt`, `${prefix}-class-content`];
    this = avatarProps;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      isShow: true,
      zIndex: 0,
      systemInfo: systemInfo
    });
    this.relations = {
      "../avatar-group/avatar-group": {
        type: "ancestor",
        linked(t) {
          this.parent = t;
          this.setData({
            shape: this.shape || t.data.shape || "circle",
            size: this.size || t.data.size,
            bordered: true
          });
        }
      }
    };
    this.observers = {
      icon(t) {
        const s = setIcon("icon", t, "");
        this.setData(Object.assign({}, s));
      }
    };
    this.methods = {
      hide() {
        this.setData({
          isShow: false
        });
      },
      onLoadError(t) {
        if (this.hideOnLoadFailed) {
          this.setData({
            isShow: false
          });
        }
        this.$emit("error", {
          detail: t.detail
        });
      }
    };
  }
};
Avatar = __decorate([wxComponent()], Avatar);
export default Avatar;
</script>
<style>
@import './avatar.css';
@import 'undefined';
</style>
