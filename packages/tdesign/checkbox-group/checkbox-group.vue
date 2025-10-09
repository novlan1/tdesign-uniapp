<template>
  <view
    :class="classPrefix + ' class ' + prefix + '-class'"
    :style="_._style([style, customStyle])"
  >
    <slot />
    <t-checkbox
      v-for="(item, index) in checkboxOptions"
      :key="index"
      :class="prefix + '-checkbox-option'"
      :data-item="item"
      :label="item.label || item.text || ''"
      :value="item.value == null ? '' : item.value"
      :block="item.block || true"
      :check-all="item.checkAll || false"
      :checked="item.checked || false"
      :content="item.content || ''"
      :content-disabled="item.contentDisabled || false"
      :icon="item.icon || 'circle'"
      :indeterminate="item.indeterminate || false"
      :disabled="item.disabled == null ? disabled : item.disabled"
      :max-content-row="item.maxContentRow || 5"
      :max-label-row="item.maxLabelRow || 3"
      :name="item.name || ''"
      :borderless="borderless"
      :readonly="item.readonly || false"
      :placement="item.placement || 'left'"
      @change="handleInnerChildChange($event, { item })"
    />
  </view>
</template>
<script>
import tCheckbox from '../checkbox/checkbox';
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { initTDesign } from '../common/runtime';


const {
  prefix: prefix,
} = config;
const name = `${prefix}-checkbox-group`;
let CheckBoxGroup = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    this.components = {
      tCheckbox,
    };
    this._ = _;
    this.name = 'TCheckboxGroup';
    this.relations = {
      '../checkbox/checkbox': {
        type: 'descendant',
      },
    };
    // this.prefix = prefix;
    // this.classPrefix = name;
    // this.checkboxOptions = [];

    this.rawData = {
      dataChecked: false,
      prefix,
      classPrefix: name,
      checkboxOptions: [],
      _,
    };
    this.properties = props;

    this.watch = {
      value: {
        handler() {
          setTimeout(() => {
            this.updateChildren();
          });
        },
        immediate: true,
      },
      options: {
        handler() {
          this.initWithOptions();
        },
        immediate: true,
      },
      disabled(e) {
        let t;
        if (null === (t = this.options) || void 0 === t ? void 0 : t.length) {
          this.initWithOptions();
        } else {
          this.getChildren()?.forEach((t) => {
            t.setDisabled(e);
          });
        }
      },
    };
    this.lifetimes = {
      // ready() {
      //   this.setCheckall();
      // }
    };
    this.controlledProps = [{
      key: 'value',
      event: 'change',
    }];
    this.$checkAll = null;
    this.methods = {
      getChildren() {
        const e = this.children;
        if (!e) {
          const result = this.selectAllComponents(`.${prefix}-checkbox-option`);
          return result;
        }
        // e.length || (e = this.zpSelectAllComponents(`.${prefix}-checkbox-option`));
        return e || [];
      },
      updateChildren() {
        const e = this.getChildren();
        const {
          value: t,
        } = this;
        console.log('[updateChildren] t', t);
        if (e.length > 0) {
          e.forEach((e) => {
            if (!e.checkAll) {
              e.setData({
                dataChecked: null == t ? void 0 : t.includes(e.value),
              });
            }
          });
          if (e.some(e => e.checkAll)) {
            this.setCheckall();
          }
        }
      },
      updateValue({
        value: e,
        checked: t,
        checkAll: l,
        item: i,
        indeterminate: a,
      }) {
        let {
          value: s,
        } = this;
        const {
          max: n,
        } = this;
        const c = new Set(this.getChildren().map(e => e.value));
        console.log('[cccc]', { c, s, e, t, l, i, a });
        s = s.filter(e => c.has(e));
        if (!n || !t || s.length !== n) {
          if (l) {
            const e = this.getChildren();
            s = !t && a ? e.filter(({
              data: e,
            }) => !(e.disabled && !s.includes(e.value))).map(e => e.value) : e.filter(({
              data: e,
            }) => (e.disabled ? s.includes(e.value) : t && !e.checkAll)).map(({
              data: e,
            }) => e.value);
          } else if (t) {
            s = s.concat(e);
          } else {
            const t = s.findIndex(t => t === e);
            s.splice(t, 1);
          }
          this._trigger('change', {
            value: s,
            context: i,
          });
        }
      },
      initWithOptions() {
        const {
          options: e,
          value: t,
          keys: l,
        } = this;
        if (!(null == e ? void 0 : e.length) || !Array.isArray(e)) {
          return;
        }
        const i = e.map((e) => {
          let i;
          let a;
          let s;
          return ['number', 'string'].includes(typeof e) ? {
            label: `${e}`,
            value: e,
            checked: null == t ? void 0 : t.includes(e),
          } : Object.assign(Object.assign({}, e), {
            label: e[null !== (i = null == l ? void 0 : l.label) && void 0 !== i ? i : 'label'],
            value: e[null !== (a = null == l ? void 0 : l.value) && void 0 !== a ? a : 'value'],
            dataChecked: null == t ? void 0 : t.includes(e[null !== (s = null == l ? void 0 : l.value) && void 0 !== s ? s : 'value']),
          });
        });
        console.log('checkboxOptions', i);
        this.setData({
          checkboxOptions: i,
        });
      },
      handleInnerChildChange(e) {
        let t;
        const {
          item: l,
        } = e.target.dataset;
        const {
          checked: i,
        } = e.detail;
        const a = {};
        if (l.checkAll) {
          a.indeterminate = null === (t = this.$checkAll) || void 0 === t ? void 0 : t.indeterminate;
        }
        this.updateValue(Object.assign(Object.assign(Object.assign({}, l), {
          checked: i,
          item: l,
        }), a));
      },
      setCheckall() {
        const e = this.getChildren();
        this.$checkAll || (this.$checkAll = e.find(e => e.checkAll));
        if (!this.$checkAll) {
          return;
        }
        const {
          value: t,
        } = this;
        const l = new Set(null == t ? void 0 : t.filter(e => e !== this.$checkAll.value));
        const i = e.every(e => !!e.checkAll || l.has(e.value));
        this.$checkAll.setData({
          checked: l.size > 0,
          indeterminate: !i,
        });
      },
    };
  }
};
CheckBoxGroup = initTDesign(__decorate([wxComponent()], CheckBoxGroup));

console.log('[CheckBoxGroup] Comp', CheckBoxGroup);
export default CheckBoxGroup;
</script>
<style>
@import './checkbox-group.css';
</style>
