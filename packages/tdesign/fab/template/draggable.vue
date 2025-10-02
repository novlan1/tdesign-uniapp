<template>
    <view>
        <template name="draggable">
            <t-draggable
                id="draggable"
                :style="'right: 16px; bottom: 32px; ' + _._style([style, customStyle, moveStyle])"
                :direction="draggable === true ? 'all' : draggable"
                @start="onStart"
                @move="onMove"
                @end="onEnd"
            >
                <slot v-if="!buttonData.content && !buttonData.icon" />
                <!-- parse <template v-else is="button" :data="useDefaultSlot: true, ...buttonData"/> -->
                <block name="button" v-else>
                    <t-button
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
                </block>
            </t-draggable>
        </template>
    </view>
</template>
<script>
import tDraggable from "../draggable/draggable";


export default {
    name: "DraggableTemplate",
    components: {
        tDraggable
    },
    props: {
        prefix: String,
        classPrefix: String,
        style: String,
        customStyle: String,
        moveStyle: String,
        draggable: [Boolean, String],
        buttonData: Object,
    },
    methods: {
        onStart(event) {
          this.$emit("start", event);
        },
        onMove(event) {
          this.$emit("move", event);
        },
        onEnd(event) {
          this.$emit("end", event);
        },
        onTplButtonTap(event) {
          this.$emit("tap", event);
        },
        getActionClass(a,b) {
            return `${a}-${b}`
        }
    },
}
</script>
<style>
/* @import './draggable.css'; */

</style>
