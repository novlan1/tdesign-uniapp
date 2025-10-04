<template>
  <view>
    <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
    <block
      v-if="false"
      name="grid"
    >
      <block v-if="gridThemeItems.length === 1">
        <t-grid
          align="center"
          :t-class="classPrefix + '__grid'"
          :column="count / 2"
          :class="classPrefix + '__single-wrap'"
        >
          <t-grid-item
            v-for="(item, index) in gridThemeItems[0]"
            :key="index"
            :t-class="classPrefix + '__grid-item'"
            :class="classPrefix + '__square'"
            :data-index="index"
            icon=""
            :text="item.label || ''"
            :image="item.image || ''"
            :style="'--td-grid-item-text-color: ' + item.color"
            @tap.native="onSelect"
          />
        </t-grid>
      </block>
      <block v-else-if="gridThemeItems.length > 1">
        <view :class="classPrefix + '__swiper-wrap'">
          <swiper
            style="height: 456rpx"
            :autoplay="false"
            :current="currentSwiperIndex"
            @change="onSwiperChange"
          >
            <swiper-item
              v-for="(item, index) in gridThemeItems"
              :key="index"
            >
              <t-grid
                align="center"
                :t-class="classPrefix + '__grid ' + classPrefix + '__grid--swiper'"
                :column="count / 2"
              >
                <t-grid-item
                  v-for="(item, index1) in item"
                  :key="index1"
                  :t-class="classPrefix + '__grid-item'"
                  :class="classPrefix + '__square'"
                  :data-index="index"
                  icon=""
                  :text="item.label || ''"
                  :image="item.image || ''"
                  :style="'--td-grid-item-text-color: ' + item.color"
                  @tap.native="onSelect"
                />
              </t-grid>
            </swiper-item>
          </swiper>
          <view :class="classPrefix + '__nav'">
            <view :class="classPrefix + '__dots'">
              <view
                v-for="(item, index) in gridThemeItems.length"
                :key="index"
                :class="classPrefix + '__dots-item ' + (index === currentSwiperIndex ? prefix + '-is-active' : '')"
              />
            </view>
          </view>
        </view>
      </block>
    </block>
  </view>
</template>

<style>
@import './grid.css';
</style>
