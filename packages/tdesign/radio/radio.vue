<template>
  <view
    :id="tId"
    :style="_._style([style, customStyle])"
    :class="_.cls(classPrefix, [_placement, ['block', block]]) + ' class ' + tClass"
    :disabled="_disabled"
    aria-role="radio"
    :aria-checked="dataChecked"
    :aria-label="label + content"
    :aria-disabled="_disabled"
    @click.stop="handleTap"
  >
    <view :class="_.cls(classPrefix + '__icon', [_placement, ['checked', dataChecked], ['disabled', _disabled]]) + ' ' + tClassIcon">
      <slot
        v-if="slotIcon"
        name="icon"
      />
      <view
        v-else-if="customIcon"
        :class="classPrefix + '__image'"
      >
        <image
          :src="dataChecked ? iconVal[0] : iconVal[1]"
          :class="classPrefix + '-icon__image'"
          webp
        />
      </view>
      <block v-else>
        <t-icon
          v-if="dataChecked && (icon == 'circle' || icon == 'line')"
          :name="icon == 'circle' ? 'check-circle-filled' : 'check'"
          :class="classPrefix + '__icon-wrap'"
        />
        <view
          v-if="dataChecked && icon == 'dot'"
          :class="_.cls(classPrefix + '__icon-' + icon, [['disabled', _disabled]])"
        />
        <view
          v-if="!dataChecked && (icon == 'circle' || icon == 'dot')"
          :class="_.cls(classPrefix + '__icon-circle', [['disabled', _disabled]])"
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
            tClassLabel
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
        :class="
          _.cls(classPrefix + '__description', [
            ['disabled', _disabled],
            ['checked', dataChecked]
          ]) +
            ' ' +
            tClassContent
        "
        :style="'-webkit-line-clamp:' + maxContentRow"
      >
        <block v-if="content">
          {{ content }}
        </block>
        <slot name="content" />
      </view>
    </view>
    <view
      v-if="!borderless"
      :class="_.cls(classPrefix + '__border', [_placement]) + ' ' + tClassBorder"
    />
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import { prefix } from '../common/config';
import { uniComponent } from '../common/src/index';
import props from './props';
import _ from '../common/utils.wxs';
import { ChildrenMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-radio`;

export default uniComponent({
  name,
  controlledProps: [
    {
      key: 'checked',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-label`,
    `${prefix}-class-icon`,
    `${prefix}-class-content`,
    `${prefix}-class-border`,
  ],
  mixins: [ChildrenMixin(RELATION_MAP.Radio)],
  components: {
    tIcon,
  },
  props: {
    ...props,
    borderless: {
      type: Boolean,
      default: false,
    },
    tId: {
      type: String,
    },
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      customIcon: false,
      slotIcon: false,
      optionLinked: false,
      iconVal: [],
      _placement: '',
      _disabled: false,
      _readonly: false,
      _,

      dataChecked: this.checked ?? this.defaultChecked,
    };
  },
  watch: {
    checked: {
      handler(v) {
        this.dataChecked = v;
      },
      immediate: true,
    },
    disabled: {
      handler(v) {
        this._disabled = v;
      },
      immediate: true,
    },
    readonly: {
      handler(v) {
        this._readonly = v;
      },
      immediate: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    handleTap(e) {
      const { _disabled, _readonly, contentDisabled } = this;
      const { target } = e.currentTarget.dataset;

      if (_disabled || _readonly || (target === 'text' && contentDisabled)) return;

      this.doChange();
    },
    doChange() {
      const { value, dataChecked, allowUncheck } = this;

      const isAllowUncheck = Boolean(allowUncheck || this[RELATION_MAP.Radio]?.allowUncheck);

      if (this[RELATION_MAP.Radio]) {
        this[RELATION_MAP.Radio].updateValue(dataChecked && isAllowUncheck ? null : value);
      } else {
        this._trigger('change', { checked: isAllowUncheck ? !dataChecked : true });
      }
    },
    init() {
      const { icon } = this;
      const isIdArr = Array.isArray(this[RELATION_MAP.Radio]?.icon || icon);

      this.customIcon = isIdArr;
      this.slotIcon = icon === 'slot';
      this.iconVal = isIdArr ? this[RELATION_MAP.Radio]?.icon || icon : [];
      this._placement = this.placement || this[RELATION_MAP.Radio]?.placement || 'left';
    },

    setDisabled(disabled) {
      this._disabled = this.disabled || disabled;
    },

    setReadonly(readonly) {
      this._readonly = this.readonly || readonly;
    },
  },
});


