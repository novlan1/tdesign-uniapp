<template>
  <view
    :class="classPrefix + ' class ' + tClass"
    :style="_._style([style, customStyle])"
  >
    <slot />
    <t-checkbox
      v-for="(item, index) in checkboxOptions"
      :key="index"
      :ref="prefix + '-checkbox-option'"
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
      @change="({checked}) => handleInnerChildChange($event, { item, checked })"
    />
  </view>
</template>
<script>
import tCheckbox from '../checkbox/checkbox';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-checkbox-group`;


export default uniComponent({
  name,
  options: {
    externalClasses: [
      `${prefix}-class`,
    ],
  },
  controlledProps: [
    {
      key: 'value',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
  ],
  mixins: [ParentMixin(RELATION_MAP.Checkbox)],
  components: {
    tCheckbox,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      checkboxOptions: [],
      _,

      dataValue: this.value ?? this.defaultValue,
    };
  },
  watch: {
    value: {
      handler(v) {
        this.dataValue = v;
      },
      immediate: true,
    },
    dataValue: {
      handler() {
        this.updateChildren();
      },
      immediate: true,
    },
    options: {
      handler() {
        this.initWithOptions();
      },
      immediate: true,
    },
    disabled: {
      handler(v) {
        if (this.options?.length) {
          this.initWithOptions();
          return;
        }
        this.getChildren()?.forEach((item) => {
          item.setDisabled(v);
        });
      },
      immediate: true,
    },
  },
  created() {
    this.$checkAll = null;
  },
  mounted() {
    this.setCheckall();

    this.getChildren()?.forEach((item) => {
      item.setDisabled(this.disabled);
    });
    this.updateChildren();
  },
  methods: {
    getChildren() {
      let items = this.children;
      if (!items?.length) {
        items = this.$refs[`${prefix}-checkbox-option`];
      }
      return items || [];
    },

    updateChildren() {
      const items = this.getChildren();
      const { dataValue } = this;


      if (items.length > 0) {
        items.forEach((item) => {
          if (!item.checkAll) {
            item.dataChecked = dataValue?.includes(item.value);
          }
        });
        // 关联可全选项
        if (items.some(item => item.checkAll)) {
          this.setCheckall();
        }
      }
    },

    updateValue({ trigger, value, checked, checkAll, item, indeterminate }) {
      let { dataValue: newValue } = this;
      const { max } = this;
      const keySet = new Set(this.getChildren().map(item => item.value));

      newValue = newValue.filter(value => keySet.has(value));

      if (max && checked && newValue.length === max) return;

      if (checkAll) {
        const items = this.getChildren();
        newValue = !checked && indeterminate
          ? items
            .filter(data => !(data.disabled && !newValue.includes(data.value)))
            .map(item => item.value)
          : items
            .filter((data) => {
              if (data.disabled) {
                return newValue.includes(data.value);
              }
              return checked && !data.checkAll;
            })
            .map(data => data.value);
      } else if (checked) {
        newValue = newValue.concat(value);
      } else {
        const index = newValue.findIndex(v => v === value);
        newValue.splice(index, 1);
      }

      if (trigger !== 'init') {
        this._trigger('change', { value: newValue, context: item });
      }
    },

    initWithOptions() {
      const { options, dataValue: value, keys } = this;

      if (!options?.length || !Array.isArray(options)) return;

      const checkboxOptions = options.map((item) => {
        const isLabel = ['number', 'string'].includes(typeof item);
        return isLabel
          ? {
            label: `${item}`,
            value: item,
            checked: value?.includes(item),
          }
          : {
            ...item,
            label: item[keys?.label ?? 'label'],
            value: item[keys?.value ?? 'value'],
            checked: value?.includes(item[keys?.value ?? 'value']),
          };
      });

      this.checkboxOptions = checkboxOptions;
    },

    handleInnerChildChange(_, { item, checked }) {
      // const { item } = e.target.dataset;
      // const { checked } = e.detail;
      const rect = {};

      if (item.checkAll) {
        rect.indeterminate = this.$checkAll?.indeterminate;
      }

      this.updateValue({ ...item, checked, item, ...rect });
    },

    setCheckall() {
      const items = this.getChildren();

      if (!this.$checkAll) {
        this.$checkAll = items.find(item => item.checkAll);
      }

      if (!this.$checkAll) return;

      const { dataValue } = this;
      const valueSet = new Set(dataValue?.filter(val => val !== this.$checkAll.value));
      const isCheckall = items.every(item => (item.checkAll ? true : valueSet.has(item.value)));

      // this.$checkAll.setData({
      //   checked: valueSet.size > 0,
      //   indeterminate: !isCheckall,
      // });

      this.$checkAll.dataChecked = valueSet.size > 0;
      this.$checkAll.dataIndeterminate = !isCheckall;
    },
  },
});

// let CheckBoxGroup = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`];
//     this.components = {
//       tCheckbox,
//     };
//     this._ = _;
//     this.name = 'TCheckboxGroup';
//     this.relations = {
//       '../checkbox/checkbox': {
//         type: 'descendant',
//       },
//     };
//     // this.prefix = prefix;
//     // this.classPrefix = name;
//     // this.checkboxOptions = [];

