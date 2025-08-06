<template>
    <view>
        <scroll-view :class="'class ' + prefix + '-class'" type="list" scroll-y enhanced :show-scrollbar="false" :scroll-into-view="scrollIntoView"><slot></slot></scroll-view>
    </view>
</template>

<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import { canUseProxyScrollView } from "../common/version";
const {
  prefix: prefix
} = config;
let ScrollView = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.behaviors = canUseProxyScrollView() ? ["wx://proxy-scroll-view"] : [];
    this = {
      scrollIntoView: {
        type: String
      }
    };
  }
};
ScrollView = __decorate([wxComponent()], ScrollView);
export default ScrollView;
</script>
<style>
@import './scroll-view.css';
</style>
