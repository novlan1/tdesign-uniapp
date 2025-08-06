<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="badge" v-if="false">
            <t-badge
                :color="color || ''"
                :content="label || ''"
                :count="count || 0"
                :dot="dot || false"
                :max-count="maxCount || 99"
                :offset="offset || []"
                :shape="shape || 'circle'"
                :show-zero="showZero || false"
                :size="size || 'medium'"
                :t-class="
                    _.cls(classPrefix + '__badge', [
                        ['disabled', item.disabled],
                        ['active', currentIndex === index]
                    ])
                "
                :t-class-content="tClassContent"
                :t-class-count="tClassCount"
            />
        </block>
    </view>
</template>

<style>
@import './badge.css';
</style>
