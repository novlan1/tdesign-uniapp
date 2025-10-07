<template>
  <button
    :id="tId"
    :style="_._style([style, customStyle])"
    :data-custom="customDataset"
    :class="'class ' + className"
    :form-type="disabled || loading ? '' : type"
    :open-type="disabled || loading ? '' : openType"
    :hover-stop-propagation="hoverStopPropagation"
    :hover-start-time="hoverStartTime"
    :hover-stay-time="hoverStayTime"
    :lang="lang"
    :session-from="sessionFrom"
    :hover-class="disabled || loading ? '' : hoverClass || classPrefix + '--hover'"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :send-message-img="sendMessageImg"
    :app-parameter="appParameter"
    :show-message-card="showMessageCard"
    :aria-label="ariaLabel"
    @click.stop.prevent="handleTap"
    @getuserinfo="getuserinfo"
    @contact="contact"
    @getphonenumber="getphonenumber"
    @error="error"
    @opensetting="opensetting"
    @launchapp="launchapp"
    @chooseavatar="chooseavatar"
    @agreeprivacyauthorization="agreeprivacyauthorization"
  >
    <!-- parse <template v-if="_icon" is="icon" :data="tClass: classPrefix + '__icon ' + prefix + '-class-icon', ariaHidden: true, name: iconName, ..._icon"/> -->
    <block
      v-if="_icon"
      name="icon"
    >
      <t-icon
        :custom-style="_icon.style || ''"
        :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (_icon.activeIdx == _icon.index ? 'active ' : ' ') + tClassIcon"
        :prefix="_icon.prefix"
        :name="_icon.name || ''"
        :size="_icon.size"
        :color="_icon.color"
        @click="'handleClose' || ''"
      />
    </block>
    <t-loading
      v-if="loading"
      :delay="loadingProps.delay || 0"
      :duration="loadingProps.duration || 800"
      :indicator="loadingProps.indicator || true"
      :inherit-color="loadingProps.inheritColor || true"
      :layout="loadingProps.layout || 'horizontal'"
      :pause="loadingProps.pause || false"
      :progress="loadingProps.progress || 0"
      :reverse="loadingProps.reverse || false"
      :size="loadingProps.size || '40rpx'"
      :text="loadingProps.text || ''"
      :theme="loadingProps.theme || 'circular'"
      loading
      :t-class="classPrefix + '__loading ' + classPrefix + '__loading--wrapper'"
      :t-class-indicator="classPrefix + '__loading--indicator ' + tClassLoading"
    />
    <view :class="classPrefix + '__content'">
      <slot name="content" />
      <block v-if="content">
        {{ content }}
      </block>
      <slot />
    </view>
    <slot name="suffix" />
  </button>
</template>
<script>
import tIcon from '../icon/icon';
import tLoading from '../loading/loading';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { calcIcon } from '../common/utils';
import _ from '../common/utils.wxs';


const name = `${prefix}-button`;


export default uniComponent({
  name,
  components: {
    tIcon,
    tLoading,
  },
  props: {
    ...props,
  },
  data() {
    return {
      _,
      prefix,
      className: '',
      classPrefix: name,
      _icon: undefined,
      // loadingProps: {},
    };
  },
  emits: [
    'click',
  ],
  watch: {
    icon: {
      handler(value) {
        this._icon = calcIcon(value, '');
      },
      immediate: true,
    },
    theme: 'setClass',
    size: 'setClass',
    plain: 'setClass',
    block: 'setClass',
    shape: 'setClass',
    disabled: 'setClass',
    loading: 'setClass',
    variant: 'setClass',
  },
  mounted() {
    this.setClass();
  },
  methods: {
    setClass() {
      const t = [
        name,
        this.tClass,
        `${name}--${this.variant || 'base'}`,
        `${name}--${this.theme || 'default'}`,
        `${name}--${this.shape || 'rectangle'}`,
        `${name}--size-${this.size || 'medium'}`,
      ];
      if (this.block) {
        t.push(`${name}--block`);
      }
      if (this.disabled) {
        t.push(`${name}--disabled`);
      }
      if (this.ghost) {
        t.push(`${name}--ghost`);
      }
      this.className = t.join(' ');
    },
    getuserinfo(t) {
      this.$emit('getuserinfo', {
        detail: t.detail,
      });
    },
    contact(t) {
      this.$emit('contact', {
        detail: t.detail,
      });
    },
    getphonenumber(t) {
      this.$emit('getphonenumber', {
        detail: t.detail,
      });
    },
    error(t) {
      this.$emit('error', {
        detail: t.detail,
      });
    },
    opensetting(t) {
      this.$emit('opensetting', {
        detail: t.detail,
      });
    },
    launchapp(t) {
      this.$emit('launchapp', {
        detail: t.detail,
      });
    },
    chooseavatar(t) {
      this.$emit('chooseavatar', {
        detail: t.detail,
      });
    },
    agreeprivacyauthorization(t) {
      this.$emit('agreeprivacyauthorization', {
        detail: t.detail,
      });
    },
    handleTap(t) {
      if (this.disabled || this.loading) return;
      console.log('11111');
      this.$emit('click', t);
    },
  },
});
</script>
<style>
@import './button.css';
</style>
