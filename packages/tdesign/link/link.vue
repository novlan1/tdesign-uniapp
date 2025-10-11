<template>
  <view>
    <navigator
      :class="className + ' class ' + prefix + '-class'"
      :style="_._style([style, customStyle])"
      :target="navigatorProps.target"
      :url="!disabled && navigatorProps.url"
      :open-type="navigatorProps.openType || 'navigate'"
      :delta="navigatorProps.delta"
      :app-id="navigatorProps.appId"
      :path="navigatorProps.path"
      :extra-data="navigatorProps.extraData"
      :version="navigatorProps.version"
      :short-link="navigatorProps.shortLink"
      :hover-class="(hover && !disabled && classPrefix + '--hover') + ' ' + prefix + '-class-hover ' + navigatorProps.hoverClass"
      :hover-stop-propagation="!!navigatorProps.hoverStopPropagation"
      :hover-start-time="navigatorProps.hoverStartTime"
      :hover-stay-time="navigatorProps.hoverStayTime"
      :aria-disabled="disabled"
      @success="onSuccess"
      @fail="onFail"
      @complete="onComplete"
    >
      <view :class="classPrefix + '__prefix-icon ' + prefix + '-class-prefix-icon'">
        <slot name="prefix-icon" />
        <!-- parse <template v-if="_prefixIcon" is="icon" :data="tClass: prefix + '-class-prefix-icon', ariaHidden: true, ..._prefixIcon"/> -->
        <block
          v-if="_prefixIcon"
          name="icon"
        >
          <t-icon
            :custom-style="_prefixIcon.style || ''"
            :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (_prefixIcon.activeIdx == _prefixIcon.index ? 'active ' : ' ') + prefix + '-class-icon'"
            :prefix="_prefixIcon.prefix"
            :name="_prefixIcon.name"
            :size="_prefixIcon.size"
            :color="_prefixIcon.color"
            :aria-hidden="true"
            :aria-label="_prefixIcon.ariaLabel"
            :aria-role="_prefixIcon.arialRole"
            @click="bindclick || ''"
          />
        </block>
      </view>
      <view :class="classPrefix + '__content ' + prefix + '-class-content'">
        <block v-if="content">
          {{ content }}
        </block>
        <slot name="content" />
        <slot />
      </view>
      <view :class="classPrefix + '__suffix-icon ' + prefix + '-class-suffix-icon'">
        <slot name="suffix-icon" />
        <!-- parse <template v-if="_suffixIcon" is="icon" :data="tClass: prefix + '-class-suffix-icon', ariaHidden: true, ..._suffixIcon"/> -->
        <block
          v-if="_suffixIcon"
          name="icon"
        >
          <t-icon
            :custom-style="_suffixIcon.style || ''"
            :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (_suffixIcon.activeIdx == _suffixIcon.index ? 'active ' : ' ') + prefix + '-class-icon'"
            :prefix="_suffixIcon.prefix || ''"
            :name="_suffixIcon.name"
            :size="_suffixIcon.size"
            :color="_suffixIcon.color"
            :aria-hidden="true"
            :aria-label="_suffixIcon.ariaLabel"
            :aria-role="_suffixIcon.arialRole"
            @click="bindclick || ''"
          />
        </block>
      </view>
    </navigator>
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { calcIcon } from '../common/utils';
import _ from '../common/utils.wxs';


const name = `${prefix}-link`;

export default uniComponent({
  name,
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
      _,
      _prefixIcon: null,
      _suffixIcon: null,
      className: '',
    };
  },
  watch: {
    prefixIcon: {
      handler(value) {
        this._prefixIcon = calcIcon(value);
      },
      immediate: true,
    },
    suffixIcon: {
      handler(value) {
        this._suffixIcon = calcIcon(value);
      },
      immediate: true,
    },
    theme: 'setClass',
    disabled: 'setClass',
    size: 'setClass',
    underline: 'setClass',
    navigatorProps: 'setClass',
  },
  mounted() {
    this.setClass();
  },
  methods: {
    setClass() {
      const { theme, size, underline, navigatorProps, disabled } = this;
      const classList = [name, `${name}--${theme}`, `${name}--${size}`];
      const { url, appId, shortLink, target, openType } = navigatorProps ?? {};
      const condition = !(url || (target === 'miniProgram' && (appId || shortLink)));

      if (underline) {
        classList.push(`${name}--underline`);
      }
      if (
        (Object.keys(navigatorProps).length && condition && !['navigateBack', 'exit'].includes(openType))
        || disabled
      ) {
        classList.push(`${name}--disabled`);
      }

      this.className = classList.join(' ');
    },
    onSuccess(e) {
      this.$emit('success', {
        detail: e,
      });
    },
    onFail(e) {
      this.$emit('fail', {
        detail: e,
      });
    },
    onComplete(e) {
      this.$emit('complete', {
        detail: e,
      });
    },
  },
});
</script>
<style scoped>
@import './link.css';

</style>
