<template>
    <view slot="content" :style="_._style([style, customStyle])" :class="classPrefix + ' ' + prefix + '-class'">
        <view :class="classPrefix + '__toolbar'" v-if="header">
            <view :class="classPrefix + '__cancel ' + prefix + '-class-cancel'" v-if="cancelBtn" @tap="onCancel">{{ cancelBtn }}</view>
            <view :class="classPrefix + '__title ' + prefix + '-class-title'">{{ title }}</view>
            <view :class="classPrefix + '__confirm ' + prefix + '-class-confirm'" v-if="confirmBtn" @tap="onConfirm">{{ confirmBtn }}</view>
        </view>
        <slot name="header" />
        <slot name="content" />
        <view :class="_.cls(classPrefix + '__main', [])">
            <slot />
            <view :class="classPrefix + '__mask ' + classPrefix + '__mask--top'" />
            <view :class="classPrefix + '__mask ' + classPrefix + '__mask--bottom'" />
            <view :class="classPrefix + '__indicator'" :style="'height: ' + pickItemHeight + 'px'"></view>
        </view>
        <slot name="footer" />
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>

<style>
@import './template.css';
</style>
