<template>
    <view :style="_._style([style, customStyle])" :class="_.cls(classPrefix, [placement]) + ' class ' + prefix + '-class'">
        <t-sticky
            :t-class="_.cls(classPrefix + '__sticky', [placement])"
            :disabled="!sticky"
            :z-index="stickyProps.zIndex || '1'"
            :offset-top="stickyProps.offsetTop || 0"
            :container="stickyProps.container"
            @scroll="onTouchScroll"
        >
            <view :class="_.cls(classPrefix + '__wrapper', [theme])">
                <scroll-view
                    :class="_.cls(classPrefix + '__scroll', [placement, ['split', split]])"
                    enhanced
                    enable-flex
                    :scroll-left="offset"
                    :scroll-x="true"
                    scroll-anchoring
                    scroll-with-animation
                    enable-passive
                    :show-scrollbar="false"
                    type="list"
                    @scroll="onScroll"
                >
                    <view :class="_.cls(classPrefix + '__nav', [placement, ['evenly', spaceEvenly]])" aria-role="tablist">
                        <view
                            :data-index="index"
                            :class="
                                _.cls(classPrefix + '__item', [theme, ['evenly', spaceEvenly], placement, ['disabled', item.disabled], ['active', currentIndex === index]]) +
                                ' ' +
                                (currentIndex === index ? prefix + '-class-active' : '') +
                                ' ' +
                                prefix +
                                '-class-item'
                            "
                            @tap="onTabTap"
                            aria-role="tab"
                            :aria-controls="tabID + '_panel_' + index"
                            :aria-selected="currentIndex === index"
                            :aria-disabled="item.disabled"
                            :aria-label="ariaLabel || (item.badgeProps.dot || item.badgeProps.count ? item.label + _.getBadgeAriaLabel({ ...item.badgeProps }) : '')"
                            v-for="(item, index) in tabs"
                            :key="index"
                        >
                            <view
                                :class="_.cls(classPrefix + '__item-inner', [theme, ['active', currentIndex === index]])"
                                :aria-hidden="item.badgeProps.dot || item.badgeProps.count"
                            >
                                <!-- parse <template v-if="item.icon" is="icon" :data="tClass: classPrefix + '__icon', ...item.icon"/> -->
                                <block name="icon" v-if="false" v-if="item.icon">
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
                                <block v-if="item.badgeProps">
                                    <!-- parse <template is="badge" :data="...item.badgeProps, content: item.label, tClass: _.cls(classPrefix + '__badge', [ ['disabled', item.disabled], ['active', currentIndex === index]])"/> -->
                                    <block name="badge" v-if="false">
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
                                            :t-class="
                                                _.cls(classPrefix + '__badge', [
                                                    ['disabled', item.disabled],
                                                    ['active', currentIndex === index]
                                                ])
                                            "
                                            :t-class-content="tClassContent"
                                            :t-class-count="tClassCount"
                                        />
                                    </block>
                                </block>
                                <block v-else>{{ item.label }}</block>
                            </view>

                            <view v-if="theme == 'card' && currentIndex - 1 == index" :class="classPrefix + '__item-prefix'" />

                            <view v-if="theme == 'card' && currentIndex + 1 == index" :class="classPrefix + '__item-suffix'" />
                        </view>
                        <view
                            v-if="theme == 'line' && showBottomLine"
                            :class="_.cls(classPrefix + '__track', [placement]) + ' ' + prefix + '-class-track'"
                            :style="_tabs.trackStyle(trackOption)"
                        />
                    </view>
                </scroll-view>
            </view>
        </t-sticky>
        <slot name="middle" />
        <view
            :class="_.cls(classPrefix + '__content', [['animated', animation]])"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
        >
            <view :class="classPrefix + '__content-inner ' + prefix + '-class-content'" :style="_tabs.animate({ duration: animation.duration, currentIndex: currentIndex })">
                <slot />
            </view>
        </view>
    </view>
