<template>
  <view>
    <view
      v-if="realVisible"
      :style="_._style([popup.getPopupStyles(zIndex, distanceTop, placement), style, customStyle])"
      :class="_.cls(classPrefix, [placement]) + ' ' + transitionClass + ' class ' + prefix + '-class'"
      @transitionend="onTransitionEnd"
    >
      <view
        :data-prevention="preventScrollThrough || (overlayProps ? !!overlayProps.preventScrollThrough : false)"
        :class="classPrefix + '__content ' + prefix + '-class-content'"
        @touchmove="parseEventDynamicCode($event, popup.onContentTouchMove)"
      >
        <slot name="content" />
        <slot />
        <view
          :class="classPrefix + '__close'"
          @tap="handleClose"
        >
          <t-icon
            v-if="closeBtn"
            name="close"
            size="64rpx"
          />
          <slot
            name="close-btn"
            :class="classPrefix + '-slot'"
          />
        </view>
      </view>
    </view>
    <t-overlay
      v-if="showOverlay"
      id="popup-overlay"
      :visible="visible"
      :using-custom-navbar="usingCustomNavbar"
      :custom-navbar-height="customNavbarHeight"
      :z-index="(overlayProps && overlayProps.zIndex) || 11000"
      :duration="(overlayProps && overlayProps.duration) || 300"
      :background-color="(overlayProps && overlayProps.backgroundColor) || ''"
      :prevent-scroll-through="preventScrollThrough || (overlayProps ? !!overlayProps.preventScrollThrough : false)"
      :custom-style="(overlayProps && overlayProps.style) || ''"
      @click="handleOverlayClick($event, { tagId: 'popup-overlay' })"
    />
  </view>
</template>
<script>
import tOverlay from '../overlay/overlay';
import tIcon from '../icon/icon';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { transitionMixins } from '../mixins/transition';
import useCustomNavbar from '../mixins/using-custom-navbar';
import _ from '../common/utils.wxs';
import popup from './computed.js';
import { parseEventDynamicCode } from '../common/event/dynamic';

delete props.visible;

const name = `${prefix}-popup`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-content`,
  ],
  mixins: [transitionMixins, useCustomNavbar],
  components: {
    tOverlay,
    tIcon,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      popup,
      _,
    };
  },
  methods: {
    parseEventDynamicCode,
    handleOverlayClick() {
      const { closeOnOverlayClick } = this;
      if (closeOnOverlayClick) {
        this.$emit('visible-change', { visible: false, trigger: 'overlay' });
      }
    },

    handleClose() {
      this.$emit('visible-change', { visible: false, trigger: 'close-btn' });
    },
  },
});

</script>
<style scoped >
@import './popup.css';
</style>
