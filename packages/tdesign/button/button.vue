<template>
    <view>
        <button
            :id="tId"
            :style="_._style([style, customStyle])"
            :data-custom="customDataset"
            :class="'class ' + className"
            :form-type="disabled || loading ? '' : type"
            :open-type="disabled || loading ? '' : openType"
            :hover-stop-propagation="hoverStopPropagation"
            :hover-start-time="hoverStartTime"
            :hover-stay-time="hoverStayTime"
            :lang="lang"
            :session-from="sessionFrom"
            :hover-class="disabled || loading ? '' : hoverClass || classPrefix + '--hover'"
            :send-message-title="sendMessageTitle"
            :send-message-path="sendMessagePath"
            :send-message-img="sendMessageImg"
            :app-parameter="appParameter"
            :show-message-card="showMessageCard"
            @tap.stop.prevent="handleTap"
            @getuserinfo="getuserinfo"
            @contact="contact"
            @getphonenumber="getphonenumber"
            @error="error"
            @opensetting="opensetting"
            @launchapp="launchapp"
            @chooseavatar="chooseavatar"
            @agreeprivacyauthorization="agreeprivacyauthorization"
            :aria-label="ariaLabel"
        >
            <!-- parse <template v-if="_icon" is="icon" :data="tClass: classPrefix + '__icon ' + prefix + '-class-icon', ariaHidden: true, name: iconName, ..._icon"/> -->
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
                    @click="'handleClose' || ''"
                />
            </block>
            <t-loading
                v-if="loading"
                :delay="loadingProps.delay || 0"
                :duration="loadingProps.duration || 800"
                :indicator="loadingProps.indicator || true"
                :inheritColor="loadingProps.inheritColor || true"
                :layout="loadingProps.layout || 'horizontal'"
                :pause="loadingProps.pause || false"
                :progress="loadingProps.progress || 0"
                :reverse="loadingProps.reverse || false"
                :size="loadingProps.size || '40rpx'"
                :text="loadingProps.text || ''"
                :theme="loadingProps.theme || 'circular'"
                loading
                :t-class="classPrefix + '__loading ' + classPrefix + '__loading--wrapper'"
                :t-class-indicator="classPrefix + '__loading--indicator ' + prefix + '-class-loading'"
            />
            <view :class="classPrefix + '__content'">
                <slot name="content" />
                <block v-if="content">{{ content }}</block>
                <slot />
            </view>
            <slot name="suffix" />
        </button>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tLoading from "../loading/loading";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { canIUseFormFieldButton } from "../common/version";
import { calcIcon } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-button`;
let Button = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-icon`, `${prefix}-class-loading`];
    this.behaviors = canIUseFormFieldButton() ? ["wx://form-field-button"] : [];
    this = props;
    this.options = {
      multipleSlots: true
    };
    this.setData({
      prefix: prefix,
      className: "",
      classPrefix: name
    });
    this.observers = {
      "theme, size, plain, block, shape, disabled, loading, variant"() {
        this.setClass();
      },
      icon(t) {
        this.setData({
          _icon: calcIcon(t, "")
        });
      }
    };
    this.lifetimes = {
      attached() {
        this.setClass();
      }
    };
    this.methods = {
      setClass() {
        const t = [name, `${prefix}-class`, `${name}--${this.variant || "base"}`, `${name}--${this.theme || "default"}`, `${name}--${this.shape || "rectangle"}`, `${name}--size-${this.size || "medium"}`];
        if (this.block) {
          t.push(`${name}--block`);
        }
        if (this.disabled) {
          t.push(`${name}--disabled`);
        }
        if (this.ghost) {
          t.push(`${name}--ghost`);
        }
        this.setData({
          className: t.join(" ")
        });
      },
      getuserinfo(t) {
        this.$emit("getuserinfo", {
          detail: t.detail
        });
      },
      contact(t) {
        this.$emit("contact", {
          detail: t.detail
        });
      },
      getphonenumber(t) {
        this.$emit("getphonenumber", {
          detail: t.detail
        });
      },
      error(t) {
        this.$emit("error", {
          detail: t.detail
        });
      },
      opensetting(t) {
        this.$emit("opensetting", {
          detail: t.detail
        });
      },
      launchapp(t) {
        this.$emit("launchapp", {
          detail: t.detail
        });
      },
      chooseavatar(t) {
        this.$emit("chooseavatar", {
          detail: t.detail
        });
      },
      agreeprivacyauthorization(t) {
        this.$emit("agreeprivacyauthorization", {
          detail: t.detail
        });
      },
      handleTap(t) {
        this.disabled || this.loading || this.$emit("tap", {
          detail: t
        });
      }
    };
  }
};
Button = __decorate([wxComponent()], Button);
export default Button;
</script>
<style>
@import './button.css';
@import 'undefined';
</style>
