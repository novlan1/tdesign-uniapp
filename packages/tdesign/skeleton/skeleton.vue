<template>
  <view>
    <view
      v-if="isShow"
      :style="_._style([style, customStyle])"
      :class="[classPrefix + ' class ', tClass]"
    >
      <view
        v-if="parsedRowCols.length"
        :class="classPrefix + '__content'"
      >
        <view
          v-for="(row, index) in parsedRowCols"
          :key="index"
          :class="[
            classPrefix + '__row ',
            tClassRow
          ]"
        >
          <view
            v-for="(col, index1) in row"
            :key="index1"
            :class="[col.class + ' ', tClassCol]"
            :style="_._style(col.style)"
          />
        </view>
      </view>
    </view>
    <view
      v-else
      :class="'class ' + classPrefix + '__content'"
    >
      <slot />
    </view>
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import { classNames } from '../common/utils';
import { isNumber } from '../common/validator';
import _ from '../common/utils.wxs';


const name = `${prefix}-skeleton`;


const ThemeMap = {
  avatar: [{
    type: 'circle',
    size: '96rpx',
  }],
  image: [{
    type: 'rect',
    size: '144rpx',
  }],
  text: [[{
    width: '24%',
    height: '32rpx',
    marginRight: '32rpx',
  }, {
    width: '76%',
    height: '32rpx',
  }], 1],
  paragraph: [1, 1, 1, {
    width: '55%',
  }],
};

export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-col`,
    `${prefix}-class-row`,
  ],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      parsedRowCols: [],
      isShow: false,
      _,
      timer: null,
    };
  },
  watch: {
    rowCol: {
      handler() {
        this.init();
      },
      immediate: true,
    },
    loading: 'isShowSkeleton',
    delay: 'isShowSkeleton',
  },
  mounted() {
    this.init();
    this.isShowSkeleton();
  },
  beforeUnMount() {
    this.clearTimer();
  },
  methods: {
    init() {
      const { theme, rowCol } = this;
      const rowCols = [];

      if (rowCol.length) {
        rowCols.push(...rowCol);
      } else {
        rowCols.push(...ThemeMap[theme || 'text']);
      }

      const parsedRowCols = rowCols.map((item) => {
        if (isNumber(item)) {
          return new Array(item).fill({
            class: this.getColItemClass({ type: 'text' }),
            style: {},
          });
        }
        if (Array.isArray(item)) {
          return item.map(col => ({
            ...col,
            class: this.getColItemClass(col),
            style: this.getColItemStyle(col),
          }));
        }

        const nItem = item;
        return [
          {
            ...nItem,
            class: this.getColItemClass(nItem),
            style: this.getColItemStyle(nItem),
          },
        ];
      });

      this.parsedRowCols = parsedRowCols;
    },

    getColItemClass(obj) {
      return classNames([
        `${name}__col`,
        `${name}--type-${obj.type || 'text'}`,
        `${name}--animation-${this.animation}`,
      ]);
    },

    getColItemStyle(obj) {
      const styleName = [
        'width',
        'height',
        'marginRight',
        'marginLeft',
        'margin',
        'size',
        'background',
        'backgroundColor',
        'borderRadius',
      ];
      const style = {};
      styleName.forEach((name) => {
        if (name in obj) {
          const px = isNumber(obj[name]) ? `${obj[name]}px` : obj[name];
          if (name === 'size') {
            [style.width, style.height] = [px, px];
          } else {
            style[name] = px;
          }
        }
      });
      return style;
    },

    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },

    isShowSkeleton() {
      this.clearTimer();

      const { loading, delay } = this;

      if (!loading || delay === 0) {
        this.isShow = loading;
        return;
      }

      this.timer = setTimeout(() => {
        this.isShow = this.loading;
      }, delay);
    },
  },
});

// let Skeleton = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-col`, `${prefix}-class-row`];
//     this = props;
//     this.setData({
//       prefix,
//       classPrefix: name,
//       parsedRowCols: [],
//       isShow: false,
//       _,
//     });
//     this._ = _;
//     this.observers = {
//       rowCol() {
//         this.init();
//       },
//       'loading, delay'() {
//         this.isShowSkeleton();
//       },
//     };
//     this.lifetimes = {
//       attached() {
//         this.init();
//         this.isShowSkeleton();
//       },
//     };
//     this.methods = {
//       init() {
//         const {
//           theme: t,
//           rowCol: e,
//         } = this;
//         const s = [];
//         if (e.length) {
//           s.push(...e);
//         } else {
//           s.push(...ThemeMap[t || 'text']);
//         }
//         const i = s.map((t) => {
//           if (isNumber(t)) {
//             return [{
//               class: this.getColItemClass({
//                 type: 'text',
//               }),
//               style: {},
//             }];
//           }
//           if (Array.isArray(t)) {
//             return t.map(t => Object.assign(Object.assign({}, t), {
//               class: this.getColItemClass(t),
//               style: this.getColItemStyle(t),
//             }));
//           }
//           const e = t;
//           return [Object.assign(Object.assign({}, e), {
//             class: this.getColItemClass(e),
//             style: this.getColItemStyle(e),
//           })];
//         });

//         this.setData({
//           parsedRowCols: i,
//         });
//       },
//       getColItemClass(t) {
//         return classNames([`${name}__col`, `${name}--type-${t.type || 'text'}`, `${name}--animation-${this.animation}`]);
//       },
//       getColItemStyle(t) {
//         const e = {};
//         ['width', 'height', 'marginRight', 'marginLeft', 'margin', 'size', 'background', 'backgroundColor', 'borderRadius'].forEach((s) => {
//           if (s in t) {
//             const i = isNumber(t[s]) ? `${t[s]}px` : t[s];
//             'size' === s ? [e.width, e.height] = [i, i] : e[s] = i;
//           }
//         });
//         return e;
//       },
//       isShowSkeleton() {
//         const {
//           loading: t,
//           delay: e = 0,
//         } = this;

//         if (t && e !== 0) {
//           setTimeout(() => {
//             this.setData({
//               isShow: t,
//             });
//           }, e);
//           return;
//         }

//         this.setData({
//           isShow: t,
//         });
//         this.isShow = t;
//       },
//     };
//   }
// };
// Skeleton = initTDesign(__decorate([wxComponent()], Skeleton));
// export default Skeleton;
</script>
<style>
@import './skeleton.css';
</style>
