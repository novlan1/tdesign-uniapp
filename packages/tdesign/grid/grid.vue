<template>
  <view
    :style="_._style([style, customStyle])"
    :class="_.cls(classPrefix, [theme]) + ' class ' + prefix + '-class'"
  >
    <view
      v-if="column > 0"
      :class="classPrefix + '__content'"
      :style="contentStyle"
    >
      <slot />
    </view>
    <scroll-view
      v-else
      scroll-x
      scroll-with-animation
      :class="classPrefix + '__content'"
      :style="'white-space: nowrap;' + contentStyle"
    >
      <slot />
    </scroll-view>
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import { isObject } from '../common/validator';
import props from './props';
import _ from '../common/utils.wxs';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-grid`;


export default uniComponent({
  name,
  externalClasses: ['t-class'],
  mixins: [ParentMixin(RELATION_MAP.GridItem)],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      contentStyle: '',
      _,
    };
  },
  watch: {
    column: 'watchCallback',
    hover: 'watchCallback',
    align: 'watchCallback',
    gutter: 'watchCallback',
    border: 'watchCallback',
  },
  mounted() {
    this.updateContentStyle();
  },
  methods: {
    watchCallback() {
      this.updateContentStyle();
      this.doForChild(t => t.updateStyle?.());
    },
    doForChild(action) {
      this.children?.forEach(action);
    },
    updateContentStyle() {
      const contentStyles = [];
      const marginStyle = this.getContentMargin();
      marginStyle && contentStyles.push(marginStyle);
      this.contentStyle = contentStyles.join(';');
    },

    // 判断需不需要在content上加负margin以实现gutter间距
    getContentMargin() {
      const { gutter } = this;
      let { border } = this;

      if (!border) return `margin-bottom:-${gutter}rpx; margin-right:-${gutter}rpx`;
      if (!isObject(border)) border = {} ;
      const { width = 2 } = border ;
      return `margin-bottom:-${width}rpx; margin-right:-${width}rpx`;
    },
  },
});

// let Grid = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = ['t-class'];
//     this.relations = {
//       '../grid-item/grid-item': {
//         type: 'descendant',
//       },
//     };
//     this.properties = props;
//     this._ = _;
//     this.setData({
//       prefix,
//       classPrefix: name,
//       contentStyle: '',
//     });
//     this.observers = {
//       'column,hover,align,gutter,border'() {
//         this.updateContentStyle();
//         this.doForChild(t => t.updateStyle?.());
//       },
//     };
//     this.lifetimes = {
//       attached() {
//         this.updateContentStyle();
//       },
//     };
//     this.methods = {
//       doForChild(t) {
//         this.children?.forEach(t);
//       },
//       updateContentStyle() {
//         const t = [];
//         const e = this.getContentMargin();
//         if (e) {
//           t.push(e);
//         }
//         this.setData({
//           contentStyle: t.join(';'),
//         });
//       },
//       getContentMargin() {
//         const {
//           gutter: t,
//         } = this;
//         let {
//           border: e,
//         } = this;
//         if (!e) {
//           return `margin-left:-${t}rpx; margin-top:-${t}rpx`;
//         }
//         isObject(e) || (e = {});
//         const {
//           width: r = 2,
//         } = e;
//         return `margin-left:-${r}rpx; margin-top:-${r}rpx`;
//       },
//     };
//   }
// };
// Grid = initTDesign(__decorate([wxComponent()], Grid));
// export default Grid;
</script>
<style scoped>
@import './grid.css';
</style>
