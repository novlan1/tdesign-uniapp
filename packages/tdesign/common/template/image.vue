<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="image" v-if="false">
            <t-image
                :t-class="_.cls(classPrefix + '__image', [util.getImageSize(column)]) + ' ' + prefix + '-class-image'"
                :t-class-load="tClassLoad"
                :style="'height: ' + _.addUnit(height) || ''"
                :customStyle="customStyle || ''"
                :height="height || ''"
                :width="width || ''"
                :error="error || 'default'"
                :lazy="lazy || false"
                :loading="count || 'default'"
                :shape="'round' || 'square'"
                :src="image || ''"
                :mode="'widthFix' || 'scaleToFill'"
                :webp="webp || false"
                :showMenuByLongpress="showMenuByLongpress || false"
                :data-custom="index || null"
                @error="binderror"
                @load="'onImageLoad';"
            />
        </block>
    </view>
</template>

<style>
@import './image.css';
</style>
