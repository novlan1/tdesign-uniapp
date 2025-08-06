<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="button" v-if="false">
            <t-button
                :t-id="tId || ''"
                :style="style || ''"
                :block="true || false"
                :class="_this.getActionClass(classPrefix, buttonLayout) || ''"
                :t-class="prefix + '-class-action'"
                :disabled="disabled || false"
                :data-type="'action'"
                :data-extra="index"
                :custom-dataset="customDataset"
                :content="realLocalText.confirm || ''"
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
    </view>
</template>

<style>
@import './button.css';
</style>
