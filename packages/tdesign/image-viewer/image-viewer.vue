<template>
    <view
        v-if="visible"
        :id="classPrefix"
        :class="classPrefix + ' class ' + prefix + '-class'"
        :style="_._style([style, customStyle, '--td-image-viewer-top: ' + maskTop + 'px'])"
        :aria-modal="true"
        aria-role="dialog"
        aria-label="图片查看器"
        @touchmove.stop.prevent="true"
    >
        <view :class="classPrefix + '__mask'" data-source="overlay" @tap="onClose" :style="'background-color: ' + backgroundColor" aria-role="button" aria-label="关闭" />
        <block v-if="images && images.length">
            <view :class="classPrefix + '__content'">
                <swiper
                    class="swiper"
                    :style="swiperStyle[currentSwiperIndex].style"
                    :autoplay="false"
                    :current="currentSwiperIndex"
                    @change="onSwiperChange"
                    @tap="onClose"
                    tabindex="0"
                >
                    <swiper-item :class="classPrefix + '__preview-image'" v-for="(item, index) in images" :key="index">
                        <t-image
                            v-if="!lazy || utils.shouldLoadImage(index, currentSwiperIndex, loadedImageIndexes)"
                            t-class="t-image--external"
                            :style="imagesStyle[index].style || ''"
                            mode="aspectFit"
                            :src="item"
                            :data-index="index"
                            :class="classPrefix + '__image'"
                            @load="onImageLoadSuccess($event, { index })"
                        ></t-image>
                    </swiper-item>
                </swiper>
            </view>
            <view :class="classPrefix + '__nav'">
                <view :class="classPrefix + '__nav-close'" @tap.stop.prevent="onClose" aria-role="button" aria-label="关闭">
                    <slot name="close-btn" />
                    <!-- parse <template v-if="_closeBtn" is="icon" :data="..._closeBtn"/> -->
                    <block name="icon" v-if="false" v-if="_closeBtn">
                        <t-icon
                            :style="style || ''"
                            :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                            :prefix="prefix || ''"
                            :name="'close' || ''"
                            :size="22 || ''"
                            :color="color || ''"
                            :aria-hidden="true || ''"
                            :aria-label="ariaLabel || ''"
                            :aria-role="ariaRole || ''"
                            @click="bindclick || ''"
                        />
                    </block>
                </view>
                <view v-if="showIndex" :class="classPrefix + '__nav-index'">{{ currentSwiperIndex + 1 }}/{{ images.length }}</view>
                <view :class="classPrefix + '__nav-delete'" @tap="onDelete" aria-role="button" aria-label="删除">
                    <slot name="delete-btn" />
                    <!-- parse <template is="icon" :data="..._deleteBtn"/> -->
                    <block name="icon" v-if="false">
                        <t-icon
                            :style="style || ''"
                            :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                            :prefix="prefix || ''"
                            :name="'close' || ''"
                            :size="22 || ''"
                            :color="color || ''"
                            :aria-hidden="true || ''"
                            :aria-label="ariaLabel || ''"
                            :aria-role="ariaRole || ''"
                            @click="bindclick || ''"
                        />
                    </block>
                </view>
            </view>
        </block>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="utils" lang="wxs" src="@/image-viewer/image-viewer.wxs"></script>
<script>
import tImage from "../image/image";
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import { styles, calcIcon, systemInfo } from "../common/utils";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-image-viewer`;
let ImageViewer = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this = Object.assign({}, props);
    this.setData({
      prefix: prefix,
      classPrefix: name,
      currentSwiperIndex: 0,
      loadedImageIndexes: [],
      windowHeight: 0,
      windowWidth: 0,
      swiperStyle: {},
      imagesStyle: {},
      maskTop: 0
    });
    this.options = {
      multipleSlots: true
    };
    this.controlledProps = [{
      key: "visible",
      event: "close"
    }];
    this.observers = {
      "visible,initialIndex,images"(e, t, s) {
        if (e && (null == s ? void 0 : s.length)) {
          this.setData({
            loadedImageIndexes: [],
            currentSwiperIndex: t >= s.length ? s.length - 1 : t
          });
        }
      },
      closeBtn(e) {
        this.setData({
          _closeBtn: calcIcon(e, "close")
        });
      },
      deleteBtn(e) {
        this.setData({
          _deleteBtn: calcIcon(e, "delete")
        });
      }
    };
    this.methods = {
      calcMaskTop() {
        if (this.usingCustomNavbar) {
          const e = (null === wx || void 0 === wx ? void 0 : uni.getMenuButtonBoundingClientRect()) || null;
          const {
            statusBarHeight: t
          } = systemInfo;
          if (e && t) {
            this.setData({
              maskTop: e.top - t + e.bottom
            });
          }
        }
      },
      saveScreenSize() {
        const {
          windowHeight: e,
          windowWidth: t
        } = systemInfo;
        this.setData({
          windowHeight: e,
          windowWidth: t
        });
      },
      calcImageDisplayStyle(e, t) {
        const {
          windowWidth: s,
          windowHeight: i
        } = this;
        const a = e / t;
        if (e < s && t < i) {
          return {
            styleObj: {
              width: 2 * e + "rpx",
              height: 2 * t + "rpx",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }
          };
        }
        if (a >= 1) {
          return {
            styleObj: {
              width: "100vw",
              height: s / a * 2 + "rpx"
            }
          };
        }
        const n = a * i * 2;
        return n < s ? {
          styleObj: {
            width: `${n}rpx`,
            height: "100vh",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }
        } : {
          styleObj: {
            width: "100vw",
            height: s / e * t * 2 + "rpx"
          }
        };
      },
      onImageLoadSuccess(e) {
        const {
          detail: {
            width: t,
            height: s
          },
          currentTarget: {
            dataset: {
              index: i
            }
          }
        } = e;
        const {
          mode: a,
          styleObj: n
        } = this.calcImageDisplayStyle(t, s);
        const o = this.imagesStyle;
        const r = this.swiperStyle;
        this.loadedImageIndexes.includes(i) || this.setData({
          loadedImageIndexes: [...this.loadedImageIndexes, i]
        });
        this.setData({
          swiperStyle: Object.assign(Object.assign({}, r), {
            [i]: {
              style: `height: ${n.height}`
            }
          }),
          imagesStyle: Object.assign(Object.assign({}, o), {
            [i]: {
              mode: a,
              style: styles(Object.assign({}, n))
            }
          })
        });
      },
      onSwiperChange(e) {
        const {
          detail: {
            current: t
          }
        } = e;
        this.setData({
          currentSwiperIndex: t
        });
        this._trigger("change", {
          index: t
        });
      },
      onClose(e) {
        const {
          source: t
        } = e.currentTarget.dataset;
        this._trigger("close", {
          visible: false,
          trigger: t || "button",
          index: this.currentSwiperIndex
        });
      },
      onDelete() {
        this._trigger("delete", {
          index: this.currentSwiperIndex
        });
      }
    };
  }
  ready() {
    this.saveScreenSize();
    this.calcMaskTop();
  }
};
ImageViewer = __decorate([wxComponent()], ImageViewer);
export default ImageViewer;
</script>
<style>
@import './image-viewer.css';
@import 'undefined';
</style>
