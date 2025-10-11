<template>
  <view
    :style="_._style([style, customStyle])"
    :class="_.cls(classPrefix, [['border', !borderless]]) + ' ' + classPrefix + '--layout-' + layout + ' class ' + tClass"
    aria-describedby
  >
    <view :class="classPrefix + '__wrap--prefix'">
      <view :class="classPrefix + '__icon--prefix'">
        <slot name="prefix-icon" />
        <!-- parse <template v-if="_prefixIcon" is="icon" :data="tClass: prefix + '-class-prefix-icon', ariaHidden: true, ..._prefixIcon"/> -->
        <block
          v-if="_prefixIcon"
          name="icon"
        >
          <t-icon
            :custom-style="_prefixIcon.style || ''"
            :t-class="tClassPrefixIcon"
            :prefix="_prefixIcon.prefix"
            :name="_prefixIcon.name"
            :size="_prefixIcon.size"
            :color="_prefixIcon.color"
            :aria-hidden="true"
            :aria-label="_prefixIcon.ariaLabel"
            :aria-role="_prefixIcon.ariaRole"
            @click="_prefixIcon.click || ''"
          />
        </block>
      </view>
      <view
        :class="classPrefix + '__label ' + tClassLabel"
        aria-hidden
      >
        <slot name="label" />
        <block v-if="label">
          {{ label }}
        </block>
      </view>
    </view>
    <view :class="classPrefix + '__wrap'">
      <view :class="classPrefix + '__content ' + classPrefix + '--' + status">
        <input
          :class="getInputClass(classPrefix, suffix, align, disabled) + ' ' + tClassInput"
          :maxlength="innerMaxLen"
          :disabled="disabled || readonly"
          :placeholder="placeholder"
          :placeholder-style="placeholderStyle"
          :placeholder-class="_.cls(classPrefix + '__placeholder', [['disabled', disabled]]) + ' ' + placeholderClass"
          :value="dataValue"
          :password="type === 'password'"
          :type="type === 'password' ? 'text' : type"
          :focus="focus"
          :confirm-type="confirmType"
          :confirm-hold="confirmHold"
          :cursor="cursor"
          :cursor-color="cursorColor"
          :cursor-spacing="cursorSpacing"
          :adjust-position="adjustPosition"
          :auto-focus="autoFocus"
          :always-embed="alwaysEmbed"
          :selection-start="selectionStart"
          :selection-end="selectionEnd"
          :hold-keyboard="holdKeyboard"
          :safe-password-cert-path="safePasswordCertPath"
          :safe-password-length="safePasswordLength"
          :safe-password-time-stamp="safePasswordTimeStamp"
          :safe-password-nonce="safePasswordNonce"
          :safe-password-salt="safePasswordSalt"
          :safe-password-custom-hash="safePasswordCustomHash"
          aria-role="textbox"
          :aria-label="label"
          :aria-roledescription="label"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @confirm="onConfirm"
          @keyboardheightchange="onKeyboardHeightChange"
          @nicknamereview="onNickNameReview"
        >
        <view
          v-if="_clearIcon && dataValue?.length && showClearIcon"
          :class="classPrefix + '__wrap--clearable-icon'"
          @tap="clearInput"
        >
          <!-- parse <template is="icon" :data="tClass: prefix + '-class-clearable', ariaRole: 'button', ariaLabel: '清除', ..._clearIcon"/> -->

          <t-icon
            :custom-style="_clearIcon.style || ''"
            :t-class="tClassClearable"
            :prefix="_clearIcon.prefix"
            :name="_clearIcon.name"
            :size="_clearIcon.size"
            :color="_clearIcon.color"
            :aria-hidden="false"
            :aria-label="_clearIcon.ariaLabel || '清除'"
            :aria-role="_clearIcon.ariaRole || 'button'"
            @click="_clearIcon.click || ''"
          />
        </view>
        <view
          :class="classPrefix + '__wrap--suffix ' + tClassSuffix"
          @tap="onSuffixClick"
        >
          <text v-if="suffix">
            {{ suffix }}
          </text>
          <slot name="suffix" />
        </view>
        <view
          :class="classPrefix + '__wrap--suffix-icon'"
          @tap="onSuffixIconClick"
        >
          <slot name="suffix-icon" />
          <!-- parse <template v-if="_suffixIcon" is="icon" :data="tClass: prefix + '-class-suffix-icon', ariaRole: 'button', ..._suffixIcon"/> -->
          <block
            v-if="_suffixIcon"
            name="icon"
          >
            <t-icon
              :custom-style="_suffixIcon.style || ''"
              :t-class="tClassSuffixIcon"
              :prefix="_suffixIcon.prefix"
              :name="_suffixIcon.name"
              :size="_suffixIcon.size"
              :color="_suffixIcon.color"
              :aria-hidden="true"
              :aria-label="_suffixIcon.ariaLabel"
              :aria-role="_suffixIcon.ariaRole || 'button'"
              @click="_suffixIcon.click || ''"
            />
          </block>
        </view>
      </view>
      <view
        v-if="tips && tips.length > 0"
        :class="classPrefix + '__tips ' + classPrefix + '--' + align + ' ' + tClassTips"
      >
        {{ tips }}
      </view>
      <slot name="tips" />
    </view>
    <slot name="extra" />
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { getCharacterLength, calcIcon } from '../common/utils';
import { isDef } from '../common/validator';
import { getInputClass } from './computed.js';
import _ from '../common/utils.wxs';


