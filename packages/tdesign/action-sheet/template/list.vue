<template>
  <view>
    <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
    <block
      v-if="false"
      name="list"
    >
      <view
        :data-index="index"
        :style="item.color ? 'color: ' + item.color : ''"
        :class="_.cls(classPrefix + '__list-item', [align, [disabled, item.disabled]])"
        :aria-role="ariaRole || 'button'"
        :aria-label="item.label || item"
        tabindex="0"
        @tap="onSelect"
      >
        <t-icon
          v-if="item.icon"
          :name="item.icon"
          :class="classPrefix + '__list-item-icon'"
          size="48rpx"
        />
        <view :class="classPrefix + '__list-item-text'">
          {{ item.label || item }}
        </view>
        <t-icon
          v-if="item.suffixIcon"
          :name="item.suffixIcon"
          :class="classPrefix + '__list-item-icon ' + classPrefix + '__list-item-icon--suffix'"
          size="48rpx"
        />
      </view>
    </block>
  </view>
</template>

<style scoped>
@import './list.css';
</style>
