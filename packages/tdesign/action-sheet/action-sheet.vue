<template>
    <view :id="classPrefix" :style="_._style([style, customStyle])" :class="classPrefix + ' class ' + prefix + '-class'">
        <t-popup
            :visible="visible"
            placement="bottom"
            :usingCustomNavbar="usingCustomNavbar"
            @visible-change="onPopupVisibleChange"
            :show-overlay="showOverlay"
            :z-index="popupProps.zIndex || defaultPopUpzIndex"
            :overlay-props="popupProps.overlayProps || defaultPopUpProps"
        >
            <view :class="_.cls(classPrefix + '__content', [['grid', gridThemeItems.length]]) + ' ' + prefix + '-class-content'" tabindex="0">
                <view v-if="description" tabindex="0" :class="_.cls(classPrefix + '__description', [align])">{{ description }}</view>
                <block v-if="gridThemeItems.length">
                    <!-- parse <template is="grid" :data="classPrefix, prefix, gridThemeItems, count, currentSwiperIndex"/> -->
                    <block name="grid">
                        <block v-if="gridThemeItems.length === 1">
                            <t-grid align="center" :t-class="classPrefix + '__grid'" :column="count / 2" :class="classPrefix + '__single-wrap'">
                                <t-grid-item
                                    :t-class="classPrefix + '__grid-item'"
                                    :class="classPrefix + '__square'"
                                    @tap.native="onSelect($event, { index })"
                                    :data-index="index"
                                    :icon=""
                                    :text="item.label || ''"
                                    :image="item.image || ''"
                                    :style="'--td-grid-item-text-color: ' + item.color"
                                    v-for="(item, index) in gridThemeItems[0]"
                                    :key="index"
                                ></t-grid-item>
                            </t-grid>
                        </block>
                        <block v-else-if="gridThemeItems.length > 1">
                            <view :class="classPrefix + '__swiper-wrap'">
                                <swiper style="height: 456rpx" :autoplay="false" :current="currentSwiperIndex" @change="onSwiperChange">
                                    <swiper-item v-for="(item, index) in gridThemeItems" :key="index">
                                        <t-grid align="center" :t-class="classPrefix + '__grid ' + classPrefix + '__grid--swiper'" :column="count / 2">
                                            <t-grid-item
                                                :t-class="classPrefix + '__grid-item'"
                                                :class="classPrefix + '__square'"
                                                :data-index="index"
                                                @tap.native="onSelect($event, { index })"
                                                :icon=""
                                                :text="item.label || ''"
                                                :image="item.image || ''"
                                                :style="'--td-grid-item-text-color: ' + item.color"
                                                v-for="(item, index1) in item"
                                                :key="index1"
                                            ></t-grid-item>
                                        </t-grid>
                                    </swiper-item>
                                </swiper>
                                <view :class="classPrefix + '__nav'">
                                    <view :class="classPrefix + '__dots'">
                                        <view
                                            :class="classPrefix + '__dots-item ' + (index === currentSwiperIndex ? prefix + '-is-active' : '')"
                                            v-for="(item, index) in gridThemeItems.length"
                                            :key="index"
                                        ></view>
                                    </view>
                                </view>
                            </view>
                        </block>
                    </block>
                </block>
                <view v-else-if="items && items.length" :class="classPrefix + '__list'">
                    <block v-for="(item, index) in items" :key="index">
                        <!-- parse <template is="list" :data="index, classPrefix, listThemeItemClass: _.cls(classPrefix + '__list-item', [align, [disabled, item.disabled]]), item"/> -->
                        <block name="list">
                            <view
                                :data-index="index"
                                :style="item.color ? 'color: ' + item.color : ''"
                                :class="_.cls(classPrefix + '__list-item', [align, [disabled, item.disabled]])"
                                @tap="onSelect"
                                :aria-role="ariaRole || 'button'"
                                :aria-label="item.label || item"
                                tabindex="0"
                            >
                                <t-icon v-if="item.icon" :name="item.icon" :class="classPrefix + '__list-item-icon'" size="48rpx"></t-icon>
                                <view :class="classPrefix + '__list-item-text'">{{ item.label || item }}</view>
                                <t-icon
                                    v-if="item.suffixIcon"
                                    :name="item.suffixIcon"
                                    :class="classPrefix + '__list-item-icon ' + classPrefix + '__list-item-icon--suffix'"
                                    size="48rpx"
                                ></t-icon>
                            </view>
                        </block>
                    </block>
                </view>
            </view>
            <slot />
            <view v-if="showCancel" :class="classPrefix + '__footer'">
                <view :class="classPrefix + '__gap-' + theme" />
                <view
                    :class="classPrefix + '__cancel ' + prefix + '-class-cancel'"
                    :hover-class="classPrefix + '__cancel--hover'"
                    hover-stay-time="70"
                    @tap="onCancel"
                    aria-role="button"
                >
                    {{ cancelText || '取消' }}
                </view>
            </view>
        </t-popup>
    </view>
