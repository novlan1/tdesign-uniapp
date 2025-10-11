<template>
  <view
    v-if="!hidden"
    :style="_._style([style, customStyle])"
    :class="'class ' + tClass + ' ' + _.cls(classPrefix, [['fixed', fixed], theme])"
    aria-role="button"
    @tap="toTop"
  >
    <view
      :class="classPrefix + '__icon'"
      aria-hidden
    >
      <slot name="icon" />
      <!-- parse <template v-if="_icon" is="icon" :data="tClass: prefix + '-class-icon', ..._icon"/> -->
      <block
        v-if="_icon"
        name="icon"
      >
        <t-icon
          :custom-style="_icon.style || ''"
          :t-class="tClassIcon"
          :prefix="_icon.prefix"
          :name="_icon.name"
          :size="_icon.size"
          :color="_icon.color"
          :aria-hidden="!!_icon.ariaHidden"
          :aria-label="_icon.ariaLabel"
          :aria-role="_icon.ariaRole"
          @click="_icon.click || ''"
        />
      </block>
    </view>
    <view
      v-if="!!text"
      :class="classPrefix + '__text--' + theme + ' ' + tClassText"
    >
      {{ text }}
    </view>
    <slot />
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { calcIcon } from '../common/utils';
import _ from '../common/utils.wxs';
import { ChildrenMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-back-top`;

export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-icon`,
    `${prefix}-class-text`,
  ],
  mixins: [
    ChildrenMixin(RELATION_MAP.BackTop),
  ],
  components: {
    tIcon,
  },
  props: {
    ...props,
  },
  emits: [
    'to-top',
  ],
  watch: {
    icon() {
      this.setIcon();
    },
    scrollTop: {
      handler(value) {
        const { visibilityHeight } = this;
        this.hidden = value < visibilityHeight;
      },
      immediate: true,
    },
  },
  mounted() {
    const { icon } = this;
    this.setIcon(icon);
  },
  methods: {
    setIcon(v) {
      this._icon = calcIcon(v, 'backtop');
    },

    toTop() {
      this.$emit('to-top');
      if (this[RELATION_MAP.BackTop]) {
        this[RELATION_MAP.BackTop]?.scrollToTop();
        this.hidden = true;
      } else {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        });
      }
    },
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      _icon: null,
      hidden: true,
      _,
    };
  },
});

// let BackTop = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-icon`, `${prefix}-class-text`];
//     this.options = {
//       multipleSlots: true,
//     };
//     this.properties = props;
//     this.relations = {
//       '../pull-down-refresh/pull-down-refresh': {
//         type: 'ancestor',
//       },
//     };
//     this.setData({
//       prefix,
//       classPrefix: name,
//       _icon: null,
//       hidden: true,
//     });
//     this.observers = {
//       icon() {
//         this.setIcon();
//       },
//       scrollTop(o) {
//         const {
//           visibilityHeight: t,
//         } = this;
//         this.setData({
//           hidden: o < t,
//         });
//       },
//     };
//     this.lifetimes = {
//       ready() {
//         const {
//           icon: o,
//         } = this;
//         this.setIcon(o);
//       },
//     };
//     this.methods = {
//       setIcon(o) {
//         this.setData({
//           _icon: calcIcon(o, 'backtop'),
//         });
//       },
//       toTop() {
//         let o;
//         this.$emit('to-top');
//         if (this.$parent) {
//           null === (o = this.$parent) || void 0 === o || o.setScrollTop(0);
//           this.setData({
//             hidden: true,
//           });
//         } else {
//           uni.pageScrollTo({
//             scrollTop: 0,
//             duration: 300,
//           });
//         }
//       },
//     };
//   }
// };
// BackTop = __decorate([wxComponent()], BackTop);
// export default BackTop;
</script>
<style scoped>
@import './back-top.css';

</style>
