<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="content" v-if="false">
            <slot v-if="!title && !body" :name="'content-' + current" />
            <block v-else>
                <view :class="prefix + '-class-tooltip'">
                    <view v-if="title" :class="prefix + '-class-title ' + classPrefix + '__title--' + modeType">{{ title }}</view>
                    <slot v-else :name="'title-' + current" />
                    <view v-if="body" :class="prefix + '-class-body ' + classPrefix + '__body--' + modeType">{{ body }}</view>
                    <slot v-else :name="'body-' + current" />
                </view>
                <view v-if="current !== -1" :class="prefix + '-class-footer ' + classPrefix + '__footer ' + classPrefix + '__footer--' + modeType">
                    <!-- parse <template is="button" v-if="current < steps.length - 1 && !hideSkip" :data="...skipButton"/> -->
                    <block name="button" v-if="false" v-if="current < steps.length - 1 && !hideSkip">
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
                    <!-- parse <template is="button" v-else-if="current === steps.length - 1 && !hideBack" :data="...backButton"/> -->
                    <block name="button" v-if="false" v-else-if="current === steps.length - 1 && !hideBack">
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
                    <!-- parse <template is="button" v-if="current < steps.length - 1" :data="...nextButton"/> -->
                    <block name="button" v-if="false" v-if="current < steps.length - 1">
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
                    <!-- parse <template is="button" v-else :data="...finishButton"/> -->
                    <block name="button" v-if="false" v-else>
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
                </view>
            </block>
        </block>
    </view>
</template>

<style>
@import './content.css';
@import 'undefined';
</style>