</template>
<script module="_tabs" lang="wxs" src="@/tabs/tabs.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tSticky from "../sticky/sticky";
import tBadge from "../badge/badge";
import tIcon from "../icon/icon";
import { __awaiter, __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import props from "./props";
import config from "../common/config";
import touch from "../mixins/touch";
import { getRect, uniqueFactory } from "../common/utils";
import { getObserver } from "../common/wechat";
const {
  prefix: prefix
} = config;
const name = `${prefix}-tabs`;
const getUniqueID = uniqueFactory("tabs");
let Tabs = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      pureDataPattern: /^currentLabels$/
    };
    this.behaviors = [touch];
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-item`, `${prefix}-class-active`, `${prefix}-class-track`, `${prefix}-class-content`];
    this.relations = {
      "../tab-panel/tab-panel": {
        type: "descendant",
        linked(t) {
          this.children.push(t);
          this.initChildId();
          t.index = this.children.length - 1;
          this.updateTabs();
        },
        unlinked(t) {
          this.children = this.children.filter(e => e.index !== t.index);
          this.updateTabs(() => this.setTrack());
          this.initChildId();
        }
      }
    };
    this = props;
    this.controlledProps = [{
      key: "value",
      event: "change"
    }];
    this.observers = {
      value(t) {
        if (t !== this.getCurrentName()) {
          this.setCurrentIndexByName(t);
        }
      }
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      tabs: [],
      currentLabels: [],
      currentIndex: -1,
      trackOption: {
        lineWidth: 0,
        distance: 0,
        isInit: true
      },
      offset: 0,
      scrollLeft: 0,
      tabID: "",
      placement: "top"
    });
    this.lifetimes = {
      created() {
        this.children = this.children || [];
      },
      attached() {
        this.$nextTick(() => {
          this.setTrack();
        });
        getRect(this, `.${name}`).then(t => {
          this.containerWidth = t.width;
        });
        this.setData({
          tabID: getUniqueID()
        });
      }
    };
    this.methods = {
      onScroll(t) {
        const {
          scrollLeft: e
        } = t.detail;
        this.setData({
          scrollLeft: e
        });
      },
      updateTabs(t) {
        const {
          children: e
        } = this;
        const i = e.map(t => t.data);
        i.forEach(t => {
          if ("string" == typeof t.icon) {
            t.icon = {
              name: t.icon
            };
          }
        });
        this.setData({
          tabs: i
        }, t);
        this.setCurrentIndexByName(this.value);
      },
      setCurrentIndexByName(t) {
        const {
          children: e
        } = this;
        const i = e.findIndex(e => e.getComputedName() === `${t}`);
        if (i > -1) {
          this.setCurrentIndex(i);
        }
      },
      setCurrentIndex(t) {
        if (t <= -1 || t >= this.children.length) {
          return;
        }
        const e = [];
        this.children.forEach((i, s) => {
          const r = t === s;
          r === i.data.active && i.initialized || i.render(r, this);
          e.push(i.data.label);
        });
        const {
          currentIndex: i,
          currentLabels: s
        } = this;
        i === t && s.join("") === e.join("") || this.setData({
          currentIndex: t,
          currentLabels: e
        }, () => {
          this.setTrack();
        });
      },
      getCurrentName() {
        if (this.children) {
          const t = this.children[this.currentIndex];
          if (t) {
            return t.getComputedName();
          }
        }
      },
      calcScrollOffset: (t, e, i, s) => s + e - 0.5 * t + i / 2,
      getTabHeight() {
        return getRect(this, `.${name}`);
      },
      getTrackSize() {
        const {
          bottomLineMode: t
        } = this;
        const e = {
          fixed: `.${prefix}-tabs__track`,
          auto: `.${prefix}-tabs__item--active .${prefix}-tabs__item-inner`,
          full: `.${prefix}-tabs__item--active`
        };
        return new Promise((i, s) => {
          if (this.trackWidth) {
            i(this.trackWidth);
          } else {
            getRect(this, e[t] || e.fixed).then(t => {
              if (t) {
                i(t.width);
              }
            }).catch(s);
          }
        });
      },
      setTrack() {
        return __awaiter(this, void 0, void 0, function* () {
          const {
            children: t
          } = this;
          if (!t) {
            return;
          }
          const {
            currentIndex: e
          } = this;
          if (!(e <= -1)) {
            try {
              const t = yield getRect(this, `.${prefix}-tabs__item`, true);
              const i = t[e];
              if (!i) {
                return;
              }
              let s = 0;
              let r = 0;
              let n = 0;
              t.forEach(t => {
                if (s < e) {
                  r += t.width;
                  s += 1;
                }
                n += t.width;
              });
              if (this.containerWidth) {
                const t = this.calcScrollOffset(this.containerWidth, i.left, i.width, this.scrollLeft);
                const e = n - this.containerWidth;
                this.setData({
                  offset: Math.min(Math.max(t, 0), e)
                });
              } else {
                this._hasObserved || (this._hasObserved = true, getObserver(this, `.${name}`).then(() => this.setTrack()));
              }
              const a = yield this.getTrackSize();
              if ("line" === this.theme) {
                r += (i.width - a) / 2;
              }
              const h = void 0 === this.previousIndex;
              if (h || this.previousIndex !== e) {
                this.previousIndex = e;
                this.setData({
                  trackOption: {
                    lineWidth: a,
                    distance: r,
                    isInit: h
                  }
                });
              }
            } catch (t) {
              console.log("CatchClause", t);
              console.log("CatchClause", t);
              this.$emit("error", {
                detail: t
              });
            }
          }
        });
      },
      onTabTap(t) {
        const {
          index: e
        } = t.currentTarget.dataset;
        this.changeIndex(e);
      },
      onTouchStart(t) {
        if (this.swipeable) {
          this.touchStart(t);
        }
      },
      onTouchMove(t) {
        if (this.swipeable) {
          this.touchMove(t);
        }
      },
      onTouchEnd() {
        if (!this.swipeable) {
          return;
        }
        const {
          direction: t,
          deltaX: e,
          offsetX: i
        } = this;
        if ("horizontal" === t && i >= 50) {
          const t = this.getAvailableTabIndex(e);
          if (-1 !== t) {
            this.changeIndex(t);
          }
        }
      },
      onTouchScroll(t) {
        this._trigger("scroll", t.detail);
      },
      changeIndex(t) {
        const e = this.tabs[t];
        const {
          value: i,
          label: s
        } = e;
        (null == e ? void 0 : e.disabled) || t === this.currentIndex || this._trigger("change", {
          value: i,
          label: s
        });
        this._trigger("click", {
          value: i,
          label: s
        });
      },
      getAvailableTabIndex(t) {
        const e = t > 0 ? -1 : 1;
        const {
          currentIndex: i,
          tabs: s
        } = this;
        const r = s.length;
        for (let t = e; i + e >= 0 && i + e < r; t += e) {
          const e = i + t;
          if (!(e >= 0 && e < r && s[e])) {
            return i;
          }
          if (!s[e].disabled) {
            return e;
          }
        }
        return -1;
      }
    };
  }
  initChildId() {
    this.children.forEach((t, e) => {
      t.setId(`${this.tabID}_panel_${e}`);
    });
  }
};
Tabs = __decorate([wxComponent()], Tabs);
export default Tabs;
</script>
<style>
@import './tabs.css';
@import 'undefined';
</style>
