<template>
  <view :class="classPrefix + ' class ' + prefix + '-class'" :style="'right: 16px; bottom: 32px; ' + _._style([style, customStyle])">
    <slot v-if="!buttonData?.content && !buttonData?.icon" />
    <!-- parse <template v-else is="button" :data="useDefaultSlot: true, ...buttonData"/> -->
      <t-button
      v-else
        :t-id="tId || ''"
        :style="style || ''"
        :block="true || false"
        :class="getActionClass(classPrefix, buttonLayout) || ''"
        :t-class="prefix + '-class-action'"
        :disabled="disabled || false"
        :data-type="'action'"
        :data-extra="index"
        :custom-dataset="customDataset"
        :content="content || ''"
        :icon="icon || ''"
        :loading="loading || false"
        :loading-props="loadingProps || null"
        :theme="'primary' || 'default'"
        :ghost="ghost || false"
        :shape="shape || 'rectangle'"
        :size="size || 'medium'"
        :variant="variant || 'base'"
        :open-type="openType || ''"
        :hover-class="hoverClass || ''"
        :hover-stop-propagation="hoverStopPropagation || false"
        :hover-start-time="hoverStartTime || 20"
        :hover-stay-time="hoverStayTime || 70"
        :lang="lang || 'en'"
        :session-from="sessionFrom || ''"
        :send-message-title="sendMessageTitle || ''"
        :send-message-path="sendMessagePath || ''"
        :send-message-img="sendMessageImg || ''"
        :app-parameter="appParameter || ''"
        :show-message-card="showMessageCard || false"
        @tap.native="onTplButtonTap"
        @getuserinfo="onTplButtonTap"
        @contact="onTplButtonTap"
        @getphonenumber="onTplButtonTap"
        @error="onTplButtonTap"
        @opensetting="onTplButtonTap"
        @launchapp="onTplButtonTap"
        @agreeprivacyauthorization="onTplButtonTap"
        :aria-label="ariaLabel || ''"
      >
          <slot v-if="true || false" />
      </t-button>
  </view>
</template>
<script>
import _ from '../../common/utils.wxs';
import tButton from "../../button/button";



export default {
  components: {
    tButton
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
        showMessageCard: Boolean
    },
    data() {
        return {
            _,
        }
    },
    methods: {
        onTplButtonTap(event) {
            this.$emit("tap", event);
        },
         getActionClass(a,b) {
            return `${a}-${b}`
        }
    }
}

</script>

<style>
/* @import './view.css'; */

</style>
