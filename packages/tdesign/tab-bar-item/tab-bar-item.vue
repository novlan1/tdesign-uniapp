<template>
    <view
        :style="_._style([style, customStyle])"
        :class="_.cls(classPrefix, [['split', split], ['text-only', !icon], ['crowded', crowded], shape]) + ' class ' + prefix + '-class'"
    >
        <view
            :class="_.cls(classPrefix + '__content', [['checked', isChecked], theme])"
            :hover-class="classPrefix + '__content--active'"
            :hover-stay-time="200"
            @tap="toggle"
            :aria-selected="(!hasChildren || !isSpread) && isChecked ? true : false"
            :aria-expanded="hasChildren && isSpread ? true : ''"
            :aria-role="hasChildren ? 'button' : 'tab'"
            :aria-label="ariaLabel || (badgeProps.dot || badgeProps.count ? _.getBadgeAriaLabel({ ...badgeProps }) : '')"
        >
            <view :class="classPrefix + '__icon'" :style="'height: ' + (iconOnly ? 24 : 20) + 'px'" :aria-hidden="badgeProps.dot || badgeProps.count">
                <t-badge
                    v-if="badgeProps.dot || badgeProps.count"
                    :count="badgeProps.count || 0"
                    :max-count="badgeProps.maxCount || 99"
                    :dot="badgeProps.dot || false"
                    :content="badgeProps.content || ''"
                    :size="badgeProps.size || 'medium'"
                    :visible="badgeProps.visible"
                    :offset="badgeProps.offset || [0, 0]"
                    :t-class-count="prefix + '-badge-class'"
                >
                    <!-- parse <template is="icon" :data="size: iconOnly ? 24 : 20, ..._icon"/> -->
                    <block name="icon" v-if="false">
                        <t-icon
                            :style="style || ''"
                            :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                            :prefix="prefix || ''"
                            :name="'close' || ''"
                            :size="22 || ''"
                            :color="color || ''"
                            :aria-hidden="true || ''"
                            :aria-label="'清除' || ''"
                            :aria-role="'button' || ''"
                            @click="bindclick || ''"
                        />
                    </block>
                </t-badge>
                <!-- parse <template v-else-if="(!!icon)" is="icon" :data="ariaHidden: !iconOnly, size: iconOnly ? 24 : 20, ..._icon"/> -->
                <block name="icon" v-if="false" v-else-if="!!icon">
                    <t-icon
                        :style="style || ''"
                        :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                        :prefix="prefix || ''"
                        :name="'close' || ''"
                        :size="22 || ''"
                        :color="color || ''"
                        :aria-hidden="true || ''"
                        :aria-label="'清除' || ''"
                        :aria-role="'button' || ''"
                        @click="bindclick || ''"
                    />
                </block>
                <slot name="icon" />
            </view>
            <view :class="_.cls(classPrefix + '__text', [['small', !!icon]])">
                <t-icon v-if="hasChildren" name="view-list" size="32rpx" :t-class="classPrefix + '__icon-menu'" />
                <slot />
            </view>
        </view>
        <view :class="classPrefix + '__spread'" v-if="hasChildren && isSpread">
            <view
                :class="classPrefix + '__spread-item'"
                :hover-class="classPrefix + '__spread-item--active'"
                :hover-stay-time="200"
                @tap="selectChild"
                :data-value="child.value || index"
                aria-role="tab"
                v-for="(child, index) in subTabBar"
                :key="index"
            >
                <view :class="classPrefix + '__spread-item-split'" v-if="index !== 0" />

                <view :class="classPrefix + '__spread-item-text'" :data-value="child.value || index">{{ child.label }}</view>
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tIcon from "../icon/icon";
import tBadge from "../badge/badge";
import { __awaiter, __decorate } from "@/miniprogram_npm/tslib";
import { wxComponent, SuperComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import { getRect, calcIcon } from "../common/utils";
const {
  prefix: prefix
} = config;
const classPrefix = `${prefix}-tab-bar-item`;
let TabBarItem = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.parent = null;
    this.relations = {
      "../tab-bar/tab-bar": {
        type: "ancestor",
        linked(t) {
          const {
            theme: e,
            split: a,
            shape: s
          } = t.data;
          this.setData({
            theme: e,
            split: a,
            shape: s,
            currentName: this.value ? this.value : t.initName()
          });
          t.updateChildren();
        }
      }
    };
    this.options = {
      multipleSlots: true
    };
    this.setData({
      prefix: prefix,
      classPrefix: classPrefix,
      isSpread: false,
      isChecked: false,
      hasChildren: false,
      currentName: "",
      split: true,
      iconOnly: false,
      theme: "",
      crowded: false,
      shape: "normal"
    });
    this = props;
    this.observers = {
      subTabBar(t) {
        this.setData({
          hasChildren: t.length > 0
        });
      },
      icon(t) {
        this.setData({
          _icon: calcIcon(t)
        });
      }
    };
    this.lifetimes = {
      attached() {
        return __awaiter(this, void 0, void 0, function* () {
          const t = yield getRect(this, `.${classPrefix}__text`);
          this.setData({
            iconOnly: 0 === t.height
          });
        });
      }
    };
    this.methods = {
      showSpread() {
        this.setData({
          isSpread: true
        });
      },
      toggle() {
        const {
          currentName: t,
          hasChildren: e,
          isSpread: a
        } = this;
        if (e) {
          this.setData({
            isSpread: !a
          });
        }
        this.$parent.updateValue(t);
        this.$parent.changeOtherSpread(t);
      },
      selectChild(t) {
        const {
          value: e
        } = t.target.dataset;
        this.$parent.updateValue(e);
        this.setData({
          isSpread: false
        });
      },
      checkActive(t) {
        const {
          currentName: e,
          subTabBar: a
        } = this;
        const s = (null == a ? void 0 : a.some(e => e.value === t)) || e === t;
        this.setData({
          isChecked: s
        });
      },
      closeSpread() {
        this.setData({
          isSpread: false
        });
      }
    };
  }
};
TabBarItem = __decorate([wxComponent()], TabBarItem);
export default TabBarItem;
</script>
<style>
@import './tab-bar-item.css';
@import 'undefined';
</style>
