<template>
  <view
    :style="_._style([style, customStyle])"
    :class="classPrefix + ' class ' + prefix + '-class'"
    aria-role="radiogroup"
  >
    <slot />
    <t-radio
      v-for="(item, index) in radioOptions"
      :key="index"
      :class="prefix + '-radio-option'"
      :data-index="index"
      :data-value="item.value"
      :data-allow-uncheck="item.allowUncheck || allowUncheck"
      :block="item.block || true"
      :label="item.label || ''"
      :value="item.value"
      :checked="item.checked || false"
      :content="item.content || ''"
      :allow-uncheck="item.allowUncheck || allowUncheck"
      :content-disabled="item.contentDisabled || false"
      :readonly="item.readonly || false"
      :disabled="item.disabled || false"
      :icon="item.icon || icon"
      :placement="item.placement || placement"
      :max-content-row="item.maxContentRow || 5"
      :max-label-row="item.maxLabelRow || 3"
      :name="item.name || ''"
      :borderless="borderless"
      @change="handleRadioChange($event, { index, value: item.value, allowUncheck: item.allowUncheck || allowUncheck })"
    />
  </view>
</template>
<script>
import tRadio from '../radio/radio';
import { __decorate } from '../miniprogram_npm/tslib';
import config from '../common/config';
import { SuperComponent, wxComponent } from '../common/src/index';
import props from './props';
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-radio-group`;
let RadioGroup = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.behaviors = ['wx://form-field'];
    this.externalClasses = [`${prefix}-class`];
    this.prefix = prefix;
    this.prefix = prefix;
    this.prefix = prefix;
    this.name = 'TRadioGroup';
    this.components = {
      tRadio,
    };
    this.rawData = {
      dataChecked: false,
      prefix,
      classPrefix: name,
      radioOptions: [],
      _,
    };
    this._ = _;
    this.relations = {
      '../radio/radio': {
        type: 'descendant',
        linked(e) {
          const {
            value: t,
            disabled: i,
            readonly: o,
          } = this;
          e.setData({
            dataChecked: t === e.value,
          });
          e.setDisabled(i);
          e.setReadonly(o);
        },
      },
    };
    this.properties = props;
    this.controlledProps = [{
      key: 'value',
      event: 'change',
    }];
    this.watch = {
      options: {
        handler() {
          console.log('[initWithOptions]');
          this.initWithOptions();
        },
        immediate: true,
      },
      value: {
        handler(e) {
          console.log('watch.value');
          if (this.options?.length) {
            console.log('radioOptions change by watch value', this.radioOptions);
            this.radioOptions = this.radioOptions.map(item => ({
              ...item,
              checked: item.value === e,
            }));
            return;
          }
          this.getChildren()?.forEach((t) => {
            t.setData({
              dataChecked: e === t.value,
            });
          });
        },
        immediate: true,
      },
    };
    this.observers = {

      // options() {
      //   console.log('ooooo')
      //   this.initWithOptions();
      // },
      disabled(e) {
        let t;
        if (null === (t = this.options) || void 0 === t ? void 0 : t.length) {
          this.initWithOptions();
        } else {
          this.getChildren().forEach((t) => {
            t.setDisabled(e);
          });
        }
      },
    };
    this.methods = {
      getChildren() {
        const e = this.children;
        if (!e) {
          const result = this.selectAllComponents(`.${prefix}-radio-option`);
          return result;
        }
        console.log('[getChildren]', e);
        // (null == e ? void 0 : e.length) || (e = this.zpSelectAllComponents(`.${prefix}-radio-option`));
        return e;
      },
      updateValue(e) {
        this._trigger('change', {
          value: e,
        });
      },
      handleRadioChange(e) {
        const {
          checked: t,
        } = e.detail;
        const {
          value: i,
          index: o,
          allowUncheck: a,
        } = e.target.dataset;
        this._trigger('change', false === t && a ? {
          value: null,
          index: o,
        } : {
          value: i,
          index: o,
        });
      },
      initWithOptions() {
        const {
          options: e,
          value: t,
          keys: i,
          disabled: o,
          readonly: a,
        } = this;
        if (!(null == e ? void 0 : e.length) || !Array.isArray(e)) {
          return void this.setData({
            radioOptions: [],
          });
        }
        const s = [];
        try {
          e.forEach((e) => {
            let l;
            let r;
            let n;
            const d = typeof e;
            'number' === d || 'string' === d ? s.push({
              label: `${e}`,
              value: e,
              dataChecked: t === e,
              disabled: o,
              readonly: a,
            }) : 'object' === d && s.push(Object.assign(Object.assign({}, e), {
              label: e[null !== (l = null == i ? void 0 : i.label) && void 0 !== l ? l : 'label'],
              value: e[null !== (r = null == i ? void 0 : i.value) && void 0 !== r ? r : 'value'],
              checked: t === e[null !== (n = null == i ? void 0 : i.value) && void 0 !== n ? n : 'value'],
              disabled: e.disabled || o,
              readonly: e.readonly || a,
            }));
          });
          this.setData({
            radioOptions: s,
          });
        } catch (e) {
          console.log('CatchClause', e);
          console.log('CatchClause', e);
          console.error('error', e);
        }
      },
    };
  }
};
RadioGroup = initTDesign(__decorate([wxComponent()], RadioGroup));
export default RadioGroup;
</script>
<style>
@import './radio-group.css';
</style>
