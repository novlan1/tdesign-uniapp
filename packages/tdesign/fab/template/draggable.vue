<template>
  <t-draggable
    id="draggable"
    ref="draggable"
    :custom-style="_._style(['right: 16px; bottom: 32px;', style, customStyle, moveStyle])"
    :direction="draggable === true ? 'all' : draggable"
    :t-class="tClass"
    @start="onStart"
    @move="onMove"
    @end="onEnd"
  >
    <slot v-if="!buttonData.content && !buttonData.icon" />
    <!-- parse <template v-else is="button" :data="useDefaultSlot: true, ...buttonData"/> -->
    <block
      v-else
      name="button"
    >
      <t-button
        :t-id="buttonData.tId"
        :custom-style="buttonData.style || ''"
        :block="buttonData.block"
        :class="getActionClass(classPrefix, buttonData.buttonLayout) || ''"
        :t-class="prefix + '-class-action'"
        :disabled="buttonData.disabled"
        :data-type="'action'"
        :data-extra="buttonData.index"
        :custom-dataset="buttonData.customDataset"
        :content="buttonData.content"
        :icon="buttonData.icon"
        :loading="buttonData.loading"
        :loading-props="buttonData.loadingProps"
        :theme="buttonData.theme"
        :ghost="buttonData.ghost"
        :shape="buttonData.shape"
        :size="buttonData.size"
        :variant="buttonData.variant"
        :open-type="buttonData.openType"
        :hover-class="buttonData.hoverClass"
        :hover-stop-propagation="buttonData.hoverStopPropagation"
        :hover-start-time="buttonData.hoverStartTime"
        :hover-stay-time="buttonData.hoverStayTime"
        :lang="buttonData.lang"
        :session-from="buttonData.sessionFrom"
        :send-message-title="buttonData.sendMessageTitle"
        :send-message-path="buttonData.sendMessagePath"
        :send-message-img="buttonData.sendMessageImg"
        :app-parameter="buttonData.appParameter"
        :show-message-card="buttonData.showMessageCard"
        :aria-label="buttonData.ariaLabel"
        @tap="onTplButtonTap"
        @getuserinfo="onTplButtonTap"
        @contact="onTplButtonTap"
        @getphonenumber="onTplButtonTap"
        @error="onTplButtonTap"
        @opensetting="onTplButtonTap"
        @launchapp="onTplButtonTap"
        @agreeprivacyauthorization="onTplButtonTap"
      >
        <slot v-if="true || false" />
      </t-button>
    </block>
  </t-draggable>
</template>
<script>
import _ from '../../common/utils.wxs';
import tDraggable from '../draggable/draggable';
import tButton from '../../button/button';


export default {
  name: 'DraggableTemplate',
  components: {
    tDraggable,
    tButton,
  },
  props: {
    prefix: String,
    classPrefix: String,
    style: String,
    customStyle: String,
    moveStyle: String,
    draggable: [Boolean, String],
    buttonData: Object,
    tClass: {
      type: String,
      default: '',
    },
    tClassButton: {
      type: String,
      default: '',
    },
  },
  emits: [
    'start',
    'move',
    'end',
    'click',
  ],
  data() {
    return {
      _,
    };
  },
  methods: {
    onStart(event) {
      this.$emit('start', event);
    },
    onMove(event) {
      this.$emit('move', event);
    },
    onEnd(event) {
      this.$emit('end', event);
    },
    onTplButtonTap(event) {
      this.$emit('click', event);
    },
    getActionClass(a, b) {
      return `${a}-${b}`;
    },
  },
};
</script>
<style>
/* @import './draggable.css'; */

</style>
