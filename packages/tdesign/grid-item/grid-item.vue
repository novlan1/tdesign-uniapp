<template>
  <view
    :class="_.cls(classPrefix, [['auto-size', column == 0]]) + ' class ' + prefix + '-class'"
    :style="_._style([gridItemStyle, style, customStyle])"
    :hover-class="hover ? classPrefix + '--hover' : ''"
    :hover-stay-time="200"
    :aria-role="ariaRole || 'button'"
    :aria-label="ariaLabel"
    :aria-describedby="describedbyID"
    @tap="onClick"
  >
    <view
      :class="_.cls(classPrefix + '__wrapper', [layout])"
      :style="gridItemWrapperStyle"
    >
      <view
        :class="_.cls(classPrefix + '__content', [align, layout]) + ' ' + prefix + '-class-content'"
        :style="gridItemContentStyle"
      >
        <slot />
        <t-badge
          v-if="image || icon"
          :color="badgeProps.color || ''"
          :content="badgeProps.content || ''"
          :count="badgeProps.count || 0"
          :dot="badgeProps.dot || false"
          :max-count="badgeProps.maxCount || 99"
          :offset="badgeProps.offset || []"
          :shape="badgeProps.shape || 'circle'"
          :show-zero="badgeProps.showZero || false"
          :size="badgeProps.size || 'medium'"
          :t-class="badgeProps.tClass"
          :t-class-content="badgeProps.tClassContent"
          :t-class-count="badgeProps.tClassCount"
        >
          <view :class="_.cls(classPrefix + '__image', [getImageSize(column), ['icon', icon]]) + ' ' + prefix + '-class-image'">
            <block v-if="image && image != 'slot'">
              <!-- parse <template is="image" :data="src: image, shape: 'round', mode: 'widthFix', tClass: _.cls(classPrefix + '__image', [getImageSize(column)]) + ' ' + prefix + '-class-image', ...imageProps"/> -->
              <block name="image">
                <t-image
                  :t-class="_.cls(classPrefix + '__image', [getImageSize(column)]) + ' ' + prefix + '-class-image'"
                  :t-class-load="tClassLoad"
                  :style="style || ''"
                  :custom-style="customStyle || ''"
                  :height="height || ''"
                  :width="width || ''"
                  :error="error || 'default'"
                  :lazy="lazy || false"
                  :loading="count || 'default'"
                  :shape="'round' || 'square'"
                  :src="image || ''"
                  :mode="'widthFix' || 'scaleToFill'"
                  :webp="webp || false"
                  :show-menu-by-longpress="showMenuByLongpress || false"
                  :data-custom="dataset || null"
                  @error="binderror($event, { custom: dataset || null })"
                  @load="bindload($event, { custom: dataset || null })"
                />
              </block>
            </block>
            <slot name="image" />
            <!-- parse <template v-if="iconName || _.isNoEmptyObj(iconData)" is="icon" :data="tClass: classPrefix + '__icon', name: iconName, ...iconData"/> -->
            <block
              v-if="iconName || _.isNoEmptyObj(iconData)"
              name="icon"
            >
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
        </t-badge>
        <view
          :id="describedbyID"
          :class="_.cls(classPrefix + '__words', [layout])"
          :aria-label="ariaLabel || (badgeProps.dot || badgeProps.count ? text + ',' + description + ',' + _.getBadgeAriaLabel({ ...badgeProps }) : '')"
        >
          <view
            v-if="text"
            :class="_.cls(classPrefix + '__text', [getImageSize(column), layout]) + ' ' + prefix + '-class-text'"
          >
            {{ text }}
          </view>
          <slot name="text" />
          <view
            v-if="description"
            :class="_.cls(classPrefix + '__description', [getImageSize(column), layout]) + ' ' + prefix + '-class-description'"
          >
            {{ description }}
          </view>
          <slot name="description" />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import tImage from '../image/image';
