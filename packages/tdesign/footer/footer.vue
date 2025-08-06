<template>
    <view :style="_._style([style, customStyle])" :class="classPrefix + ' class ' + prefix + '-class'">
        <block v-if="logo">
            <view :class="classPrefix + '__logo'">
                <t-image :t-class="classPrefix + '__icon'" :src="logo.icon" v-if="logo.icon" />
                <view :class="classPrefix + '__title'" v-if="logo.title">{{ logo.title }}</view>
                <t-image :t-class="classPrefix + '__title-url'" :src="logo.url" mode="widthFix" v-else-if="logo.url" />
            </view>
        </block>
        <block v-else>
            <view v-if="links.length > 0" :class="classPrefix + '__link-list'">
                <block v-for="(item, index) in links" :key="index">
                    <navigator :url="item.url" :open-type="item.openType" hover-class="none" :class="classPrefix + '__link-item'">{{ item.name }}</navigator>

                    <view :aria-hidden="true" v-if="index !== links.length - 1" :class="classPrefix + '__link-line'">|</view>
                </block>
            </view>
            <view :class="classPrefix + '__text'">{{ text }}</view>
        </block>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tImage from "../image/image";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-footer`;
let Footer = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
  }
};
Footer = __decorate([wxComponent()], Footer);
export default Footer;
</script>
<style>
@import './footer.css';
</style>
