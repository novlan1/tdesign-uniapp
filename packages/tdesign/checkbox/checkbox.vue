<template>
  <view
    :id="tId"
    :style="_._style([style, customStyle])"
    :class="_.cls(classPrefix, [placement, theme, ['checked', dataChecked], ['block', block]]) + ' class ' + prefix + '-class'"
    aria-role="checkbox"
    :aria-checked="dataChecked ? (indeterminate ? 'mixed' : true) : false"
    :aria-disabled="_disabled ? true : false"
    :tabindex="tabindex"
    @click.stop="handleTap"
  >
    <view
      v-if="theme == 'default'"
      :class="_.cls(classPrefix + '__icon', [placement, ['checked', dataChecked], ['disabled', _disabled]]) + ' ' + prefix + '-class-icon'"
    >
      <slot
        v-if="icon === 'slot'"
        name="icon"
      />
      <view
        v-else-if="_.isArray(icon)"
        :class="classPrefix + '__icon'"
      >
        <image
          :src="dataChecked ? (indeterminate && icon[2] ? icon[2] : icon[0]) : icon[1]"
          :class="classPrefix + '__icon-image'"
          webp
        />
      </view>
      <block v-else>
        <t-icon
          v-if="dataChecked && (icon == 'circle' || icon == 'rectangle')"
          :name="indeterminate ? 'minus-' + icon + '-filled' : 'check-' + icon + '-filled'"
          :class="_.cls(classPrefix + '__icon-wrapper', [])"
        />
        <t-icon
          v-if="dataChecked && icon == 'line'"
          :name="indeterminate ? 'minus-' + icon + '-filled' : 'check'"
          :class="_.cls(classPrefix + '__icon-wrapper', [])"
        />
        <view
          v-else-if="!dataChecked && (icon == 'circle' || icon == 'rectangle')"
          :class="_.cls(classPrefix + '__icon-' + icon, [['disabled', _disabled]])"
        />
        <view
          v-if="!dataChecked && icon == 'line'"
          class="placeholder"
        />
      </block>
    </view>
    <view
      :class="classPrefix + '__content'"
      data-target="text"
      @click.stop="handleTap"
    >
      <view
        :class="
          _.cls(classPrefix + '__title', [
            ['disabled', _disabled],
            ['checked', dataChecked]
          ]) +
            ' ' +
            prefix +
            '-class-label'
        "
        :style="'-webkit-line-clamp:' + maxLabelRow"
      >
        <block v-if="label">
          {{ label }}
        </block>
        <slot />
        <slot name="label" />
      </view>
      <view
        :class="_.cls(classPrefix + '__description', [['disabled', _disabled]]) + ' ' + prefix + '-class-content'"
        :style="'-webkit-line-clamp:' + maxContentRow"
      >
        <block v-if="content">
          {{ content }}
        </block>
        <slot name="content" />
      </view>
    </view>
    <view
      v-if="theme == 'default' && !borderless"
      :class="_.cls(classPrefix + '__border', [placement]) + ' ' + prefix + '-class-border'"
    />
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import Props from './props';
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-checkbox`;
let CheckBox = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`, `${prefix}-class-label`, `${prefix}-class-icon`, `${prefix}-class-content`, `${prefix}-class-border`];
    // this.behaviors = ["wx://form-field"];
    this.name = 'TCheckbox';
    this.components = {
      tIcon,
    };
    this._ = _;
    this.relations = {
      '../checkbox-group/checkbox-group': {
        type: 'ancestor',
        linked(e) {
          const {
            value: t,
            disabled: s,
            borderless: a,
          } = e.data;
          const i = new Set(t);
          const o = i.has(this.value);
          const c = {
            _disabled: null == this.disabled ? s : this.disabled,
          };
          if (a) {
            c.borderless = true;
          }
          c.checked = this.checked || o;
          if (this.checked) {
            e.updateValue(this);
          }
          if (this.checkAll) {
            c.checked = i.size > 0;
          }
          this.setData(c);
        },
      },
    };
    this.options = {
      multipleSlots: true,
    };
    this.properties = Object.assign(Object.assign({}, Props), {
      theme: {
        type: String,
        value: 'default',
      },
      tId: {
        type: String,
      },
    });
    this.rawData = {
      dataChecked: false,
      _disabled: false,
      prefix,
      classPrefix: name,
    };


    this.watch = {
      checked: {
        handler(val) {
          this.dataChecked = val;
        },
        immediate: true,
      },
      disabled(e) {
        this.setData({
          _disabled: e,
        });
      },
    };
    this.controlledProps = [{
      key: 'checked',
      event: 'change',
    }];
    this.methods = {
      handleTap(e) {
        const {
          _disabled: t,
          readonly: s,
          contentDisabled: a,
        } = this;
        const {
          target: i,
        } = e.currentTarget.dataset;
        if (t || s || 'text' === i && a) {
          return;
        }
        const {
          value: o,
          label: c,
        } = this;
        const d = !this.dataChecked;
        const r = this[this.relationParentName];
        r ? r.updateValue(Object.assign(Object.assign({}, this), {
          checked: d,
          item: {
            label: c,
            value: o,
            checked: d,
          },
        })) : this._trigger('change', {
          context: {
            value: o,
            label: c,
          },
          checked: d,
        });
      },
      setDisabled(e) {
        this.setData({
          _disabled: this.disabled || e,
        });
      },
    };
  }
};
CheckBox = initTDesign(__decorate([wxComponent()], CheckBox));

console.log('[CheckBox Comp]', CheckBox);
export default CheckBox;
</script>
<style>
@import './checkbox.css';
</style>
