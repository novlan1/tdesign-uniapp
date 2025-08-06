<template>
    <view>
        <t-overlay v-if="modeType === 'popover'" :visible="visible" :using-custom-navbar="usingCustomNavbar" background-color="transparent" :z-index="zIndex">
            <view :class="'class ' + prefix + '-class ' + classPrefix">
                <view :class="prefix + '-class-reference ' + classPrefix + '__reference ' + (nonOverlay ? classPrefix + '__reference--nonoverlay' : '')" :style="referenceStyle" />
                <view :class="prefix + '-class-popover ' + classPrefix + '__container ' + (title || body ? classPrefix + '__container--' + modeType : '')" :style="popoverStyle">
                    <!-- parse <template is="content" :data="prefix, classPrefix, title, body, steps, current, modeType, hideSkip, hideBack, ...buttonProps"/> -->
                    <block name="content">
                        <slot v-if="!title && !body" :name="'content-' + current" />
                        <block v-else>
                            <view :class="prefix + '-class-tooltip'">
                                <view v-if="title" :class="prefix + '-class-title ' + classPrefix + '__title--' + modeType">{{ title }}</view>
                                <slot v-else :name="'title-' + current" />
                                <view v-if="body" :class="prefix + '-class-body ' + classPrefix + '__body--' + modeType">{{ body }}</view>
                                <slot v-else :name="'body-' + current" />
                            </view>
                            <view v-if="current !== -1" :class="prefix + '-class-footer ' + classPrefix + '__footer ' + classPrefix + '__footer--' + modeType">
                                <!-- parse <template is="button" v-if="current < steps.length - 1 && !hideSkip" :data="...skipButton"/> -->
                                <block name="button" v-if="false" v-if="current < steps.length - 1 && !hideSkip">
                                    <t-button
                                        :t-id="tId || ''"
                                        :style="style || ''"
                                        :block="true || false"
                                        :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                                        :t-class="prefix + '-class-action'"
                                        :disabled="disabled || false"
                                        :data-type="'action'"
                                        :data-extra="index"
                                        :custom-dataset="customDataset"
                                        :content="content || ''"
                                        :icon="icon || ''"
                                        :loading="loading || false"
                                        :loading-props="loadingProps || null"
                                        :theme="'primary' || 'default'"
                                        :ghost="ghost || false"
                                        :shape="shape || 'rectangle'"
                                        :size="size || 'medium'"
                                        :variant="variant || 'base'"
                                        :open-type="openType || ''"
                                        :hover-class="hoverClass || ''"
                                        :hover-stop-propagation="hoverStopPropagation || false"
                                        :hover-start-time="hoverStartTime || 20"
                                        :hover-stay-time="hoverStayTime || 70"
                                        :lang="lang || 'en'"
                                        :session-from="sessionFrom || ''"
                                        :send-message-title="sendMessageTitle || ''"
                                        :send-message-path="sendMessagePath || ''"
                                        :send-message-img="sendMessageImg || ''"
                                        :app-parameter="appParameter || ''"
                                        :show-message-card="showMessageCard || false"
                                        @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                        :aria-label="ariaLabel || ''"
                                    >
                                        <slot v-if="true || false" />
                                    </t-button>
                                </block>
                                <!-- parse <template is="button" v-else-if="current === steps.length - 1 && !hideBack" :data="...backButton"/> -->
                                <block name="button" v-if="false" v-else-if="current === steps.length - 1 && !hideBack">
                                    <t-button
                                        :t-id="tId || ''"
                                        :style="style || ''"
                                        :block="true || false"
                                        :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                                        :t-class="prefix + '-class-action'"
                                        :disabled="disabled || false"
                                        :data-type="'action'"
                                        :data-extra="index"
                                        :custom-dataset="customDataset"
                                        :content="content || ''"
                                        :icon="icon || ''"
                                        :loading="loading || false"
                                        :loading-props="loadingProps || null"
                                        :theme="'primary' || 'default'"
                                        :ghost="ghost || false"
                                        :shape="shape || 'rectangle'"
                                        :size="size || 'medium'"
                                        :variant="variant || 'base'"
                                        :open-type="openType || ''"
                                        :hover-class="hoverClass || ''"
                                        :hover-stop-propagation="hoverStopPropagation || false"
                                        :hover-start-time="hoverStartTime || 20"
                                        :hover-stay-time="hoverStayTime || 70"
                                        :lang="lang || 'en'"
                                        :session-from="sessionFrom || ''"
                                        :send-message-title="sendMessageTitle || ''"
                                        :send-message-path="sendMessagePath || ''"
                                        :send-message-img="sendMessageImg || ''"
                                        :app-parameter="appParameter || ''"
                                        :show-message-card="showMessageCard || false"
                                        @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                        :aria-label="ariaLabel || ''"
                                    >
                                        <slot v-if="true || false" />
                                    </t-button>
                                </block>
                                <!-- parse <template is="button" v-if="current < steps.length - 1" :data="...nextButton"/> -->
                                <block name="button" v-if="false" v-if="current < steps.length - 1">
                                    <t-button
                                        :t-id="tId || ''"
                                        :style="style || ''"
                                        :block="true || false"
                                        :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                                        :t-class="prefix + '-class-action'"
                                        :disabled="disabled || false"
                                        :data-type="'action'"
                                        :data-extra="index"
                                        :custom-dataset="customDataset"
                                        :content="content || ''"
                                        :icon="icon || ''"
                                        :loading="loading || false"
                                        :loading-props="loadingProps || null"
                                        :theme="'primary' || 'default'"
                                        :ghost="ghost || false"
                                        :shape="shape || 'rectangle'"
                                        :size="size || 'medium'"
                                        :variant="variant || 'base'"
                                        :open-type="openType || ''"
                                        :hover-class="hoverClass || ''"
                                        :hover-stop-propagation="hoverStopPropagation || false"
                                        :hover-start-time="hoverStartTime || 20"
                                        :hover-stay-time="hoverStayTime || 70"
                                        :lang="lang || 'en'"
                                        :session-from="sessionFrom || ''"
                                        :send-message-title="sendMessageTitle || ''"
                                        :send-message-path="sendMessagePath || ''"
                                        :send-message-img="sendMessageImg || ''"
                                        :app-parameter="appParameter || ''"
                                        :show-message-card="showMessageCard || false"
                                        @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                        :aria-label="ariaLabel || ''"
                                    >
                                        <slot v-if="true || false" />
                                    </t-button>
                                </block>
                                <!-- parse <template is="button" v-else :data="...finishButton"/> -->
                                <block name="button" v-if="false" v-else>
                                    <t-button
                                        :t-id="tId || ''"
                                        :style="style || ''"
                                        :block="true || false"
                                        :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                                        :t-class="prefix + '-class-action'"
                                        :disabled="disabled || false"
                                        :data-type="'action'"
                                        :data-extra="index"
                                        :custom-dataset="customDataset"
                                        :content="content || ''"
                                        :icon="icon || ''"
                                        :loading="loading || false"
                                        :loading-props="loadingProps || null"
                                        :theme="'primary' || 'default'"
                                        :ghost="ghost || false"
                                        :shape="shape || 'rectangle'"
                                        :size="size || 'medium'"
                                        :variant="variant || 'base'"
                                        :open-type="openType || ''"
                                        :hover-class="hoverClass || ''"
                                        :hover-stop-propagation="hoverStopPropagation || false"
                                        :hover-start-time="hoverStartTime || 20"
                                        :hover-stay-time="hoverStayTime || 70"
                                        :lang="lang || 'en'"
                                        :session-from="sessionFrom || ''"
                                        :send-message-title="sendMessageTitle || ''"
                                        :send-message-path="sendMessagePath || ''"
                                        :send-message-img="sendMessageImg || ''"
                                        :app-parameter="appParameter || ''"
                                        :show-message-card="showMessageCard || false"
                                        @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                        :aria-label="ariaLabel || ''"
                                    >
                                        <slot v-if="true || false" />
                                    </t-button>
                                </block>
                            </view>
                        </block>
                    </block>
                </view>
            </view>
        </t-overlay>
        <t-popup v-else-if="modeType === 'dialog'" :visible="visible" :show-overlay="!nonOverlay" :using-custom-navbar="usingCustomNavbar" :z-index="zIndex" placement="center">
            <view :class="'class ' + prefix + '-class ' + classPrefix">
                <view :class="prefix + '-class-popover ' + classPrefix + '__container ' + (title || body ? classPrefix + '__container--' + modeType : '')">
                    <!-- parse <template is="content" :data="prefix, classPrefix, title, body, steps, current, modeType, hideSkip, ...buttonProps"/> -->
                    <block name="content" v-if="false">
                        <slot v-if="!title && !body" :name="'content-' + current" />
                        <block v-else>
                            <view :class="prefix + '-class-tooltip'">
                                <view v-if="title" :class="prefix + '-class-title ' + classPrefix + '__title--' + modeType">{{ title }}</view>
                                <slot v-else :name="'title-' + current" />
                                <view v-if="body" :class="prefix + '-class-body ' + classPrefix + '__body--' + modeType">{{ body }}</view>
                                <slot v-else :name="'body-' + current" />
                            </view>
                            <view v-if="current !== -1" :class="prefix + '-class-footer ' + classPrefix + '__footer ' + classPrefix + '__footer--' + modeType">
                                <!-- parse <template is="button" v-if="current < steps.length - 1 && !hideSkip" :data="...skipButton"/> -->
                                <block name="button" v-if="false" v-if="current < steps.length - 1 && !hideSkip">
                                    <t-button
                                        :t-id="tId || ''"
                                        :style="style || ''"
                                        :block="true || false"
                                        :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                                        :t-class="prefix + '-class-action'"
                                        :disabled="disabled || false"
                                        :data-type="'action'"
                                        :data-extra="index"
                                        :custom-dataset="customDataset"
                                        :content="content || ''"
                                        :icon="icon || ''"
                                        :loading="loading || false"
                                        :loading-props="loadingProps || null"
                                        :theme="'primary' || 'default'"
                                        :ghost="ghost || false"
                                        :shape="shape || 'rectangle'"
                                        :size="size || 'medium'"
                                        :variant="variant || 'base'"
                                        :open-type="openType || ''"
                                        :hover-class="hoverClass || ''"
                                        :hover-stop-propagation="hoverStopPropagation || false"
                                        :hover-start-time="hoverStartTime || 20"
                                        :hover-stay-time="hoverStayTime || 70"
                                        :lang="lang || 'en'"
                                        :session-from="sessionFrom || ''"
                                        :send-message-title="sendMessageTitle || ''"
                                        :send-message-path="sendMessagePath || ''"
                                        :send-message-img="sendMessageImg || ''"
                                        :app-parameter="appParameter || ''"
                                        :show-message-card="showMessageCard || false"
                                        @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                        :aria-label="ariaLabel || ''"
                                    >
                                        <slot v-if="true || false" />
                                    </t-button>
                                </block>
                                <!-- parse <template is="button" v-else-if="current === steps.length - 1 && !hideBack" :data="...backButton"/> -->
                                <block name="button" v-if="false" v-else-if="current === steps.length - 1 && !hideBack">
                                    <t-button
                                        :t-id="tId || ''"
                                        :style="style || ''"
                                        :block="true || false"
                                        :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                                        :t-class="prefix + '-class-action'"
                                        :disabled="disabled || false"
                                        :data-type="'action'"
                                        :data-extra="index"
                                        :custom-dataset="customDataset"
                                        :content="content || ''"
                                        :icon="icon || ''"
                                        :loading="loading || false"
                                        :loading-props="loadingProps || null"
                                        :theme="'primary' || 'default'"
                                        :ghost="ghost || false"
                                        :shape="shape || 'rectangle'"
                                        :size="size || 'medium'"
                                        :variant="variant || 'base'"
                                        :open-type="openType || ''"
                                        :hover-class="hoverClass || ''"
                                        :hover-stop-propagation="hoverStopPropagation || false"
                                        :hover-start-time="hoverStartTime || 20"
                                        :hover-stay-time="hoverStayTime || 70"
                                        :lang="lang || 'en'"
                                        :session-from="sessionFrom || ''"
                                        :send-message-title="sendMessageTitle || ''"
                                        :send-message-path="sendMessagePath || ''"
                                        :send-message-img="sendMessageImg || ''"
                                        :app-parameter="appParameter || ''"
                                        :show-message-card="showMessageCard || false"
                                        @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                        :aria-label="ariaLabel || ''"
                                    >
                                        <slot v-if="true || false" />
                                    </t-button>
                                </block>
                                <!-- parse <template is="button" v-if="current < steps.length - 1" :data="...nextButton"/> -->
                                <block name="button" v-if="false" v-if="current < steps.length - 1">
                                    <t-button
                                        :t-id="tId || ''"
                                        :style="style || ''"
                                        :block="true || false"
                                        :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                                        :t-class="prefix + '-class-action'"
                                        :disabled="disabled || false"
                                        :data-type="'action'"
                                        :data-extra="index"
                                        :custom-dataset="customDataset"
                                        :content="content || ''"
                                        :icon="icon || ''"
                                        :loading="loading || false"
                                        :loading-props="loadingProps || null"
                                        :theme="'primary' || 'default'"
                                        :ghost="ghost || false"
                                        :shape="shape || 'rectangle'"
                                        :size="size || 'medium'"
                                        :variant="variant || 'base'"
                                        :open-type="openType || ''"
                                        :hover-class="hoverClass || ''"
                                        :hover-stop-propagation="hoverStopPropagation || false"
                                        :hover-start-time="hoverStartTime || 20"
                                        :hover-stay-time="hoverStayTime || 70"
                                        :lang="lang || 'en'"
                                        :session-from="sessionFrom || ''"
                                        :send-message-title="sendMessageTitle || ''"
                                        :send-message-path="sendMessagePath || ''"
                                        :send-message-img="sendMessageImg || ''"
                                        :app-parameter="appParameter || ''"
                                        :show-message-card="showMessageCard || false"
                                        @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                        :aria-label="ariaLabel || ''"
                                    >
                                        <slot v-if="true || false" />
                                    </t-button>
                                </block>
                                <!-- parse <template is="button" v-else :data="...finishButton"/> -->
                                <block name="button" v-if="false" v-else>
                                    <t-button
                                        :t-id="tId || ''"
                                        :style="style || ''"
                                        :block="true || false"
                                        :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                                        :t-class="prefix + '-class-action'"
                                        :disabled="disabled || false"
                                        :data-type="'action'"
                                        :data-extra="index"
                                        :custom-dataset="customDataset"
                                        :content="content || ''"
                                        :icon="icon || ''"
                                        :loading="loading || false"
                                        :loading-props="loadingProps || null"
                                        :theme="'primary' || 'default'"
                                        :ghost="ghost || false"
                                        :shape="shape || 'rectangle'"
                                        :size="size || 'medium'"
                                        :variant="variant || 'base'"
                                        :open-type="openType || ''"
                                        :hover-class="hoverClass || ''"
                                        :hover-stop-propagation="hoverStopPropagation || false"
                                        :hover-start-time="hoverStartTime || 20"
                                        :hover-stay-time="hoverStayTime || 70"
                                        :lang="lang || 'en'"
                                        :session-from="sessionFrom || ''"
                                        :send-message-title="sendMessageTitle || ''"
                                        :send-message-path="sendMessagePath || ''"
                                        :send-message-img="sendMessageImg || ''"
                                        :app-parameter="appParameter || ''"
                                        :show-message-card="showMessageCard || false"
                                        @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                        @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                        :aria-label="ariaLabel || ''"
                                    >
                                        <slot v-if="true || false" />
                                    </t-button>
                                </block>
                            </view>
                        </block>
                    </block>
                </view>
            </view>
        </t-popup>
    </view>
