<template>
    <view>
        <t-popup v-if="usePopup" class="class" :visible="visible" :usingCustomNavbar="usingCustomNavbar" @visible-change="onVisibleChange" placement="bottom">
            <!-- parse <include src="./template.wxml"/> -->
            <block>
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
                                <view
                                    :class="(class)+' '+(classPrefix)+' '+(switchMode !== 'none' ? classPrefix + '__with-action' : '')"
                                    :id="'year_' + item.year + '_month_' + item.month"
                                >
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
                                    @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                    :aria-label="ariaLabel || ''"
                                >
                                    <slot v-if="true || false" />
                                </t-button>
                            </block>
                        </block>
                    </view>
                </view>
            </block>
        </t-popup>
        <block v-else>
            <!-- parse <include src="./template.wxml"/> -->
            <block>
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
                                <view
                                    :class="(class)+' '+(classPrefix)+' '+(switchMode !== 'none' ? classPrefix + '__with-action' : '')"
                                    :id="'year_' + item.year + '_month_' + item.month"
                                >
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
                                    @tap.native="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @getuserinfo="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @contact="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @getphonenumber="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @error="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @opensetting="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @launchapp="onTplButtonTap($event, { type: 'action', extra: index })"
                                    @agreeprivacyauthorization="onTplButtonTap($event, { type: 'action', extra: index })"
                                    :aria-label="ariaLabel || ''"
                                >
                                    <slot v-if="true || false" />
                                </t-button>
                            </block>
                        </block>
                    </view>
                </view>
            </block>
        </block>
    </view>
