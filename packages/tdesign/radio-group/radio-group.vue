<template>
  <view
    :style="_._style([style, customStyle])"
    :class="classPrefix + ' class ' + tClass"
    aria-role="radiogroup"
  >
    <slot />
    <t-radio
      v-for="(item, index) in radioOptions"
      :key="index"
      :ref="prefix + '-radio-option'"
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
import { prefix } from '../common/config';
import { uniComponent } from '../common/src/index';
import props from './props';
import _ from '../common/utils.wxs';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-radio-group`;


export default uniComponent({
  name,
  mixins: [ParentMixin(RELATION_MAP.Radio)],
  controlledProps: [
    {
      key: 'value',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
  ],
  components: {
    tRadio,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      radioOptions: [],
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
      handler(v) {
        this.getChildren()?.forEach((item) => {
          item.dataChecked = v === item.value;
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
  mounted() {
    this.getChildren()?.forEach((item) => {
      item.dataChecked = this.dataValue === item.value;
      item.setDisabled(this.disabled);
    });
  },
  methods: {
    innerAfterLinked(target) {
      const { value, disabled, readonly } = this;
      target.dataChecked = value === target.value;

      target.setDisabled(disabled);
      target.setReadonly(readonly);
    },
    getChildren() {
      let items = this.children;

      if (!items?.length) {
        items = this.$refs[`.${prefix}-radio-option`];
      }

      return items;
    },

    updateValue(value) {
      this._trigger('change', { value });
    },

    handleRadioChange(_, { value, index, allowUncheck, checked }) {
      this._trigger('change', checked === false && allowUncheck ? { value: null, index } : { value, index });
    },

    // 支持自定义options
    initWithOptions() {
      const { options, value, keys, disabled, readonly } = this;
      // 数字数组｜字符串数组｜对像数组
      if (!options?.length || !Array.isArray(options)) {
        this.radioOptions = [];
        return;
      }
      const optionsValue = [];
      try {
        options.forEach((element) => {
          const typeName = typeof element;
          if (typeName === 'number' || typeName === 'string') {
            optionsValue.push({
              label: `${element}`,
              value: element,
              checked: value === element,
              disabled,
              readonly,
            });
          } else if (typeName === 'object') {
            optionsValue.push({
              ...element,
              label: element[keys?.label ?? 'label'],
              value: element[keys?.value ?? 'value'],
              checked: value === element[keys?.value ?? 'value'],
              disabled: element.disabled || disabled,
              readonly: element.readonly || readonly,
            });
          }
        });
        this.radioOptions = optionsValue;
      } catch (error) {

      }
    },
  },
});

// let RadioGroup = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.behaviors = ['wx://form-field'];
//     this.externalClasses = [`${prefix}-class`];
//     this.prefix = prefix;
//     this.prefix = prefix;
//     this.prefix = prefix;
//     this.name = 'TRadioGroup';
//     this.components = {
//       tRadio,
//     };
//     this.rawData = {
//       dataChecked: false,
//       prefix,
//       classPrefix: name,
//       radioOptions: [],
//       _,
//     };
//     this._ = _;
//     this.relations = {
//       '../radio/radio': {
//         type: 'descendant',
//         linked(e) {
//           const {
//             value: t,
//             disabled: i,
//             readonly: o,
//           } = this;
//           e.setData({
//             dataChecked: t === e.value,
//           });
//           e.setDisabled(i);
//           e.setReadonly(o);
//         },
//       },
//     };
//     this.properties = props;
//     this.controlledProps = [{
//       key: 'value',
//       event: 'change',
//     }];
//     this.watch = {
//       options: {
//         handler() {
//
//           this.initWithOptions();
//         },
//         immediate: true,
//       },
//       value: {
//         handler(e) {
//
//           if (this.options?.length) {
//
//             this.radioOptions = this.radioOptions.map(item => ({
//               ...item,
//               checked: item.value === e,
//             }));
//             return;
//           }
//           this.getChildren()?.forEach((t) => {
//             t.setData({
//               dataChecked: e === t.value,
//             });
//           });
//         },
//         immediate: true,
//       },
//     };
//     this.observers = {

//       // options() {
//       //
//       //   this.initWithOptions();
//       // },
//       disabled(e) {
//         let t;
//         if (null === (t = this.options) || void 0 === t ? void 0 : t.length) {
//           this.initWithOptions();
//         } else {
//           this.getChildren().forEach((t) => {
//             t.setDisabled(e);
//           });
//         }
//       },
//     };
//     this.methods = {
//       getChildren() {
//         const e = this.children;
//         if (!e) {
//           const result = this.selectAllComponents(`.${prefix}-radio-option`);
//           return result;
//         }
//
//         // (null == e ? void 0 : e.length) || (e = this.zpSelectAllComponents(`.${prefix}-radio-option`));
//         return e;
//       },
//       updateValue(e) {
//         this._trigger('change', {
//           value: e,
//         });
//       },
//       handleRadioChange(e) {
//         const {
//           checked: t,
//         } = e.detail;
//         const {
//           value: i,
//           index: o,
//           allowUncheck: a,
//         } = e.target.dataset;
//         this._trigger('change', false === t && a ? {
//           value: null,
//           index: o,
//         } : {
//           value: i,
//           index: o,
//         });
//       },
//       initWithOptions() {
//         const {
//           options: e,
//           value: t,
//           keys: i,
//           disabled: o,
//           readonly: a,
//         } = this;
//         if (!(null == e ? void 0 : e.length) || !Array.isArray(e)) {
//           return void this.setData({
//             radioOptions: [],
//           });
//         }
//         const s = [];
//         try {
//           e.forEach((e) => {
//             let l;
//             let r;
//             let n;
//             const d = typeof e;
//             'number' === d || 'string' === d ? s.push({
//               label: `${e}`,
//               value: e,
//               dataChecked: t === e,
//               disabled: o,
//               readonly: a,
//             }) : 'object' === d && s.push(Object.assign(Object.assign({}, e), {
//               label: e[null !== (l = null == i ? void 0 : i.label) && void 0 !== l ? l : 'label'],
//               value: e[null !== (r = null == i ? void 0 : i.value) && void 0 !== r ? r : 'value'],
//               checked: t === e[null !== (n = null == i ? void 0 : i.value) && void 0 !== n ? n : 'value'],
//               disabled: e.disabled || o,
//               readonly: e.readonly || a,
//             }));
//           });
//           this.setData({
//             radioOptions: s,
//           });
//         } catch (e) {
//
//
//
//         }
//       },
//     };
//   }
// };
// RadioGroup = initTDesign(__decorate([wxComponent()], RadioGroup));
// export default RadioGroup;
</script>
<style>
@import './radio-group.css';
</style>
