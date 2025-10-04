<template>
  <view
    :class="classPrefix + '__panel'"
    :style="_._style([style, customStyle])"
  >
    <view :class="classPrefix + '__body ' + classPrefix + '__body--' + type">
      <view
        v-if="isMultiple"
        :class="classPrefix + '__saturation'"
        data-type="saturation"
        :style="'background: hsl(' + sliderInfo.value + ', 100%, 50%)'"
        @touchstart.stop.prevent="onTouchStart"
        @touchmove.stop.prevent="onTouchMove"
        @touchend.stop.prevent="onTouchEnd"
      >
        <view
          :class="classPrefix + '__thumb'"
          :tab-index="0"
          :style="_._style(saturationThumbStyle)"
        />
      </view>
      <view
        v-if="isMultiple"
        :class="classPrefix + '__sliders-wrapper'"
      >
        <view :class="classPrefix + '__sliders'">
          <view :class="classPrefix + '__slider-wrapper ' + classPrefix + '__slider-wrapper--hue-type'">
            <view
              :class="classPrefix + '__slider'"
              data-type="hue-slider"
              @touchstart.stop.prevent="onTouchStart"
              @touchmove.stop.prevent="onTouchMove"
              @touchend.stop.prevent="onTouchEnd"
            >
              <view :class="classPrefix + '__rail'" />
              <view
                :class="classPrefix + '__thumb'"
                :style="_._style(hueSliderStyle)"
              />
            </view>
          </view>
          <view
            v-if="enableAlpha"
            :class="classPrefix + '__slider-wrapper ' + classPrefix + '__slider-wrapper--alpha-type'"
          >
            <view
              :class="classPrefix + '__slider-padding'"
              :style="
                'background: linear-gradient(90deg, rgba(0,0,0,.0) 0%, rgba(0,0,0,.0) 93%, ' + alphaSliderStyle.color + ' 93%, ' + alphaSliderStyle.color + ' 100%)'
              "
            />
            <view
              :class="classPrefix + '__slider'"
              data-type="alpha-slider"
              @touchstart.stop.prevent="onTouchStart"
              @touchmove.stop.prevent="onTouchMove"
              @touchend.stop.prevent="onTouchEnd"
            >
              <view
                :class="classPrefix + '__rail'"
                :style="'background: linear-gradient(to right, rgba(0, 0, 0, 0), ' + alphaSliderStyle.color + ')'"
              />
              <view
                :class="classPrefix + '__thumb'"
                :style="_._style(alphaSliderStyle)"
              />
            </view>
          </view>
        </view>
        <view
          v-if="showPrimaryColorPreview"
          :class="classPrefix + '__sliders-preview ' + classPrefix + '--bg-alpha'"
        >
          <view
            :class="classPrefix + '__sliders-preview-inner'"
            :style="'background: ' + previewColor"
          />
        </view>
      </view>
      <view
        v-if="isMultiple"
        :class="classPrefix + '__format'"
      >
        <view :class="classPrefix + '__format-item ' + classPrefix + '__format-item--first'">
          {{ format }}
        </view>
        <view :class="classPrefix + '__format-item ' + classPrefix + '__format-item--second'">
          <view :class="classPrefix + '__format-inputs'">
            <view
              v-for="(item, index) in formatList"
              :key="index"
              :class="
                classPrefix + '__format-input ' + classPrefix + '__format-input--' + (index === formatList.length - 1 && formatList.length === 2 ? 'fixed' : 'base')
              "
            >
              {{ item }}
            </view>
          </view>
        </view>
      </view>
      <view
        v-if="innerSwatchList.length"
        :class="classPrefix + '__swatches-wrap'"
      >
        <view :class="classPrefix + '__swatches'">
          <view
            v-if="isMultiple"
            :class="classPrefix + '__swatches-title'"
          >
            系统预设色彩
          </view>
          <view :class="classPrefix + '__swatches-items'">
            <view
              v-for="(swatch, index) in innerSwatchList"
              :key="index"
              :class="classPrefix + '__swatches-item'"
              :data-value="swatch"
              @tap.stop.prevent="clickSwatch"
            >
              <view
                :class="classPrefix + '__swatches-inner'"
                :style="'background-color: ' + swatch + ';'"
              />
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