//     this.rawData = {
//       dataChecked: false,
//       prefix,
//       classPrefix: name,
//       checkboxOptions: [],
//       _,
//     };
//     this.properties = props;

//     this.watch = {
//       value: {
//         handler() {
//           setTimeout(() => {
//             this.updateChildren();
//           });
//         },
//         immediate: true,
//       },
//       options: {
//         handler() {
//           this.initWithOptions();
//         },
//         immediate: true,
//       },
//       disabled(e) {
//         let t;
//         if (null === (t = this.options) || void 0 === t ? void 0 : t.length) {
//           this.initWithOptions();
//         } else {
//           this.getChildren()?.forEach((t) => {
//             t.setDisabled(e);
//           });
//         }
//       },
//     };
//     this.lifetimes = {
//       // ready() {
//       //   this.setCheckall();
//       // }
//     };
//     this.controlledProps = [{
//       key: 'value',
//       event: 'change',
//     }];
//     this.$checkAll = null;
//     this.methods = {
//       getChildren() {
//         const e = this.children;
//         if (!e) {
//           const result = this.selectAllComponents(`.${prefix}-checkbox-option`);
//           return result;
//         }
//         // e.length || (e = this.zpSelectAllComponents(`.${prefix}-checkbox-option`));
//         return e || [];
//       },
//       updateChildren() {
//         const e = this.getChildren();
//         const {
//           value: t,
//         } = this;
//
//         if (e.length > 0) {
//           e.forEach((e) => {
//             if (!e.checkAll) {
//               e.setData({
//                 dataChecked: null == t ? void 0 : t.includes(e.value),
//               });
//             }
//           });
//           if (e.some(e => e.checkAll)) {
//             this.setCheckall();
//           }
//         }
//       },
//       updateValue({
//         value: e,
//         checked: t,
//         checkAll: l,
//         item: i,
//         indeterminate: a,
//       }) {
//         let {
//           value: s,
//         } = this;
//         const {
//           max: n,
//         } = this;
//         const c = new Set(this.getChildren().map(e => e.value));
//
//         s = s.filter(e => c.has(e));
//         if (!n || !t || s.length !== n) {
//           if (l) {
//             const e = this.getChildren();
//             s = !t && a ? e.filter(({
//               data: e,
//             }) => !(e.disabled && !s.includes(e.value))).map(e => e.value) : e.filter(({
//               data: e,
//             }) => (e.disabled ? s.includes(e.value) : t && !e.checkAll)).map(({
//               data: e,
//             }) => e.value);
//           } else if (t) {
//             s = s.concat(e);
//           } else {
//             const t = s.findIndex(t => t === e);
//             s.splice(t, 1);
//           }
//           this._trigger('change', {
//             value: s,
//             context: i,
//           });
//         }
//       },
//       initWithOptions() {
//         const {
//           options: e,
//           value: t,
//           keys: l,
//         } = this;
//         if (!(null == e ? void 0 : e.length) || !Array.isArray(e)) {
//           return;
//         }
//         const i = e.map((e) => {
//           let i;
//           let a;
//           let s;
//           return ['number', 'string'].includes(typeof e) ? {
//             label: `${e}`,
//             value: e,
//             checked: null == t ? void 0 : t.includes(e),
//           } : Object.assign(Object.assign({}, e), {
//             label: e[null !== (i = null == l ? void 0 : l.label) && void 0 !== i ? i : 'label'],
//             value: e[null !== (a = null == l ? void 0 : l.value) && void 0 !== a ? a : 'value'],
//             dataChecked: null == t ? void 0 : t.includes(e[null !== (s = null == l ? void 0 : l.value) && void 0 !== s ? s : 'value']),
//           });
//         });
//
//         this.setData({
//           checkboxOptions: i,
//         });
//       },
//       handleInnerChildChange(e) {
//         let t;
//         const {
//           item: l,
//         } = e.target.dataset;
//         const {
//           checked: i,
//         } = e.detail;
//         const a = {};
//         if (l.checkAll) {
//           a.indeterminate = null === (t = this.$checkAll) || void 0 === t ? void 0 : t.indeterminate;
//         }
//         this.updateValue(Object.assign(Object.assign(Object.assign({}, l), {
//           checked: i,
//           item: l,
//         }), a));
//       },
//       setCheckall() {
//         const e = this.getChildren();
//         this.$checkAll || (this.$checkAll = e.find(e => e.checkAll));
//         if (!this.$checkAll) {
//           return;
//         }
//         const {
//           value: t,
//         } = this;
//         const l = new Set(null == t ? void 0 : t.filter(e => e !== this.$checkAll.value));
//         const i = e.every(e => !!e.checkAll || l.has(e.value));
//         this.$checkAll.setData({
//           checked: l.size > 0,
//           indeterminate: !i,
//         });
//       },
//     };
//   }
// };
// CheckBoxGroup = initTDesign(__decorate([wxComponent()], CheckBoxGroup));

//
// export default CheckBoxGroup;
</script>
<style>
@import './checkbox-group.css';
</style>
