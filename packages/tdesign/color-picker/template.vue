<template>
    <view :class="classPrefix + '__panel'" :style="_._style([style, customStyle])">
        <view :class="classPrefix + '__body ' + classPrefix + '__body--' + type">
            <view
                :class="classPrefix + '__saturation'"
                v-if="isMultiple"
                @touchstart.stop.prevent="onTouchStart"
                @touchmove.stop.prevent="onTouchMove"
                @touchend.stop.prevent="onTouchEnd"
                data-type="saturation"
                :style="'background: hsl(' + sliderInfo.value + ', 100%, 50%)'"
            >
                <view :class="classPrefix + '__thumb'" :tabIndex="0" :style="_._style(saturationThumbStyle)"></view>
            </view>
            <view :class="classPrefix + '__sliders-wrapper'" v-if="isMultiple">
                <view :class="classPrefix + '__sliders'">
                    <view :class="classPrefix + '__slider-wrapper ' + classPrefix + '__slider-wrapper--hue-type'">
                        <view
                            :class="classPrefix + '__slider'"
                            @touchstart.stop.prevent="onTouchStart"
                            @touchmove.stop.prevent="onTouchMove"
                            @touchend.stop.prevent="onTouchEnd"
                            data-type="hue-slider"
                        >
                            <view :class="classPrefix + '__rail'"></view>
                            <view :class="classPrefix + '__thumb'" :style="_._style(hueSliderStyle)"></view>
                        </view>
                    </view>
                    <view v-if="enableAlpha" :class="classPrefix + '__slider-wrapper ' + classPrefix + '__slider-wrapper--alpha-type'">
                        <view
                            :class="classPrefix + '__slider-padding'"
                            :style="
                                'background: linear-gradient(90deg, rgba(0,0,0,.0) 0%, rgba(0,0,0,.0) 93%, ' + alphaSliderStyle.color + ' 93%, ' + alphaSliderStyle.color + ' 100%)'
                            "
                        ></view>
                        <view
                            :class="classPrefix + '__slider'"
                            @touchstart.stop.prevent="onTouchStart"
                            @touchmove.stop.prevent="onTouchMove"
                            @touchend.stop.prevent="onTouchEnd"
                            data-type="alpha-slider"
                        >
                            <view :class="classPrefix + '__rail'" :style="'background: linear-gradient(to right, rgba(0, 0, 0, 0), ' + alphaSliderStyle.color + ')'"></view>
                            <view :class="classPrefix + '__thumb'" :style="_._style(alphaSliderStyle)"></view>
                        </view>
                    </view>
                </view>
                <view v-if="showPrimaryColorPreview" :class="classPrefix + '__sliders-preview ' + classPrefix + '--bg-alpha'">
                    <view :class="classPrefix + '__sliders-preview-inner'" :style="'background: ' + previewColor" />
                </view>
            </view>
            <view :class="classPrefix + '__format'" v-if="isMultiple">
                <view :class="classPrefix + '__format-item ' + classPrefix + '__format-item--first'">{{ format }}</view>
                <view :class="classPrefix + '__format-item ' + classPrefix + '__format-item--second'">
                    <view :class="classPrefix + '__format-inputs'">
                        <view
                            :class="
                                classPrefix + '__format-input ' + classPrefix + '__format-input--' + (index === formatList.length - 1 && formatList.length === 2 ? 'fixed' : 'base')
                            "
                            v-for="(item, index) in formatList"
                            :key="index"
                        >
                            {{ item }}
                        </view>
                    </view>
                </view>
            </view>
            <view :class="classPrefix + '__swatches-wrap'" v-if="innerSwatchList.length">
                <view :class="classPrefix + '__swatches'">
                    <view :class="classPrefix + '__swatches-title'" v-if="isMultiple">系统预设色彩</view>
                    <view :class="classPrefix + '__swatches-items'">
                        <view :class="classPrefix + '__swatches-item'" :data-value="swatch" @tap.stop.prevent="clickSwatch" v-for="(swatch, index) in innerSwatchList" :key="index">
                            <view :class="classPrefix + '__swatches-inner'" :style="'background-color: ' + swatch + ';'"></view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>

<style>
@import './template.css';
</style>
