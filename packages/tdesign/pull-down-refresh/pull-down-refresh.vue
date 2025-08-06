<template>
    <view>
        <scroll-view
            :style="_._style([style, customStyle, 'max-height: calc(100vh - ' + distanceTop + 'px)'])"
            :class="classPrefix + ' class ' + prefix + '-class'"
            type="list"
            :scroll-top="scrollTop"
            scroll-y
            :enable-back-to-top="enableBackToTop"
            :enable-passive="enablePassive"
            :lower-threshold="lowerThreshold"
            :upper-threshold="upperThreshold"
            :scroll-into-view="scrollIntoView"
            :show-scrollbar="showScrollbar"
            enhanced
            scroll-with-animation
            :bounces="false"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @scroll="onScroll"
            @dragstart="onDragStart"
            @dragging="onDragging"
            @dragend="onDragEnd"
            @scrolltoupper="onScrollToTop"
            @scrolltolower="onScrollToBottom"
            :throttle="false"
        >
            <slot name="header" />
            <view
                :class="classPrefix + '__track ' + (classPrefix + '__track--' + (loosing ? 'loosing' : ''))"
                :style="barHeight > 0 ? 'transform: translate3d(0, ' + barHeight + 'px, 0);' : ''"
            >
                <view :class="classPrefix + '__tips ' + (classPrefix + '__tips--' + (loosing ? 'loosing' : ''))" :style="'height: ' + tipsHeight + 'px'" aria-live="polite">
                    <t-loading
                        v-if="refreshStatus === 2"
                        :delay="loadingProps.delay || 0"
                        :duration="loadingProps.duration || 800"
                        :indicator="loadingProps.indicator || true"
                        :layout="loadingProps.layout || 'horizontal'"
                        :loading="loadingProps.loading || true"
                        :pause="loadingProps.pause || false"
                        :progress="loadingProps.progress || 0"
                        :reverse="loadingProps.reverse || false"
                        :size="loadingProps.size || '50rpx'"
                        :text="loadingProps.text || loadingTexts[refreshStatus]"
                        :theme="loadingProps.theme || 'circular'"
                        :t-class-indicator="prefix + '-class-indicator'"
                    />
                    <view v-else-if="refreshStatus >= 0" :class="classPrefix + '__text ' + prefix + '-class-text'">{{ loadingTexts[refreshStatus] }}</view>
                </view>
                <slot />
            </view>
        </scroll-view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tLoading from "../loading/loading";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getRect, systemInfo, unitConvert } from "../common/utils";
