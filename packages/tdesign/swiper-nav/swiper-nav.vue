<template>
  <view>
    <view
      v-if="showControls"
      :class="'class ' + prefix + '-class ' + classPrefix + '__btn'"
      :style="_._style([style, customStyle])"
    >
      <view
        :class="classPrefix + '__btn--prev'"
        data-dir="prev"
        aria-role="button"
        aria-label="上一张"
        @tap="nav"
      />
      <view
        :class="classPrefix + '__btn--next'"
        data-dir="next"
        aria-role="button"
        aria-label="下一张"
        @tap="nav"
      />
    </view>
    <view
      v-if="total >= minShowNum"
      :style="_._style([style, customStyle])"
      :class="
        'class ' + prefix + '-class ' + classPrefix + ' ' + classPrefix + '--' + direction + ' ' + classPrefix + '__' + type + ' ' + classPrefix + '--' + paginationPosition
      "
    >
      <block v-if="type === 'dots' || type === 'dots-bar'">
        <view
          v-for="(item, idx) in total"
          :key="idx"
          :class="_.cls(classPrefix + '__' + type + '-item', [['active', current === idx], direction])"
        />
      </block>
      <block v-if="type === 'fraction'">
        {{ current + 1 }}/{{ total }}
      </block>
    </view>
  </view>
</template>
<script>
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import _ from '../common/utils.wxs';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-swiper-nav`;
let SwiperNav = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.externalClasses = [`${prefix}-class`];
    // this = {
    //   current: {
    //     type: Number,
    //     value: 0,
    //   },
    //   total: {
    //     type: Number,
    //     value: 0,
    //   },
    //   type: {
    //     type: String,
    //     value: 'dots',
    //   },
    //   minShowNum: {
    //     type: Number,
    //     value: 2,
    //   },
    //   showControls: {
    //     type: Boolean,
    //     value: false,
    //   },
    //   direction: {
    //     type: String,
    //     value: 'horizontal',
    //   },
    //   paginationPosition: {
    //     type: String,
    //     value: 'bottom',
    //   },
    // };
    this.relations = {
      '../swiper/swiper': {
        type: 'parent',
      },
    };
    this.setData({
      prefix,
      classPrefix: name,
    });
    this.methods = {
      nav(e) {
        let t;
        const {
          dir: r,
        } = e.target.dataset;
        this.$emit('nav-btn-change', {
          detail: {
            dir: r,
            source: 'nav',
          },
        });
        if (this.$parent) {
          null === (t = this.$parent) || void 0 === t || t.doNavBtnChange(r, 'nav');
        }
      },
    };
  }
};
SwiperNav = __decorate([wxComponent()], SwiperNav);
export default SwiperNav;
</script>
<style scoped>
@import './swiper-nav.css';
</style>
