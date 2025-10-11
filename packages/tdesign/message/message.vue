<template>
  <view>
    <TMessageItem
      v-for="(item) in messageList"
      :key="item.id"
      :ref="item.id"
      @close-btn-click="handleClose($event, { tagId: item.id })"
      @link-click="handleLinkClick($event, { tagId: item.id })"
      @duration-end="handleDurationEnd($event, { tagId: item.id })"
    >
      <template #icon>
        <slot
          name="icon"
        />
      </template>
      <template #content>
        <slot
          name="content"
        />
      </template>
      <slot />
      <template #link>
        <slot
          name="link"
        />
      </template>
      <template #close-btn>
        <slot
          name="close-btn"
        />
      </template>
    </TMessageItem>
  </view>
</template>

<script>
import TMessageItem from '../message-item/message-item.vue';
import { uniComponent } from '../common/src/index';
import { prefix } from '../common/config';
import { MessageType } from './message.interface';
import props from './props';
import { unitConvert } from '../common/utils';


const SHOW_DURATION = 400;
const name = `${prefix}-message`;


export default uniComponent({
  name,
  components: {
    TMessageItem,
  },
  props: {
    ...props,
  },
  data() {
    return {
      prefix,
      classPrefix: name,
      messageList: [],
      instances: [],
      index: 0,
      // gap: 12,
    };
  },
  watch: {
    visible: {
      handler(value) {
        if (value) {
          const data = Object.keys(props).reduce((acc, key) => ({
            ...acc,
            [key]: this[key],
          }), {});

          this.setMessage(data, this.theme);
        } else {
          this.messageList = [];
        }
      },
      immediate: true,
    },
  },
  mounted() {
    // this.memoInitialData();
  },
  methods: {
  /** 记录组件设置的项目 */
    // memoInitialData() {
    //   this.initialData = {
    //     ...this,
    //     ...this,
    //   };
    // },

    /**
   * 设置消息信息
   * @param msg
   * @param theme
   */
    setMessage(msg, theme = MessageType.info) {
      let id = `${name}_${this.index}`;
      if (msg.single) {
        id = name;
      }
      const gap = unitConvert(msg.gap || this.gap);
      const msgObj = {
        ...msg,
        theme,
        id,
        gap,
      };
      const instanceIndex = this.instances.findIndex(x => x.id === id);
      if (instanceIndex < 0) {
        this.addMessage(msgObj);
      } else {
      // 更新消息
        const instance = this.instances[instanceIndex];
        const offsetHeight = this.getOffsetHeight(instanceIndex);
        instance.resetData(() => {
          Object.keys(msgObj).forEach((key) => {
            instance[key] = msgObj[key];
          });
          setTimeout(() => {
            instance.show.call(instance, offsetHeight);
          });
          // instance.setData(msgObj, instance.show.bind(instance, offsetHeight));
          instance.onHide = () => {
            this.close(id);
          };
        });
      }
    },

    /**
   * 新增消息
   * @param msgObj
   */
    addMessage(msgObj) {
      const list = [...this.messageList, { id: msgObj.id }];
      this.messageList = list;

      setTimeout(() => {
        // this.setData(
        //   {
        //     messageList: list,
        //   },
        //   () => {
        const offsetHeight = this.getOffsetHeight();
        const instance = this.showMessageItem(msgObj, msgObj.id, offsetHeight);
        if (this.instances) {
          this.instances.push(instance);
          this.index += 1;
        }
      });
      //   },
      // );
    },

    /**
   * 获取消息显示top偏移距离
   * @param index
   * @returns
   */
    getOffsetHeight(index = -1) {
      let offsetHeight = 0;
      let len = index;
      if (len === -1 || len > this.instances.length) {
        len = this.instances.length;
      }
      for (let i = 0; i < len; i += 1) {
        const instance = this.instances[i];
        offsetHeight += instance.height + instance.gap;
      }
      return offsetHeight;
    },

    /**
   * 新增消息显示
   * @param options
   * @param id
   * @param offsetHeight
   * @returns
   */
    showMessageItem(options, id, offsetHeight) {
      let instance = this.$refs[`${id}`];
      if (Array.isArray(instance)) {
        instance = instance[0];
      }

      if (instance) {
        instance.resetData(() => {
          Object.keys(options).forEach((key) => {
            instance[key] = options[key];
          });
          setTimeout(() => {
            instance.show.call(instance, offsetHeight);
          });
          // instance.setData(options, instance.show.bind(instance, offsetHeight));
          instance.onHide = () => {
            this.close(id);
          };
        });

        return instance;
      }
      console.error('未找到组件,请确认 selector && context 是否正确');
    },

    close(id) {
      setTimeout(() => {
        this.removeMsg(id);
      }, SHOW_DURATION);
      this.removeInstance(id);
    },

    /**
   * 移除指定消息，id为空则删除全部消息
   * @param id
   */
    hide(id) {
      if (!id) {
        this.hideAll();
      }
      const instance = this.instances.find(x => x.id === id);
      if (instance) {
        instance.hide();
      }
    },

    /**
   * 移除全部消息
   */
    hideAll() {
    // 消息移除后也会移除instance，下标不用增加，直至全部删除
      for (let i = 0; i < this.instances.length;) {
        const instance = this.instances[i];
        instance.hide();
      }
    },

    /**
   * 移除message实例
   */
    removeInstance(id) {
      const index = this.instances.findIndex(x => x.id === id);
      if (index < 0) return;
      const instance = this.instances[index];
      const removedHeight = instance.height;
      this.instances.splice(index, 1);
      for (let i = index; i < this.instances.length; i += 1) {
        const instance = this.instances[i];
        instance.wrapTop = instance.wrapTop - removedHeight - instance.gap;
      }
    },

    /**
   * 移除页面元素
   * @param id
   */
    removeMsg(id) {
      this.messageList = this.messageList.filter(item => item.id !== id);
      // #ifdef VUE2
      this.$set(this, 'messageList', this.messageList);
      // #endif
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
  },
});

// let Message = class extends SuperComponent {
//   constructor() {
//     super(...arguments);
//     this.options = {
//       multipleSlots: true,
//     };
//     this.properties = props;
//     // this = Object.assign({}, props);
//     this.components = {
//       tMessageItem,
//     };
//     this.setData({
//       prefix,
//       classPrefix: name,
//       messageList: [],
//       instances: [],
//     });
//     this.index = 0;
//     // this.instances = [];
//     this.gap = 12;
//     this.observers = {
//       visible(s) {
//         if (s) {
//           this.setMessage(this, this.theme);
//         } else {
//           this.setData({
//             messageList: [],
//           });
//         }
//       },
//     };
//     this.pageLifetimes = {
//       show() {
//         this.hideAll();
//       },
//     };
//     this.methods = {
//       setMessage(s, e = MessageType.info, context) {
//         let t = `${name}_${this.index}`;
//         if (s.single) {
//           t = name;
//         }
//         // this.gap = unitConvert(s.gap || this.gap);
//         const gap = unitConvert(s.gap);
//         const i = Object.assign(Object.assign({}, s), {
//           theme: e,
//           id: t,
//           gap: this.gap,
//         });
//         console.log('instances', this.instances);
//         const n = this.instances.findIndex(s => s.id === t);
//         if (n < 0) {
//           this.addMessage(i, context);
//         } else {
//           const s = this.instances[n];
//           const e = this.getOffsetHeight(n);
//           s.resetData(() => {
//             s.setData(i, s.show.bind(s, e));
//             s.onHide = () => {
//               this.close(t);
//             };
//           });
//         }
//       },
//       memoInitialData() {
//         this.initialData = Object.assign(Object.assign({}, this), this);
//       },
//       addMessage(s, context) {
//         const e = [...this.messageList, {
//           id: s.id,
//         }];
//         this.setData({
//           messageList: e,
//           // }, () => {

//         });
//         setTimeout(() => {
//           const e = this.getOffsetHeight();
//           const t = this.showMessageItem(s, s.id, e, context);
//           if (this.instances) {
//             this.instances.push(t);
//             this.index += 1;
//           }
//         });
//       },
//       getOffsetHeight(s = -1) {
//         let e = 0;
//         let t = s;
//         if (-1 === t || t > this.instances.length) {
//           t = this.instances.length;
//         }
//         for (let s = 0; s < t; s += 1) {
//           const t = this.instances[s];
//           e += t.data.height + t.data.gap;
//         }
//         return e;
//       },
//       showMessageItem(s, e, t, context) {
//         console.log('showMessageItem', { s, e, t });
//         console.log('this', this, this.$refs);
//         // const i = context ? context.$refs[`${e}`] : this.$refs[`${e}`];
//         let i = this.$refs[`${e}`];
//         if (Array.isArray(i)) {
//           i = i[0];
//         }
//         console.log('i', i);
//         if (i) {
//           i.resetData(() => {
//             console.log('resetData callback');
//             i.setData(s);
//             console.log('sss', s);
//             setTimeout(() => {
//               i.show.call(i, t);
//             });
//             i.onHide = () => {
//               this.close(e);
//             };
//           });
//           return i;
//         }
//         console.error('未找到组件,请确认 selector && context 是否正确');
//       },
//       close(s) {
//         setTimeout(() => {
//           this.removeMsg(s);
//         }, 400);
//         this.removeInstance(s);
//       },
//       hide(s) {
//         s || this.hideAll();
//         const e = this.instances.find(e => e.id === s);
//         if (e) {
//           e.hide();
//         }
//       },
//       hideAll() {
//         for (let s = 0; s < this.instances.length;) {
//           this.instances[s].hide();
//         }
//       },
//       removeInstance(s) {
//         const e = this.instances.findIndex(e => e.id === s);
//         if (e < 0) {
//           return;
//         }
//         const t = this.instances[e].height;
//         this.instances.splice(e, 1);
//         for (let s = e; s < this.instances.length; s += 1) {
//           const e = this.instances[s];
//           e.setData({
//             wrapTop: e.wrapTop - t - e.gap,
//           });
//         }
//       },
//       removeMsg(s) {
//         const e = this.messageList.findIndex(e => e.id === s);
//         if (e > -1) {
//           this.messageList.splice(e, 1);
//           this.setData({
//             messageList: this.messageList,
//           });
//         }
//       },
//       handleClose() {
//         this.$emit('close-btn-click');
//       },
//       handleLinkClick() {
//         this.$emit('link-click');
//       },
//       handleDurationEnd() {
//         this.$emit('duration-end');
//       },
//     };
//     this.lifetimes = {
//       ready() {
//         this.memoInitialData();
//       },
//     };
//   }
// };
// Message = initTDesign(__decorate([wxComponent()], Message));
// export default Message;
</script>
<style scoped>
@import './message.css';
</style>
