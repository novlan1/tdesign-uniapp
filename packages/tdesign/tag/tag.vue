<template>
  <view
    :class="[className + ' class ', tClass]"
    :style="_._style([tagStyle, style, customStyle])"
    @tap="handleClick"
  >
    <view
      :aria-hidden="true"
      :class="classPrefix + '__icon'"
    >
      <!-- parse <template v-if="_icon" is="icon" :data="tClass: prefix + '-icon', ..._icon"/> -->
      <block
        v-if="_icon"
        name="icon"
      >
        <t-icon
          :custom-style="_icon.style || ''"
          :t-class="prefix + '-icon'"
          :prefix="_icon.prefix"
          :name="_icon.name"
          :size="_icon.size"
          :color="_icon.color"
          :aria-hidden="!!_icon.ariaHidden"
          :aria-label="_icon.ariaLabel"
          :aria-role="_icon.ariaRole"
        />
      </block>
      <slot name="icon" />
    </view>
    <view :class="classPrefix + '__text'">
      <slot />
    </view>
    <!-- parse <template v-if="_closable" is="icon" :data="tClass: classPrefix + '__icon-close ' + prefix + '-icon', bindclick: 'handleClose',  ariaRole: 'button', ariaLabel: '关闭',  ..._closable" @tap.native.stop.prevent="handleClose"/> -->
    <block
      v-if="_closable"
      name="icon"
    >
      <t-icon
        :custom-style="_closable.style || ''"
        :t-class="classPrefix + '__icon-close ' + prefix + '-icon'"
        :prefix="_closable.prefix"
        :name="_closable.name"
        :size="_closable.size"
        :color="_closable.color"
        :aria-hidden="!!_closable.ariaHidden"
        :aria-label="_closable.ariaLabel || '关闭'"
        :aria-role="_closable.ariaRole"
        @click="handleClose"
      />
    </block>
    <slot
      v-else
      name="closable"
    />
  </view>
</template>
<script>
import tIcon from '.././icon/icon';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { classNames, calcIcon } from '../common/utils';
import { isNumber } from '../common/validator';
import _ from '../common/utils.wxs';


const name = `${prefix}-tag`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
  ],
  components: {
    tIcon,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      className: '',
      tagStyle: '',
      _,

      _icon: null,
      _closable: null,
    };
  },
  watch: {
    size: 'setClass',
    shape: 'setClass',
    theme: 'setClass',
    variant: 'setClass',
    disabled: 'setClass',
    maxWidth: 'setTagStyle',
    icon: {
      handler(s) {
        this._icon = calcIcon(s);
      },
      immediate: true,
    },
    closable: {
      handler(s) {
        this.setClass();
        this._closable = calcIcon(s, 'close');
      },
      immediate: true,
    },
  },
  mounted() {
    this.setClass();
    this.setTagStyle();
  },
  methods: {
    setClass() {
      const { prefix, classPrefix } = this;
      const { size, shape, theme, variant, closable, disabled } = this;
      const tagClass = [
        classPrefix,
        `${classPrefix}--${theme || 'default'}`,
        `${classPrefix}--${variant}`,
        closable ? `${classPrefix}--closable ${prefix}-is-closable` : '',
        disabled ? `${classPrefix}--disabled ${prefix}-is-disabled` : '',
        `${classPrefix}--${size}`,
        `${classPrefix}--${shape}`,
      ];
      const className = classNames(tagClass);
      this.className = className;
    },

    setTagStyle() {
      const { maxWidth } = this;
      if (!maxWidth) {
        return '';
      }
      const width = isNumber(maxWidth) ? `${maxWidth}px` : maxWidth;
      this.tagStyle = `max-width:${width};`;
    },

    handleClick(e) {
      if (this.disabled) return;
      this.$emit('click', e);
    },

    handleClose(e) {
      if (this.disabled) return;
      this.$emit('close', e);
    },
  },
});


// let Tag = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.components = {
//       tIcon,
//     };
//     this.setData({
//       prefix,
//       classPrefix: name,
//       className: '',
//       tagStyle: '',
//     });
//     this.properties = props;
//     this._ = _;
//     this.externalClasses = [`${prefix}-class`];
//     this.options = {
//       multipleSlots: true,
//     };
//     this.lifetimes = {
//       attached() {
//         this.setClass();
//         this.setTagStyle();
//       },
//     };
//     this.observers = {
//       'size, shape, theme, variant, closable, disabled'() {
//         this.setClass();
//       },
//       maxWidth() {
//         this.setTagStyle();
//       },
//       icon(s) {
//         this.setData({
//           _icon: calcIcon(s),
//         });
//       },
//       closable(s) {
//         this.setData({
//           _closable: calcIcon(s, 'close'),
//         });
//       },
//     };
//     this.methods = {
//       setClass() {
//         const {
//           prefix: s,
//           classPrefix: t,
//         } = this;
//         const {
//           size: e,
//           shape: a,
//           theme: i,
//           variant: o,
//           closable: l,
//           disabled: r,
//         } = this;
//         const c = classNames([t, `${t}--${i || 'default'}`, `${t}--${o}`, l ? `${t}--closable ${s}-is-closable` : '', r ? `${t}--disabled ${s}-is-disabled` : '', `${t}--${e}`, `${t}--${a}`]);
//         this.setData({
//           className: c,
//         });
//       },
//       setTagStyle() {
//         const {
//           maxWidth: s,
//         } = this;
//         if (!s) {
//           return '';
//         }
//         const t = isNumber(s) ? `${s}px` : s;
//         this.setData({
//           tagStyle: `max-width:${t};`,
//         });
//       },
//       handleClick(s) {
//         this.disabled || this.$emit('click', {
//           detail: s,
//         });
//       },
//       handleClose(s) {
//         this.disabled || this.$emit('close', {
//           detail: s,
//         });
//       },
//     };
//   }
// };
// Tag = initTDesign(__decorate([wxComponent()], Tag));
// export default Tag;
</script>
<style scoped>
@import './tag.css';

</style>
