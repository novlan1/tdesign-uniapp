<template>
  <view
    :style="_._style([style, customStyle])"
    :class="[
      'class ',
      tClass,
      classPrefix
    ]"
  >
    <view
      :aria-hidden="true"
      :class="classPrefix + '__thumb'"
    >
      <t-image
        v-if="image"
        :t-class="tClassImage"
        :src="image"
        mode="aspectFit"
      />
      <block
        v-else-if="iconName || _.isNoEmptyObj(iconData)"
        name="icon"
      >
        <t-icon
          :custom-style="iconData.style || ''"
          :t-class="classPrefix + '__icon ' + classPrefix + '__icon--' + (iconData.activeIdx == iconData.index ? 'active ' : ' ')"
          :prefix="iconData.prefix"
          :name="iconName || iconData.name"
          :size="iconData.size"
          :color="iconData.color"
          :aria-hidden="!!iconData.ariaHidden"
          :aria-label="iconData.ariaLabel"
          :aria-role="iconData.ariaRole"
        />
      </block>
      <slot
        v-else
        name="image"
      />
    </view>
    <view
      :class="[
        classPrefix + '__description ',
        tClassDescription
      ]"
    >
      <block v-if="description">
        {{ description }}
      </block>
      <slot name="description" />
    </view>
    <view
      :class="[
        classPrefix + '__actions ',
        tClassActions
      ]"
    >
      <slot name="action" />
    </view>
  </view>
</template>
<script>
import tIcon from '../icon/icon';
import tImage from '../image/image';
import { uniComponent } from '../common/src/index';
import props from './props';
import { prefix } from '../common/config';
import { setIcon } from '../common/utils';
import _ from '../common/utils.wxs';


const name = `${prefix}-empty`;


export default uniComponent({
  name,
  options: {
    styleIsolation: 'shared',
  },
  externalClasses: [
    `${prefix}-class`,
    `${prefix}-class-description`,
    `${prefix}-class-image`,
    `${prefix}-class-actions`,
  ],
  components: {
    tIcon,
    tImage,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,

      iconName: '',
      iconData: {},

      _,
    };
  },
  watch: {
    icon: {
      handler(t) {
        const obj = setIcon('icon', t, '');

        Object.keys(obj).forEach((key) => {
          this[key] = obj[key];
        });
      },
      immediate: true,
    },

  },
  mounted() {

  },
  methods: {

  },
});
</script>
<style scoped>
@import './empty.css';
</style>
