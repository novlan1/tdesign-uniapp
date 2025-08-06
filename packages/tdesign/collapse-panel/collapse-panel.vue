<template>
    <view :style="_._style([style, customStyle])" :class="'class ' + classPrefix + ' ' + classPrefix + '--' + placement + ' ' + prefix + '-class'">
        <view :class="classPrefix + '__title'" aria-role="button" :aria-expanded="expanded" :aria-disabled="ultimateDisabled" @tap="onClick">
            <t-cell
                :title="header"
                :note="headerRightContent"
                bordered
                :left-icon="headerLeftIcon"
                :right-icon="ultimateExpandIcon ? (expanded ? 'chevron-up' : 'chevron-down') : ''"
                :t-class="_.cls(classPrefix + '__header', [placement, ['expanded', expanded]]) + ' ' + prefix + '-class-header'"
                :t-class-title="'class-title ' + (ultimateDisabled ? 'class-title--disabled' : '')"
                :t-class-note="'class-note ' + (ultimateDisabled ? 'class-note--disabled' : '')"
                :t-class-right-icon="'class-right-icon ' + classPrefix + '__arrow--' + placement + ' ' + (ultimateDisabled ? 'class-right-icon--disabled' : '')"
                t-class-hover="class-header-hover"
            >
                <slot name="header-left-icon" slot="left-icon" />
                <slot name="header" slot="title" />
                <slot name="header-right-content" slot="note" />
                <slot name="expand-icon" slot="right-icon" />
            </t-cell>
        </view>
        <view :class="classPrefix + '__wrapper'" :animation="animation" :aria-hidden="expanded ? '' : true">
            <view :class="_.cls(classPrefix + '__content', [['disabled', ultimateDisabled], ['expanded', expanded], placement]) + ' ' + prefix + '-class-content'">
                {{ content }}
                <slot />
                <slot name="content" />
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tCell from "../cell/cell";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getRect } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-collapse-panel`;
let CollapsePanel = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-header`];
    this.options = {
      multipleSlots: true
    };
    this.relations = {
      "../collapse/collapse": {
        type: "ancestor",
        linked(e) {
          const {
            value: t,
            expandIcon: a,
            disabled: s
          } = e.properties;
          this.setData({
            ultimateExpandIcon: null == this.expandIcon ? a : this.expandIcon,
            ultimateDisabled: null == this.disabled ? s : this.disabled
          });
          this.updateExpanded(t);
        }
      }
    };
    this = props;
    this.setData({
      prefix: prefix,
      expanded: false,
      classPrefix: name,
      classBasePrefix: prefix,
      ultimateExpandIcon: false,
      ultimateDisabled: false
    });
    this.observers = {
      disabled(e) {
        this.setData({
          ultimateDisabled: !!e
        });
      }
    };
    this.methods = {
      updateExpanded(e = []) {
        if (!this.$parent) {
          return;
        }
        const {
          value: t
        } = this;
        const {
          defaultExpandAll: a
        } = this.$parent.data;
        const s = a ? !this.expanded : e.includes(t);
        if (s !== this.expanded) {
          this.setData({
            expanded: s
          });
          this.updateStyle(s);
        }
      },
      updateStyle(e) {
        return getRect(this, `.${name}__content`).then(e => e.height).then(t => {
          const a = uni.createAnimation({
            duration: 0,
            timingFunction: "ease-in-out"
          });
          e ? a.height(t).top(0).step({
            duration: 300
          }).height("auto").step() : a.height(t).top(1).step({
            duration: 1
          }).height(0).step({
            duration: 300
          });
          this.setData({
            animation: a.export()
          });
        });
      },
      onClick() {
        const {
          ultimateDisabled: e
        } = this;
        const {
          value: t
        } = this;
        e || (this.$parent.data.defaultExpandAll ? this.updateExpanded() : this.$parent.switch(t));
      }
    };
  }
};
CollapsePanel = __decorate([wxComponent()], CollapsePanel);
export default CollapsePanel;
</script>
<style>
@import './collapse-panel.css';
</style>