</template>
<script module="_this" lang="wxs" src="@/action-sheet/action-sheet.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tPopup from "../popup/popup";
import tGrid from "../grid/grid";
import tGridItem from "../grid-item/grid-item";
import { __decorate } from "@/miniprogram_npm/tslib";
import { chunk } from "../common/utils";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import { ActionSheetTheme, show } from "./show";
import props from "./props";
import useCustomNavbar from "../mixins/using-custom-navbar";
const {
  prefix: prefix
} = config;
const name = `${prefix}-action-sheet`;
let ActionSheet = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.behaviors = [useCustomNavbar];
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-cancel`];
    this = Object.assign({}, props);
    this.setData({
      prefix: prefix,
      classPrefix: name,
      gridThemeItems: [],
      currentSwiperIndex: 0,
      defaultPopUpProps: {},
      defaultPopUpzIndex: 11500
    });
    this.controlledProps = [{
      key: "visible",
      event: "visible-change"
    }];
    this.observers = {
      "visible, items"(e) {
        if (e) {
          this.init();
        }
      }
    };
    this.methods = {
      init() {
        this.memoInitialData();
        this.splitGridThemeActions();
      },
      memoInitialData() {
        this.initialData = Object.assign(Object.assign({}, this), this);
      },
      splitGridThemeActions() {
        if (this.theme === ActionSheetTheme.Grid) {
          this.setData({
            gridThemeItems: chunk(this.items, this.count)
          });
        }
      },
      show(e) {
        this.setData(Object.assign(Object.assign(Object.assign({}, this.initialData), e), {
          visible: true
        }));
        this.splitGridThemeActions();
        this.autoClose = true;
        this._trigger("visible-change", {
          visible: true
        });
      },
      close() {
        this.$emit("close", {
          detail: {
            trigger: "command"
          }
        });
        this._trigger("visible-change", {
          visible: false
        });
      },
      onPopupVisibleChange({
        detail: e
      }) {
        e.visible || (this.$emit("close", {
          detail: {
            trigger: "overlay"
          }
        }), this._trigger("visible-change", {
          visible: false
        }));
        if (this.autoClose) {
          this.setData({
            visible: false
          });
          this.autoClose = false;
        }
      },
      onSwiperChange(e) {
        const {
          current: t
        } = e.detail;
        this.setData({
          currentSwiperIndex: t
        });
      },
      onSelect(e) {
        const {
          currentSwiperIndex: t,
          items: i,
          gridThemeItems: s,
          count: o,
          theme: r
        } = this;
        const {
          index: n
        } = e.currentTarget.dataset;
        const a = r === ActionSheetTheme.Grid;
        const h = a ? s[t][n] : i[n];
        const c = a ? n + t * o : n;
        if (h) {
          this.$emit("selected", {
            detail: {
              selected: h,
              index: c
            }
          });
          h.disabled || (this.$emit("close", {
            detail: {
              trigger: "select"
            }
          }), this._trigger("visible-change", {
            visible: false
          }));
        }
      },
      onCancel() {
        this.$emit("cancel");
        if (this.autoClose) {
          this.setData({
            visible: false
          });
          this.autoClose = false;
        }
      }
    };
  }
};
ActionSheet.show = show;
ActionSheet = __decorate([wxComponent()], ActionSheet);
export default ActionSheet;
</script>
<style>
@import './action-sheet.css';
@import 'undefined';
</style>
