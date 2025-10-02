<template>
    <view :class="'class ' + prefix + '-row'" :style="getRowStyles(gutter, style, customStyle)"><slot /></view>
</template>
<script>
import { __decorate } from "../miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import _ from '../common/utils.wxs';
import {getRowStyles} from './row.wxs';
import { initTDesign } from '../common/runtime';

const {
  prefix: prefix
} = config;
let Row = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [];
    this.properties = props;;
    this.setData({
      prefix: prefix
    });
    this._ = _;
    this.getRowStyles = getRowStyles;
    this.watch = {
      gutter: {
        handler() {
          this.setGutter();
        },
        immediate: true,
      }
    }
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
        // TODO: children undefined check
        this.children?.forEach(o => {
          o.setData({
            gutter: t
          });
        });
      }
    };
  }
};
Row = initTDesign(__decorate([wxComponent()], Row));
export default Row;
</script>
<style>
@import './row.css';
</style>
