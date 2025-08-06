<template>
    <view>
        <t-popup
            name="dialog"
            :style="_._style([style, customStyle])"
            class="class"
            :t-class="classPrefix + '__wrapper'"
            :visible="visible"
            :showOverlay="showOverlay"
            :closeOnOverlayClick="closeOnOverlayClick"
            :preventScrollThrough="preventScrollThrough"
            :overlayProps="overlayProps"
            :zIndex="zIndex"
            placement="center"
            :usingCustomNavbar="usingCustomNavbar"
            @visible-change="overlayClick"
        >
            <view slot="content" :class="classPrefix + ' ' + prefix + '-class'">
                <slot name="top" />
                <view v-if="closeBtn" :class="classPrefix + '__close-btn'" @tap="onClose">
                    <!-- parse <template v-if="_.isObject(closeBtn)" is="icon" :data="name: 'close', size: 22, ...closeBtn"/> -->
                    <block name="icon" v-if="_.isObject(closeBtn)">
                        <t-icon
                            :style="style || ''"
                            :t-class="tClass"
                            :prefix="prefix || ''"
                            :name="'close' || ''"
                            :size="22 || ''"
                            :color="color || ''"
                            :aria-hidden="ariaHidden || ''"
                            :aria-label="ariaLabel || ''"
                            :aria-role="ariaRole || ''"
                            @click="bindclick || ''"
                        />
                    </block>
                    <t-icon v-else name="close" size="44rpx" />
                </view>
                <view :class="classPrefix + '__content ' + prefix + '-class-content'">
                    <view v-if="title" :class="classPrefix + '__header'">{{ title }}</view>
                    <slot name="title" />
                    <view v-if="content" :class="classPrefix + '__body'">
                        <text :class="classPrefix + '__body-text'">{{ content }}</text>
                    </view>
                    <slot name="content" />
                </view>
                <slot name="middle" />
                <view
                    :class="
                        _.cls(classPrefix + '__footer', [
                            ['column', buttonLayout === 'vertical'],
                            ['full', buttonVariant == 'text' && actions.length == 0]
                        ])
                    "
                >
                    <block v-if="actions">
                        <block v-for="(item, index) in actions" :key="index">
                            <!-- parse <template is="button" :data="block: true, type: 'action', extra: index, tClass: prefix + '-class-action', rootClass: _this.getActionClass(classPrefix, buttonLayout), ...item"/> -->
                            <block name="button">
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
                                    :theme="theme || 'default'"
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
                                    <slot v-if="useDefaultSlot || false" />
                                </t-button>
                            </block>
                        </block>
                    </block>
                    <slot name="actions" />
                    <block v-if="_cancel">
                        <!-- parse <template is="button" :data="type: 'cancel', ..._cancel"/> -->
                        <block name="button" v-if="false">
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
                                :theme="theme || 'default'"
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
                                <slot v-if="useDefaultSlot || false" />
                            </t-button>
                        </block>
                    </block>
                    <slot name="cancel-btn" />
                    <block v-if="_confirm">
                        <!-- parse <template is="button" :data="type: 'confirm', theme: 'primary', ..._confirm"/> -->
                        <block name="button" v-if="false">
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
                                <slot v-if="useDefaultSlot || false" />
                            </t-button>
                        </block>
                    </block>
                    <slot name="confirm-btn" />
                </view>
            </view>
        </t-popup>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/dialog/dialog.wxs"></script>
