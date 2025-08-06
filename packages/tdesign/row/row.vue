<template>
    <view :class="'class ' + prefix + '-row'" :style="utils.getRowStyles(gutter, style, customStyle)"><slot /></view>
</template>
<script module="utils" lang="wxs" src="@/row/row.wxs"></script>
<script>
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
const {
  prefix: prefix
} = config;
let Row = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [];
    this = props;
    this.setData({
      prefix: prefix
    });
    this.relations = {
      "../col/col": {
        type: "child",
        linked(t) {
          const {
            gutter: o
          } = this;
          if (o) {
            t.setData({
              gutter: o
            });
          }
        }
      }
    };
    this.observers = {
      gutter() {
        this.setGutter();
      }
    };
    this.methods = {
      setGutter() {
        const {
          gutter: t
        } = this;
        this.$children.forEach(o => {
          o.setData({
            gutter: t
          });
        });
      }
    };
  }
};
Row = __decorate([wxComponent()], Row);
export default Row;
</script>
<style>
@import './row.css';
</style>