import { canUseProxyScrollView } from "../common/version";
const {
  prefix: prefix
} = config;
const name = `${prefix}-pull-down-refresh`;
const defaultLoadingTexts = ["下拉刷新", "松手刷新", "正在刷新", "刷新完成"];
let PullDownRefresh = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.pixelRatio = 1;
    this.startPoint = null;
    this.isPulling = false;
    this.maxRefreshAnimateTimeFlag = 0;
    this.closingAnimateTimeFlag = 0;
    this.refreshStatusTimer = null;
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-loading`, `${prefix}-class-text`, `${prefix}-class-indicator`];
    this.behaviors = canUseProxyScrollView() ? ["wx://proxy-scroll-view"] : [];
    this.options = {
      multipleSlots: true,
      pureDataPattern: /^_/
    };
    this.relations = {
      "../back-top/back-top": {
        type: "descendant"
      }
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      distanceTop: 0,
      barHeight: 0,
      tipsHeight: 0,
      refreshStatus: -1,
      loosing: false,
      enableToRefresh: true,
      scrollTop: 0,
      _maxBarHeight: 0,
      _loadingBarHeight: 0
    });
    this.lifetimes = {
      attached() {
        const {
          screenWidth: t
        } = systemInfo;
        const {
          loadingTexts: e,
          maxBarHeight: s,
          loadingBarHeight: i
        } = this;
        const r = Array.isArray(e) && e.length >= 4;
        this.setData({
          _maxBarHeight: unitConvert(s),
          _loadingBarHeight: unitConvert(i),
          loadingTexts: r ? e : defaultLoadingTexts
        });
        this.pixelRatio = 750 / t;
        getRect(this, `.${name}`).then(t => {
          this.setData({
            distanceTop: t.top
          });
        });
      },
      detached() {
        clearTimeout(this.maxRefreshAnimateTimeFlag);
        clearTimeout(this.closingAnimateTimeFlag);
        this.resetTimer();
      }
    };
    this.observers = {
      value(t) {
        t ? this.doRefresh() : (clearTimeout(this.maxRefreshAnimateTimeFlag), this.refreshStatus > 0 && this.setData({
          refreshStatus: 3
        }), this.setData({
          barHeight: 0
        }));
      },
      barHeight(t) {
        this.resetTimer();
        if (0 === t && -1 !== this.refreshStatus) {
          this.refreshStatusTimer = setTimeout(() => {
            this.setData({
              refreshStatus: -1
            });
          }, 240);
        }
        this.setData({
          tipsHeight: Math.min(t, this._loadingBarHeight)
        });
      },
      maxBarHeight(t) {
        this.setData({
          _maxBarHeight: unitConvert(t)
        });
      },
      loadingBarHeight(t) {
        this.setData({
          _loadingBarHeight: unitConvert(t)
        });
      }
    };
    this.methods = {
      resetTimer() {
        if (this.refreshStatusTimer) {
          clearTimeout(this.refreshStatusTimer);
          this.refreshStatusTimer = null;
        }
      },
      onScrollToBottom() {
        this.$emit("scrolltolower");
      },
      onScrollToTop() {
        this.setData({
          enableToRefresh: true
        });
      },
      onScroll(t) {
        const {
          scrollTop: e
        } = t.detail;
        this.setData({
          enableToRefresh: 0 === e
        });
        this.$emit("scroll", {
          detail: {
            scrollTop: e
          }
        });
      },
      onTouchStart(t) {
        if (this.isPulling || !this.enableToRefresh || this.disabled) {
          return;
        }
        const {
          touches: e
        } = t;
        if (1 !== e.length) {
          return;
        }
        const {
          pageX: s,
          pageY: i
        } = e[0];
        this.setData({
          loosing: false
        });
        this.startPoint = {
          pageX: s,
          pageY: i
        };
        this.isPulling = true;
      },
      onTouchMove(t) {
        if (!this.startPoint || this.disabled) {
          return;
        }
        const {
          touches: e
        } = t;
        if (1 !== e.length) {
          return;
        }
        const {
          pageY: s
        } = e[0];
        const i = s - this.startPoint.pageY;
        if (i > 0) {
          this.setRefreshBarHeight(i);
        }
      },
      onTouchEnd(t) {
        if (!this.startPoint || this.disabled) {
          return;
        }
        const {
          changedTouches: e
        } = t;
        if (1 !== e.length) {
          return;
        }
        const {
          pageY: s
        } = e[0];
        const i = s - this.startPoint.pageY;
        this.startPoint = null;
        this.isPulling = false;
        this.setData({
          loosing: true
        });
        i > this._loadingBarHeight ? (this._trigger("change", {
          value: true
        }), this.$emit("refresh")) : this.setData({
          barHeight: 0
        });
      },
      onDragStart(t) {
        const {
          scrollTop: e,
          scrollLeft: s
        } = t.detail;
        this.$emit("dragstart", {
          detail: {
            scrollTop: e,
            scrollLeft: s
          }
        });
      },
      onDragging(t) {
        const {
          scrollTop: e,
          scrollLeft: s
        } = t.detail;
        this.$emit("dragging", {
          detail: {
            scrollTop: e,
            scrollLeft: s
          }
        });
      },
      onDragEnd(t) {
        const {
          scrollTop: e,
          scrollLeft: s
        } = t.detail;
        this.$emit("dragend", {
          detail: {
            scrollTop: e,
            scrollLeft: s
          }
        });
      },
      doRefresh() {
        this.disabled || (this.setData({
          barHeight: this._loadingBarHeight,
          refreshStatus: 2,
          loosing: true
        }), this.maxRefreshAnimateTimeFlag = setTimeout(() => {
          this.maxRefreshAnimateTimeFlag = null;
          if (2 === this.refreshStatus) {
            this.$emit("timeout");
            this._trigger("change", {
              value: false
            });
          }
        }, this.refreshTimeout));
      },
      setRefreshBarHeight(t) {
        const e = Math.min(t, this._maxBarHeight);
        const s = {
          barHeight: e
        };
        e >= this._loadingBarHeight ? s.refreshStatus = 1 : s.refreshStatus = 0;
        return new Promise(t => {
          this.setData(s, () => t(e));
        });
      },
      setScrollTop(t) {
        this.setData({
          scrollTop: t
        });
      },
      scrollToTop() {
        this.setScrollTop(0);
      }
    };
  }
};
PullDownRefresh = __decorate([wxComponent()], PullDownRefresh);
export default PullDownRefresh;
</script>
<style>
@import './pull-down-refresh.css';
</style>
