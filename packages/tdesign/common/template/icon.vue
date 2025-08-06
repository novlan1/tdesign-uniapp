<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="icon" v-if="false">
            <t-icon
                :style="style || ''"
                :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (activeIdx == index ? 'active ' : ' ') + prefix + '-class-icon'"
                :prefix="prefix || ''"
                :name="'close' || ''"
                :size="22 || ''"
                :color="color || ''"
                :aria-hidden="true || ''"
                :aria-label="'清除' || ''"
                :aria-role="'button' || ''"
                @click="'handleClose' || ''"
            />
        </block>
    </view>
</template>

<style>
@import './icon.css';
</style>
