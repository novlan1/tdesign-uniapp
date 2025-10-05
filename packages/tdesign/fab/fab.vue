<template>
  <DraggableTemplate
    v-if="draggable"
    ref="draggableTemplate"
    :prefix="prefix"
    :class-prefix="classPrefix"
    :custom-style="_._style([style, customStyle])"
    :move-style="moveStyle"
    :draggable="draggable"
    :button-data="buttonData"
    @start="onStart"
    @move="onMove"
    @end="onEnd"
    @click="onTplButtonTap"
  >
    <template #default>
      <slot />
    </template>
  </DraggableTemplate>
  <ViewTemplate
    v-else
    :prefix="prefix"
    :class-prefix="classPrefix"
    :custom-style="_._style([style, customStyle])"
    :button-data="buttonData"
    @click="onTplButtonTap"
  >
    <template #default>
      <slot />
    </template>
  </ViewTemplate>
</template>

<script>
import tButton from '../button/button';
import tDraggable from './draggable/draggable';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import props from './props';
import useCustomNavbar from '../mixins/using-custom-navbar';
import { unitConvert, getWindowInfo } from '../common/utils';
import _ from '../common/utils.wxs';
import DraggableTemplate from './template/draggable.vue';
import ViewTemplate from './template/view.vue';

const name = `${prefix}-fab`;

const baseButtonProps = {
  size: 'large',
  shape: 'circle',
  theme: 'primary',
  tClass: `${prefix}-fab__button`,
};

export default uniComponent({
  name,
  mixins: [useCustomNavbar],
  components: {
    DraggableTemplate,
    ViewTemplate,
    tButton,
    tDraggable,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      moveStyle: null,
      _,
      systemInfo: getWindowInfo(),
    };
  },
  computed: {
    buttonData() {
      return {
        ...baseButtonProps,
        shape: this.text ? 'round' : 'circle',
        ...this.buttonProps,
        icon: this.icon,
        content: this.text,
        ariaLabel: this.ariaLabel,
      };
    },
  },
  watch: {
    icon: 'computedSize',
    ariaLabel: 'computedSize',
    yBounds: 'computedSize',
    buttonProps: 'computedSize',
    text: {
      handler(val) {
        this.content = val;
        this.computedSize();
      },
      immediate: true,
    },
  },
  methods: {
    onTplButtonTap(t) {
      this.$emit('click', {
        detail: t,
      });
    },
    onStart(t) {
      this.$emit('dragstart', {
        detail: t,
      });
    },
    onMove(e) {
      const {
        yBounds,
        distanceTop,
        systemInfo,
      } = this;

      const { x, y, rect } = e;
      const maxX = systemInfo.windowWidth - rect.width; // 父容器宽度 - 拖动元素宽度
      const maxY = systemInfo.windowHeight - Math.max(distanceTop, unitConvert(yBounds[0])) - rect.height; // 父容器高度 - 拖动元素高度
      const right = Math.max(0, Math.min(x, maxX));
      const bottom = Math.max(0, unitConvert(yBounds[1]), Math.min(y, maxY));

      console.log('maxX', { maxX, maxY, yBounds, right, bottom });
      this.moveStyle = `right: ${right}px; bottom: ${bottom}px;`;
    },
    onEnd(t) {
      this.$emit('dragend', {
        detail: t,
      });
    },
    computedSize() {
      if (!this.draggable) return;

      setTimeout(() => {
        const insChild = this.$refs.draggableTemplate?.$refs?.draggable;
        console.log('insChild', insChild, this.$refs);

        // button 更新时，重新获取其尺寸
        if (this?.yBounds?.[1]) {
          this.moveStyle = `bottom: ${unitConvert(this.yBounds[1])}px`;
          insChild?.computedRect();
        } else {
          insChild?.computedRect();
        }
      });
    },
  },
});
</script>
<style>
@import './fab.css';
</style>