const name = `${prefix}-input`;

export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-prefix-icon`,
    `${prefix}-class-label`,
    `${prefix}-class-input`,
    `${prefix}-class-clearable`,
    `${prefix}-class-suffix`,
    `${prefix}-class-suffix-icon`,
    `${prefix}-class-tips`,
  ],
  components: {
    tIcon,
  },
  props: {
    ...props,
  },
  emits: [
    'blur',
    'change',
    'clear',
    'click',
    'enter',
    'focus',
    'keyboardheightchange',
    'nicknamereview',
    'validate',
  ],
  data() {
    return {
      prefix,
      classPrefix: name,
      classBasePrefix: prefix,
      showClearIcon: true,
      _,

      dataValue: this.value ?? this.defaultValue,

      rawValue: '',
      innerMaxLen: -1,
    };
  },
  computed: {
  },
  watch: {
    prefixIcon: {
      handler(v) {
        this._prefixIcon = calcIcon(v);
      },
      immediate: true,
    },

    suffixIcon: {
      handler(v) {
        this._suffixIcon = calcIcon(v);
      },
      immediate: true,
    },

    clearable: {
      handler(v) {
        this._clearIcon = calcIcon(v, 'close-circle-filled');
      },
      immediate: true,
    },

    clearTrigger: 'updateClearIconVisible',
    disabled: 'updateClearIconVisible',
    readonly: 'updateClearIconVisible',

    count: 'updateInnerMaxLen',
    dataValue: 'updateInnerMaxLen',
    allowInputOverMax: 'updateInnerMaxLen',
    maxcharacter: 'updateInnerMaxLen',
    maxlength: 'updateInnerMaxLen',
  },
  mounted() {
    const { value, defaultValue } = this;
    this.updateValue(value ?? defaultValue ?? '');

    this.updateClearIconVisible();
  },
  methods: {
    getInputClass,
    updateValue(value) {
      this.rawValue = value;

      const { allowInputOverMax, maxcharacter, maxlength } = this;
      if (!allowInputOverMax && maxcharacter && maxcharacter > 0 && !Number.isNaN(maxcharacter)) {
        const { length, characters } = getCharacterLength('maxcharacter', value, maxcharacter);
        this.dataValue = characters;
        this.count = length;
      } else if (!allowInputOverMax && maxlength && maxlength > 0 && !Number.isNaN(maxlength)) {
        const { length, characters } = getCharacterLength('maxlength', value, maxlength);
        this.dataValue = characters;
        this.count = length;
      } else {
        this.dataValue = value;
        this.count = isDef(value) ? String(value).length : 0;
      }
      // #ifdef H5
      this.updateInnerMaxLen();
      // #endif
    },
    updateInnerMaxLen() {
      // #ifdef H5
      this.innerMaxLen = this.getInnerMaxLen();
      // #endif
      // #ifndef H5
      this.innerMaxLen = this.allowInputOverMax ? -1 : this.maxlength;
      // #endif
    },
    getInnerMaxLen() {
      if (this.allowInputOverMax) {
        return -1;
      }
      if (!this.maxcharacter || this.maxcharacter < 0) {
        return this.maxlength;
      }
      if (!this.dataValue) {
        return this.maxcharacter;
      }


      const { length: realCount } = getCharacterLength('maxcharacter', this.rawValue, Infinity);

      if (realCount >= this.maxcharacter) {
        return this.dataValue.length;
      }

      const extra = this.count - this.dataValue.length;

      return this.maxcharacter - extra;
    },

    updateClearIconVisible(value = false) {
      const { clearTrigger, disabled, readonly } = this;
      if (disabled || readonly) {
        this.showClearIcon = false;
        return;
      }
      this.showClearIcon = value || clearTrigger === 'always';
    },

    onInput(e) {
      const { value, cursor, keyCode } = e.detail;
      this.updateValue(value);
      this.$emit('change', { value: this.dataValue, cursor, keyCode });
    },

    onChange(e) {
      if (this.type !== 'nickname') return;
      const { value } = e.detail;
      this.updateValue(value);
      this.$emit('change', { value: this.dataValue });
    },

    onFocus(e) {
      this.updateClearIconVisible(true);
      this.$emit('focus', e.detail);
    },

    onBlur(e) {
      this.updateClearIconVisible();

      // 失焦时处理 format
      if (typeof this.format === 'function') {
        const v = this.format(e.detail.value);
        this.updateValue(v);
        this.$emit('blur', { value: this.dataValue, cursor: this.count });
        return;
      }
      this.$emit('blur', e.detail);
    },

    onConfirm(e) {
      this.$emit('enter', e.detail);
    },

    onSuffixClick() {
      this.$emit('click', { trigger: 'suffix' });
    },

    onSuffixIconClick() {
      this.$emit('click', { trigger: 'suffix-icon' });
    },

    clearInput(e) {
      this.$emit('clear', e.detail);
      this.dataValue = '';
    },

    onKeyboardHeightChange(e) {
      this.$emit('keyboardheightchange', e.detail);
    },

    onNickNameReview(e) {
      this.$emit('nicknamereview', e.detail);
    },
  },
});

</script>
<style scoped lang="less">
@import './input.less';

</style>
