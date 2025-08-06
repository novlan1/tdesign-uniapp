<template>
    <view
        :style="_._style([style, customStyle])"
        :class="classPrefix + ' class ' + prefix + '-class'"
        id="t-bar"
        @touchmove.stop.prevent="parseEventDynamicCode($event, activeIdx === -1 ? '' : 'noop')"
    >
        <view
            @tap="handleToggle"
            :data-index="index"
            :class="
                _.cls(classPrefix + '__item', [
                    ['active', activeIdx == index],
                    ['disabled', item.disabled],
                    [index, true]
                ]) +
                ' ' +
                prefix +
                '-class-item'
            "
            :aria-disabled="item.disabled"
            aria-role="button"
            :aria-expanded="activeIdx === index"
            aria-haspopup="menu"
            v-for="(item, index) in menus"
            :key="index"
        >
            <view :class="classPrefix + '__title ' + prefix + '-class-label'">{{ item.label }}</view>

            <!-- parse <template is="icon" :data="..._arrowIcon, ariaHidden: true, tClass: classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"/> -->
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
        <slot />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { calcIcon } from "../common/utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-dropdown-menu`;
let DropdownMenu = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-item`, `${prefix}-class-label`, `${prefix}-class-icon`];
    this = props;
    this.nodes = null;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      menus: null,
      activeIdx: -1,
      bottom: 0,
      _arrowIcon: {
        name: props.arrowIcon.value
      }
    });
    this.relations = {
      "../dropdown-item/dropdown-item": {
        type: "child"
      }
    };
    this.lifetimes = {
      ready() {
        this.getAllItems();
      }
    };
    this.observers = {
      arrowIcon(e) {
        this.setData({
          _arrowIcon: calcIcon(e)
        });
      },
      activeIdx(e) {
        this.$emit(-1 === e ? "close" : "open");
      }
    };
    this.methods = {
      toggle(e) {
        const {
          activeIdx: t,
          duration: o
        } = this;
        const s = this.$children[t];
        const r = this.$children[e];
        (null == r ? void 0 : r.data.disabled) || (-1 !== t && (s.$emit("close"), s.setData({
          show: false
        }, () => {
          setTimeout(() => {
            s.$emit("closed");
          }, o);
        })), null == e || t === e ? this.setData({
          activeIdx: -1
        }) : (r.$emit("open"), this.setData({
          activeIdx: e
        }), r.setData({
          show: true
        }, () => {
          setTimeout(() => {
            r.$emit("opened");
          }, o);
        })));
      },
      getAllItems() {
        const e = this.$children.map(({
          data: e
        }) => ({
          label: e.label || e.computedLabel,
          disabled: e.disabled
        }));
        this.setData({
          menus: e
        });
      },
      handleToggle(e) {
        const {
          index: t
        } = e.currentTarget.dataset;
        this.toggle(t);
      },
      noop() {}
    };
  }
};
DropdownMenu = __decorate([wxComponent()], DropdownMenu);
export default DropdownMenu;
</script>
<style>
@import './dropdown-menu.css';
@import 'undefined';
</style>
