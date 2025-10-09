<template>
  <view
    :class="classPrefix + ' class ' + tClass"
    :style="_._style([dataStyle, customStyle])"
  >
    <view
      :class="
        _.cls(classPrefix + '__wrapper', [
          ['sticky', sticky],
          ['active', active]
        ])
      "
      :style="anchorStyle"
    >
      <view :class="classPrefix + '__slot'">
        <slot />
      </view>
      <view :class="_.cls(classPrefix + '__header', [['active', active]])">
        {{ index }}
      </view>
    </view>
  </view>
</template>
<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import _ from '../common/utils.wxs';
import { ChildrenMixin, RELATION_MAP } from '../common/relation';


const name = `${prefix}-indexes-anchor`;


export default uniComponent({
  name,
  externalClasses: [
    `${prefix}-class`,
  ],
  mixins: [
    ChildrenMixin(RELATION_MAP.IndexesAnchor, {
      indexKey: 'tIndex',
    }),
  ],
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      anchorStyle: '',
      sticky: false,
      active: false,
      _,
      dataStyle: this.style,
    };
  },
  watch: {
    style(e) {
      this.dataStyle = e;
    },
  },
  mounted() {

  },
  methods: {

  },
});


// let IndexesAnchor = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`];
//     this.properties = props;
//     this.setData({
//       prefix,
//       classPrefix: name,
//       anchorStyle: '',
//       sticky: false,
//       active: false,
//     });
//     this.relations = {
//       '../indexes/indexes': {
//         type: 'parent',
//       },
//     };
//   }
// };
// IndexesAnchor = __decorate([wxComponent()], IndexesAnchor);
// export default IndexesAnchor;
</script>
<style>
@import './indexes-anchor.css';
</style>
