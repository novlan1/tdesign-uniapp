<template>
    <view :class="classPrefix + ' class ' + prefix + '-class'" :style="_._style(['z-index:' + zIndex, containerStyle, style, customStyle])">
        <view :class="classPrefix + '__content ' + prefix + '-class-content'" :style="_._style(['z-index:' + zIndex, contentStyle])"><slot /></view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import props from "./props";
import config from "../common/config";
import pageScrollMixin from "../mixins/page-scroll";
import { getRect } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-sticky`;
const ContainerClass = `.${name}`;
let Sticky = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`];
    this = props;
    this.behaviors = [pageScrollMixin()];
    this.observers = {
      "offsetTop, disabled, container"() {
        this.onScroll();
      }
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      containerStyle: "",
      contentStyle: ""
    });
    this.methods = {
      onScroll(t) {
        const {
          scrollTop: e
        } = t || {};
        const {
          container: i,
          offsetTop: o,
          disabled: s
        } = this;
        if (s) {
          this.setDataAfterDiff({
            isFixed: false,
            transform: 0
          });
        } else {
          this.scrollTop = e || this.scrollTop;
          if ("function" != typeof i) {
            getRect(this, ContainerClass).then(t => {
              if (t) {
                if (o >= t.top) {
                  this.setDataAfterDiff({
                    isFixed: true,
                    height: t.height
                  }), this.transform = 0;
                } else {
                  this.setDataAfterDiff({
                    isFixed: false
                  });
                }
              }
            });
          } else {
            Promise.all([getRect(this, ContainerClass), this.getContainerRect()]).then(([t, e]) => {
              if (t && e) {
                o + t.height > e.height + e.top ? this.setDataAfterDiff({
                  isFixed: false,
                  transform: e.height - t.height
                }) : o >= t.top ? this.setDataAfterDiff({
                  isFixed: true,
                  height: t.height,
                  transform: 0
                }) : this.setDataAfterDiff({
                  isFixed: false,
                  transform: 0
                });
              }
            });
          }
        }
      },
      setDataAfterDiff(t) {
        const {
          offsetTop: e
        } = this;
        const {
          containerStyle: i,
          contentStyle: o
        } = this;
        const {
          isFixed: s,
          height: r,
          transform: n
        } = t;
        this.$nextTick(() => {
          let t = "";
          let a = "";
          if (s) {
            t += `height:${r}px;`;
            a += `position:fixed;top:${e}px;left:0;right:0;`;
          }
          if (n) {
            const t = `translate3d(0, ${n}px, 0)`;
            a += `-webkit-transform:${t};transform:${t};`;
          }
          i === t && o === a || this.setData({
            containerStyle: t,
            contentStyle: a
          });
          this.$emit("scroll", {
            detail: {
              scrollTop: this.scrollTop,
              isFixed: s
            }
          });
        });
      },
      getContainerRect() {
        const t = this.container();
        return new Promise(e => t.boundingClientRect(e).exec());
      }
    };
  }
  ready() {
    this.onScroll();
  }
};
Sticky = __decorate([wxComponent()], Sticky);
export default Sticky;
</script>
<style>
@import './sticky.css';
</style>
