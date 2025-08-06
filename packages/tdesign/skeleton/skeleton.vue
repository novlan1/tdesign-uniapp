<template>
    <view>
        <view v-if="isShow" :style="_._style([style, customStyle])" :class="classPrefix + ' class ' + prefix + '-class'">
            <view v-if="parsedRowcols.length" :class="classPrefix + '__content'">
                <view :class="classPrefix + '__row ' + prefix + '-class-row'" v-for="(row, index) in parsedRowcols" :key="index">
                    <view :class="col.class + ' ' + prefix + '-class-col'" :style="_._style(col.style)" v-for="(col, index1) in row" :key="index1"></view>
                </view>
            </view>
        </view>
        <view v-else :class="'class ' + classPrefix + '__content'"><slot /></view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { classNames } from "../common/utils";
import { isNumber } from "../common/validator";
const {
  prefix: prefix
} = config;
const name = `${prefix}-skeleton`;
const ThemeMap = {
  avatar: [{
    type: "circle",
    size: "96rpx"
  }],
  image: [{
    type: "rect",
    size: "144rpx"
  }],
  text: [[{
    width: "24%",
    height: "32rpx",
    marginRight: "32rpx"
  }, {
    width: "76%",
    height: "32rpx"
  }], 1],
  paragraph: [1, 1, 1, {
    width: "55%"
  }]
};
let Skeleton = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-col`, `${prefix}-class-row`];
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      parsedRowcols: []
    });
    this.observers = {
      rowCol() {
        this.init();
      },
      "loading, delay"() {
        this.isShowSkeleton();
      }
    };
    this.lifetimes = {
      attached() {
        this.init();
        this.isShowSkeleton();
      }
    };
    this.methods = {
      init() {
        const {
          theme: t,
          rowCol: e
        } = this;
        const s = [];
        if (e.length) {
          s.push(...e);
        } else {
          s.push(...ThemeMap[t || "text"]);
        }
        const i = s.map(t => {
          if (isNumber(t)) {
            return [{
              class: this.getColItemClass({
                type: "text"
              }),
              style: {}
            }];
          }
          if (Array.isArray(t)) {
            return t.map(t => Object.assign(Object.assign({}, t), {
              class: this.getColItemClass(t),
              style: this.getColItemStyle(t)
            }));
          }
          const e = t;
          return [Object.assign(Object.assign({}, e), {
            class: this.getColItemClass(e),
            style: this.getColItemStyle(e)
          })];
        });
        this.setData({
          parsedRowcols: i
        });
      },
      getColItemClass(t) {
        return classNames([`${name}__col`, `${name}--type-${t.type || "text"}`, `${name}--animation-${this.animation}`]);
      },
      getColItemStyle(t) {
        const e = {};
        ["width", "height", "marginRight", "marginLeft", "margin", "size", "background", "backgroundColor", "borderRadius"].forEach(s => {
          if (s in t) {
            const i = isNumber(t[s]) ? `${t[s]}px` : t[s];
            "size" === s ? [e.width, e.height] = [i, i] : e[s] = i;
          }
        });
        return e;
      },
      isShowSkeleton() {
        const {
          loading: t,
          delay: e
        } = this;
        t && 0 !== e ? setTimeout(() => {
          this.setData({
            isShow: t
          });
        }, e) : this.setData({
          isShow: t
        });
      }
    };
  }
};
Skeleton = __decorate([wxComponent()], Skeleton);
export default Skeleton;
</script>
<style>
@import './skeleton.css';
</style>
