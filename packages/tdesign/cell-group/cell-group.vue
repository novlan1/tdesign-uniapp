<template>
  <view>
    <view
      v-if="title"
      :class="['class ' + classPrefix + '__title ',
               tClassTitle
      ]"
    >
      {{ title }}
    </view>
    <view
      :style="_._style([style, customStyle])"
      :class="[
        _.cls(classPrefix, [['bordered', bordered], theme]) + ' class ',
        tClass
      ]"
    >
      <slot />
    </view>
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { ParentMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-cell-group`;


export default uniComponent({
  name,
  externalClasses: [`${prefix}-class`, `${prefix}-class-title`],
  mixins: [ParentMixin(RELATION_MAP.Cell)],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      _,
    };
  },
  methods: {
    innerAfterLinked() {
      this.updateLastChid();
    },
    innerAfterUnLinked() {
      this.updateLastChid();
    },
    updateLastChid() {
      const { children } = this;
      children.forEach((child, index) => {
        child.isLastChild = index === children.length - 1;
      });
    },
  },
});

// let CellGroup = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`, `${prefix}-class-title`];
//     // this.relations = {
//     //   "../cell/cell": {
//     //     type: "child",
//     //     linked() {
//     //       this.updateLastChid();
//     //     },
//     //     unlinked() {
//     //       this.updateLastChid();
//     //     }
//     //   }
//     // };
//     this.properties = props;
//     this._ = _;
//     this.setData({
//       prefix,
//       classPrefix: name,
//     });
//     this.methods = {

//     };
//   }
// };
// CellGroup = initTDesign(__decorate([wxComponent()], CellGroup));
// export default CellGroup;
</script>
<style scoped>
@import './cell-group.css';
</style>