import tIcon from '../icon/icon';
import tBadge from '../badge/badge';
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { uniqueFactory, setIcon } from '../common/utils';
import { isObject } from '../common/validator';
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-grid-item`;
const getUniqueID = uniqueFactory('grid_item');
let LinkTypes;
!(function (t) {
  t['redirect-to'] = 'redirectTo';
  t['switch-tab'] = 'switchTab';
  t.relaunch = 'reLaunch';
  t['navigate-to'] = 'navigateTo';
}(LinkTypes || (LinkTypes = {})));
let GridItem = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`, `${prefix}-class-image`, `${prefix}-class-text`, `${prefix}-class-description`];
    this.options = {
      multipleSlots: true,
    };
    this.relations = {
      '../grid/grid': {
        type: 'ancestor',
        linked(t) {
          this.parent = t;
          this.updateStyle();
          this.setData({
            column: t.data.column,
          });
        },
      },
    };
    this.properties = props;
    this._ = _;
    this.components = {
      tImage,
      tIcon,
      tBadge,
    };
    this.setData({
      prefix,
      classPrefix: name,
      gridItemStyle: '',
      gridItemWrapperStyle: '',
      gridItemContentStyle: '',
      align: 'center',
      column: 0,
      describedbyID: '',
      // badgeProps: {},
    });
    this.observers = {
      icon(t) {
        const e = setIcon('icon', t, '');
        this.setData(Object.assign({}, e));
      },
    };
    this.lifetimes = {
      ready() {
        this.setData({
          describedbyID: getUniqueID(),
        });
      },
    };
    this.methods = {
      bindload() {},
      getImageSize(column) {
        if (column >= 5) return 'small';
        if (column == 4) return 'middle';
        return 'large';
      },
      updateStyle() {
        const {
          hover: t,
          align: e,
        } = this[this.relationParentName].properties || {};
        const r = [];
        const i = [];
        const o = [];
        const s = this.getWidthStyle();
        const n = this.getPaddingStyle();
        const p = this.getBorderStyle();
        if (s) {
          r.push(s);
        }
        if (n) {
          i.push(n);
        }
        if (p) {
          o.push(p);
        }
        this.setData({
          gridItemStyle: `${r.join(';')}`,
          gridItemWrapperStyle: i.join(';'),
          gridItemContentStyle: o.join(';'),
          hover: t,
          // layout: this.layout,
          align: e,
        });
      },
      getWidthStyle() {
        const {
          column: t,
        } = this[this.relationParentName].properties || {};
        return t > 0 ? `width:${1 / t * 100}%` : '';
      },
      getPaddingStyle() {
        const {
          gutter: t,
        } = this[this.relationParentName].properties || {};
        return t ? `padding-left:${t}rpx;padding-top:${t}rpx` : '';
      },
      getBorderStyle() {
        const {
          gutter: t,
        } = this[this.relationParentName].properties || {};
        let {
          border: e,
        } = this[this.relationParentName].properties || {};
        if (!e) {
          return '';
        }
        isObject(e) || (e = {});
        const {
          color: r = '#266FE8',
          width: i = 2,
          style: o = 'solid',
        } = e;
        return t ? `border:${i}rpx ${o} ${r}` : `border-top:${i}rpx ${o} ${r};border-left:${i}rpx ${o} ${r}`;
      },
      onClick(t) {
        const {
          item: e,
        } = t.currentTarget.dataset;
        this.$emit('click', {
          detail: e,
        });
        this.jumpLink();
      },
      jumpLink() {
        const {
          url: t,
          jumpType: e,
        } = this;
        if (t && e && LinkTypes[e]) {
          uni[LinkTypes[e]]({
            url: t,
          });
        }
      },
    };
  }
};
GridItem = initTDesign(__decorate([wxComponent()], GridItem));
export default GridItem;
</script>
<style>
@import './grid-item.css';

</style>