</template>
<script module="_this" lang="wxs" src="@/calendar/calendar.wxs"></script>
<script module="_" lang="wxs" src="@/common/utils.wxs"></script>
<script>
import tPopup from "../popup/popup";
import tButton from "../button/button";
import tIcon from "../icon/icon";
import { __decorate } from "@/miniprogram_npm/tslib";
import { SuperComponent, wxComponent } from "../common/src/index";
import config from "../common/config";
import props from "./props";
import TCalendar from "../common/shared/calendar/index";
import useCustomNavbar from "../mixins/using-custom-navbar";
import { getPrevMonth, getPrevYear, getNextMonth, getNextYear } from "./utils";
const {
  prefix: prefix
} = config;
const name = `${prefix}-calendar`;
const defaultLocaleText = {
  title: "请选择日期",
  weekdays: ["日", "一", "二", "三", "四", "五", "六"],
  monthTitle: "{year} 年 {month}",
  months: ["1 月", "2 月", "3 月", "4 月", "5 月", "6 月", "7 月", "8 月", "9 月", "10 月", "11 月", "12 月"],
  confirm: "确认"
};
let Calendar = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.behaviors = [useCustomNavbar];
    this.externalClasses = [`${prefix}-class`];
    this.options = {
      multipleSlots: true
    };
    this = props;
    this.setData({
      prefix: prefix,
      classPrefix: name,
      months: [],
      scrollIntoView: "",
      innerConfirmBtn: {},
      realLocalText: {},
      currentMonth: {},
      actionButtons: {
        preYearBtnDisable: false,
        prevMonthBtnDisable: false,
        nextMonthBtnDisable: false,
        nextYearBtnDisable: false
      }
    });
    this.controlledProps = [{
      key: "value",
      event: "confirm"
    }, {
      key: "value",
      event: "change"
    }];
    this.lifetimes = {
      created() {
        this.base = new TCalendar(this);
      },
      ready() {
        const t = Object.assign(Object.assign({}, defaultLocaleText), this.localeText);
        this.initialValue();
        this.setData({
          days: this.base.getDays(t.weekdays),
          realLocalText: t
        });
        this.calcMonths();
        this.updateCurrentMonth();
        this.usePopup || this.scrollIntoView();
      }
    };
    this.observers = {
      type(t) {
        this.base.type = t;
      },
      confirmBtn(t) {
        if ("string" == typeof t) {
          this.setData({
            innerConfirmBtn: "slot" === t ? "slot" : {
              content: t
            }
          });
        } else {
          if ("object" == typeof t) {
            this.setData({
              innerConfirmBtn: t
            });
          }
        }
      },
      "firstDayOfWeek,minDate,maxDate"(t, e, a) {
        if (t) {
          this.base.firstDayOfWeek = t;
        }
        if (e) {
          this.base.minDate = e;
        }
        if (a) {
          this.base.maxDate = a;
        }
        this.calcMonths();
      },
      value(t) {
        this.base.value = t;
        this.calcMonths();
        this.updateCurrentMonth();
      },
      visible(t) {
        if (t) {
          this.scrollIntoView();
          this.base.value = this.value;
          this.calcMonths();
        }
      },
      format(t) {
        const {
          usePopup: e,
          visible: a
        } = this;
        this.base.format = t;
        e && !a || this.calcMonths();
      }
    };
    this.methods = {
      initialValue() {
        const {
          value: t,
          type: e,
          minDate: a
        } = this;
        if (!t) {
          const t = new Date();
          const n = a || new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
          const s = "single" === e ? n : [n];
          if ("range" === e) {
            s[1] = n + 86400000;
          }
          this.setData({
            value: s
          });
          this.base.value = s;
        }
      },
      scrollIntoView() {
        const {
          value: t
        } = this;
        if (!t) {
          return;
        }
        const e = new Date(Array.isArray(t) ? t[0] : t);
        if (e) {
          this.setData({
            scrollIntoView: `year_${e.getFullYear()}_month_${e.getMonth()}`
          });
        }
      },
      getCurrentYearAndMonth(t) {
        const e = new Date(t);
        return {
          year: e.getFullYear(),
          month: e.getMonth()
        };
      },
      updateActionButton(t) {
        const e = this.getCurrentYearAndMonth(this.base.minDate);
        const a = this.getCurrentYearAndMonth(this.base.maxDate);
        const n = new Date(e.year, e.month, 1).getTime();
        const s = new Date(a.year, a.month, 1).getTime();
        const r = getPrevYear(t).getTime();
        const i = getPrevMonth(t).getTime();
        const o = getNextMonth(t).getTime();
        const h = getNextYear(t).getTime();
        const l = r < n || i < n;
        const c = i < n;
        const m = o > s || h > s;
        const u = o > s;
        this.setData({
          actionButtons: {
            preYearBtnDisable: l,
            prevMonthBtnDisable: c,
            nextYearBtnDisable: m,
            nextMonthBtnDisable: u
          }
        });
      },
      updateCurrentMonth() {
        if ("none" !== this.switchMode) {
          this.calcCurrentMonth();
        }
      },
      calcCurrentMonth(t) {
        const e = t || this.getCurrentDate();
        const {
          year: a,
          month: n
        } = this.getCurrentYearAndMonth(e);
        const s = this.months.filter(t => t.year === a && t.month === n);
        this.updateActionButton(e);
        this.setData({
          currentMonth: s.length > 0 ? s : [this.months[0]]
        });
      },
      calcMonths() {
        const t = this.base.getMonths();
        this.setData({
          months: t
        });
      },
      close(t) {
        if (this.autoClose) {
          this.setData({
            visible: false
          });
        }
        this.$emit("close", {
          detail: {
            trigger: t
          }
        });
      },
      onVisibleChange() {
        this.close("overlay");
      },
      handleClose() {
        this.close("close-btn");
      },
      handleSelect(t) {
        const {
          date: e,
          year: a,
          month: n
        } = t.currentTarget.dataset;
        if ("disabled" === e.type) {
          return;
        }
        const s = this.base.select({
          cellType: e.type,
          year: a,
          month: n,
          date: e.day
        });
        const r = this.toTime(s);
        this.calcMonths();
        this.updateCurrentMonth();
        if (null == this.confirmBtn) {
          "single" !== this.type && 2 !== s.length || (this.setData({
            visible: false
          }), this._trigger("change", {
            value: r
          }));
        }
        this.$emit("select", {
          detail: {
            value: r
          }
        });
      },
      onTplButtonTap() {
        const t = this.base.getTrimValue();
        const e = this.toTime(t);
        this.close("confirm-btn");
        this._trigger("confirm", {
          value: e
        });
      },
      toTime: t => t ? Array.isArray(t) ? t.map(t => t.getTime()) : t.getTime() : null,
      onScroll(t) {
        this.$emit("scroll", {
          detail: t.detail
        });
      },
      getCurrentDate() {
        var t;
        var e;
        let a = Array.isArray(this.base.value) ? this.base.value[0] : this.base.value;
        if (this.currentMonth.length > 0) {
          const n = null === (t = this.currentMonth[0]) || void 0 === t ? void 0 : t.year;
          const s = null === (e = this.currentMonth[0]) || void 0 === e ? void 0 : e.month;
          a = new Date(n, s, 1).getTime();
        }
        return a;
      },
      handleSwitchModeChange(t) {
        const {
          type: e,
          disabled: a
        } = t.currentTarget.dataset;
        if (a) {
          return;
        }
        const n = this.getCurrentDate();
        const s = {
          "pre-year": () => getPrevYear(n),
          "pre-month": () => getPrevMonth(n),
          "next-month": () => getNextMonth(n),
          "next-year": () => getNextYear(n)
        }[e]();
        if (!s) {
          return;
        }
        const {
          year: r,
          month: i
        } = this.getCurrentYearAndMonth(s);
        this.$emit("panel-change", {
          detail: {
            year: r,
            month: i + 1
          }
        });
        this.calcCurrentMonth(s);
      }
    };
  }
};
Calendar = __decorate([wxComponent()], Calendar);
export default Calendar;
</script>
<style>
@import './calendar.css';
@import 'undefined';
</style>
