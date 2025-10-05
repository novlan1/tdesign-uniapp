<template>
  <view
    :class="[classPrefix + ' class ', tClass]"
    :style="_._style(['right: 16px; bottom: 32px;', style, customStyle])"
  >
    <slot v-if="!buttonData?.content && !buttonData?.icon" />
    <!-- parse <template v-else is="button" :data="useDefaultSlot: true, ...buttonData"/> -->
    <t-button
      v-else
      :t-id="buttonData.tId"
      :custom-style="buttonData.style || ''"
      :block="buttonData.block"
      :class="getActionClass(classPrefix, buttonLayout) || ''"
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
      <slot />
    </t-button>
  </view>
</template>
<script>
import _ from '../../common/utils.wxs';
import tButton from '../../button/button';


export default {
  components: {
    tButton,
  },
  props: {
    prefix: String,
    classPrefix: String,
    style: String,
    customStyle: String,
    buttonData: Object,
    buttonLayout: String,
    disabled: Boolean,
    loading: Boolean,
    loadingProps: Object,
    ghost: Boolean,
    shape: String,
    size: String,
    variant: String,
    icon: String,
    content: String,
    ariaLabel: String,
    index: Number,
    customDataset: Object,
    openType: String,
    hoverClass: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: Number,
    hoverStayTime: Number,
    lang: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    appParameter: String,
    showMessageCard: Boolean,
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
    'click',
  ],
  data() {
    return {
      _,
    };
  },
  methods: {
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
/* @import './view.css'; */

</style>
