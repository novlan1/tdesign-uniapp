<template>
    <view :class="'class ' + prefix + '-class ' + classPrefix" :style="_._style([style, customStyle])">
        <swiper
            :class="classPrefix + '-host'"
            :autoplay="autoplay"
            :current="current"
            :interval="interval"
            :duration="duration"
            :circular="loop"
            :vertical="direction == 'vertical'"
            :easing-function="easingFunction"
            :previous-margin="previousMargin"
            :next-margin="nextMargin"
            :snap-to-edge="snapToEdge"
            :display-multiple-items="displayMultipleItems"
            :style="'height: ' + _.addUnit(height)"
            @change="onChange"
        >
            <swiper-item
                :class="
                    _.cls(classPrefix + '__item', [
                        ['preview', _this.isPrev(navCurrent, index, list)],
                        ['next', _this.isNext(navCurrent, index, list)]
                    ])
                "
                :data-index="index"
                @tap="onTap"
                :aria-hidden="navCurrent !== index"
                aria-role="image"
                :aria-label="_.isObject(item) ? item.ariaLabel : ''"
                v-for="(item, index) in list"
                :key="index"
            >
                <!-- parse <template is="image" :data="tClass: _this.getImageClass(prefix, navCurrent, index, list), style: 'height: ' + _.addUnit(height), src: _.isObject(item) ? item.value : item, mode: 'aspectFill', dataset: index, ...imageProps, bindload: 'onImageLoad'"/> -->
                <block name="image" v-if="false">
                    <t-image
                        :t-class="_.cls(classPrefix + '__image', [util.getImageSize(column)]) + ' ' + prefix + '-class-image'"
                        :t-class-load="tClassLoad"
                        :style="'height: ' + _.addUnit(height) || ''"
                        :customStyle="customStyle || ''"
                        :height="height || ''"
                        :width="width || ''"
                        :error="error || 'default'"
                        :lazy="lazy || false"
                        :loading="count || 'default'"
                        :shape="'round' || 'square'"
                        :src="image || ''"
                        :mode="'widthFix' || 'scaleToFill'"
                        :webp="webp || false"
                        :showMenuByLongpress="showMenuByLongpress || false"
                        :data-custom="index || null"
                        @error="binderror($event, { custom: index || null })"
                        @load="'onImageLoad';"
                    />
                </block>
            </swiper-item>
        </swiper>
        <t-swiper-nav
            v-if="navigation"
            :t-class="prefix + '-class-nav'"
            :type="navigation.type || 'dots'"
            :current="navCurrent || 0"
            :total="list.length || 0"
            :direction="direction || 'horizontal'"
            :pagination-position="paginationPosition || 'bottom'"
            :min-show-num="navigation.minShowNum || 2"
            :show-controls="navigation.showControls || false"
            @nav-btn-change="onNavBtnChange"
        />
        <slot name="navigation" />
        <slot name="nav" />
    </view>
</template>
<script module="_this" lang="wxs" src="@/swiper/index.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tSwiperNav from "../swiper-nav/swiper-nav";
import tImage from "../image/image";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
const name = `${prefix}-swiper`;
let Swiper = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-nav`, `${prefix}-class-image`, `${prefix}-class-prev-image`, `${prefix}-class-next-image`];
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.observers = {
      navCurrent(t) {
        this.updateNav(t);
      }
    };
    this.$nav = null;
    this.relations = {
      "../swiper-nav/swiper-nav": {
        type: "child"
      }
    };
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.lifetimes = {
      ready() {
        const {
          current: t
        } = this;
        this.setData({
          navCurrent: t
        });
      }
    };
    this.methods = {
      updateNav(t) {
        var e;
        if (this.navigation) {
          return;
        }
        const i = null === (e = this.getRelationNodes("./swiper-nav")) || void 0 === e ? void 0 : e[0];
        if (!i) {
          return;
        }
        const {
          direction: r,
          paginationPosition: n,
          list: s
        } = this;
        i.setData({
          current: t,
          total: s.length,
          direction: r,
          paginationPosition: n
        });
      },
      onTap(t) {
        const {
          index: e
        } = t.currentTarget.dataset;
        this.$emit("click", {
          detail: {
            index: e
          }
        });
      },
      onChange(t) {
        const {
          current: e,
          source: i
        } = t.detail;
        this.setData({
          navCurrent: e
        });
        this.$emit("change", {
          detail: {
            current: e,
            source: i
          }
        });
      },
      onNavBtnChange(t) {
        const {
          dir: e,
          source: i
        } = t.detail;
        this.doNavBtnChange(e, i);
      },
      doNavBtnChange(t, e) {
        const {
          current: i,
          list: r,
          loop: n
        } = this;
        const s = r.length;
        let o = "next" === t ? i + 1 : i - 1;
        o = n ? "next" === t ? (i + 1) % s : (i - 1 + s) % s : o < 0 || o >= s ? i : o;
        if (o !== i) {
          this.setData({
            current: o
          });
          this.$emit("change", {
            detail: {
              current: o,
              source: e
            }
          });
        }
      },
      onImageLoad(t) {
        this.$emit("image-load", {
          detail: {
            index: t.target.dataset.custom
          }
        });
      }
    };
  }
};
Swiper = __decorate([wxComponent()], Swiper);
export default Swiper;
</script>
<style>
@import './swiper.css';
@import 'undefined';
</style>
