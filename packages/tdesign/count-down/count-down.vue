<template>
    <view
        :style="_._style([style, customStyle])"
        :class="classPrefix + ' ' + classPrefix + '--' + theme + ' ' + classPrefix + '--' + size + ' class ' + prefix + '-class'"
        aria-role="option"
    >
        <slot v-if="content !== 'default'" name="content" />
        <slot v-if="content !== 'default'" />
        <block v-else-if="theme == 'default' && !splitWithUnit">{{ formattedTime }}</block>
        <block v-else>
            <block v-for="(item, index) in timeRange" :key="index">
                <text :class="classPrefix + '__item ' + prefix + '-class-count'">{{ _this.format(timeData[timeRange[index]]) }}</text>

                <text
                    v-if="splitWithUnit || timeRange.length - 1 !== index"
                    :class="classPrefix + '__split ' + classPrefix + '__split--' + (splitWithUnit ? 'text' : 'dot') + ' ' + prefix + '-class-split'"
                >
                    {{ splitWithUnit ? timeDataUnit[timeRange[index]] : ':' }}
                </text>
            </block>
        </block>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script module="_this" lang="wxs" src="@/count-down/count-down.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { isSameSecond, parseFormat, parseTimeData, TimeDataUnit } from "./utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-count-down`;
let CountDown = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-count`, `${prefix}-class-split`];
    this = props;
    this.observers = {
      time() {
        this.reset();
      }
    };
    this.setData({
      prefix: prefix,
      classPrefix: name,
      timeDataUnit: TimeDataUnit,
      timeData: parseTimeData(0),
      formattedTime: "0"
    });
    this.timeoutId = null;
    this.isInitialTime = false;
    this.lifetimes = {
      detached() {
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
      }
    };
    this.methods = {
      start() {
        this.counting || (this.counting = true, this.endTime = Date.now() + this.remain, this.doCount());
      },
      pause() {
        this.counting = false;
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
      },
      reset() {
        this.pause();
        this.remain = this.time;
        this.updateTime(this.remain);
        if (this.autoStart && this.remain > 0) {
          this.start();
        }
        this.isInitialTime = true;
      },
      getTime() {
        return Math.max(this.endTime - Date.now(), 0);
      },
      updateTime(t) {
        const {
          format: i
        } = this;
        this.remain = t;
        const e = parseTimeData(t);
        this.$emit("change", {
          detail: e
        });
        const {
          timeText: s
        } = parseFormat(t, i);
        const o = i.split(":");
        this.setData({
          timeRange: o,
          timeData: e,
          formattedTime: s.replace(/:/g, " : ")
        });
        if (0 === t && (this.counting || this.isInitialTime)) {
          this.pause();
          this.$emit("finish");
          this.counting = false;
        }
      },
      doCount() {
        this.timeoutId = setTimeout(() => {
          const t = this.getTime();
          if (this.millisecond) {
            this.updateTime(t);
          } else {
            isSameSecond(t, this.remain) && 0 !== t || this.updateTime(t);
          }
          if (0 !== t) {
            this.doCount();
          }
        }, 33);
      }
    };
  }
};
CountDown = __decorate([wxComponent()], CountDown);
export default CountDown;
</script>
<style>
@import './count-down.css';
</style>