// let Radio = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.components = {
//       tIcon,
//     };
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-label`, `${prefix}-class-icon`, `${prefix}-class-content`, `${prefix}-class-border`];
//     this.behaviors = ['wx://form-field'];
//     this._ = _;
//     this.name = 'TRadio';
//     this.relations = {
//       '../radio-group/radio-group': {
//         type: 'ancestor',
//         linked(e) {
//           // if (e.data.borderless) {
//           //   this.setData({
//           //     borderless: true
//           //   });
//           // }
//         },
//       },
//     };
//     this.rawData = {
//       dataChecked: undefined,
//       dataValue: undefined,
//       _,
//     };
//     this.watch = {
//       checked: {
//         handler(val) {
//           this.dataChecked = val;
//         },
//         immediate: true,
//       },
//       value: {
//         handler(val) {
//           this.dataValue = val;
//         },
//         immediate: true,
//       },
//     };
//     this.options = {
//       multipleSlots: true,
//     };
//     this.lifetimes = {
//       attached() {
//         this.init();
//       },
//     };
//     this.properties = Object.assign(Object.assign({}, Props), {
//       borderless: {
//         type: Boolean,
//         value: false,
//       },
//       tId: {
//         type: String,
//       },
//     });
//     this.controlledProps = [{
//       key: 'checked',
//       event: 'change',
//     }];
//     this.setData({
//       prefix,
//       classPrefix: name,
//       customIcon: false,
//       slotIcon: false,
//       optionLinked: false,
//       iconVal: [],
//       _placement: '',
//       _disabled: false,
//       _readonly: false,
//     });
//     this.observers = {
//       disabled(e) {
//         this.setData({
//           _disabled: e,
//         });
//       },
//       readonly(e) {
//         this.setData({
//           _readonly: e,
//         });
//       },
//     };
//     this.methods = {
//       handleTap(e) {
//         const {
//           _disabled: t,
//           _readonly: a,
//           contentDisabled: o,
//         } = this;
//         const {
//           target: s,
//         } = e.currentTarget.dataset;
//         t || a || 'text' === s && o || this.doChange();
//       },
//       doChange() {
//         let e;
//         const {
//           dataValue: t,
//           dataChecked: a,
//           allowUncheck: o,
//         } = this;
//         const s = Boolean(o || (null === (e = this[this.relationParentName]) || void 0 === e ? void 0 : e.allowUncheck));
//         this[this.relationParentName]
//           ? this[this.relationParentName].updateValue(a && s ? null : t)
//           : this._trigger('change', {
//             checked: !s || !a,
//           });
//       },
//       init() {
//         let e;
//         let t;
//         let a;
//         let o;
//         const {
//           icon: s,
//         } = this;
//         const i = Array.isArray((null === (e = this[this.relationParentName]) || void 0 === e ? void 0 : e.icon) || s);
//         this.setData({
//           customIcon: i,
//           slotIcon: 'slot' === s,
//           iconVal: i ? (null === (t = this[this.relationParentName]) || void 0 === t ? void 0 : t.icon) || s : [],
//           _placement: this.placement || (null === (o = null === (a = this[this.relationParentName]) || void 0 === a ? void 0 : a.data) || void 0 === o ? void 0 : o.placement) || 'left',
//         });
//       },
//       setDisabled(e) {
//         this.setData({
//           _disabled: this.disabled || e,
//         });
//       },
//       setReadonly(e) {
//         this.setData({
//           _readonly: this.readonly || e,
//         });
//       },
//     };
//   }
// };
// Radio = initTDesign(__decorate([wxComponent()], Radio));
// export default Radio;
</script>
<style scoped>
@import './radio.css';
</style>
