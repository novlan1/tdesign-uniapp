<template>
  <view
    :style="_._style([style, customStyle])"
    :class="className + ' class ' + prefix + '-class'"
    @tap="onClick"
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
      <slot name="content" />
      <block v-if="_.isArray(content) && content.length == 2">
        {{ tDataChecked ? content[0] : content[1] }}
      </block>
      <block v-else>
        {{ content }}
      </block>
    </view>
    <t-icon
      v-if="closable"
      :class="classPrefix + '__icon-close'"
      :t-class="prefix + '-icon'"
      name="close"
      aria-role="button"
      aria-label="关闭"
      @click="onClose"
    />
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { classNames, calcIcon } from '../common/utils';
import _ from '../common/utils.wxs';


const name = `${prefix}-tag`;


export default uniComponent({
  name,
  controlledProps: [{
    key: 'checked',
    event: 'change',
  }],
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
      _,
      _icon: null,

      tDataChecked: this.checked,
    };
  },
  watch: {
    size: 'setClass',
    disabled: 'setClass',
    tDataChecked: 'setClass',
    icon: {
      handler(e) {
        this._icon = calcIcon(e);
      },
      immediate: true,
    },
    checked: {
      handler(value) {
        this.tDataChecked = value;
      },
      immediate: true,
    },
  },
  mounted() {
    this.setClass();
  },
  methods: {
    setClass() {
      const { classPrefix } = this;
      const { size, variant, disabled, tDataChecked, shape } = this;
      const tagClass = [
        classPrefix,
        `${classPrefix}--checkable`,
        disabled ? `${classPrefix}--disabled` : '',
        tDataChecked ? `${classPrefix}--checked` : '',
        `${classPrefix}--${tDataChecked ? 'primary' : 'default'}`,
        `${classPrefix}--${size}`,
        `${classPrefix}--${variant}`,
        `${classPrefix}--${shape}`,
      ];
      const className = classNames(tagClass);
      this.className = className;
    },

    onClick() {
      if (this.disabled) return;
      const { tDataChecked } = this;

      this._trigger('click');
      this._trigger('change', { checked: !tDataChecked });
    },

    onClose(e) {
      if (this.disabled) return;
      this._trigger('close', e);
    },
  },
});


// let CheckTag = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.setData({
//       prefix,
//       classPrefix: name,
//       className: '',
//     });
//     this.components = {
//       tIcon,
//     };
//     this._ = _;
//     this.properties = props;
//     this.externalClasses = [`${prefix}-class`];
//     this.controlledProps = [{
//       key: 'checked',
//       event: 'change',
//     }];
//     this.options = {
//       multipleSlots: true,
//     };
//     this.lifetimes = {
//       attached() {
//         this.setClass();
//       },
//     };
//     this.observers = {
//       'size, disabled, checked'() {
//         this.setClass();
//       },
//       icon(e) {
//         this.setData({
//           _icon: calcIcon(e),
//         });
//       },
//     };
//     this.methods = {
//       setClass() {
//         const {
//           classPrefix: e,
//         } = this;
//         const {
//           size: s,
//           variant: t,
//           disabled: i,
//           checked: a,
//           shape: c,
//         } = this;
//         const o = classNames([e, `${e}--checkable`, i ? `${e}--disabled` : '', a ? `${e}--checked` : '', `${e}--${a ? 'primary' : 'default'}`, `${e}--${s}`, `${e}--${t}`, `${e}--${c}`]);
//         this.setData({
//           className: o,
//         });
//       },
//       onClick() {
//         if (this.disabled) {
//           return;
//         }
//         const {
//           checked: e,
//         } = this;
//         this._trigger('click');
//         this._trigger('change', {
//           checked: !e,
//         });
//       },
//       onClose(e) {
//         this.disabled || this._trigger('close', e);
//       },
//     };
//   }
// };
// CheckTag = __decorate([wxComponent()], CheckTag);
// export default CheckTag;
</script>
<style>
@import './check-tag.css';

</style>
