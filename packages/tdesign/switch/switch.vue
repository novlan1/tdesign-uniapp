<template>
  <view
    :style="_._style([style, customStyle])"
    :class="'class ' + tClass + ' ' + classPrefix"
    :aria-checked="checked"
    :aria-disabled="disabled"
    aria-role="switch"
    @tap="handleSwitch"
  >
    <view :class="_.cls(classPrefix + '__body', [['checked', checked], ['disabled', disabled || loading], size]) + ' ' + tClassBody">
      <view
        :class="
          _.cls(classPrefix + '__dot', [['checked', checked], ['disabled', disabled], ['plain', label.length != 2 && icon.length != 2 && !loading], size]) +
            ' ' +
            tClassDot
        "
        :aria-hidden="true"
      >
        <view
          v-if="label"
          :class="_.cls(classPrefix + '__label', [['checked', checked], ['disabled', disabled], size]) + ' ' + tClassLabel"
        >
          <t-loading
            v-if="loading"
            inherit-color
            size="32rpx"
          />
          <text v-else-if="label.length == 2">
            {{ checked ? label[0] : label[1] }}
          </text>
          <t-icon
            v-else-if="icon.length == 2"
            :name="checked ? icon[0] : icon[1]"
            :t-class="_.cls(classPrefix + '__icon', [['checked', checked], size])"
          />
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import tLoading from '../loading/loading';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';


const name = `${prefix}-switch`;

export default uniComponent({
  name,
  controlledProps: [
    {
      key: 'value',
      event: 'change',
    },
  ],
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-label`,
    `${prefix}-class-body`,
    `${prefix}-class-dot`,
  ],
  components: {
    tIcon,
    tLoading,
  },
  props: {
    ...props,
  },
  emits: ['change'],
  data() {
    return {
      prefix,
      classPrefix: name,
      checked: false,
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
      handler(val) {
        const [activeValue] = this.customValue;

        this.checked = val === activeValue;
      },
      immediate: true,
    },
  },
  mounted() {

  },
  methods: {
    handleSwitch() {
      const { loading, disabled, dataValue, customValue } = this;
      const [activeValue, inactiveValue] = customValue;
      if (loading || disabled) return;

      this._trigger('change', {
        value: dataValue === activeValue ? inactiveValue : activeValue,
      });
    },
  },
});


// let Switch = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = ['t-class', 't-class-label', 't-class-body', 't-class-dot'];
//     this.behaviors = ['wx://form-field'];
//     this.properties = props;
//     this.setData({
//       prefix,
//       classPrefix: name,
//       checked: false,
//     });
//     this.controlledProps = [{
//       key: 'value',
//       event: 'change',
//     }];
//     this.observers = {
//       value(e) {
//         const [t] = this.customValue;
//         this.setData({
//           checked: e === t,
//         });
//       },
//     };
//     this.methods = {
//       handleSwitch() {
//         const {
//           loading: e,
//           disabled: t,
//           value: s,
//           customValue: o,
//         } = this;
//         const [i, r] = o;
//         e || t || this._trigger('change', {
//           value: s === i ? r : i,
//         });
//       },
//     };
//   }
// };
// Switch = __decorate([wxComponent()], Switch);
// export default Switch;
</script>
<style scoped>
@import './switch.css';
</style>
