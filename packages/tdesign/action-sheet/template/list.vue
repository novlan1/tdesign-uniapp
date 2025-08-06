<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="list" v-if="false">
            <view
                :data-index="index"
                :style="item.color ? 'color: ' + item.color : ''"
                :class="_.cls(classPrefix + '__list-item', [align, [disabled, item.disabled]])"
                @tap="onSelect"
                :aria-role="ariaRole || 'button'"
                :aria-label="item.label || item"
                tabindex="0"
            >
                <t-icon v-if="item.icon" :name="item.icon" :class="classPrefix + '__list-item-icon'" size="48rpx"></t-icon>
                <view :class="classPrefix + '__list-item-text'">{{ item.label || item }}</view>
                <t-icon v-if="item.suffixIcon" :name="item.suffixIcon" :class="classPrefix + '__list-item-icon ' + classPrefix + '__list-item-icon--suffix'" size="48rpx"></t-icon>
            </view>
        </block>
    </view>
</template>

<style>
@import './list.css';
</style>