</template>

<script>
import tOverlay from "../overlay/overlay";
import tButton from "../button/button";
import tPopup from "../popup/popup";
import { __awaiter, __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import props from "./props";
import config from "../common/config";
import { isFunction, isNumber } from "../common/validator";
import { debounce, getRect, rpx2px, styles, unitConvert, nextTick, systemInfo } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-guide`;
let Guide = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-reference`, `${prefix}-class-popover`, `${prefix}-class-tooltip`, `${prefix}-class-title`, `${prefix}-class-body`, `${prefix}-class-footer`, `${prefix}-class-skip`, `${prefix}-class-next`, `${prefix}-class-back`, `${prefix}-class-finish`];
    this = props;
    this.options = {
      pureDataPattern: /^_/,
      multipleSlots: true
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      visible: false,
      _current: -1,
      _steps: [],
      buttonProps: {},
      referenceStyle: "",
      popoverStyle: "",
      title: "",
      body: "",
      nonOverlay: false,
      modeType: ""
    });
    this.controlledProps = [{
      key: "current",
      event: "change"
    }];
    this.observers = {
      "steps, current, showOverlay"() {
        return __awaiter(this, void 0, void 0, function* () {
          this._init();
        });
      }
    };
    this.lifetimes = {
      created() {
        this._init = debounce(() => this.init(), 20);
        this._getPlacement = this.getPlacement();
      },
      attached() {
        this._init();
      }
    };
    this.methods = {
      init() {
        var t;
        var e;
        var i;
        var s;
        var a;
        var o;
        var n;
        return __awaiter(this, void 0, void 0, function* () {
          const {
            steps: r,
            current: p
          } = this;
          const {
            _steps: l,
            _current: h
          } = this;
          const c = r[p];
          if (!c) {
            return this.setData({
              visible: false
            });
          }
          const u = "dialog" === (null !== (t = c.mode) && void 0 !== t ? t : this.mode) ? "dialog" : "popover";
          const x = null !== (e = c.showOverlay) && void 0 !== e ? e : this.showOverlay;
          this.setData({
            nonOverlay: !x,
            modeType: u
          });
          if (r !== l || p !== h) {
            if ("popover" === u) {
              const t = yield c.element();
              if (!t) {
                return;
              }
              const e = rpx2px(null !== (i = c.highlightPadding) && void 0 !== i ? i : this.highlightPadding);
              const o = {
                top: `${t.top - e}px`,
                right: `${systemInfo.windowWidth - t.right - e}px`,
                left: `${t.left - e}px`,
                width: `${t.width + 2 * e}px`,
                height: `${t.height + 2 * e}px`
              };
              this.setData({
                _steps: this.steps,
                _current: this.current,
                visible: true,
                referenceStyle: styles(o),
                title: null !== (s = c.title) && void 0 !== s ? s : "",
                body: null !== (a = c.body) && void 0 !== a ? a : "",
                buttonProps: this.buttonProps(c, "popover")
              });
              const n = yield this.placementOffset(c, o);
              this.setData({
                popoverStyle: n
              });
            } else {
              this.setData({
                _steps: this.steps,
                _current: this.current,
                visible: true,
                title: null !== (o = c.title) && void 0 !== o ? o : "",
                body: null !== (n = c.body) && void 0 !== n ? n : "",
                buttonProps: this.buttonProps(c, "dialog")
              });
            }
          }
        });
      },
      placementOffset({
        placement: t,
        offset: e
      }, i) {
        var s;
        var a;
        return __awaiter(this, void 0, void 0, function* () {
          yield nextTick();
          const o = yield getRect(this, `.${name}__container`);
          const n = null === (a = (s = this._getPlacement)[t]) || void 0 === a ? void 0 : a.call(s, o, i, e);
          return styles(Object.assign({
            position: "absolute"
          }, n));
        });
      },
      buttonProps(t, e) {
        var i;
        var s;
        var a;
        var o;
        let n = null !== (i = t.skipButtonProps) && void 0 !== i ? i : this.skipButtonProps;
        const r = "popover" === e ? "extra-small" : "medium";
        n = Object.assign(Object.assign({
          theme: "light",
          content: "跳过",
          size: r
        }, n), {
          tClass: `${prefix}-class-skip ${name}__button ${(null == n ? void 0 : n.class) || ""}`,
          type: "skip"
        });
        let p = null !== (s = t.nextButtonProps) && void 0 !== s ? s : this.nextButtonProps;
        p = Object.assign(Object.assign({
          theme: "primary",
          content: "下一步",
          size: r
        }, p), {
          tClass: `${prefix}-class-next ${name}__button ${(null == p ? void 0 : p.class) || ""}`,
          type: "next"
        });
        p = Object.assign(Object.assign({}, p), {
          content: this.buttonContent(p)
        });
        let l = null !== (a = t.backButtonProps) && void 0 !== a ? a : this.backButtonProps;
        l = Object.assign(Object.assign({
          theme: "light",
          content: "返回",
          size: r
        }, l), {
          tClass: `${prefix}-class-back ${name}__button ${(null == l ? void 0 : l.class) || ""}`,
          type: "back"
        });
        let h = null !== (o = t.finishButtonProps) && void 0 !== o ? o : this.finishButtonProps;
        h = Object.assign(Object.assign({
          theme: "primary",
          content: "完成",
          size: r
        }, h), {
          tClass: `${prefix}-class-finish ${name}__button ${(null == h ? void 0 : h.class) || ""}`,
          type: "finish"
        });
        h = Object.assign(Object.assign({}, h), {
          content: this.buttonContent(h)
        });
        return {
          skipButton: n,
          nextButton: p,
          backButton: l,
          finishButton: h
        };
      },
      renderCounter() {
        const {
          steps: t,
          current: e,
          counter: i
        } = this;
        const s = t.length;
        const a = e + 1;
        const o = isFunction(i) ? i({
          total: s,
          current: a
        }) : i;
        return i ? o : `(${a}/${s})`;
      },
      buttonContent(t) {
        const {
          hideCounter: e
        } = this;
        return `${t.content.replace(/ \(.*?\)/, "")} ${e ? "" : this.renderCounter()}`;
      },
      onTplButtonTap(t) {
        const {
          type: e
        } = t.target.dataset;
        const i = {
          e: t,
          current: this.current,
          total: this.steps.length
        };
        switch (e) {
          case "next":
            this.$emit("next-step-click", {
              detail: Object.assign({
                next: this.current + 1
              }, i)
            });
            this.setData({
              current: this.current + 1
            });
            break;
          case "skip":
            this.$emit("skip", {
              detail: i
            });
            this.setData({
              current: -1
            });
            break;
          case "back":
            this.$emit("back", {
              detail: i
            });
            this.setData({
              current: 0
            });
            break;
          case "finish":
            this.$emit("finish", {
              detail: i
            });
            this.setData({
              current: -1
            });
        }
        this.$emit("change", {
          detail: {
            current: this.current
          }
        });
      },
      getPlacement() {
        const t = rpx2px(32);
        const e = t => unitConvert(isNumber(null == t ? void 0 : t[0]) ? `${null == t ? void 0 : t[0]}rpx` : (null == t ? void 0 : t[0]) || 0);
        const i = t => unitConvert(isNumber(null == t ? void 0 : t[1]) ? `${null == t ? void 0 : t[1]}rpx` : (null == t ? void 0 : t[1]) || 0);
        const s = t => parseFloat(t.left);
        const a = t => parseFloat(t.right);
        const o = t => parseFloat(t.top);
        const n = t => parseFloat(t.height);
        const r = t => parseFloat(t.width);
        return {
          center: (a, p, l) => ({
            top: `${Math.max(n(p) + o(p) + t + i(l), 1)}px`,
            left: `${Math.max(r(p) / 2 + s(p) - a.width / 2 + e(l), 1)}px`
          }),
          bottom: (a, p, l) => ({
            top: `${Math.max(n(p) + o(p) + t + i(l), 1)}px`,
            left: `${Math.max(r(p) / 2 + s(p) - a.width / 2 + e(l), 1)}px`
          }),
          "bottom-left": (a, r, p) => ({
            top: `${Math.max(n(r) + o(r) + t + i(p), 1)}px`,
            left: `${Math.max(s(r) + e(p), 1)}px`
          }),
          "bottom-right": (s, r, p) => ({
            top: `${Math.max(n(r) + o(r) + t + i(p), 1)}px`,
            right: `${Math.max(a(r) - e(p), 1)}px`
          }),
          left: (s, p, l) => ({
            top: `${Math.max(n(p) / 2 + o(p) - s.height / 2 + i(l), 1)}px`,
            right: `${Math.max(r(p) + a(p) + t - e(l), 1)}px`
          }),
          "left-top": (s, n, p) => ({
            top: `${Math.max(o(n) + i(p), 1)}px`,
            right: `${Math.max(r(n) + a(n) + t - e(p), 1)}px`
          }),
          "left-bottom": (s, p, l) => ({
            top: `${Math.max(o(p) + n(p) - s.height - i(l), 1)}px`,
            right: `${Math.max(r(p) + a(p) + t - e(l), 1)}px`
          }),
          right: (a, p, l) => ({
            top: `${Math.max(n(p) / 2 + o(p) - a.height / 2 + i(l), 1)}px`,
            left: `${Math.max(s(p) + r(p) + t + e(l), 1)}px`
          }),
          "right-top": (a, n, p) => ({
            top: `${Math.max(o(n) + i(p), 1)}px`,
            left: `${Math.max(s(n) + r(n) + t + e(p), 1)}px`
          }),
          "right-bottom": (a, p, l) => ({
            top: `${Math.max(o(p) + n(p) - a.height - i(l), 1)}px`,
            left: `${Math.max(s(p) + r(p) + t + e(l), 1)}px`
          }),
          top: (a, n, p) => ({
            top: `${Math.max(o(n) - a.height - t + i(p), 1)}px`,
            left: `${Math.max(r(n) / 2 + s(n) - a.width / 2 + e(p), 1)}px`
          }),
          "top-left": (a, n, r) => ({
            top: `${Math.max(o(n) - a.height - t + i(r), 1)}px`,
            left: `${Math.max(s(n) + e(r), 1)}px`
          }),
          "top-right": (s, n, r) => ({
            top: `${Math.max(o(n) - s.height - t + i(r), 1)}px`,
            right: `${Math.max(a(n) - e(r), 1)}px`
          })
        };
      }
    };
  }
};
Guide = __decorate([wxComponent()], Guide);
export default Guide;
</script>
<style>
@import './guide.css';
@import 'undefined';
</style>
