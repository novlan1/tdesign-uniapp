<template>
  <view>
    <t-message-item
      v-for="(item, index) in messageList"
      :id="item.id"
      :key="index"
      :ref="item.id"
      @close-btn-click="handleClose($event, { tagId: item.id })"
      @link-click="handleLinkClick($event, { tagId: item.id })"
      @duration-end="handleDurationEnd($event, { tagId: item.id })"
    >
      <slot
        slot="icon"
        name="icon"
      />
      <slot
        slot="content"
        name="content"
      />
      <slot />
      <slot
        slot="link"
        name="link"
      />
      <slot
        slot="close-btn"
        name="close-btn"
      />
    </t-message-item>
  </view>
</template>

<script>
import tMessageItem from '../message-item/message-item';
import { __decorate } from '../miniprogram_npm/tslib';
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import { MessageType } from './message.interface';
import props from './props';
import { unitConvert } from '../common/utils';
import { initTDesign } from '../common/runtime';

const {
  prefix: prefix,
} = config;
const name = `${prefix}-message`;

let Message = class extends SuperComponent {
  constructor() {
    super(...arguments);
    this.options = {
      multipleSlots: true,
    };
    this.properties = props;
    // this = Object.assign({}, props);
    this.components = {
      tMessageItem,
    };
    this.setData({
      prefix,
      classPrefix: name,
      messageList: [],
      instances: [],
    });
    this.index = 0;
    // this.instances = [];
    this.gap = 12;
    this.observers = {
      visible(s) {
        if (s) {
          this.setMessage(this, this.theme);
        } else {
          this.setData({
            messageList: [],
          });
        }
      },
    };
    this.pageLifetimes = {
      show() {
        this.hideAll();
      },
    };
    this.methods = {
      setMessage(s, e = MessageType.info, context) {
        let t = `${name}_${this.index}`;
        if (s.single) {
          t = name;
        }
        // this.gap = unitConvert(s.gap || this.gap);
        const gap = unitConvert(s.gap);
        const i = Object.assign(Object.assign({}, s), {
          theme: e,
          id: t,
          gap: this.gap,
        });
        console.log('instances', this.instances);
        const n = this.instances.findIndex(s => s.id === t);
        if (n < 0) {
          this.addMessage(i, context);
        } else {
          const s = this.instances[n];
          const e = this.getOffsetHeight(n);
          s.resetData(() => {
            s.setData(i, s.show.bind(s, e));
            s.onHide = () => {
              this.close(t);
            };
          });
        }
      },
      memoInitialData() {
        this.initialData = Object.assign(Object.assign({}, this), this);
      },
      addMessage(s, context) {
        const e = [...this.messageList, {
          id: s.id,
        }];
        this.setData({
          messageList: e,
          // }, () => {

        });
        setTimeout(() => {
          const e = this.getOffsetHeight();
          const t = this.showMessageItem(s, s.id, e, context);
          if (this.instances) {
            this.instances.push(t);
            this.index += 1;
          }
        });
      },
      getOffsetHeight(s = -1) {
        let e = 0;
        let t = s;
        if (-1 === t || t > this.instances.length) {
          t = this.instances.length;
        }
        for (let s = 0; s < t; s += 1) {
          const t = this.instances[s];
          e += t.data.height + t.data.gap;
        }
        return e;
      },
      showMessageItem(s, e, t, context) {
        console.log('showMessageItem', { s, e, t });
        console.log('this', this, this.$refs);
        // const i = context ? context.$refs[`${e}`] : this.$refs[`${e}`];
        let i = this.$refs[`${e}`];
        if (Array.isArray(i)) {
          i = i[0];
        }
        console.log('i', i);
        if (i) {
          i.resetData(() => {
            console.log('resetData callback');
            i.setData(s);
            console.log('sss', s);
            setTimeout(() => {
              i.show.call(i, t);
            });
            i.onHide = () => {
              this.close(e);
            };
          });
          return i;
        }
        console.error('未找到组件,请确认 selector && context 是否正确');
      },
      close(s) {
        setTimeout(() => {
          this.removeMsg(s);
        }, 400);
        this.removeInstance(s);
      },
      hide(s) {
        s || this.hideAll();
        const e = this.instances.find(e => e.id === s);
        if (e) {
          e.hide();
        }
      },
      hideAll() {
        for (let s = 0; s < this.instances.length;) {
          this.instances[s].hide();
        }
      },
      removeInstance(s) {
        const e = this.instances.findIndex(e => e.id === s);
        if (e < 0) {
          return;
        }
        const t = this.instances[e].height;
        this.instances.splice(e, 1);
        for (let s = e; s < this.instances.length; s += 1) {
          const e = this.instances[s];
          e.setData({
            wrapTop: e.wrapTop - t - e.gap,
          });
        }
      },
      removeMsg(s) {
        const e = this.messageList.findIndex(e => e.id === s);
        if (e > -1) {
          this.messageList.splice(e, 1);
          this.setData({
            messageList: this.messageList,
          });
        }
      },
      handleClose() {
        this.$emit('close-btn-click');
      },
      handleLinkClick() {
        this.$emit('link-click');
      },
      handleDurationEnd() {
        this.$emit('duration-end');
      },
    };
    this.lifetimes = {
      ready() {
        this.memoInitialData();
      },
    };
  }
};
Message = initTDesign(__decorate([wxComponent()], Message));
export default Message;
</script>
<style>
@import './message.css';
</style>
