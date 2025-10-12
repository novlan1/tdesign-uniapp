<template>
  <view>
    <scroll-view
      :class="'class ' + tClass"
      type="list"
      scroll-y
      enhanced
      :show-scrollbar="false"
      :scroll-into-view="scrollIntoView"
    >
      <slot />
    </scroll-view>
  </view>
</template>

<script>
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
// import { canUseProxyScrollView } from '../common/version';


const name = `${prefix}-scroll-view`;


export default uniComponent({
  name,
  externalClasses: [`${prefix}-class`],
  props: {
    scrollIntoView: {
      type: [String, Number, null],
      default: null,
    },
  },
  data() {
    return {

    };
  },
  watch: {

  },
  mounted() {

  },
  methods: {

  },
});


// let ScrollView = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.externalClasses = [`${prefix}-class`];
//     this.behaviors = canUseProxyScrollView() ? ['wx://proxy-scroll-view'] : [];
//     // this = {
//     //   scrollIntoView: {
//     //     type: String,
//     //   },
//     // };
//   }
// };
// ScrollView = __decorate([wxComponent()], ScrollView);
// export default ScrollView;
</script>
<style scoped lang="less">
@import './scroll-view.less';
</style>
