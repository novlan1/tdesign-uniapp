<template>
    <view
        :class="classPrefix + ' class ' + prefix + '-class'"
        :style="_._style([style, customStyle])"
        @touchstart="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend="onTouchEnd"
    >
        <slot></slot>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import { __awaiter, __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../../common/src/index";
import config from "../../common/config";
import props from "./props";
import { getRect, systemInfo } from "../../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-draggable`;
let Draggable = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this = props;
    this.externalClasses = [`${prefix}-class`];
    this.setData({
      prefix: prefix,
      classPrefix: name
    });
    this.lifetimes = {
      ready() {
        this.computedRect();
      }
    };
    this.methods = {
      onTouchStart(t) {
        if ("none" !== this.direction) {
          this.startX = t.touches[0].clientX + systemInfo.windowWidth - this.rect.right;
          this.startY = t.touches[0].clientY + systemInfo.windowHeight - this.rect.bottom;
          this.$emit("start", {
            detail: {
              startX: this.startX,
              startY: this.startY,
              rect: this.rect,
              e: t
            }
          });
        }
      },
      onTouchMove(t) {
        if ("none" === this.direction) {
          return;
        }
        let e = this.startX - t.touches[0].clientX;
        let i = this.startY - t.touches[0].clientY;
        if ("vertical" === this.direction) {
          e = systemInfo.windowWidth - this.rect.right;
        }
        if ("horizontal" === this.direction) {
          i = systemInfo.windowHeight - this.rect.bottom;
        }
        this.$emit("move", {
          detail: {
            x: e,
            y: i,
            rect: this.rect,
            e: t
          }
        });
      },
      onTouchEnd(t) {
        return __awaiter(this, void 0, void 0, function* () {
          if ("none" !== this.direction) {
            yield this.computedRect();
            this.$emit("end", {
              detail: {
                rect: this.rect,
                e: t
              }
            });
          }
        });
      },
      computedRect() {
        return __awaiter(this, void 0, void 0, function* () {
          this.rect = {
            right: 0,
            bottom: 0,
            width: 0,
            height: 0
          };
          try {
            this.rect = yield getRect(this, `.${this.classPrefix}`);
          } catch (t) {
            console.log("CatchClause", t);
            console.log("CatchClause", t);
          }
        });
      }
    };
  }
};
Draggable = __decorate([wxComponent()], Draggable);
export default Draggable;
</script>
<style>
@import './draggable.css';
</style>
