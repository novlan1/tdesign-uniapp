<template>
  <view
    slot="content"
    :style="_._style([style, customStyle])"
    :class="classPrefix + ' ' + prefix + '-class'"
  >
    <view
      v-if="header"
      :class="classPrefix + '__toolbar'"
    >
      <view
        v-if="cancelBtn"
        :class="classPrefix + '__cancel ' + prefix + '-class-cancel'"
        @tap="onCancel"
      >
        {{ cancelBtn }}
      </view>
      <view :class="classPrefix + '__title ' + prefix + '-class-title'">
        {{ title }}
      </view>
      <view
        v-if="confirmBtn"
        :class="classPrefix + '__confirm ' + prefix + '-class-confirm'"
        @tap="onConfirm"
      >
        {{ confirmBtn }}
      </view>
    </view>
    <slot name="header" />
    <slot name="content" />
    <view :class="_.cls(classPrefix + '__main', [])">
      <slot />
      <view :class="classPrefix + '__mask ' + classPrefix + '__mask--top'" />
      <view :class="classPrefix + '__mask ' + classPrefix + '__mask--bottom'" />
      <view
        :class="classPrefix + '__indicator'"
        :style="'height: ' + pickItemHeight + 'px'"
      />
    </view>
    <slot name="footer" />
  </view>
</template>

<script>
import _ from '../common/utils.wxs';
</script>
<style>
@import './template.css';
</style>