<script>
import tPopup from "../popup/popup";
import tIcon from "../icon/icon";
import tButton from "../button/button";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { toCamel } from "../common/utils";
import { isObject } from "../common/validator";
import useCustomNavbar from "../mixins/using-custom-navbar";
const {
  prefix: prefix
} = config;
const name = `${prefix}-dialog`;
let Dialog = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.behaviors = [useCustomNavbar];
    this.options = {
      multipleSlots: true
    };
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-confirm`, `${prefix}-class-cancel`, `${prefix}-class-action`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      buttonVariant: "text"
    });
    this.observers = {
      "confirmBtn, cancelBtn"(t, e) {
        const {
          prefix: o,
          classPrefix: i,
          buttonLayout: n
        } = this;
        const s = {
          buttonVariant: "text"
        };
        const r = [t, e].some(t => isObject(t) && t.variant && "text" !== t.variant);
        const a = {
          confirm: t,
          cancel: e
        };
        const c = [`${i}__button`];
        const l = [];
        if (r) {
          s.buttonVariant = "base";
          c.push(`${i}__button--${n}`);
        } else {
          c.push(`${i}__button--text`);
          l.push(`${i}-button`);
        }
        Object.keys(a).forEach(t => {
          const e = a[t];
          const n = {
            block: true,
            rootClass: [...c, `${i}__button--${t}`],
            tClass: [...l, `${o}-class-${t}`],
            variant: s.buttonVariant,
            openType: ""
          };
          if ("cancel" === t && "base" === s.buttonVariant) {
            n.theme = "light";
          }
          s[`_${t}`] = "string" == typeof e ? Object.assign(Object.assign({}, n), {
            content: e
          }) : e && "object" == typeof e ? Object.assign(Object.assign({}, n), e) : null;
        });
        this.setData(Object.assign({}, s));
      }
    };
    this.methods = {
      onTplButtonTap(t) {
        var e;
        var o;
        var i;
        const n = t.type;
        const {
          type: s,
          extra: r
        } = t.target.dataset;
        const a = this[`_${s}`];
        const c = `bind${n}`;
        if ("action" === s) {
          return void this.onActionTap(r);
        }
        if ("function" == typeof a[c]) {
          if (a[c](t)) {
            this.close();
          }
        }
        if (!!!a.openType && ["confirm", "cancel"].includes(s)) {
          null === (e = this[toCamel(`on-${s}`)]) || void 0 === e || e.call(this, s);
        }
        if ("tap" !== n) {
          const e = (null === (i = null === (o = t.detail) || void 0 === o ? void 0 : o.errMsg) || void 0 === i ? void 0 : i.indexOf("ok")) > -1;
          this.$emit(e ? "open-type-event" : "open-type-error-event", {
            detail: t.detail
          });
        }
      },
      onConfirm() {
        this.$emit("confirm");
        if (this._onConfirm) {
          this._onConfirm({
            trigger: "confirm"
          });
          this.close();
        }
      },
      onCancel() {
        const t = {
          trigger: "cancel"
        };
        this.$emit("cancel");
        this.$emit("close", {
          detail: t
        });
        if (this._onCancel) {
          this._onCancel(t);
          this.close();
        }
      },
      onClose() {
        var t;
        const e = {
          trigger: "close-btn"
        };
        this.$emit("close", {
          detail: e
        });
        null === (t = this._onCancel) || void 0 === t || t.call(this, e);
        this.close();
      },
      close() {
        this.setData({
          visible: false
        });
      },
      overlayClick() {
        var t;
        this.$emit("overlay-click");
        if (this.closeOnOverlayClick) {
          const e = {
            trigger: "overlay"
          };
          this.$emit("close", {
            detail: e
          });
          null === (t = this._onCancel) || void 0 === t || t.call(this, e);
          this.close();
        }
      },
      onActionTap(t) {
        this.$emit("action", {
          detail: {
            index: t
          }
        });
        if (this._onAction) {
          this._onAction({
            index: t
          });
          this.close();
        }
      },
      openValueCBHandle(t) {
        this.$emit("open-type-event", {
          detail: t.detail
        });
      },
      openValueErrCBHandle(t) {
        this.$emit("open-type-error-event", {
          detail: t.detail
        });
      }
    };
  }
};
Dialog = __decorate([wxComponent()], Dialog);
export default Dialog;
</script>
<style>
@import './dialog.css';
@import 'undefined';
</style>
