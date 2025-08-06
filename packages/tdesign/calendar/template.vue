<template>
    <view
        :class="_.cls(classPrefix, [['popup', usePopup]]) + ' ' + classPrefix + '-switch-mode--' + switchMode + ' class ' + prefix + '-class'"
        :style="_._style([style, customStyle])"
    >
        <view :class="classPrefix + '__title'" tabindex="0">
            <slot name="title" />
            <text v-if="title || realLocalText.title">{{ title || realLocalText.title }}</text>
        </view>
        <t-icon v-if="usePopup" name="close" :class="classPrefix + '__close-btn'" size="48rpx" aria-role="button" aria-label="关闭" @tap.native="handleClose" />
        <!-- parse <template v-if="switchMode !== 'none'" is="calendar-header" :data="classPrefix: classPrefix + '-header', switchMode, ...actionButtons, title: _this.getMonthTitle(currentMonth[0].year, realLocalText.months[currentMonth[0].month], realLocalText.monthTitle)"/> -->
        <block name="calendar-header" v-if="switchMode !== 'none'">
            <view :class="(class)+' '+(classPrefix)+' '+(switchMode !== 'none' ? classPrefix + '__with-action' : '')" :id="tId">
                <view :class="classPrefix + '-header' + '__action'" v-if="switchMode !== 'none'">
                    <view
                        v-if="switchMode === 'year-month'"
                        :class="_.cls(classPrefix + '-header' + '__icon', [['disabled', preYearBtnDisable]])"
                        :data-disabled="preYearBtnDisable"
                        data-type="pre-year"
                        @tap="handleSwitchModeChange"
                    >
                        <t-icon name="chevron-left-double" />
                    </view>
                    <view
                        :class="_.cls(classPrefix + '-header' + '__icon', [['disabled', prevMonthBtnDisable]])"
                        :data-disabled="prevMonthBtnDisable"
                        data-type="pre-month"
                        @tap="handleSwitchModeChange"
                    >
                        <t-icon name="chevron-left" />
                    </view>
                </view>
                <view :class="classPrefix + '-header' + '__title'">
                    {{ _this.getMonthTitle(currentMonth[0].year, realLocalText.months[currentMonth[0].month], realLocalText.monthTitle) }}
                </view>
                <view :class="classPrefix + '-header' + '__action'" v-if="switchMode !== 'none'">
                    <view
                        :class="_.cls(classPrefix + '-header' + '__icon', [['disabled', nextMonthBtnDisable]])"
                        :data-disabled="nextMonthBtnDisable"
                        data-type="next-month"
                        @tap="handleSwitchModeChange"
                    >
                        <t-icon name="chevron-right" />
                    </view>
                    <view
                        v-if="switchMode === 'year-month'"
                        :class="_.cls(classPrefix + '-header' + '__icon', [['disabled', nextYearBtnDisable]])"
                        :data-disabled="nextYearBtnDisable"
                        data-type="next-year"
                        @tap="handleSwitchModeChange"
                    >
                        <t-icon name="chevron-right-double" />
                    </view>
                </view>
            </view>
        </block>
        <view aria-hidden :class="classPrefix + '__days'">
            <view :class="classPrefix + '__days-item'" v-for="(item, index) in days" :key="index">{{ item }}</view>
        </view>
        <scroll-view :class="classPrefix + '__months'" :scroll-into-view="scrollIntoView" scroll-y enhanced :show-scrollbar="false" @scroll="onScroll">
            <block v-for="(item, index) in switchMode === 'none' ? months : currentMonth" :key="index">
                <!-- parse <template v-if="switchMode === 'none'" is="calendar-header" :data="class: classPrefix + '__month', classPrefix: classPrefix + '-header', tId: 'year_' + item.year + '_month_' + item.month, switchMode, ...actionButtons, title: _this.getMonthTitle(item.year, realLocalText.months[item.month], realLocalText.monthTitle)"/> -->
                <block name="calendar-header" v-if="false" v-if="switchMode === 'none'">
                    <view :class="(class)+' '+(classPrefix)+' '+(switchMode !== 'none' ? classPrefix + '__with-action' : '')" :id="'year_' + item.year + '_month_' + item.month">
                        <view :class="classPrefix + '-header' + '-header' + '__action'" v-if="switchMode !== 'none'">
                            <view
                                v-if="switchMode === 'year-month'"
                                :class="_.cls(classPrefix + '-header' + '-header' + '__icon', [['disabled', preYearBtnDisable]])"
                                :data-disabled="preYearBtnDisable"
                                data-type="pre-year"
                                @tap="handleSwitchModeChange"
                            >
                                <t-icon name="chevron-left-double" />
                            </view>
                            <view
                                :class="_.cls(classPrefix + '-header' + '-header' + '__icon', [['disabled', prevMonthBtnDisable]])"
                                :data-disabled="prevMonthBtnDisable"
                                data-type="pre-month"
                                @tap="handleSwitchModeChange"
                            >
                                <t-icon name="chevron-left" />
                            </view>
                        </view>
                        <view :class="classPrefix + '-header' + '-header' + '__title'">
                            {{ _this.getMonthTitle(currentMonth[0].year, realLocalText.months[currentMonth[0].month], realLocalText.monthTitle) }}
                        </view>
                        <view :class="classPrefix + '-header' + '-header' + '__action'" v-if="switchMode !== 'none'">
                            <view
                                :class="_.cls(classPrefix + '-header' + '-header' + '__icon', [['disabled', nextMonthBtnDisable]])"
                                :data-disabled="nextMonthBtnDisable"
                                data-type="next-month"
                                @tap="handleSwitchModeChange"
                            >
                                <t-icon name="chevron-right" />
                            </view>
                            <view
                                v-if="switchMode === 'year-month'"
                                :class="_.cls(classPrefix + '-header' + '-header' + '__icon', [['disabled', nextYearBtnDisable]])"
                                :data-disabled="nextYearBtnDisable"
                                data-type="next-year"
                                @tap="handleSwitchModeChange"
                            >
                                <t-icon name="chevron-right-double" />
                            </view>
                        </view>
                    </view>
                </block>

                <view :class="classPrefix + '__dates'">
                    <view v-for="(item, index1) in (item.weekdayOfFirstDay - firstDayOfWeek + 7) % 7" :key="index1"></view>
                    <block v-for="(dateItem, dateIndex) in item.months" :key="dateIndex">
                        <view
                            :class="classPrefix + '__dates-item ' + dateItem.className + ' ' + classPrefix + '__dates-item--' + dateItem.type"
                            :data-year="item.year"
                            :data-month="item.month"
                            :data-date="dateItem"
                            aria-role="button"
                            :aria-label="_this.getDateLabel(item, dateItem)"
                            :aria-disabled="dateItem.type === 'disabled'"
                            @tap="handleSelect"
                        >
                            <view v-if="dateItem.prefix" :class="classPrefix + '__dates-item-prefix'">{{ dateItem.prefix }}</view>
                            {{ dateItem.day }}
                            <view v-if="dateItem.suffix" :class="classPrefix + '__dates-item-suffix ' + classPrefix + '__dates-item-suffix--' + dateItem.type">
                                {{ dateItem.suffix }}
                            </view>
                        </view>
                    </block>
                </view>
            </block>
        </scroll-view>
        <view v-if="innerConfirmBtn != null && usePopup" :class="classPrefix + '__footer'">
            <slot v-if="innerConfirmBtn === 'slot'" name="confirm-btn" />
            <block v-else-if="innerConfirmBtn">
                <!-- parse <template is="button" :data="block: true,  theme: 'primary', rootClass: 't-calendar__confirm-btn', content: realLocalText.confirm, ...innerConfirmBtn"/> -->
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
            </block>
        </view>
    </view>
</template>
<script module="_this" lang="wxs" src="@/calendar/calendar.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>

<style>
@import './template.css';
@import 'undefined';
</style>
