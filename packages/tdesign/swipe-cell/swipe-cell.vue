<template>
    <view
        :class="'class ' + prefix + '-class ' + classPrefix"
        :style="_._style([style, customStyle])"
        data-key="cell"
        @tap="onTap"
        @touchstart="parseEventDynamicCode($event, disabled || swipe.startDrag)"
        @touchmove="parseEventDynamicCode($event, skipMove ? '' : disabled || swipe.onDrag)"
        @touchend="parseEventDynamicCode($event, skipMove ? '' : disabled || swipe.endDrag)"
        @touchcancel="parseEventDynamicCode($event, disabled || swipe.endDrag)"
        :opened="opened"
        :change:opened="swipe.onOpenedChange"
        :leftWidth="leftWidth"
        :rightWidth="rightWidth"
        :change:leftWidth="swipe.initLeftWidth"
        :change:rightWidth="swipe.initRightWidth"
    >
        <view id="wrapper">
            <view :class="classPrefix + '__left'" data-key="left">
                <slot name="left" />
                <view :class="classPrefix + '__content ' + item.className" :style="item.style" :data-action="item" @tap="onActionTap" v-for="(item, index) in left" :key="index">
                    <!-- parse <template v-if="item.icon" is="icon" :data="tClass: classPrefix + '__icon', name: item.icon, ...item.icon"></template> -->
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

                    <text v-if="item.text" :class="classPrefix + '__text'">{{ item.text }}</text>
                </view>
            </view>
            <slot />
            <view :class="classPrefix + '__right'" data-key="right">
                <slot name="right" />
                <view :class="classPrefix + '__content ' + item.className" :style="item.style" :data-action="item" @tap="onActionTap" v-for="(item, index) in right" :key="index">
                    <!-- parse <template v-if="item.icon" is="icon" :data="tClass: classPrefix + '__icon', name: item.icon, ...item.icon"></template> -->
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

                    <text v-if="item.text" :class="classPrefix + '__text'">{{ item.text }}</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script module="swipe" lang="wxs" src="@/swipe-cell/swipe-cell.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getRect } from "../common/utils";
import { getObserver } from "../common/wechat";
let ARRAY = [];
const {
  prefix: prefix
} = config;
const name = `${prefix}-swipe-cell`;
const ContainerClass = `.${name}`;
let SwiperCell = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.setData({
      prefix: prefix,
      wrapperStyle: "",
      closed: true,
      classPrefix: name,
      skipMove: false
    });
    this.observers = {
      "left, right"() {
        this.setSwipeWidth();
      }
    };
    this.lifetimes = {
      attached() {
        ARRAY.push(this);
      },
      ready() {
        this.setSwipeWidth();
      },
      detached() {
        ARRAY = ARRAY.filter(e => e !== this);
      }
    };
  }
  setSwipeWidth() {
    Promise.all([getRect(this, `${ContainerClass}__left`), getRect(this, `${ContainerClass}__right`)]).then(([e, t]) => {
      0 !== e.width || 0 !== t.width || this._hasObserved || (this._hasObserved = true, getObserver(this, `.${name}`).then(() => {
        this.setSwipeWidth();
      }));
      this.setData({
        leftWidth: e.width,
        rightWidth: t.width
      });
    });
  }
  skipMove() {
    this.skipMove || this.setData({
      skipMove: true
    });
  }
  catchMove() {
    if (this.skipMove) {
      this.setData({
        skipMove: false
      });
    }
  }
  open() {
    this.setData({
      opened: true
    });
  }
  close() {
    this.setData({
      opened: false
    });
  }
  closeOther() {
    ARRAY.filter(e => e !== this).forEach(e => e.close());
  }
  onTap() {
    this.close();
  }
  onActionTap(e) {
    const {
      currentTarget: {
        dataset: {
          action: t
        }
      }
    } = e;
    this.$emit("click", {
      detail: t
    });
  }
};
SwiperCell = __decorate([wxComponent()], SwiperCell);
export default SwiperCell;
</script>
<style>
@import './swipe-cell.css';
@import 'undefined';
</style>
